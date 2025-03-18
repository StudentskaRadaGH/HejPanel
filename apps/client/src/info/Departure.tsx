import CarrierIcon from "./CarrierIcon";
import { Departure as DepartureType } from "types";

interface DepartureProps {
    departure: DepartureType;
}

const Departure = ({ departure }: DepartureProps) => {
    return (
        <>
            <div className="nunito-bold text-right">{departure.time}</div>
            <div className="nunito-bold text-[0.6em]">
                {departure.delay && `+${departure.delay}`}
            </div>
            <div className="flex items-center gap-1">
                <CarrierIcon carrier={departure.carrier} />
                {departure.line}
            </div>
            <div className="">{departure.destination}</div>
        </>
    );
};

export default Departure;
