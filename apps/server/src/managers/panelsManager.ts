import { printLoadedDataFromDB } from "../utils/print";

import { DisplayPanel } from "types";
import { Manager } from "./manager";
import { db, and, eq, gte, lte, Panels } from "database";

interface PanelsManagerConfiguration {
	onAddPanel: (panel: DisplayPanel) => void;
	onRemovePanel: (panelId: number) => void;
}

export class PanelsManager extends Manager<DisplayPanel[]> {
	protected override get dataName(): string {
		return "visible Panels";
	}

	constructor({ onAddPanel, onRemovePanel }: PanelsManagerConfiguration) {
		super((oldData, newData) => {
			const newlyVisiblePanels = newData.filter((panel) => !oldData.some((p) => p.id === panel.id));
			const newlyHiddenPanels = oldData.filter((panel) => !newData.some((p) => p.id === panel.id));

			for (const panel of newlyVisiblePanels) onAddPanel(panel);
			for (const panel of newlyHiddenPanels) onRemovePanel(panel.id);
		});

		this.enabled = true;
	}

	protected override isStale = (lastUpdated: Date): boolean => {
		const now = new Date();

		return now.getDate() !== lastUpdated.getDate();
	};

	protected override get emptyData(): DisplayPanel[] {
		return [];
	}

	protected override async getCurrent(): Promise<DisplayPanel[]> {
		const now = new Date();

		const visiblePanels = (await db.query.Panels.findMany({
			where: and(eq(Panels.isApproved, true), eq(Panels.isDeprecated, false), eq(Panels.isHidden, false), lte(Panels.showFrom, now), gte(Panels.showTill, now)),
			columns: {
				id: true,
				type: true,
				content: true,
			},
		})) as DisplayPanel[];

		printLoadedDataFromDB("visible Panels");

		return visiblePanels;
	}
}
