import type {FC, JSX} from "react";
import {Button} from "../../button/Button";
import clsx from "clsx/lite";
import {type ListManagementFormMode, ModalFormMode} from "../../../utils/modalFormMode";
import type {List} from "@shared/types/list.ts";

type ListsSectionProps = {
  lists: Array<List>
  selectList: (list: List | null) => void
  openForm: (formState: ListManagementFormMode) => void
}

export const ListsSection: FC<ListsSectionProps> = ({lists, selectList, openForm}) => {
  const listsSectionClassName: string = clsx(
    'flex flex-col flex-1',
    lists.length && `
      gap-2 pr-1 overflow-y-auto scrollbar-thin
      scrollbar-thumb-gray-400 scrollbar-track-transparent`,
    !lists.length && 'justify-center items-center text-center'
  )

  return (
    <section className="flex flex-col flex-1 justify-between gap-2 bg-secondary-bg rounded-md p-4">
      <h2 className="pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
        My lists
      </h2>
      <section className={listsSectionClassName}>
        {lists.length ? (
          lists.map((list: List): JSX.Element => (
            <div
              key={list.id}
              onClick={() => selectList(
                lists.find((findList: List): boolean =>
                  findList.id === list.id)!
              )}
              className="flex flex-1 p-2 bg-gray-300 rounded-md hover:border hover:border-gray-400"
            >
              <section className="flex flex-col">
                <h3 className="text-text-primary text-base font-semibold">{list.title}</h3>
                <p className="text-text-secondary text-sm font-medium">{list.description}</p>
              </section>
            </div>
          ))
        ) : (
          <span className="inline-block w-3/4 text-4xl text-gray-400">
              You don't have any lists...
            </span>
        )}
      </section>
      <div className="flex justify-end">
        <Button
          text={"Create new list"}
          type={'button'}
          clickHandler={() => openForm({
            formMode: ModalFormMode.AddList,
            formItem: null
          })}
        />
      </div>
    </section>
  )
}