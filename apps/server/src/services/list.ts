import { List } from '@shared/types/list';
import { nanoid } from 'nanoid';
import { getListsFromDB, saveListInDB, saveUpdatedList } from '../repo/list';

export async function saveList(title: string, description: string): Promise<string> {
  const id: string = nanoid();
  await saveListInDB(id, title, description);

  return id;
}

export async function getLists(): Promise<List[]> {
  return await getListsFromDB();
}

export async function updateList(id: string, title: string, description: string): Promise<void> {
  await saveUpdatedList(id, title, description);
}