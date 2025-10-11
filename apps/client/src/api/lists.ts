import type { List } from '@shared/types/list';

// TODO: implement error handling

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

export async function getAllLists(): Promise<List[]> {
  const res: Response = await fetch('api/lists');
  const data: { lists: List[] } = await res.json();

  return data.lists;
}

export async function updateList(id: string, title: string, description: string): Promise<void> {
  await fetch('api/update_list', {
    method: 'POST',
    body: JSON.stringify({ id, title, description }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}