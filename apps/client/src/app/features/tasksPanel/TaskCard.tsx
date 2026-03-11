import type { Task } from '@shared/types/task';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { FaTrash } from 'react-icons/fa';
import { Button } from '@ui/button/Button';
import { memo } from 'react';
import { useOpenForm } from '@hooks/useOpenForm';
import { ItemCard } from '@ui/itemCard/ItemCard';

export const TaskCard = memo(({ task }: { task: Task }) => {
  const openForm = useOpenForm();

  return (
    <ItemCard
      title={task.title}
      description={task.description}
      clickHandler={() => openForm({ mode: ItemsManagementFormMode.EditTask, item: task })}
    >
      <Button
        size="icon"
        intent="ghost"
        className="group-hover:text-secondary-text hover:text-primary-text size-fit cursor-pointer bg-transparent text-transparent transition-colors hover:bg-transparent"
        onClick={(e) => {
          e.stopPropagation();
          openForm({ mode: ItemsManagementFormMode.DeleteTask, item: task });
        }}
      >
        <FaTrash />
      </Button>
    </ItemCard>
  );
});
