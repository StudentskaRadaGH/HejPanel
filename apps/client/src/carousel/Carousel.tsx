import OfflineFallback from "./OfflineFallback";
import Online from "./Online";
import { useOnline } from "../context";

const Carousel = () => {
    const online = useOnline();

    return (
        <div className="flex h-full w-full items-center justify-center bg-zinc-900">
            {online ? <Online /> : <OfflineFallback />}
        </div>
    );
};

export default Carousel;
