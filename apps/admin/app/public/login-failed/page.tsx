import { Button } from "@/components/ui/button";
import { Microsoft } from "ui";
import { NextPage } from "next";
import { login } from "@/actions/auth";

const LoginFailedPage: NextPage = async () => {
    return (
        <div className="bg-destructive text-destructive-foreground shadow-destructive flex flex-col items-center gap-5 rounded-lg p-8 shadow-lg">
            <h1 className="nunito text-3xl font-bold">Přihlášení selhalo</h1>
            <h4 className="text-center font-bold">
                V průběhu přihlašování došlo k chybě. Zkuste to prosím znovu.
                <br />
                Pokud problém přetrvává, kontaktujte prosím organizátora akce.
            </h4>
            <Button
                onClick={login}
                className="nunito text-1xl bg-destructive-foreground text-destructive shadow-destructive-foreground hover:bg-destructive-foreground shadow-md"
                size="lg"
            >
                <Microsoft className="h-10 w-10 shrink-0" />
                Přihlásit se znovu
            </Button>
        </div>
    );
};

export default LoginFailedPage;
