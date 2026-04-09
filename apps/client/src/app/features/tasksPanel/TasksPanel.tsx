import { ItemsManagementFormMode } from '@features/itemsManagementForm/itemsManagementForm.types';
import { useOpenForm } from '@hooks/useOpenForm';
import type { List } from '@shared/types/list';
import type { Task } from '@shared/types/task';
import { Button } from '@ui/button/Button';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { memo } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { useTasks } from './hooks/useTasks';
import { TaskCard } from './TaskCard';

export const TasksPanel = memo(
  ({ selectedList, viewMode }: { selectedList: List; viewMode: 'list' | 'grid' }) => {
    const openForm = useOpenForm();
    const tasks = useTasks(selectedList.id);

    return (
      <ScrollableList
        viewMode={viewMode}
        items={tasks}
        renderItem={(task: Task) => <TaskCard key={task.id} task={task} />}
        button={
          <Button
            intent="outline"
            className="group flex size-full gap-2"
            onClick={() =>
              openForm({ mode: ItemsManagementFormMode.AddTask, listId: selectedList.id })
            }
          >
            <LuCirclePlus className="group-hover:text-accent transform transition-colors duration-300 group-hover:scale-110" />
            <span className="group-hover:text-accent transition-colors duration-300">Add task</span>
          </Button>
        }
      />
    );
  },
);
