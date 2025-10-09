import { type FC, useContext, useState } from 'react';
import { TasksPanel } from './panels/TasksPanel';
import { ListsPanel } from './panels/ListsPanel';
import type { List } from '@shared/types/list';
import { ListsContext } from '../App';

export const Main: FC = () => {
  const [selectedListId, setSelectedListId] = useState<string>('');

  const lists: List[] = useContext(ListsContext);
  const selectedList: List = lists.find((list: List) => (
    list.id === selectedListId
  ))!;

  return (
    <main className="flex gap-4 h-full overflow-hidden">
      <ListsPanel selectList={setSelectedListId} />
      <TasksPanel selectedList={selectedList} />
    </main>
  );
};
