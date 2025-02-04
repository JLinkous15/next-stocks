import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);

//logger
//const db = drizzle(sql, { logger: true })

const db = drizzle(sql);

const result = await db.execute("select 1");

export { db };
