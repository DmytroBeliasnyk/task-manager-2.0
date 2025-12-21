import { Task, TaskId } from '@shared/types/task';
import { db } from '../db/db';
import NonExistentIDError from '../utils/errors/NonExistentIDError';
import { ListId } from '@shared/types/list';

export async function saveTaskInDB(
  taskId: TaskId,
  title: string,
  description: string,
  listId: ListId,
) {
  const query = `
      INSERT INTO tasks (id, title, description, list_id)
      values ($1, $2, $3, $4)`;

  try {
    await db.query(query, [taskId, title, description, listId]);
  } catch (err) {
    console.error('DB error while saving task: ', err);
    throw err;
  }
}

export async function getTasksFromDB(listId: ListId) {
  try {
    const res = await db.query<Task>('SELECT * FROM tasks WHERE list_id=$1', [listId]);
    return res.rows;
  } catch (err) {
    console.error('DB error while fetching tasks: ', err);
    throw err;
  }
}

export async function saveUpdatedTask(id: TaskId, title: string, description: string) {
  const query = `
      UPDATE tasks  
      SET title=$1,
          description=$2
      WHERE id = $3
      RETURNING *`;

  try {
    const res = await db.query<Task>(query, [title, description, id]);
    if (!res.rowCount) {
      throw new NonExistentIDError(`Error update task: non-existent id: ${id}`);
    }

    return res.rows[0];
  } catch (err) {
    console.error('DB error while updating task: ', err);
    throw err;
  }
}

export async function deleteTaskFromDB(id: TaskId) {
  try {
    await db.query('DELETE FROM tasks WHERE id = $1', [id]);
  } catch (err) {
    console.error('DB error while deleting task: ', err);
    throw err;
  }
}
