import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { NextPage } from "next";
import PageTemplate from "@/components/utility/PageTemplate";
import { session } from "@/auth/session";

const SettingsPage: NextPage = async () => {
    const user = await session();

    return (
        <PageTemplate title="Nastavení">
            <div className="flex flex-col gap-5">
                <Card>
                    <CardHeader>
                        <CardTitle>Informace o účtu</CardTitle>
                        <CardDescription>
                            V případě, že jsou uvedené informace nesprávné,
                            kontaktujte prosím správce HejPanelu.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="inline-grid grid-cols-2 items-center gap-2">
                        <b>Jméno a příjmení:</b> <span>{user.name}</span>
                        <b>Mail:</b> <span>{user.email}</span>
                    </CardContent>
                </Card>
            </div>
        </PageTemplate>
    );
};

export default SettingsPage;
