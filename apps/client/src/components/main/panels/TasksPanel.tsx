import { type FC, type JSX, useContext } from 'react';
import { FormContext } from '../../App';
import clsx from 'clsx/lite';
import { Button } from '../../button/Button';
import { FormMode } from '@utils/formOptions';
import type { List } from '@shared/types/list.ts';
import type { Task } from '@shared/types/task.ts';
import { ItemCard } from './common/ItemCard';
import { FaEdit, FaTrash } from 'react-icons/fa';

type TaskSectionProps = {
  selectedList: List | null,
};

export const TasksPanel: FC<TaskSectionProps> = ({ selectedList }) => {
  const openForm = useContext(FormContext)!;

  const tasksSectionClassName: string = clsx(
    'flex flex-col flex-1 bg-secondary-bg rounded-md',
    selectedList
      ? 'justify-between gap-2 p-4'
      : 'justify-center items-center text-center',
  );
  const tasksListClassName: string | null = selectedList ? clsx(
    'flex flex-col flex-1',
    selectedList.tasks.length
      ? 'gap-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'
      : 'justify-center items-center text-center',
  ) : null;
  const iconClassName: string = 'cursor-pointer hover:text-text-primary';

  return (
    <section className={tasksSectionClassName}>
      {selectedList ? (
        <>
          <header
            className="flex justify-between items-center pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
            <h2>{selectedList.title}</h2>
            <section className="flex gap-2 text-base text-text-secondary">
              <FaEdit
                className={iconClassName}
                onClick={() => openForm({
                  mode: FormMode.EditList,
                  item: selectedList,
                })}
              />
              <FaTrash className={iconClassName} />
            </section>
          </header>
          <section className={tasksListClassName ?? undefined}>
            {selectedList.tasks.length ? (
              selectedList.tasks.map((task: Task): JSX.Element => (
                <ItemCard
                  key={task.id}
                  item={task}
                  clickHandler={() => openForm({
                    mode: FormMode.EditTask,
                    item: task,
                    listId: selectedList.id,
                  })}
                />
              ))
            ) : (
              <span className="inline-block w-3/4 text-4xl text-gray-400">
              You don't have any tasks...
              </span>
            )}
          </section>
          <div className="flex justify-end">
            <Button
              type={'button'}
              onClick={() => openForm({
                mode: FormMode.AddTask,
                listId: selectedList.id,
              })
              }
            >Add task</Button>
          </div>
        </>
      ) : (
        <span className="inline-block w-3/4 text-4xl text-gray-400">
          Choose a task list to see its tasks...
        </span>
      )}
    </section>
  );
};
