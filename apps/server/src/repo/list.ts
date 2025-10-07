import { List } from '@shared/types/list';
import { db } from '../db/db';

export async function saveListInDB(id: string, title: string, description: string): Promise<void> {
  const client = await db.connect();

  const query: string = `
      INSERT INTO lists (id, title, description)
      values ($1, $2, $3)`;

  try {
    await client.query('BEGIN');
    await client.query(query, [id, title, description]);
    await client.query('COMMIT');
  } catch (err) {
    console.error('Error saving list: ', err);
    await client.query('ROLLBACK');
    throw new Error('DB error while saving list');
  } finally {
    client.release();
  }
}

export async function getListsFromDB(): Promise<List[]> {
  try {
    const res = await db.query<List>('SELECT * FROM lists');
    return res.rows;
  } catch (err) {
    console.log(err);
    throw new Error('DB error while fetching lists');
  }
}
