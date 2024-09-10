import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./../schema";
import fs from "node:fs";
console.log(process.env.DB_URL);

export const pool = new pg.Pool({
  connectionString:
    "postgresql://postgres:1xmKjd0lXRm5UjbE@jovially-preferable-darter.data-1.use1.tembo.io:5432/bountywise?sslmode=verify-full&sslrootcert=ca.crt",
  ssl: {
    ca: fs.readFileSync("./ca.crt").toString(),
  },
});

const db = drizzle(pool, { schema: schema });
export default db;
