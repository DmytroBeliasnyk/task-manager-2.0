import type { List } from '@shared/types/list.ts';
import type { Task } from '@shared/types/task.ts';

export enum FormMode {
  AddList = 'Create new list',
  AddTask = 'Add task',
  EditList = 'Edit list',
  EditTask = 'Edit task',
}

export type FormOptions =
  | { mode: FormMode.AddList; }
  | { mode: FormMode.AddTask; listId: string; }
  | { mode: FormMode.EditList; item: List; }
  | { mode: FormMode.EditTask; item: Task; listId: string; };
