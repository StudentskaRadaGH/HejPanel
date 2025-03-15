import * as schema from "./schema";

import { drizzle } from "drizzle-orm/node-postgres";
import { privateEnv } from "env";

export const db = drizzle(privateEnv.DATABASE_URL, {
	schema,
});
