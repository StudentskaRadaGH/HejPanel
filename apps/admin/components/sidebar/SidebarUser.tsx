"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, MoreHorizontal, Settings } from "lucide-react";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import Avatar from "../Avatar";
import Link from "next/link";
import ThemePicker from "../utility/ThemePicker";
import { UserContext } from "../context/auth";
import { getRoleName } from "@/lib/strings";
import { logout } from "@/actions/auth";
import { use } from "react";

export function SidebarUser() {
    const user = use(UserContext);

    const { isMobile, setOpenMobile } = useSidebar();

    return (
        <SidebarMenu className="bg-secondary md:hover:bg-secondary rounded-2xl p-1 transition-colors md:rounded-sm md:bg-transparent md:pl-0">
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-auto md:p-0"
                        >
                            <Avatar user={user} />
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate text-base font-semibold">
                                    {user.name}
                                </span>
                                <span className="truncate text-xs">
                                    {getRoleName(user)}
                                </span>
                            </div>
                            <MoreHorizontal className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="select-none p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar user={user} />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <ThemePicker variant="sidebar" />
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link
                                href="/settings"
                                onClick={() => setOpenMobile(false)}
                            >
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings />
                                    Nastavení
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={logout}
                        >
                            <LogOut />
                            Odhlásit se
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
