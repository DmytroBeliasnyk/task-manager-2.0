import { db } from '../db/db';

export async function saveTaskInDB(taskId: string,
                                   title: string,
                                   description: string,
                                   listId: string): Promise<void> {
  const client = await db.connect();

  const query: string = `
      INSERT INTO tasks (id, title, description, list_id)
      values ($1, $2, $3, $4)`;

  try {
    await client.query('BEGIN');
    await client.query(query, [taskId, title, description, listId]);
    await client.query('COMMIT');
  } catch (err) {
    console.error('Error saving task: ', err);
    await client.query('ROLLBACK');
    throw new Error('DB error while saving task');
  } finally {
    client.release();
  }
}