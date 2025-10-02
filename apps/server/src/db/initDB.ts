import {db} from "./db";

export async function initDB(): Promise<void> {
  const client = await db.connect()
  try {
    await client.query('BEGIN')

    await client.query(`
        CREATE TABLE IF NOT EXISTS lists
        (
            id          TEXT PRIMARY KEY,
            title       TEXT NOT NULL,
            description TEXT
        );`
    )

    await client.query(`
        CREATE TABLE IF NOT EXISTS tasks
        (
            id          TEXT PRIMARY KEY,
            title       TEXT NOT NULL,
            description TEXT,
            list_id     TEXT REFERENCES lists (id)
        );`
    )

    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}