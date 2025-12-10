import type { Task } from '@shared/types/task';
import { memo } from 'react';
import { useAppSelector } from '@store/redux';
import { listSelectors } from '@store/slices/listSlice';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { TaskCard } from './TaskCard';
import { useOpenForm } from '@hooks/useOpenForm';
import { TASK_PANEL_TEXT } from '@utils/constants';
import { PanelLayout } from '@ui/panels/PanelLayout';
import { EmptyPanel } from '@ui/panels/EmptyPanel';
import { useTasks } from './hooks/useTasks';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { TasksPanelHeader } from './TasksPanelHeader';

export const TasksPanel = memo(() => {
  const selectedList = useAppSelector(listSelectors.selectSelectedList);
  const openForm = useOpenForm();
  const tasks = useTasks(selectedList?.id);

  return (
    <>
      {selectedList ? (
        <PanelLayout
          buttonText="Add task"
          buttonHandler={() =>
            openForm({ mode: ItemsManagementFormMode.AddTask, listId: selectedList.id })
          }
        >
          <TasksPanelHeader selectedList={selectedList} />
          <ScrollableList
            items={tasks}
            renderItem={(task: Task) => <TaskCard key={task.id} task={task} />}
            emptyState={TASK_PANEL_TEXT.NO_TASKS}
          />
        </PanelLayout>
      ) : (
        <section className="flex flex-col flex-1 bg-secondary-bg rounded-md justify-center items-center text-center">
          <EmptyPanel>{TASK_PANEL_TEXT.NO_LIST_SELECTED}</EmptyPanel>
        </section>
      )}
    </>
  );
});
