import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task_manager',
  password: process.env.DB_PASSWORD,
  port: 5432,
});
