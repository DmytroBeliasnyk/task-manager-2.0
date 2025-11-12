import type { ListId } from './list.js';

export type TaskId = string

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  listId: ListId;
};
