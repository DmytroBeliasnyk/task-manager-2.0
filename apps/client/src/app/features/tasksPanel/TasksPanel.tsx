import type { Task } from '@shared/types/task';
import clsx from 'clsx/lite';
import { type JSX, memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAppSelector } from '@store/redux';
import { listSelectors } from '@store/slices/listSlice';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { tasksApi } from '@api/tasks/api';
import { TaskCard } from './TaskCard';
import { skipToken } from '@reduxjs/toolkit/query';
import { useOpenForm } from '@hooks/useOpenForm';
import { TASK_PANEL_TEXT } from '@utils/constants';
import { PanelLayout } from '@ui/Panels/PanelLayout';
import { EmptyPanel } from '@ui/Panels/EmptyPanel';

export const TasksPanel = memo(() => {
  const selectedList = useAppSelector(listSelectors.selectSelectedList);
  const openForm = useOpenForm();

  const { data: tasks = [] } = tasksApi.useGetTasksQuery(selectedList?.id ?? skipToken);

  const tasksSectionClassName = clsx(
    'flex flex-col flex-1',
    tasks.length
      ? 'gap-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'
      : 'justify-center items-center text-center',
  );
  const iconClassName = 'cursor-pointer hover:text-text-primary transition-colors duration-300';

  return (
    <>
      {selectedList ? (
        <PanelLayout
          buttonText="Add task"
          buttonHandler={() =>
            openForm({ mode: ItemsManagementFormMode.AddTask, listId: selectedList.id })
          }
        >
          <header className="flex justify-between items-center pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
            <h2>{selectedList.title}</h2>
            <section className="flex gap-2 text-base text-text-secondary">
              <FaEdit
                className={iconClassName}
                onClick={() =>
                  openForm({
                    mode: ItemsManagementFormMode.EditList,
                    item: selectedList,
                  })
                }
              />
              <FaTrash
                className={iconClassName}
                onClick={() =>
                  openForm({
                    mode: ItemsManagementFormMode.DeleteList,
                    item: selectedList,
                  })
                }
              />
            </section>
          </header>
          <section className={tasksSectionClassName}>
            {tasks.length ? (
              tasks.map(
                (task: Task): JSX.Element => (
                  <TaskCard key={task.id} task={task} openForm={openForm} />
                ),
              )
            ) : (
              <EmptyPanel>{TASK_PANEL_TEXT.NO_TASKS}</EmptyPanel>
            )}
          </section>
        </PanelLayout>
      ) : (
        <section className="flex flex-col flex-1 justify-center items-center text-center">
          <EmptyPanel>{TASK_PANEL_TEXT.NO_LIST_SELECTED}</EmptyPanel>
        </section>
      )}
    </>
  );
});
