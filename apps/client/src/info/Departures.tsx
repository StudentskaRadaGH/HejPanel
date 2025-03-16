import DepartureRow from "./Departure";
import { useDepartures } from "../context";

const Departures = () => {
    const departures = useDepartures();

    return (
        <div className="departures-container">
            <div className="departures">
                <h2>Ladova:</h2>
                {departures.ladova.map((departure) => (
                    <DepartureRow
                        key={
                            departure.line +
                            departure.carrier +
                            departure.destination.substring(-5)
                        }
                        departure={departure}
                    />
                ))}
            </div>
            <div className="departures">
                <h2>Na Trati:</h2>
                {departures.natrati.map((departure) => (
                    <DepartureRow
                        key={
                            departure.line +
                            departure.carrier +
                            departure.destination.substring(-5)
                        }
                        departure={departure}
                    />
                ))}
            </div>
            <div className="departures">
                <h2>Vlak:</h2>
                {departures.vlak.map((departure) => (
                    <DepartureRow
                        key={
                            departure.line +
                            departure.carrier +
                            departure.destination.substring(-5)
                        }
                        departure={departure}
                    />
                ))}
            </div>
        </div>
    );
};

export default Departures;
