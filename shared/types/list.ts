import type { TaskId } from './task';

export type ListId = string

export type List = {
  id: ListId;
  title: string;
  description: string;
  tasksIds: TaskId[];
};
