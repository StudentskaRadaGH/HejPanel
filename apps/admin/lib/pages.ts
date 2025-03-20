import { Either } from "./types";
import { LucideIcon } from "lucide-react";
import { UserTypes } from "types";

export type PageInfo = {
    path: string;
    extendable?: true;
    file: string;
} & Either<
    {},
    {
        showInSidebar: true;
        name: string;
        icon: LucideIcon;
    }
>;

export const getPages = ({
    type,
}: {
    type: (typeof UserTypes)[number];
}): PageInfo[] => {
    const pages: PageInfo[] = [];

    pages.push({
        path: "/",
        file: "/",
    });

    pages.push({
        path: "/settings",
        file: "/shared/settings",
    });

    return pages;
};
