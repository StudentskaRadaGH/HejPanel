import { and, eq, gte, lte, or } from "drizzle-orm";

import { Panels } from "./schema";

const now = new Date();

export const panelShouldBeVisible = or(
    eq(Panels.visibilityOverride, true),
    and(
        eq(Panels.isApproved, true),
        eq(Panels.visibilityOverride, false),
        lte(Panels.showFrom, now),
        gte(Panels.showTill, now),
    ),
);
