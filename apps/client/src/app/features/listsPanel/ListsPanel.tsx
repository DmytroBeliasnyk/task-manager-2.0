import type { List } from '@shared/types/list.ts';
import { memo, useContext } from 'react';
import { HeaderContext } from '@ui/header/HeaderContextProvider';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { ListCard } from '@features/listsPanel/ListCard';
import { useOpenForm } from '@hooks/useOpenForm';
import { LIST_PANEL_TEXT } from '@utils/constants';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { LuCirclePlus } from 'react-icons/lu';
import { useLists } from './hooks/useLists';
import { Button } from '@ui/button/Button';

export const ListsPanel = memo(() => {
  const { searchValue } = useContext(HeaderContext);
  const lists = useLists(searchValue);
  const openForm = useOpenForm();

  return (
    <section className="bg-secondary-bg flex flex-1 flex-col justify-between gap-2 rounded-md p-4">
      <header className="border-border flex items-center justify-between gap-4 border-b pb-2 text-2xl font-semibold">
        <h2 className="line-clamp-1 break-all">My lists</h2>
      </header>
      <ScrollableList
        items={lists}
        renderItem={(list: List) => <ListCard key={list.id} list={list} />}
        emptyState={searchValue ? LIST_PANEL_TEXT.SEARCH_NO_MATCH : LIST_PANEL_TEXT.NO_LISTS}
      />
      <Button
        className="flex w-fit gap-2 self-end"
        onClick={() => openForm({ mode: ItemsManagementFormMode.AddList })}
      >
        <LuCirclePlus />
        Create new list
      </Button>
    </section>
  );
});
