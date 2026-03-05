import type { Task } from '@shared/types/task';
import { memo } from 'react';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { TaskCard } from './TaskCard';
import { Button } from '@ui/button/Button';
import { useOpenForm } from '@hooks/useOpenForm';
import { TASK_PANEL_TEXT } from '@utils/constants';
import { useTasks } from './hooks/useTasks';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { TasksPanelHeader } from './TasksPanelHeader';
import { LuCirclePlus } from 'react-icons/lu';
import type { List } from '@shared/types/list';

export const TasksPanel = memo(({ selectedList }: { selectedList: List }) => {
  const openForm = useOpenForm();
  const tasks = useTasks(selectedList.id);

  return (
    <>
      <div className="bg-secondary-bg flex flex-1 flex-col justify-between gap-2 rounded-md p-4">
        <TasksPanelHeader selectedList={selectedList} />
        <ScrollableList
          items={tasks}
          renderItem={(task: Task) => <TaskCard key={task.id} task={task} />}
          emptyState={TASK_PANEL_TEXT.NO_TASKS}
        />
        <Button
          className="flex w-fit gap-2 self-end"
          onClick={() =>
            openForm({ mode: ItemsManagementFormMode.AddTask, listId: selectedList.id })
          }
        >
          <LuCirclePlus />
          Add task
        </Button>
      </div>
    </>
  );
});
