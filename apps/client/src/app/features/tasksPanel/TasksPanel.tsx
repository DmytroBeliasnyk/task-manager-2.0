import type { Task } from '@shared/types/task';
import clsx from 'clsx/lite';
import { type JSX, memo } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button } from '@ui/Button/Button';
import { useAppDispatch, useAppSelector } from '@store/redux';
import { listSelectors } from '@store/slices/listSlice';
import { itemsManagementFormActions } from '@store/slices/formSlice';
import {
  ItemsManagementFormMode,
  type ItemsManagementFormOptions,
} from '@utils/itemsManagementFormOptions';
import { tasksApi } from '@api/tasks/api';
import { TaskCard } from './TaskCard';
import { skipToken } from '@reduxjs/toolkit/query';

export const TasksPanel = memo(() => {
  const dispatch = useAppDispatch();
  const selectedList = useAppSelector(listSelectors.selectSelectedList);

  const { data: tasks = [] } = tasksApi.useGetTasksQuery(selectedList?.id ?? skipToken);

  function openForm(options: ItemsManagementFormOptions) {
    dispatch(itemsManagementFormActions.openForm({ options }));
  }

  const tasksSectionClassName = clsx(
    'flex flex-col flex-1 bg-secondary-bg rounded-md',
    selectedList ? 'justify-between gap-2 p-4' : 'justify-center items-center text-center',
  );
  const tasksListClassName = selectedList
    ? clsx(
        'flex flex-col flex-1',
        tasks.length
          ? 'gap-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'
          : 'justify-center items-center text-center',
      )
    : null;
  const iconClassName = 'cursor-pointer hover:text-text-primary transition-colors duration-300';

  return (
    <section className={tasksSectionClassName}>
      {selectedList ? (
        <>
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
          <section className={tasksListClassName ?? undefined}>
            {tasks.length ? (
              tasks.map(
                (task: Task): JSX.Element => (
                  <TaskCard key={task.id} task={task} openForm={openForm} />
                ),
              )
            ) : (
              <span className="inline-block w-3/4 text-4xl text-gray-400">
                You don't have any tasks...
              </span>
            )}
          </section>
          <div className="flex justify-end">
            <Button
              type={'button'}
              onClick={() =>
                openForm({
                  mode: ItemsManagementFormMode.AddTask,
                  listId: selectedList.id,
                })
              }
            >
              Add task
            </Button>
          </div>
        </>
      ) : (
        <span className="inline-block w-3/4 text-4xl text-gray-400">
          Choose a task list to see its tasks...
        </span>
      )}
    </section>
  );
});
