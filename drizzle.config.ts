import { defineConfig } from 'drizzle-kit';
import fs from "node:fs";
export default defineConfig({
  schema: './src/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials:{
    url:'postgresql://postgres:1xmKjd0lXRm5UjbE@jovially-preferable-darter.data-1.use1.tembo.io:5432/bountywise?sslmode=verify-full&sslrootcert=ca.crt',
    // database:"bountywise-dev"
    ssl:{
      ca: fs.readFileSync("./ca.crt").toString(),
    }
  }
});