import type { List } from '@shared/types/list.ts';
import clsx from 'clsx/lite';
import { type JSX, memo, useContext } from 'react';
import { HeaderContext } from '@ui/Header/HeaderContextProvider';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { ListCard } from '@features/listsPanel/ListCard';
import { useOpenForm } from '@hooks/useOpenForm';
import { EmptyPanel } from '@ui/Panels/EmptyPanel';
import { LIST_PANEL_TEXT } from '@utils/constants';
import { PanelLayout } from '@ui/Panels/PanelLayout';
import { useLists } from './hooks/useLists';

export const ListsPanel = memo(() => {
  const { searchValue } = useContext(HeaderContext);
  const lists = useLists(searchValue);
  const openForm = useOpenForm();

  const listsSectionClassName = clsx(
    'flex flex-col flex-1',
    lists.length
      ? 'gap-2 pr-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'
      : 'justify-center items-center text-center',
  );

  return (
    <PanelLayout
      buttonText="Create new list"
      buttonHandler={() => openForm({ mode: ItemsManagementFormMode.AddList })}
    >
      <header className="pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
        My lists
      </header>
      <section className={listsSectionClassName}>
        {lists.length ? (
          lists.map((list: List): JSX.Element => <ListCard key={list.id} list={list} />)
        ) : (
          <EmptyPanel>
            {searchValue ? LIST_PANEL_TEXT.SEARCH_NO_MATCH : LIST_PANEL_TEXT.NO_LISTS}
          </EmptyPanel>
        )}
      </section>
    </PanelLayout>
  );
});
