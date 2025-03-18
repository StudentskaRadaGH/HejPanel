import Carousel from "./carousel/Carousel";
import { ClientStateProvider } from "./context";
import Info from "./info/Info";
import useClientState from "./useClientState";

function App() {
    const clientState = useClientState();

    return (
        <main className="grid h-dvh w-dvw grid-cols-[75fr,25fr] overflow-hidden">
            <ClientStateProvider clientState={clientState}>
                <Carousel />
                <Info />
            </ClientStateProvider>
        </main>
    );
}

export default App;
