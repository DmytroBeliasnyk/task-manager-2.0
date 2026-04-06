import { List, ListId } from '@shared/types/list';
import { UserId } from '@shared/types/user';
import { db } from '../../db/db';
import NonExistentIDError from '../../errors/NonExistentIDError';

export async function saveListInDB(id: ListId, title: string, description: string, userId: UserId) {
  const query = `
      INSERT INTO lists (id, title, description, user_id)
      values ($1, $2, $3, $4)`;

  try {
    await db.query(query, [id, title, description, userId]);
  } catch (err) {
    console.error('DB error while saving list: ', err);
    throw err;
  }
}

export async function getListsFromDB(userId: UserId) {
  try {
    const res = await db.query<List>(
      `SELECT id, title, description from lists WHERE user_id = $1`,
      [userId],
    );
    return res.rows;
  } catch (err) {
    console.error('DB error while fetching lists: ', err);
    throw err;
  }
}

export async function saveUpdatedList(id: ListId, title: string, description: string) {
  const query = `
      UPDATE lists
      SET title=$1,
          description=$2
      WHERE id = $3
      RETURNING id, title, description`;

  try {
    const res = await db.query<List>(query, [title, description, id]);
    if (!res.rowCount) {
      throw new NonExistentIDError(`Error update list: non-existent id: ${id}`);
    }

    return res.rows[0];
  } catch (err) {
    console.error('DB error while updating list: ', err);
    throw err;
  }
}

export async function deleteListFromDB(id: ListId) {
  try {
    await db.query('DELETE FROM lists WHERE id = $1', [id]);
  } catch (err) {
    console.error('DB error while deleting list: ', err);
    throw err;
  }
}
