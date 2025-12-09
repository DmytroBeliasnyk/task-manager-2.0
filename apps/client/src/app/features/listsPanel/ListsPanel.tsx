import type { List } from '@shared/types/list.ts';
import clsx from 'clsx/lite';
import { type JSX, memo, useContext, useMemo } from 'react';
import { Button } from '@ui/Button/Button';
import { HeaderContext } from '@ui/Header/HeaderContextProvider';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { listsApi } from '@api/lists/api';
import { ListCard } from '@features/listsPanel/ListCard';
import { useOpenForm } from '@hooks/useOpenForm';
import { EmptyPanel } from '@ui/EmptyPanel/EmptyPanel';
import { LIST_PANEL_TEXT } from '@utils/constants';

export const ListsPanel = memo(() => {
  const { data } = listsApi.useGetListsQuery();
  const lists = data?.lists ?? [];
  const openForm = useOpenForm();

  const { searchValue } = useContext(HeaderContext);
  const filteredLists = useMemo(() => {
    return searchValue
      ? lists.filter((list) => list.title.toLowerCase().includes(searchValue.toLowerCase()))
      : lists;
  }, [lists, searchValue]);

  const listsSectionClassName = clsx(
    'flex flex-col flex-1',
    filteredLists.length
      ? 'gap-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'
      : 'justify-center items-center text-center',
  );

  return (
    <section className="flex flex-col flex-1 justify-between gap-2 bg-secondary-bg rounded-md p-4">
      <h2 className="pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
        My lists
      </h2>
      <section className={listsSectionClassName}>
        {filteredLists.length ? (
          filteredLists.map((list: List): JSX.Element => <ListCard key={list.id} list={list} />)
        ) : (
          <EmptyPanel>
            {lists.length ? LIST_PANEL_TEXT.SEARCH_NO_MATCH : LIST_PANEL_TEXT.NO_LISTS}
          </EmptyPanel>
        )}
      </section>
      <div className="flex justify-end">
        <Button
          type={'button'}
          onClick={() =>
            openForm({
              mode: ItemsManagementFormMode.AddList,
            })
          }
        >
          Create new list
        </Button>
      </div>
    </section>
  );
});
