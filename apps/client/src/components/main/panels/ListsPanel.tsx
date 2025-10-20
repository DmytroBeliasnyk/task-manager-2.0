import type { List } from '@shared/types/list.ts';
import { ItemsManagementFormMode } from '@forms/itemsManagement/formOptions';
import { ItemsManagementFormContext } from '@forms/itemsManagement/ItemsManagementFormContextProvider';
import clsx from 'clsx/lite';
import { type FC, type JSX, useContext, useMemo } from 'react';
import { ListsContext } from '../../App';
import { Button } from '../../button/Button';
import { ItemCard } from './common/ItemCard';
import { HeaderContext } from '../../header/HeaderContextProvider';

type ListsSectionProps = {
  selectList: (listId: string) => void;
};

export const ListsPanel: FC<ListsSectionProps> = ({ selectList }) => {
  const { openForm } = useContext(ItemsManagementFormContext);
  const { lists } = useContext(ListsContext);
  const { searchValue } = useContext(HeaderContext);
  const filteredLists = useMemo(() => {
    return searchValue
      ? lists.filter(list =>
        list.title.toLowerCase().includes(searchValue.toLowerCase()))
      : lists;
  }, [lists, searchValue]);

  const listsSectionClassName= clsx(
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
          filteredLists.map(
            (list: List): JSX.Element => (
              <ItemCard
                key={list.id}
                item={list}
                clickHandler={() => selectList(list.id)}
              />
            ))
        ) : (
          <span className="inline-block w-3/4 text-4xl text-gray-400">
            {lists.length
              ? 'No lists match your search...'
              : "You don't have any lists..."}
          </span>
        )}
      </section>
      <div className="flex justify-end">
        <Button
          type={'button'}
          onClick={() => openForm(
            { mode: ItemsManagementFormMode.AddList },
          )}>
          Create new list
        </Button>
      </div>
    </section>
  );
};
