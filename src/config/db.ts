import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const pool = new Pool({
    connectionString: 'postgresql://postgres:Varg%232024%2A@localhost:5432/DBDoc',
    
})

export default pool;