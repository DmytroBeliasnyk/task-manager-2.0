import type {FC, JSX} from 'react';
import clsx from 'clsx/lite';
import {Button} from "../../button/Button";
import {type ListManagementFormMode, ModalFormMode} from "../../../utils/modalFormMode";
import type {List} from "@shared/types/list.ts";
import type {Task} from "@shared/types/task.ts";

type TaskSectionProps = {
  selectedList: List | null
  openForm: (formState: ListManagementFormMode) => void
}
// использовать контекст модалки для управления формой
export const ListManagementSection: FC<TaskSectionProps> = (
  {selectedList, openForm}) => {
  const tasksSectionClassName: string = clsx(
    'flex flex-col flex-1 bg-secondary-bg rounded-md',
    !selectedList && 'justify-center items-center text-center',
    selectedList && 'justify-between gap-2 p-4'
  )
  const tasksListClassName: string = clsx(
    'flex flex-col flex-1 bg-secondary-bg rounded-md gap-2 pr-1 overflow-y-auto ',
    'scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent',
  )

  return (
    <section className={tasksSectionClassName}>
      {selectedList ? (
        <>
          <h2 className="pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
            {selectedList.title}
          </h2>
          <section className={tasksListClassName}>
            {selectedList.tasks
              .map((task: Task): JSX.Element => (
                <div
                  key={task.id}
                  onClick={() => openForm({
                    formMode: ModalFormMode.EditTask,
                    formItem: task,
                    listId: selectedList.id
                  })}
                  className="flex flex-1 p-2 bg-gray-300 rounded-md hover:border hover:border-gray-400"
                >
                  <section className="flex flex-col">
                    <h3 className="text-text-primary text-base font-semibold">{task.title}</h3>
                    <p className="text-text-secondary text-sm font-medium">{task.description}</p>
                  </section>
                </div>
              ))}
          </section>
          <div className="flex justify-end">
            <Button
              text={"Add task"}
              type={"button"}
              clickHandler={() => openForm({
                formMode: ModalFormMode.AddTask,
                formItem: null,
                listId: selectedList.id
              })}
            />
          </div>
        </>
      ) : (
        <span className="inline-block w-3/4 text-4xl text-gray-400">
          Choose a task list to see its tasks...
        </span>
      )}
    </section>
  )
}
