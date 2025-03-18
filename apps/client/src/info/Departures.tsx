import { Departure } from "types";
import DepartureRow from "./Departure";
import { useDepartures } from "../context";

interface DeparturesFromStopProps {
    name: string;
    departures: Departure[];
}

const DeparturesFromStop = ({ name, departures }: DeparturesFromStopProps) => {
    return (
        <div className="grid w-full grid-cols-[auto,auto,auto,1fr] items-center gap-x-2 gap-y-1">
            <div className="nunito-bold col-span-4 text-lg">{name}:</div>
            {departures.map((departure) => (
                <DepartureRow
                    key={
                        departure.time +
                        "-" +
                        departure.line +
                        "-" +
                        departure.destination.substring(0, 5)
                    }
                    departure={departure}
                />
            ))}
        </div>
    );
};

const Departures = () => {
    const departures = useDepartures();

    return (
        <>
            <DeparturesFromStop name="Ladova" departures={departures.ladova} />
            <DeparturesFromStop
                name="Na Trati"
                departures={departures.natrati}
            />
            <DeparturesFromStop name="Vlak" departures={departures.vlak} />
        </>
    );
};

export default Departures;
