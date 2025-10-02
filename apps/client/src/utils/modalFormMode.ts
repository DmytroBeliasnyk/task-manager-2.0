import type {List} from "@shared/types/list.ts";
import type {Task} from "@shared/types/task.ts";

export enum ModalFormMode {
  AddList = 'Create new list',
  AddTask = 'Add task',
  EditList = 'Edit list',
  EditTask = 'Edit task'
}

export type ListManagementFormMode = {
  formMode: ModalFormMode
  formItem: List | Task | null
  listId?: string
}