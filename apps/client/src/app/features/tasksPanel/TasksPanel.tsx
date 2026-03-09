import type { Task } from '@shared/types/task';
import { memo, useState } from 'react';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { TaskCard } from './TaskCard';
import { Button } from '@ui/button/Button';
import { useOpenForm } from '@hooks/useOpenForm';
import { TASK_PANEL_TEXT } from '@utils/constants';
import { useTasks } from './hooks/useTasks';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { LuCirclePlus } from 'react-icons/lu';
import type { List } from '@shared/types/list';
import { TiArrowBack } from 'react-icons/ti';
import { useAppDispatch } from '@store/redux';
import { listActions } from '@store/slices/listSlice';
import { IoGrid, IoList } from 'react-icons/io5';

export const TasksPanel = memo(({ selectedList }: { selectedList: List }) => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const openForm = useOpenForm();
  const tasks = useTasks(selectedList.id);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="bg-secondary-bg flex flex-1 flex-col justify-between gap-2 rounded-md p-4">
        <header className="border-border flex items-center justify-between border-b pb-2 text-2xl font-semibold">
          <div className="flex max-w-3/4 items-center gap-4">
            <Button
              size="icon"
              intent="ghost"
              className="size-fit transition-colors duration-300"
              onClick={() => dispatch(listActions.removeSelectedList())}
            >
              <TiArrowBack />
            </Button>
            <h2 className="line-clamp-1 break-all">{selectedList.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              intent="ghost"
              className="size-fit text-lg transition-colors duration-300"
              onClick={() => setView('grid')}
            >
              <IoGrid />
            </Button>
            <Button
              size="icon"
              intent="ghost"
              className="size-fit text-2xl transition-colors duration-300"
              onClick={() => setView('list')}
            >
              <IoList />
            </Button>
          </div>
        </header>
        <ScrollableList
          view={view}
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
