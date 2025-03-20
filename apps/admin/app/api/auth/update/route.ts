import { Users, db, eq } from "database";
import { getSession, removeSession, updateSession } from "@/auth/session-edge";

import { NextResponse } from "next/server";
import { User } from "types";
import { env } from "env";
import { revalidatePath } from "next/cache";
import { validateSession } from "@/auth/session";

export const GET = async () => {
    const sessionUser = await getSession();

    if (!sessionUser) return NextResponse.error();

    const user: User | undefined = await db.query.Users.findFirst({
        where: eq(Users.id, sessionUser.id),
    });

    if (!user) {
        await removeSession();

        revalidatePath("/", "layout");

        return NextResponse.redirect(new URL("/logged-out", env.ADMIN_URL));
    }

    if (!validateSession(user, sessionUser)) await updateSession(user);

    revalidatePath("/", "layout");
    return Response.redirect(new URL("/", env.ADMIN_URL), 303);
};
