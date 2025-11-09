import { Task } from '@shared/types/task';
import { db } from '../db/db';
import NonExistentIDError from '../utils/errors/NonExistentIDError';

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

export async function getTasksFromDB(): Promise<Task[]> {
  try{
    const res = await db.query<Task>('SELECT * from tasks')
    return res.rows
  }catch(err){
    console.log(err);
    throw new Error('DB error while fetching lists');
  }
}

export async function saveUpdatedTask(id: string, title: string, description: string): Promise<Task> {
  const client = await db.connect();
  const query = `
      UPDATE tasks
      SET title=$1,
          description=$2
      WHERE id = $3
      RETURNING *`;

  try {
    await client.query('BEGIN');

    const res = await client.query<Task>(query, [title, description, id]);
    if (!res.rowCount) {
      throw new NonExistentIDError('Error update task: non-existent id');
    }

    await client.query('COMMIT');
    return res.rows[0];
  } catch (err) {
    console.error(err);
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}