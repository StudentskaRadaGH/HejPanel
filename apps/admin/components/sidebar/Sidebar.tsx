"use client";

import {
    Sidebar as ShadCnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";

import { SRGH } from "ui";
import SidebarLinks from "./SidebarLinks";
import SidebarLogo from "./SidebarLogo";
import { SidebarUser } from "@/components/sidebar/SidebarUser";

export function Sidebar({
    ...props
}: React.ComponentProps<typeof ShadCnSidebar>) {
    return (
        <ShadCnSidebar
            collapsible="icon"
            {...props}
            className="bg-secondary/50 select-none"
        >
            <SidebarHeader>
                <SidebarLogo />
            </SidebarHeader>
            <SidebarContent>
                <SidebarLinks />
            </SidebarContent>
            <SidebarFooter>
                <SidebarUser />
                <div className="mt-2 flex items-center justify-center gap-2 opacity-50 md:hidden">
                    Projekt
                    <SRGH variant="outline" />
                    SRGH
                </div>
            </SidebarFooter>
            <SidebarRail />
        </ShadCnSidebar>
    );
}
