import type { TaskId } from './task.js';

export type ListId = string

export type List = {
  id: ListId;
  title: string;
  description: string;
  tasksIds: TaskId[];
};
