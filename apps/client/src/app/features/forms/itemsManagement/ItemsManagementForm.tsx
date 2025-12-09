import { ItemsManagementFormMode } from './itemsManagementFormOptions';
import { useEffect, useRef } from 'react';
import { Button } from '@ui/Button';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { itemsManagementFormActions, itemsManagementFormSelectors } from './formSlice';
import { addList } from '../../listsPanel/model/addList';
import { editList } from '../../listsPanel/model/editList';
import { addTask } from '../../tasksPanel/model/addTask';
import { editTask } from '../../tasksPanel/model/editTask';

export const ItemsManagementForm = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector(itemsManagementFormSelectors.selectOptions);

  const inputTitle = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputTitle.current?.focus();
  }, []);

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
          dispatch(addList({ title, description }));
          break;
        }
        case ItemsManagementFormMode.EditList: {
          dispatch(editList({ id: options.item.id, title, description }));
          break;
        }
        case ItemsManagementFormMode.AddTask: {
          dispatch(addTask({ title, description, listId: options.listId }));
          break;
        }
        case ItemsManagementFormMode.EditTask: {
          dispatch(editTask({ id: options.item.id, title, description }));
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
          <div className="flex justify-end gap-4 mt-2">
            <Button type={'submit'}>Submit</Button>
            <Button type={'reset'} onClick={closeForm}>
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
