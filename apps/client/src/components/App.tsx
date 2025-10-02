import {Sidebar} from "./sidebar/Sidebar";
import {Main} from "./main/Main";
import {type FC, useEffect, useState} from "react";
import {ListManagementForm} from "./forms/ListManagementForm";
import clsx from "clsx/lite";
import type {ListManagementFormMode} from "../utils/modalFormMode.ts";
import type {List} from "@shared/types/list.ts";

type ListManagementFormState = {
  isOpen: boolean
  formState?: ListManagementFormMode
}

export const App: FC = () => {
  const [lists, setLists] = useState<Array<List>>([])
  const [listManagementFormState, setModalFormState] = useState<ListManagementFormState>({
    isOpen: false
  })
  useEffect(() => {
    fetch('/api/lists')
      .then(res => res.json())
      .then(res => setLists(res.data))
  }, [])

  function openForm(formState: ListManagementFormMode): void {
    setModalFormState({isOpen: true, formState})
  }

  function closeForm(): void {
    setModalFormState({isOpen: false})
  }

  const containerClassName: string = clsx(
    'flex flex-row h-full',
    listManagementFormState.isOpen && 'relative'
  )

  return (
    <div className={containerClassName}>
      <Sidebar/>
      <Main
        lists={lists}
        openForm={openForm}
      />
      {listManagementFormState.isOpen &&
        <ListManagementForm
          formState={listManagementFormState.formState!}
          closeModal={closeForm}
        />}
    </div>
  )
}