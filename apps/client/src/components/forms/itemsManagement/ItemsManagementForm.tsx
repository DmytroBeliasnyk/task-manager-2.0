import { addList, updateList } from '@api/lists';
import { addTask, updateTask } from '@api/tasks';
import type { Task } from '@shared/types/task';
import { ItemsManagementFormMode } from './formOptions';
import { type FC, useContext, useEffect, useRef } from 'react';
import { Button } from '../../button/Button';
import { ItemsManagementFormContext } from './ItemsManagementFormContextProvider';
import { ListsContext } from '../../App';

export const ItemsManagementForm: FC = () => {
    const {addNewList, addNewTask, editList, editTask} = useContext(ListsContext)
    const {formState, closeForm} = useContext(ItemsManagementFormContext)
    const { options } = formState;

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

    function formAction(formData: FormData): void {
      const title: string = String(formData.get('title'));
      const description: string = String(formData.get('description'));
      try {
        switch (options.mode) {
          case ItemsManagementFormMode.AddList:
            addList(title, description).then((id) => {
              addNewList({ id, title, description, tasks: [] });
            });
            break;
          case ItemsManagementFormMode.AddTask:
            addTask(title, description, options.listId).then((id) => {
              addNewTask({ id, title, description }, options.listId);
            });
            break;
          case ItemsManagementFormMode.EditList:
            updateList(options.item.id, title, description).then(() => {
              editList(options.item.id, title, description);
            });
            break;
          case ItemsManagementFormMode.EditTask:
            updateTask(options.item.id, title, description).then((task: Task) => {
              editTask(task, options.listId);
            });
            break;
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
