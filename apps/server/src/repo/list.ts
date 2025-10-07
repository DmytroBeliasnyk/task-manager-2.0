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
    const res = await db.query<List>(`
        SELECT l.id,
               l.title,
               l.description,
               COALESCE(
                       json_agg(
                               json_build_object(
                                       'id', t.id,
                                       'title', t.title,
                                       'description', t.description
                               )
                       ) FILTER(WHERE t.id IS NOT NULL),
                       '[]'
               ) AS tasks
        FROM lists l
                 LEFT JOIN tasks t ON t.list_id = l.id
        GROUP BY l.id, l.title, l.description
        ORDER BY l.title;
    `);

    return res.rows;
  } catch (err) {
    console.log(err);
    throw new Error('DB error while fetching lists');
  }
}
