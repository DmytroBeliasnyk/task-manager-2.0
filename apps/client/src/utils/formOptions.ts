import type { List } from '@shared/types/list.ts';
import type { Task } from '@shared/types/task.ts';

export enum FormMode {
  AddList = 'Create new list',
  AddTask = 'Add task',
  EditList = 'Edit list',
  EditTask = 'Edit task',
}

export type FormOptions = {
  mode: FormMode;
  item: List | Task | null;
  listId?: string;
};
