import { SidebarMenu, SidebarMenuItem } from "../ui/sidebar";

import { HejPanel } from "ui";

const SidebarLogo = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <h1 className="nunito flex flex-row items-center justify-center gap-3 overflow-hidden text-3xl data-[state=open]:py-3 md:justify-start md:text-2xl">
                    <HejPanel className="shrink-0 md:size-8" />
                    <div className="shrink-0">HejPanel</div>
                </h1>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default SidebarLogo;
