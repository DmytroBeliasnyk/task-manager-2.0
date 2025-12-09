import { TaskId } from '@shared/types/task';
import { nanoid } from 'nanoid';
import { deleteTaskFromDB, getTasksFromDB, saveTaskInDB, saveUpdatedTask } from '../repo/task';
import { ListId } from '@shared/types/list';

export async function saveTask(title: string, description: string, listId: ListId) {
  const taskId = nanoid();
  await saveTaskInDB(taskId, title, description, listId);

  return taskId;
}

export async function getTasks() {
  return await getTasksFromDB();
}

export async function updateTask(id: TaskId, title: string, description: string) {
  return await saveUpdatedTask(id, title, description);
}

export async function deleteTask(id: TaskId) {
  await deleteTaskFromDB(id);
}