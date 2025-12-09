import { useAppDispatch, useAppSelector } from '@store/redux';
import { itemsManagementFormSelectors } from '@store/slices/formSlice';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { listsApi } from '@api/lists/api';
import { tasksApi } from '@api/tasks/api';
import { listActions } from '@store/slices/listSlice';
import type { List } from '@shared/types/list';

export const useFormActions = (closeForm: () => void) => {
  const options = useAppSelector(itemsManagementFormSelectors.selectOptions);
  const dispatch = useAppDispatch();

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
          dispatch(listActions.setSelectedList({ list }));
          break;
        }
        case ItemsManagementFormMode.DeleteList: {
          deleteList(options.item.id);
          dispatch(listActions.removeSelectedList());
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
