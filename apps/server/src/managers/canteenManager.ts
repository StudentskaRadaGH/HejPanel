import { printClearedCache, printReadDataFromCache, printWrittenDataToDB } from "../utils/print";

import type { Canteen } from "types";
import { Manager } from "./manager";
import { db, Canteens, lt, eq } from "database";
import fetchCanteens from "../crawlers/fetchCanteens";

export class CanteenManager extends Manager<Canteen> {
	protected override get dataName(): string {
		return "canteen";
	}

	public constructor(onUpdateCallback: (canteen: Canteen) => void) {
		super((_oldData, newData) => onUpdateCallback(newData));
	}

	protected override isStale = (lastUpdated: Date): boolean => {
		const now = new Date();

		return lastUpdated.getDate() !== now.getDate();
	};

	protected override get emptyData(): Canteen {
		return {
			snack: null,
			soup: null,
			lunch1: null,
			lunch2: null,
			lunch3: null,
			commonSuffix: null,
		};
	}

	protected override async getCurrent(): Promise<Canteen | null> {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Garbage collection
		await db.delete(Canteens).where(lt(Canteens.date, today)).execute();
		printClearedCache("canteen");

		if (today.getDay() === 0 || today.getDay() === 6) {
			printReadDataFromCache("canteen");
			return null;
		}

		const canteen = await db.query.Canteens.findFirst({
			where: eq(Canteens.date, today),
		});

		if (canteen) {
			printReadDataFromCache("canteen", true);
			return canteen;
		}

		const fetchedCanteens = await fetchCanteens();

		let currentCanteen: Canteen | null = null;
		let newCanteens = 0;

		for (const fetchedCanteen of fetchedCanteens) {
			const existingCanteen = await db.query.Canteens.findFirst({
				where: eq(Canteens.date, fetchedCanteen.date),
			});

			if (!existingCanteen) {
				await db.insert(Canteens).values({
					date: fetchedCanteen.date,
					...fetchedCanteen.canteen,
				});
				newCanteens++;
			}

			if (fetchedCanteen.date === today) currentCanteen = existingCanteen ? existingCanteen : fetchedCanteen.canteen;
		}

		if (!currentCanteen) {
			await db.insert(Canteens).values({
				date: today,
				...this.emptyData,
			});

			newCanteens++;
		}

		printWrittenDataToDB(`canteen × ${newCanteens}`);

		return currentCanteen;
	}
}
