// TODO: implement error handling

import { Task } from '@shared/types/task';

export async function addTask(title: string, description: string, listId: string): Promise<string> {
  const res: Response = await fetch('api/add_task', {
    method: 'POST',
    body: JSON.stringify({ title, description, listId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: { id: string } = await res.json();

  return data.id;
}

export async function updateTask(id: string, title: string, description: string): Promise<Task> {
  const res: Response = await fetch('api/update_task', {
    method: 'POST',
    body: JSON.stringify({ id, title, description }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: {updatedTask: Task} = await res.json()

  return data.updatedTask
}