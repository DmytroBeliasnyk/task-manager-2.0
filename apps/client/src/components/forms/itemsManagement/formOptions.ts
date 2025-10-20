import type { List } from '@shared/types/list';
import type { Task } from '@shared/types/task';

export enum ItemsManagementFormMode {
  AddList = 'Create new list',
  AddTask = 'Add task',
  EditList = 'Edit list',
  EditTask = 'Edit task',
}

export type ItemsManagementFormOptions =
  | { mode: ItemsManagementFormMode.AddList }
  | { mode: ItemsManagementFormMode.AddTask; listId: string }
  | { mode: ItemsManagementFormMode.EditList; item: List }
  | { mode: ItemsManagementFormMode.EditTask; item: Task; listId: string };
