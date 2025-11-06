import type { List } from '@shared/types/list';
import { type FC, useContext, useState } from 'react';
import { ListsContext } from '../App';
import { ListsPanel } from './features/listsPanel/ListsPanel';
import { TasksPanel } from './features/tasksPanel/TasksPanel';
import { ItemsManagementForm } from '@forms/itemsManagement/ItemsManagementForm';
import { ItemsManagementFormContext } from '@forms/itemsManagement/ItemsManagementFormContextProvider';

export const Main: FC = () => {
  const [selectedListId, setSelectedListId] = useState<string>('');

  const { lists } = useContext(ListsContext);
  const { formState } = useContext(ItemsManagementFormContext);

  const selectedList: List = lists.find((list: List) => list.id === selectedListId)!;

  return (
    <>
      <main className="flex gap-4 h-full overflow-hidden">
        <ListsPanel selectList={setSelectedListId} />
        <TasksPanel selectedList={selectedList} />
      </main>
      {formState.isOpen && <ItemsManagementForm />}
    </>
  );
};
