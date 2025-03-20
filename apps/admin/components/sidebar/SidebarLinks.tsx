import { PageInfo, getPages } from "@/lib/pages";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "../ui/sidebar";

import Link from "next/link";
import { UserContext } from "../context/auth";
import { use } from "react";

const SidebarLinks = () => {
    const { setOpenMobile } = useSidebar();

    const user = use(UserContext);

    const pages = getPages(user).filter(
        (page) => page.showInSidebar,
    ) as (PageInfo & { showInSidebar: true })[];

    return (
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    {pages.map((page) => (
                        <SidebarMenuItem key={page.path}>
                            <SidebarMenuButton
                                asChild
                                className="hover:bg-accent h-auto transition-colors"
                            >
                                <Link
                                    onClick={() => setOpenMobile(false)}
                                    href={page.path}
                                    className="flex items-center gap-2 text-nowrap text-base [&_svg]:size-4"
                                >
                                    <page.icon />

                                    {page.name}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

export default SidebarLinks;
