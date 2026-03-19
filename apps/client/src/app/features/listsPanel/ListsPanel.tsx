import { useItemsViewMode } from '@hooks/useItemsViewMode';
import { useOpenForm } from '@hooks/useOpenForm';
import type { List } from '@shared/types/list.ts';
import { Button } from '@ui/button/Button';
import { HeaderContext } from '@ui/header/HeaderContextProvider';
import { PanelLayout } from '@ui/panelLayout/PanelLayout';
import { ScrollableList } from '@ui/scrollableList/ScrollableList';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { memo, useContext } from 'react';
import { LuCirclePlus } from 'react-icons/lu';
import { useLists } from './hooks/useLists';
import { ListCard } from './ListCard';

export const ListsPanel = memo(() => {
  const { viewMode, setViewMode } = useItemsViewMode('lists');
  const { searchValue } = useContext(HeaderContext);
  const lists = useLists(searchValue);
  const openForm = useOpenForm();

  return (
    <PanelLayout title="My lists" setViewMode={setViewMode}>
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
    </PanelLayout>
  );
});
