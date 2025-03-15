import { defineConfig } from "drizzle-kit";
import { privateEnv } from "env";

export default defineConfig({
	out: "./drizzle",
	schema: "./schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: privateEnv.DATABASE_URL,
	},
});
