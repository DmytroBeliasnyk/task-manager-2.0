import { ListId } from '@shared/types/list';
import { UserId } from '@shared/types/user';
import { nanoid } from 'nanoid';
import {
  deleteListFromDB,
  getListsFromDB,
  saveListInDB,
  saveUpdatedList,
} from '../../repo/api/list';

export async function saveList(title: string, description: string, userId: UserId) {
  const id = nanoid();
  await saveListInDB(id, title, description, userId);

  return id;
}

export async function getLists(userId: UserId) {
  return await getListsFromDB(userId);
}

export async function updateList(id: ListId, title: string, description: string) {
  return await saveUpdatedList(id, title, description);
}

export async function deleteList(id: ListId) {
  await deleteListFromDB(id);
}
