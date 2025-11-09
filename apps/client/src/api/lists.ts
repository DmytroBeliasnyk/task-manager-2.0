import type { List } from '@shared/types/list';

export const listsApi = {
  add: async (title: string, description: string) => {
    const res = await fetch('api/add_list', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: { id: string } = await res.json();

    return data.id;
  },
  getAll: async () => {
    const res = await fetch('api/lists');
    const data: { lists: List[] } = await res.json();

    return data.lists;
  },
  update: async (id: string, title: string, description: string) => {
    await fetch('api/update_list', {
      method: 'POST',
      body: JSON.stringify({ id, title, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  delete: async () => {
  },
};