import { HejPanel, Microsoft } from "ui";

import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { login } from "@/actions/auth";

const LoginPage: NextPage = () => {
    return (
        <>
            <HejPanel className="size-40 rounded-3xl p-3" />
            <h1 className="flex flex-col items-center gap-5">
                <span className="nunito text-3xl font-bold">HejPanel</span>
            </h1>
            <Button
                onClick={login}
                className="nunito text-1xl mt-8"
                variant="outline"
                size="lg"
            >
                <Microsoft className="h-10 w-10 shrink-0" />
                Přihlásit se
            </Button>
        </>
    );
};

export default LoginPage;
