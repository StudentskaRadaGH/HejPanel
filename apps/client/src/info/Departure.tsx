import CarrierIcon from "./CarrierIcon";
import { Departure as DepartureType } from "types";

interface DepartureProps {
    departure: DepartureType;
}

const Departure = ({ departure }: DepartureProps) => {
    return (
        <div className="departure">
            <span className="time">{departure.time}</span>
            <span className="delay">
                {departure.delay && `+${departure.delay}`}
            </span>
            <span className="line">
                <CarrierIcon carrier={departure.carrier} />
                {departure.line}
            </span>
            <span className="destination">{departure.destination}</span>
        </div>
    );
};

export default Departure;
