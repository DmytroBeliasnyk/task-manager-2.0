import type { List, ListId } from '@shared/types/list';
import type { Task, TaskId } from '@shared/types/task';

type ServerList = {
  id: string;
  title: string;
  description: string;
}

type ServerTask = {
  id: string;
  title: string;
  description: string;
  list_id: string;
}

export const api = {
  lists: {
    add: async (title: string, description: string): Promise<List> => {
      const res = await fetch('api/add_list', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: { id: string } = await res.json();

      return {
        id: data.id,
        title: title,
        description: description,
        tasksIds: [],
      };
    },
    getAll: async () => {
      const res = await fetch('api/lists');
      const data: { lists: ServerList[] } = await res.json();

      return data.lists.map((serverList): List => (
        {
          id: serverList.id,
          title: serverList.title,
          description: serverList.description,
          tasksIds: [],
        }
      ));
    },
    edit: async (id: ListId, title: string, description: string): Promise<{
      id: ListId;
      title: string;
      description: string;
    }> => {
      await fetch('api/update_list', {
        method: 'POST',
        body: JSON.stringify({ id, title, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        id: id,
        title: title,
        description: description,
      };
    },
    delete: async (id: ListId) => {
      await fetch('api/list', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return id;
    },
  },
  tasks: {
    add: async (title: string, description: string, listId: ListId): Promise<Task> => {
      const res = await fetch('api/add_task', {
        method: 'POST',
        body: JSON.stringify({ title, description, listId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: { id: string } = await res.json();

      return {
        id: data.id,
        title: title,
        description: description,
        listId: listId,
      };
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
    edit: async (id: TaskId, title: string, description: string): Promise<Task> => {
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
    delete: async (id: TaskId) => {
      await fetch('api/task', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return id;
    },
  },
};