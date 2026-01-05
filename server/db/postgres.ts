import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ // Creates a pool of reusable connections
    connectionString: process.env.SUPA_URL, // our Supabase Postgres URI
    ssl: {
        rejectUnauthorized: false, //Supabase requires SSL, Prevents cert rejection errors
    }
})

export default pool;