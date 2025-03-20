"use client";

import Avatar from "../Avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ChevronsUp } from "lucide-react";
import { SRGH } from "ui";
import { UserContext } from "../context/auth";
import { use } from "react";
import { useSidebar } from "../ui/sidebar";

const SidebarPhoneToggle = () => {
    const user = use(UserContext);

    const { toggleSidebar } = useSidebar();

    return (
        <Card className="grid grid-cols-[auto,1fr,auto] items-center gap-2 rounded-b-none p-2 text-2xl md:hidden">
            <SRGH className="size-10" />
            <Button
                size="icon"
                variant="ghost"
                className="size-full hover:bg-transparent [&_svg]:size-7"
                onClick={toggleSidebar}
            >
                <ChevronsUp />
            </Button>
            <Avatar user={user} className="size-10" />
        </Card>
    );
};

export default SidebarPhoneToggle;
