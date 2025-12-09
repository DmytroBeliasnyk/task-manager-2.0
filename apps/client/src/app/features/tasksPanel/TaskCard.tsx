import type { Task } from '@shared/types/task';
import {
  ItemsManagementFormMode,
  type ItemsManagementFormOptions,
} from '../forms/itemsManagement/itemsManagementFormOptions';
import { FaTrash } from 'react-icons/fa';
import { memo } from 'react';

type TaskCardProps = {
  task: Task;
  openForm: (options: ItemsManagementFormOptions) => void;
}

export const TaskCard = memo(({ task, openForm }: TaskCardProps) => {
  return (
    <>
      <div
        className="group flex justify-between items-center p-2 bg-gray-300 rounded-md cursor-pointer hover:border hover:border-gray-400"
        onClick={() => openForm({
          mode: ItemsManagementFormMode.EditTask,
          item: task,
        })}
      >
        <section className="flex flex-col">
          <h3 className="text-text-primary text-base font-semibold">{task.title}</h3>
          <p className="text-text-secondary text-sm font-medium">{task.description}</p>
        </section>
        <FaTrash
          className="cursor-pointer text-transparent group-hover:text-text-secondary hover:text-text-primary transition-colors duration-300"
          onClick={e => {
            e.stopPropagation();
            openForm({
              mode: ItemsManagementFormMode.DeleteTask,
              item: task,
            });
          }}
        />
      </div>
    </>
  );
});