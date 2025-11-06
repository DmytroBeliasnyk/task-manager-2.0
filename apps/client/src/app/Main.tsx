import { type FC, useContext } from 'react';
import { ListsPanel } from './features/listsPanel/ListsPanel';
import { TasksPanel } from './features/tasksPanel/TasksPanel';
import { ItemsManagementFormContext } from './features/forms/itemsManagement/ItemsManagementFormContextProvider';
import { ItemsManagementForm } from './features/forms/itemsManagement/ItemsManagementForm';

export const Main: FC = () => {
  const { formState } = useContext(ItemsManagementFormContext);

  return (
    <>
      <main className="flex gap-4 h-full overflow-hidden">
        <ListsPanel />
        <TasksPanel />
      </main>
      {formState.isOpen && <ItemsManagementForm />}
    </>
  );
};
