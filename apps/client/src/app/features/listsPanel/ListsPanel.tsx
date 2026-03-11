import type { List } from '@shared/types/list.ts';
import { memo, useContext } from 'react';
import { HeaderContext } from '@ui/header/HeaderContextProvider';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { ListCard } from '@features/listsPanel/ListCard';
import { useOpenForm } from '@hooks/useOpenForm';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { LuCirclePlus } from 'react-icons/lu';
import { useLists } from './hooks/useLists';
import { Button } from '@ui/button/Button';
import { IoGrid, IoList } from 'react-icons/io5';
import { useItemsViewMode } from '@hooks/useItemsViewMode';

export const ListsPanel = memo(() => {
  const { viewMode, setViewMode } = useItemsViewMode('lists');
  const { searchValue } = useContext(HeaderContext);
  const lists = useLists(searchValue);
  const openForm = useOpenForm();

  return (
    <section className="bg-secondary-bg flex flex-1 flex-col justify-between gap-2 rounded-md p-4">
      <header className="border-border flex items-center justify-between gap-4 border-b pb-2 text-2xl font-semibold">
        <h2 className="line-clamp-1 break-all">My lists</h2>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            intent="ghost"
            className="size-fit text-lg transition-colors duration-300"
            onClick={() => setViewMode('grid')}
          >
            <IoGrid />
          </Button>
          <Button
            size="icon"
            intent="ghost"
            className="size-fit text-2xl transition-colors duration-300"
            onClick={() => setViewMode('list')}
          >
            <IoList />
          </Button>
        </div>
      </header>
      <ScrollableList
        viewMode={viewMode}
        items={lists}
        renderItem={(list: List) => <ListCard key={list.id} list={list} />}
        button={
          <Button
            intent="outline"
            className="group flex size-full gap-2"
            onClick={() => openForm({ mode: ItemsManagementFormMode.AddList })}
          >
            <LuCirclePlus className="group-hover:text-accent transform transition-colors duration-300 group-hover:scale-110" />
            <span className="group-hover:text-accent transition-colors duration-300">
              Create new list
            </span>
          </Button>
        }
      />
    </section>
  );
});
