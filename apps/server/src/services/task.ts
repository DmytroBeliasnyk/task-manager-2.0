import { Task } from '@shared/types/task';
import { nanoid } from 'nanoid';
import { getTasksFromDB, saveTaskInDB, saveUpdatedTask } from '../repo/task';

export async function saveTask(title: string, description: string, listId: string): Promise<string> {
  const taskId: string = nanoid();
  await saveTaskInDB(taskId, title, description, listId);

  return taskId;
}

export async function getTasks(): Promise<Task[]> {
  return await getTasksFromDB()
}

export async function updateTask(id: string, title: string, description: string): Promise<Task> {
  return await saveUpdatedTask(id, title, description);
}