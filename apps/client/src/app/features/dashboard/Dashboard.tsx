import { useItemsViewMode } from '@hooks/useItemsViewMode';
import { useAppSelector } from '@store/redux';
import { PanelLayout } from '@ui/panelLayout/PanelLayout';
import { ItemsManagementForm } from '../itemsManagementForm/ItemsManagementForm';
import { itemsManagementFormSelectors } from '../itemsManagementForm/slice/formSlice';
import { ListsPanel } from '../listsPanel/ListsPanel';
import { listSelectors } from '../listsPanel/slice/listSlice';
import { TasksPanel } from '../tasksPanel/TasksPanel';
import { Header } from './Header';

export const Dashboard = () => {
  const { viewMode, setViewMode } = useItemsViewMode();
  const isFormOpen = useAppSelector(itemsManagementFormSelectors.isOpen);
  const selectedList = useAppSelector(listSelectors.selectSelectedList);

  return (
    <>
      <PanelLayout header={<Header selectedList={selectedList} setViewMode={setViewMode} />}>
        {selectedList ? (
          <TasksPanel selectedList={selectedList} viewMode={viewMode} />
        ) : (
          <ListsPanel viewMode={viewMode} />
        )}
      </PanelLayout>
      {isFormOpen && <ItemsManagementForm />}
    </>
  );
};
