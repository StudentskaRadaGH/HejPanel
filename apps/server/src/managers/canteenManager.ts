import {
    printClearedCache,
    printReadDataFromCache,
    printWrittenDataToDB,
} from "../utils/print";

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

        const todayDate = CanteenManager.getDateKey(today);

        // Garbage collection
        await db.delete(Canteens).where(lt(Canteens.date, todayDate)).execute();
        printClearedCache("canteen");

        if (new Date().getDay() === 0 || new Date().getDay() === 6) {
            printReadDataFromCache("canteen");
            return null;
        }

        const canteen = await db.query.Canteens.findFirst({
            where: eq(Canteens.date, todayDate),
        });

        if (canteen) {
            printReadDataFromCache("canteen", true);
            return canteen;
        }

        const fetchedCanteens = await fetchCanteens();

        let newCanteens =
            (
                await db
                    .insert(Canteens)
                    .values(
                        fetchedCanteens.map(({ date, canteen }) => ({
                            date,
                            ...canteen,
                        })),
                    )
                    .onConflictDoNothing()
                    .execute()
            ).rowCount ?? 0;

        let currentCanteen: Canteen | null = null;

        for (const canteen of fetchedCanteens)
            if (canteen.date === todayDate) {
                currentCanteen = canteen.canteen;
                break;
            }

        if (!currentCanteen) {
            await db.insert(Canteens).values({
                date: todayDate,
                ...this.emptyData,
            });

            currentCanteen = this.emptyData;

            newCanteens++;
        }

        printWrittenDataToDB(`canteen × ${newCanteens}`);

        return currentCanteen;
    }

    public static getDateKey = (date: Date): number =>
        date.getFullYear() * 10_000 +
        (date.getMonth() + 1) * 100 +
        date.getDate();
}
