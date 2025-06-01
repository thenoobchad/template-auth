import { createClient } from "@libsql/client";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql"

const DATABASE_URL = process.env.DATABASE_URL ?? "";

const client = createClient({ url: DATABASE_URL! });

export const db = drizzle({client})





