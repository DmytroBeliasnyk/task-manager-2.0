import type { List } from '@shared/types/list.ts';
import { memo, useContext } from 'react';
import { HeaderContext } from '@ui/header/HeaderContextProvider';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { ListCard } from '@features/listsPanel/ListCard';
import { useOpenForm } from '@hooks/useOpenForm';
import { LIST_PANEL_TEXT } from '@utils/constants';
import { PanelLayout } from '@ui/panels/PanelLayout';
import { useLists } from './hooks/useLists';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';

export const ListsPanel = memo(() => {
  const { searchValue } = useContext(HeaderContext);
  const lists = useLists(searchValue);
  const openForm = useOpenForm();

  return (
    <PanelLayout
      buttonText="Create new list"
      buttonHandler={() => openForm({ mode: ItemsManagementFormMode.AddList })}
    >
      <header className="pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
        My lists
      </header>
      <ScrollableList
        items={lists}
        renderItem={(list: List) => <ListCard key={list.id} list={list} />}
        emptyState={searchValue ? LIST_PANEL_TEXT.SEARCH_NO_MATCH : LIST_PANEL_TEXT.NO_LISTS}
      />
    </PanelLayout>
  );
});
