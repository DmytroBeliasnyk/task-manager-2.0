import { ListsPanel } from '@features/listsPanel/ListsPanel';
import { TasksPanel } from '@features/tasksPanel/TasksPanel';
import { ItemsManagementForm } from '@features/forms/itemsManagement/ItemsManagementForm';
import { useAppSelector } from '@store/redux';
import { itemsManagementFormSelectors } from '@store/slices/formSlice';
import { listSelectors } from '@store/slices/listSlice';

export const Main = () => {
  const isFormOpen = useAppSelector(itemsManagementFormSelectors.isOpen);
  const selectedList = useAppSelector(listSelectors.selectSelectedList);

  return (
    <>
      <main className="flex h-full gap-4 overflow-hidden">
        {selectedList ? <TasksPanel selectedList={selectedList} /> : <ListsPanel />}
      </main>
      {isFormOpen && <ItemsManagementForm />}
    </>
  );
};
