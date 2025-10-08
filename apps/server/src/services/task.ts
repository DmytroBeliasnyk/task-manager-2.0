import { nanoid } from 'nanoid';
import { saveTaskInDB } from '../repo/task';

export async function saveTask(title: string, description: string, listId: string): Promise<string> {
  const taskId: string = nanoid();
  await saveTaskInDB(taskId, title, description, listId);

  return taskId;
}