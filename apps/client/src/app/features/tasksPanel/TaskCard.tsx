import type { Task } from '@shared/types/task';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { FaTrash } from 'react-icons/fa';
import { Button } from '@ui/button/Button';
import { memo } from 'react';
import { useOpenForm } from '@hooks/useOpenForm';

export const TaskCard = memo(({ task }: { task: Task }) => {
  const openForm = useOpenForm();

  return (
    <>
      <div
        className="group bg-highlite-bg flex cursor-pointer items-center justify-between rounded-md p-2 hover:shadow-sm"
        onClick={() =>
          openForm({
            mode: ItemsManagementFormMode.EditTask,
            item: task,
          })
        }
      >
        <div className="flex flex-col">
          <h3 className="text-primary-text font-semibold">{task.title}</h3>
          <span className="text-secondary-text text-sm">{task.description}</span>
        </div>
        <Button
          size="icon"
          intent="ghost"
          className="group-hover:text-secondary-text hover:text-primary-text size-fit cursor-pointer bg-transparent text-transparent transition-colors hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            openForm({
              mode: ItemsManagementFormMode.DeleteTask,
              item: task,
            });
          }}
        >
          <FaTrash />
        </Button>
      </div>
    </>
  );
});
