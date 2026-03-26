import { listsApi } from '@api/lists/api';
import { tasksApi } from '@api/tasks/api';
import type { List } from '@shared/types/list';
import { useAppSelector } from '@store/redux';
import { ItemsManagementFormMode } from '../itemsManagementForm.types';
import { itemsManagementFormSelectors } from '../slice/formSlice';

export const useFormActions = (closeForm: () => void) => {
  const options = useAppSelector(itemsManagementFormSelectors.selectOptions);

  const [addList] = listsApi.useAddListMutation();
  const [editList] = listsApi.useEditListMutation();
  const [deleteList] = listsApi.useDeleteListMutation();
  const [addTask] = tasksApi.useAddTaskMutation();
  const [editTask] = tasksApi.useEditTaskMutation();
  const [deleteTask] = tasksApi.useDeleteTaskMutation();

  return (formData: FormData): void => {
    const title = String(formData.get('title'));
    const description = String(formData.get('description'));

    try {
      switch (options.mode) {
        case ItemsManagementFormMode.AddList: {
          addList({ title, description });
          break;
        }
        case ItemsManagementFormMode.EditList: {
          const list: List = { id: options.item.id, title, description };
          editList(list);
          break;
        }
        case ItemsManagementFormMode.DeleteList: {
          deleteList(options.item.id);
          break;
        }
        case ItemsManagementFormMode.AddTask: {
          addTask({ title, description, listId: options.listId });
          break;
        }
        case ItemsManagementFormMode.EditTask: {
          editTask({ id: options.item.id, title, description, listId: options.item.listId });
          break;
        }
        case ItemsManagementFormMode.DeleteTask: {
          deleteTask({ id: options.item.id, listId: options.item.listId });
          break;
        }
        default:
          console.error('Unknown form mode');
      }
    } catch (error) {
      console.error('Error in form actions', error);
    } finally {
      closeForm();
    }
  };
};
