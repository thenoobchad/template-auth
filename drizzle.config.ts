import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";
import "dotenv/config";


const DATABASE_URL = process.env.DATABASE_URL ?? ""

export default defineConfig({
	schema: "./src/server/schema.ts",
	out: "./src/server/migrations",
	dialect: "sqlite",
	dbCredentials: {
		url: DATABASE_URL,
	},
} as Config);
