import { useCallback, useEffect, useState } from "react";

import { useTimetableEnabled } from "../context";

const TIMETABLE_SCHEDULE = [
    { text: "1. hodina | 8:00 - 8:45", from_milTime: 800, to_milTime: 845 },
    { text: "Přestávka | 8:45 - 8:55", from_milTime: 845, to_milTime: 855 },
    { text: "2. hodina | 8:55 - 9:40", from_milTime: 855, to_milTime: 940 },
    { text: "Přestávka | 9:40 - 10:00", from_milTime: 940, to_milTime: 1000 },
    { text: "3. hodina | 10:00 - 10:45", from_milTime: 1000, to_milTime: 1045 },
    { text: "Přestávka | 10:45 - 10:55", from_milTime: 1045, to_milTime: 1055 },
    { text: "4. hodina | 10:55 - 11:40", from_milTime: 1055, to_milTime: 1140 },
    { text: "Přestávka | 11:40 - 11:50", from_milTime: 1140, to_milTime: 1150 },
    { text: "5. hodina | 11:50 - 12:35", from_milTime: 1150, to_milTime: 1235 },
    { text: "Přestávka | 12:35 - 12:45", from_milTime: 1235, to_milTime: 1245 },
    { text: "6. hodina | 12:45 - 13:30", from_milTime: 1245, to_milTime: 1330 },
    { text: "Přestávka | 13:30 - 14:00", from_milTime: 1330, to_milTime: 1400 },
    { text: "7. hodina | 14:00 - 14:45", from_milTime: 1400, to_milTime: 1445 },
    { text: "Přestávka | 14:45 - 14:55", from_milTime: 1445, to_milTime: 1455 },
    { text: "8. hodina | 14:55 - 15:40", from_milTime: 1455, to_milTime: 1540 },
];

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString("cs-CZ"));
    const [currentPeriod, setCurrentPeriod] = useState<string | null>();
    const timetableEnabled = useTimetableEnabled() || true;

    const updateCurrentTimetable = useCallback(() => {
        const now = new Date();

        if (now.getDay() === 0 || now.getDay() === 6) {
            setCurrentPeriod(null);
            return;
        }

        const milTime = now.getHours() * 100 + now.getMinutes();

        const period = TIMETABLE_SCHEDULE.find(
            (period) =>
                milTime >= period.from_milTime && milTime < period.to_milTime,
        );

        setCurrentPeriod(period?.text || null);
    }, []);

    useEffect(() => {
        updateCurrentTimetable();

        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString("cs-CZ"));

            if (now.getSeconds() === 0) updateCurrentTimetable();
        }, 1000);

        return () => clearInterval(timer);
    }, [updateCurrentTimetable]);

    return (
        <div className="flex flex-col items-center text-[var(--clockText)]">
            <div className="nunito-bold text-7xl">{time}</div>

            {timetableEnabled && currentPeriod && (
                <div className="text-lg">{currentPeriod}</div>
            )}
        </div>
    );
};

export default Clock;
