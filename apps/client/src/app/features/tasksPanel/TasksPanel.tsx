import type { Task } from '@shared/types/task';
import { memo } from 'react';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { TaskCard } from './TaskCard';
import { Button } from '@ui/button/Button';
import { useOpenForm } from '@hooks/useOpenForm';
import { useTasks } from './hooks/useTasks';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { LuCirclePlus } from 'react-icons/lu';
import type { List } from '@shared/types/list';
import { TiArrowBack } from 'react-icons/ti';
import { useAppDispatch } from '@store/redux';
import { listActions } from '@store/slices/listSlice';
import { useItemsViewMode } from '@hooks/useItemsViewMode';
import { PanelLayout } from '@ui/panelLayout/PanelLayout';

export const TasksPanel = memo(({ selectedList }: { selectedList: List }) => {
  const { viewMode, setViewMode } = useItemsViewMode('tasks');
  const openForm = useOpenForm();
  const tasks = useTasks(selectedList.id);
  const dispatch = useAppDispatch();

  return (
    <PanelLayout
      title={selectedList.title}
      setViewMode={setViewMode}
      buttonBack={
        <Button
          size="icon"
          intent="ghost"
          className="size-fit transition-colors duration-300"
          onClick={() => dispatch(listActions.removeSelectedList())}
        >
          <TiArrowBack />
        </Button>
      }
    >
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
    </PanelLayout>
  );
});
