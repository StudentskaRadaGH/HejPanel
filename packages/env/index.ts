import { config } from "dotenv";
import { z } from "zod";

config({ path: "../../.env" });

const publicEnvSchema = z.object({
	ADMIN_URL: z.string(),
	CLIENT_URL: z.string(),
	WS_URL: z.string(),
});

export const publicEnv = publicEnvSchema.parse(process.env);

export const privateEnv = publicEnvSchema
	.extend({
		WS_PORT: z.coerce.number(),
		SERVER_PORT: z.coerce.number(),
		DATABASE_URL: z.string(),
	})
	.parse(process.env);
