import "server-only";

import { Users, db, eq } from "database";
import { getSession, removeSession, updateSession } from "./session-edge";

import { Session } from "@/lib/types";
import { User } from "types";
import { cache } from "react";
import { redirect } from "next/navigation";
import { rethrowRedirect } from "@/lib/utils";

export const session: () => Promise<User> = cache(async () => {
    const session = await getSession();

    if (!session) throw Error("You are not logged in");

    const user: User | undefined = await db.query.Users.findFirst({
        where: eq(Users.id, session.id),
    });

    if (!user)
        try {
            await removeSession();

            redirect("/logged-out");
        } catch (e) {
            rethrowRedirect(e);

            redirect("/api/auth/update");
        }

    if (!validateSession(user, session))
        try {
            await updateSession(user);
        } catch {
            redirect("/api/auth/update");
        }

    return user;
});

export const validateSession = (user: User, sessionUser: Session): boolean =>
    user.id === sessionUser.id && user.type === sessionUser.type;

type ValidateUserOptions = {
    notSuspended?: boolean;
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
};

export const validateUser = (
    user: User,
    { notSuspended, isAdmin, isSuperAdmin }: ValidateUserOptions,
): boolean => {
    if (notSuspended && user.type === "suspended") return false;
    if (isAdmin && !(user.type === "admin" || user.type === "super-admin"))
        return false;
    if (isSuperAdmin && user.type !== "super-admin") return false;

    return true;
};
