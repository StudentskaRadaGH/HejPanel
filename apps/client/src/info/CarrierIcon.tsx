import { Departure } from "types";

interface CarrierIconProps {
    carrier: Departure["carrier"];
}

const CarrierIcon = ({ carrier }: CarrierIconProps) => {
    return (() => {
        switch (carrier) {
            case "CD":
                return (
                    <img
                        src="carriers/cd.png"
                        alt="CD"
                        className="inline-block h-[1em] rounded-sm"
                    />
                );
            case "DPMO":
                return (
                    <img
                        src="carriers/dpmo.png"
                        alt="DPMO"
                        className="inline-block h-[1em] rounded-sm"
                    />
                );
            case "other":
                return (
                    <img
                        src="carriers/other.png"
                        alt="Other"
                        className="inline-block h-[1em] rounded-sm"
                    />
                );
            default:
                return null;
        }
    })();
};

export default CarrierIcon;
