import type { List, ListId } from '@shared/types/list';
import type { Task } from '@shared/types/task';

export enum ItemsManagementFormMode {
  AddList = 'Create new list',
  EditList = 'Edit list',
  DeleteList = 'Delete list',
  AddTask = 'Add task',
  EditTask = 'Edit task',
  DeleteTask = 'Delete task',
  Close = 'close',
}

export type ItemsManagementFormOptions =
  | { mode: ItemsManagementFormMode.AddList }
  | { mode: ItemsManagementFormMode.EditList; item: List }
  | { mode: ItemsManagementFormMode.DeleteList; item: List }
  | { mode: ItemsManagementFormMode.AddTask; listId: ListId }
  | { mode: ItemsManagementFormMode.EditTask; item: Task }
  | { mode: ItemsManagementFormMode.DeleteTask; item: Task }
  | { mode: ItemsManagementFormMode.Close }