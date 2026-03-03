import type { Task } from '@shared/types/task';
import { memo } from 'react';
import { useAppSelector } from '@store/redux';
import { listSelectors } from '@store/slices/listSlice';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { TaskCard } from './TaskCard';
import { Button } from '@ui/button/Button';
import { useOpenForm } from '@hooks/useOpenForm';
import { TASK_PANEL_TEXT } from '@utils/constants';
import { useTasks } from './hooks/useTasks';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { TasksPanelHeader } from './TasksPanelHeader';
import { LuCirclePlus } from 'react-icons/lu';
import clsx from 'clsx/lite';

export const TasksPanel = memo(() => {
  const selectedList = useAppSelector(listSelectors.selectSelectedList);
  const openForm = useOpenForm();
  const tasks = useTasks(selectedList?.id);

  return (
    <>
      <section
        className={clsx(
          'bg-secondary-bg flex flex-1 flex-col rounded-md p-4',
          selectedList ? 'justify-between gap-2' : 'items-center justify-center text-center',
        )}
      >
        {selectedList ? (
          <>
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
          </>
        ) : (
          <span className="text-muted-text inline-block w-3/4 text-4xl">
            {TASK_PANEL_TEXT.NO_LIST_SELECTED}
          </span>
        )}
      </section>
    </>
  );
});
