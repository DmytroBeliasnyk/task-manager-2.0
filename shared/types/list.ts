import type { Task } from './task';

export type List = {
  id: string;
  title: string;
  description: string;
  tasks: Array<Task>;
};
