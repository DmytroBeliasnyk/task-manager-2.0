import { List, ListId } from '@shared/types/list';
import { db } from '../db/db';
import NonExistentIDError from '../utils/errors/NonExistentIDError';

export async function saveListInDB(id: ListId, title: string, description: string) {
  const query = `
      INSERT INTO lists (id, title, description)
      values ($1, $2, $3)`;

  try {
    await db.query(query, [id, title, description]);
  } catch (err) {
    console.error('DB error while saving list: ', err);
    throw err;
  }
}

export async function getListsFromDB() {
  try {
    const res = await db.query<List>(`SELECT *
                                      from lists`);
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
      RETURNING *`;

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
