import { ListsPanel } from './features/listsPanel/ListsPanel';
import { TasksPanel } from './features/tasksPanel/TasksPanel';
import { ItemsManagementForm } from './features/forms/itemsManagement/ItemsManagementForm';
import { useAppSelector } from './redux';
import { itemsManagementFormSelectors } from './features/forms/itemsManagement/formSlice';

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
