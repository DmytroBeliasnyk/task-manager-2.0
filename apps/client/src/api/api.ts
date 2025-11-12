import type { List, ListId } from '@shared/types/list';
import type { Task, TaskId } from '@shared/types/task';

type ServerTask = {
  id: string;
  title: string;
  description: string;
  list_id: string;
}

export const api = {
  lists: {
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
    edit: async (id: ListId, title: string, description: string) => {
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
  },
  tasks: {
    add: async (title: string, description: string, listId: ListId) => {
      const res = await fetch('api/add_task', {
        method: 'POST',
        body: JSON.stringify({ title, description, listId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: { id: string } = await res.json();

      return data.id;
    },
    getAll: async () => {
      const res = await fetch('api/tasks');
      const data: { tasks: ServerTask[] } = await res.json();

      return data.tasks.map((serverTask): Task => (
        {
          id: serverTask.id,
          title: serverTask.title,
          description: serverTask.description,
          listId: serverTask.list_id,
        }
      ));
    },
    edit: async (id: TaskId, title: string, description: string) => {
      const res: Response = await fetch('api/update_task', {
        method: 'POST',
        body: JSON.stringify({ id, title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: { updatedTask: ServerTask } = await res.json();
      const serverTask = data.updatedTask;

      return {
        id: serverTask.id,
        title: serverTask.title,
        description: serverTask.description,
        listId: serverTask.list_id,
      };
    },
    delete: async () => {
    },
  }
};