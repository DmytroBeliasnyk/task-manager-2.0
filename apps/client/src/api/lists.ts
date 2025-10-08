import type { List } from '@shared/types/list';

// TODO: implement error handling

export async function getAllLists(): Promise<List[]> {
  const res: Response = await fetch('api/lists');
  const data: { lists: List[] } = await res.json();

  return data.lists;
}

export async function addList(title: string, description: string): Promise<string> {
  const res: Response = await fetch('api/add_list', {
    method: 'POST',
    body: JSON.stringify({ title, description }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: { id: string } = await res.json();

  return data.id;
}