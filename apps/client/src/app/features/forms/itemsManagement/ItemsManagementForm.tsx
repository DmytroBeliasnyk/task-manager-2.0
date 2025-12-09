import { ItemsManagementFormMode } from './itemsManagementFormOptions';
import { useEffect, useRef } from 'react';
import { Button } from '@ui/Button';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { itemsManagementFormActions, itemsManagementFormSelectors } from './formSlice';
import { useAddListMutation, useEditListMutation, useDeleteListMutation } from '@api/lists/api';
import { useAddTaskMutation, useEditTaskMutation, useDeleteTaskMutation } from '@api/tasks/api';
import { listActions } from '../../listsPanel/listSlice';

export const ItemsManagementForm = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector(itemsManagementFormSelectors.selectOptions);

  const [addList] = useAddListMutation();
  const [editList] = useEditListMutation();
  const [deleteList] = useDeleteListMutation();
  const [addTask] = useAddTaskMutation();
  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const inputTitle = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputTitle.current?.focus();
  }, []);

  const isDeleteForm =
    options.mode === ItemsManagementFormMode.DeleteList ||
    options.mode === ItemsManagementFormMode.DeleteTask;

  let inputTitleValue = '';
  let inputDescriptionValue = '';
  if (
    options.mode === ItemsManagementFormMode.EditList ||
    options.mode === ItemsManagementFormMode.EditTask
  ) {
    inputTitleValue = options.item.title;
    inputDescriptionValue = options.item.description;
  }

  function closeForm() {
    dispatch(itemsManagementFormActions.closeForm());
  }

  function formAction(formData: FormData): void {
    const title = String(formData.get('title'));
    const description = String(formData.get('description'));

    try {
      switch (options.mode) {
        case ItemsManagementFormMode.AddList: {
          addList({ title, description });
          break;
        }
        case ItemsManagementFormMode.EditList: {
          editList({ id: options.item.id, title, description });
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
          deleteTask({id: options.item.id, listId: options.item.listId  });
          break;
        }
        default:
          console.log('Unknown form mode');
      }
    } finally {
      closeForm();
    }
  }

  return (
    <div className="flex justify-center items-center size-full bg-gray-500/50 absolute inset-0 z-10">
      <div className="flex flex-col w-1/3 gap-2 p-4 bg-primary-bg rounded-md">
        <h2 className="pb-2 border-b border-text-secondary text-xl font-semibold text-text-primary">
          {options.mode}
        </h2>
        <form action={formAction} className="flex flex-col gap-2">
          {!isDeleteForm && (
            <>
              <label className="rounded-md bg-secondary-bg py-1 px-2 text-gray-400">
                <input
                  className="placeholder:text-gray-400 placeholder:italic focus:outline-none text-text-secondary cursor-text"
                  type={'text'}
                  name={'title'}
                  ref={inputTitle}
                  placeholder={'Title'}
                  defaultValue={inputTitleValue}
                  required
                />
              </label>
              <label className="h-18 rounded-md bg-secondary-bg py-1 px-2 text-gray-400">
            <textarea
              className="placeholder:text-gray-400 placeholder:italic resize-none focus:outline-none text-text-secondary cursor-text"
              name={'description'}
              placeholder={'Description'}
              defaultValue={inputDescriptionValue}
            ></textarea>
              </label>
            </>
          )}
          <div className="flex justify-end gap-4 mt-2">
            <Button type={'submit'}>Submit</Button>
            <Button type={'reset'} onClick={closeForm}>
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
    ;
};
