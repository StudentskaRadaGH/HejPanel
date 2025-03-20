import { defineConfig } from "drizzle-kit";
import { env } from "env";

export default defineConfig({
    out: "./drizzle",
    schema: "./schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: env.DATABASE_URL,
    },
});
