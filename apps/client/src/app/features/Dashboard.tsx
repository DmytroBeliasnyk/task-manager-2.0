import { useAppSelector } from '@store/redux';
import { ItemsManagementForm } from './itemsManagementForm/ItemsManagementForm';
import { itemsManagementFormSelectors } from './itemsManagementForm/slice/formSlice';
import { ListsPanel } from './listsPanel/ListsPanel';
import { listSelectors } from './listsPanel/slice/listSlice';
import { TasksPanel } from './tasksPanel/TasksPanel';

export const Dashboard = () => {
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
