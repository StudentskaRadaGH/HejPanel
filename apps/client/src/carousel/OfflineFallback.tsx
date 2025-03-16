import { WifiOff } from "lucide-react";

const OfflineFallback = () => {
    return (
        <div className="nunito-bold flex items-center justify-center gap-6 text-2xl text-red-400">
            <WifiOff className="size-[2em]" />
            Server není dostupný
        </div>
    );
};

export default OfflineFallback;
