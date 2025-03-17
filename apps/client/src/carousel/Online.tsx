import { usePanels } from "../context";

const Online = () => {
    const panels = usePanels();

    return <pre>{JSON.stringify(panels, null, 4)}</pre>;
};

export default Online;
