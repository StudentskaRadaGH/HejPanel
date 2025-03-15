import type { Configuration, Theme } from "types";
import { printLoadedDataFromDB } from "../utils/print";

import { Manager } from "./manager";
import { db, Config } from "database";

type ConfigurationManagerConfiguration = {
	onThemeChange: (theme: Theme) => Promise<void>;
	onTimetableEnabledChange: (enabled: boolean) => Promise<void>;
	onCanteenEnabledChange: (enabled: boolean) => Promise<void>;
	onDeparturesEnabledChange: (enabled: boolean) => Promise<void>;
};

export class ConfigurationManager extends Manager<Configuration> {
	protected override get dataName(): string {
		return "configuration";
	}

	constructor({ onThemeChange, onTimetableEnabledChange, onCanteenEnabledChange, onDeparturesEnabledChange }: ConfigurationManagerConfiguration) {
		super(async (oldData, newData) => {
			const promises: Promise<void>[] = [];

			if (oldData.theme !== newData.theme) promises.push(onThemeChange(newData.theme));
			if (oldData.timetableEnabled !== newData.timetableEnabled) promises.push(onTimetableEnabledChange(newData.timetableEnabled));
			if (oldData.canteenEnabled !== newData.canteenEnabled) promises.push(onCanteenEnabledChange(newData.canteenEnabled));
			if (oldData.departuresEnabled !== newData.departuresEnabled) promises.push(onDeparturesEnabledChange(newData.departuresEnabled));

			await Promise.all(promises);
		});

		this.enabled = true;
	}

	protected override isStale = () => false;

	protected override get emptyData(): Configuration {
		return { theme: "normal", timetableEnabled: false, canteenEnabled: false, departuresEnabled: false };
	}

	protected override async getCurrent(): Promise<Configuration> {
		const configuration = await db.query.Config.findFirst();

		if (!configuration) {
			await db.insert(Config).values(this.emptyData).execute();
		}

		printLoadedDataFromDB("configuration");

		return {
			theme: configuration?.theme ?? this.emptyData.theme,
			timetableEnabled: configuration?.timetableEnabled ?? this.emptyData.timetableEnabled,
			canteenEnabled: configuration?.canteenEnabled ?? this.emptyData.canteenEnabled,
			departuresEnabled: configuration?.departuresEnabled ?? this.emptyData.departuresEnabled,
		};
	}
}
