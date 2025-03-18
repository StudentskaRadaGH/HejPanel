import { printLoadedDataFromDB } from "../utils/print";

import { ClientPanelData } from "types";
import { Manager } from "./manager";
import { db, panelShouldBeVisible } from "database";

interface PanelsManagerConfiguration {
    onAddPanel: (panel: ClientPanelData) => void;
    onRemovePanel: (panelId: number) => void;
}

export class PanelsManager extends Manager<ClientPanelData[]> {
    protected override get dataName(): string {
        return "visible Panels";
    }

    constructor({ onAddPanel, onRemovePanel }: PanelsManagerConfiguration) {
        super((oldData, newData) => {
            const newlyVisiblePanels = newData.filter(
                (panel) => !oldData.some((p) => p.id === panel.id),
            );
            const newlyHiddenPanels = oldData.filter(
                (panel) => !newData.some((p) => p.id === panel.id),
            );

            for (const panel of newlyVisiblePanels) onAddPanel(panel);
            for (const panel of newlyHiddenPanels) onRemovePanel(panel.id);
        });

        this.enabled = true;
    }

    protected override isStale = (lastUpdated: Date): boolean => {
        const now = new Date();

        return now.getDate() !== lastUpdated.getDate();
    };

    protected override get emptyData(): ClientPanelData[] {
        return [];
    }

    protected override async getCurrent(): Promise<ClientPanelData[]> {
        const visiblePanels = await db.query.Panels.findMany({
            where: panelShouldBeVisible,
            columns: {
                displayDuration: true,
            },
            with: {
                panelData: true,
            },
        });

        printLoadedDataFromDB("visible Panels");

        return visiblePanels.map(
            ({ panelData, displayDuration }) =>
                ({
                    ...panelData,
                    displayDuration,
                }) as ClientPanelData,
        );
    }
}
