import { ListId } from '@shared/types/list';
import { nanoid } from 'nanoid';
import { deleteListFromDB, getListsFromDB, saveListInDB, saveUpdatedList } from '../repo/list';

export async function saveList(title: string, description: string) {
  const id = nanoid();
  await saveListInDB(id, title, description);

  return id;
}

export async function getLists() {
  return await getListsFromDB();
}

export async function updateList(id: ListId, title: string, description: string) {
  await saveUpdatedList(id, title, description);
}

export async function deleteList(id: ListId) {
  await deleteListFromDB(id);
}