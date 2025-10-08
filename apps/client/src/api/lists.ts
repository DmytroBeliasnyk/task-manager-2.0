import type { List } from '@shared/types/list';

// TODO: implement error handling

type ListsResponseType = {
  lists: List[]
}

export async function getAllLists(): Promise<List[]> {
  const res: Response = await fetch('api/lists');
  const data: ListsResponseType = await res.json();

  return data.lists;
}