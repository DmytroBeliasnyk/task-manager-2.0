import { ListsPanel } from './listsPanel/ListsPanel';
import { TasksPanel } from './tasksPanel/TasksPanel';
import { ItemsManagementForm } from './forms/itemsManagement/ItemsManagementForm';
import { useAppSelector } from '../redux';
import { itemsManagementFormSelectors } from './forms/itemsManagement/formSlice';

export const Main = () => {
  const isFormOpen = useAppSelector(itemsManagementFormSelectors.isOpen)

  return (
    <>
      <main className="flex gap-4 h-full overflow-hidden">
        <ListsPanel />
        <TasksPanel />
      </main>
      {isFormOpen && <ItemsManagementForm />}
    </>
  );
};
