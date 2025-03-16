import { Departure } from "types";

interface CarrierIconProps {
    carrier: Departure["carrier"];
}

const CarrierIcon = ({ carrier }: CarrierIconProps) => {
    return (() => {
        switch (carrier) {
            case "CD":
                return <img src="carriers/cd.png" alt="CD" />;
            case "DPMO":
                return <img src="carriers/dpmo.png" alt="DPMO" />;
            case "other":
                return <img src="carriers/other.png" alt="Other" />;
            default:
                return null;
        }
    })();
};

export default CarrierIcon;
