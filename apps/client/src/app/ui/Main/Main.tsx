import { ItemsManagementForm } from '@features/itemsManagementForm/ItemsManagementForm';
import { itemsManagementFormSelectors } from '@features/itemsManagementForm/slice/formSlice';
import { ListsPanel } from '@features/listsPanel/ListsPanel';
import { listSelectors } from '@features/listsPanel/slice/listSlice';
import { TasksPanel } from '@features/tasksPanel/TasksPanel';
import { useAppSelector } from '@store/redux';

export const Main = () => {
  const isFormOpen = useAppSelector(itemsManagementFormSelectors.isOpen);
  const selectedList = useAppSelector(listSelectors.selectSelectedList);

  return (
    <>
      <main className="flex overflow-hidden">
        {selectedList ? <TasksPanel selectedList={selectedList} /> : <ListsPanel />}
      </main>
      {isFormOpen && <ItemsManagementForm />}
    </>
  );
};
