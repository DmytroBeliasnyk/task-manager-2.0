import { db } from './db';

export async function initDB(): Promise<void> {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    await client.query(`
        CREATE TABLE IF NOT EXISTS lists
        (
            id          TEXT PRIMARY KEY,
            title       TEXT NOT NULL,
            description TEXT
        );`);

    await client.query(`
        CREATE TABLE IF NOT EXISTS tasks
        (
            id          TEXT PRIMARY KEY,
            title       TEXT NOT NULL,
            description TEXT,
            list_id     TEXT REFERENCES lists (id) ON DELETE CASCADE 
        );`);

    await client.query(`
        CREATE TABLE IF NOT EXISTS users
        (
            id          SERIAL PRIMARY KEY,
            email       TEXT UNIQUE NOT NULL,
            password    TEXT NOT NULL
            username    TEXT UNIQUE,
        );`);

    await client.query(`
        CREATE TABLE IF NOT EXISTS tokens
        (
            id          SERIAL PRIMARY KEY,
            user_id     TEXT REFERENCES users (id) ON DELETE CASCADE,
            token       TEXT NOT NULL,
            created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expires_at  TIMESTAMP NOT NULL
        );`);

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}
