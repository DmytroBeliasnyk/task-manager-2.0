import { type FC, useEffect, useRef } from 'react';
import { FormMode, type FormOptions } from '@utils/formOptions';
import { Button } from '../button/Button';
import { addList, updateList } from '@api/lists';
import type { List } from '@shared/types/list';
import { Task } from '@shared/types/task';
import { addTask } from '@api/tasks';

type ListManagementFormProps = {
  addNewList: (newList: List) => void;
  addNewTask: (newTask: Task, listId: string) => void;
  editList: (id: string, title: string, description: string) => void
  options: FormOptions;
  closeModal: () => void;
};

export const ListManagementForm: FC<ListManagementFormProps> = ({
                                                                  addNewList,
                                                                  addNewTask,
                                                                  editList,
                                                                  options,
                                                                  closeModal,
                                                                }) => {
  const inputTitle = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    inputTitle.current.focus();
  }, []);

  let inputTitleValue = '';
  let inputDescriptionValue = '';
  if (options.mode === FormMode.EditList || options.mode === FormMode.EditTask) {
    inputTitleValue = options.item.title;
    inputDescriptionValue = options.item.description;
  }

  function formAction(formData: FormData): void {
    const title: string = String(formData.get('title'));
    const description: string = String(formData.get('description'));

    switch (options.mode) {
      case FormMode.AddList :
        addList(title, description).then(id => {
          addNewList({ id, title, description, tasks: [] });
        });
        break;
      case FormMode.AddTask :
        addTask(title, description, options.listId).then(id => {
          addNewTask({ id, title, description }, options.listId);
        });
        break;
      case FormMode.EditList :
        updateList(options.item.id, title, description).then(() => {
          editList(options.item.id, title, description);
        });
        break;
      case FormMode.EditTask :
        console.log(FormMode.EditTask);
        break;
      default:
        console.log('ERROR');
    }

    closeModal();
  }

  return (
    <div className="flex justify-center items-center size-full bg-gray-500/50 absolute inset-0 z-1">
      <div className="flex flex-col w-1/3 gap-2 p-4 bg-primary-bg rounded-md">
        <h2 className="pb-2 border-b border-text-secondary text-xl font-semibold text-text-primary">
          {options.mode}
        </h2>
        <form action={formAction} className="flex flex-col gap-2">
          <label className="rounded-md bg-secondary-bg py-1 px-2 text-gray-400">
            <input
              className="placeholder:text-gray-400 placeholder:italic focus:outline-none text-text-secondary cursor-pointer"
              type={'text'}
              name={'title'}
              ref={inputTitle}
              placeholder={'Title'}
              defaultValue={inputTitleValue}
            />
          </label>
          <label className="h-18 rounded-md bg-secondary-bg py-1 px-2 text-gray-400">
            <textarea
              className="placeholder:text-gray-400 placeholder:italic resize-none focus:outline-none text-text-secondary cursor-pointer"
              name={'description'}
              placeholder={'Description'}
              defaultValue={inputDescriptionValue}
            ></textarea>
          </label>
          <div className="flex justify-end gap-4 mt-2">
            <Button type={'submit'}>Submit</Button>
            <Button type={'reset'} onClick={closeModal}>Close</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
