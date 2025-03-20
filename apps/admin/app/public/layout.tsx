import { Button } from "@/components/ui/button";
import { NextLayout } from "@/lib/types";
import { SRGH } from "ui";
import ThemePicker from "@/components/utility/ThemePicker";

const Layout: NextLayout = ({ children }) => {
    return (
        <main className="m-auto flex h-dvh w-4/5 select-none flex-col items-center justify-center gap-5 text-center">
            <div className="transition-background fixed inset-0 -z-10 h-full w-full [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#001C2E)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#001C2E)]" />
            {children}
            <div className="fixed bottom-5 left-5">
                <ThemePicker />
            </div>
            <div className="fixed bottom-5 right-5">
                <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-background flex w-auto cursor-default items-center gap-2 px-2"
                >
                    Projekt
                    <SRGH className="size-12 shrink-0 scale-125" />
                    SRGH
                </Button>
            </div>
        </main>
    );
};

export default Layout;
