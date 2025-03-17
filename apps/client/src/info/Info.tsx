import {
    useCanteenEnabled,
    useDeparturesEnabled,
    useOnline,
    useTheme,
} from "../context";

import Canteen from "./Canteen";
import Clock from "./Clock";
import Departures from "./Departures";
import { Gytool } from "ui";

const Info = () => {
    const theme = useTheme();

    const online = useOnline();
    const canteenEnabled = useCanteenEnabled();
    const departuresEnabled = useDeparturesEnabled();

    return (
        <div
            className="flex h-full w-full flex-col items-center gap-4 bg-[var(--infoBackground)] px-5 py-10 text-[var(--infoText)]"
            style={theme.cssVariables}
        >
            <Gytool
                className="size-20"
                variant="outline"
                outlineColor={theme.gytoolOutline}
            />

            <Clock />

            {canteenEnabled && <Canteen />}

            {canteenEnabled && online && departuresEnabled && (
                <span className="h-[4px] w-3/5 rounded-full bg-[var(--separator)]" />
            )}

            {online && departuresEnabled && <Departures />}
        </div>
    );
};

export default Info;
