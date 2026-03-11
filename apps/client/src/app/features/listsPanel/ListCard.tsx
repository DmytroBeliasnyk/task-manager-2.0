import type { List } from '@shared/types/list';
import { useAppDispatch } from '@store/redux';
import { listActions } from '@store/slices/listSlice';
import { memo } from 'react';
import { Button } from '@ui/button/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useOpenForm } from '@hooks/useOpenForm';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { ItemCard } from '@ui/itemCard/ItemCard';

export const ListCard = memo(({ list }: { list: List }) => {
  const dispatch = useAppDispatch();
  const openForm = useOpenForm();

  return (
    <ItemCard
      title={list.title}
      description={list.description}
      clickHandler={() => dispatch(listActions.setSelectedList({ list }))}
    >
      <Button
        size="icon"
        intent="ghost"
        className="text-secondary-text sm:group-hover:text-secondary-text sm:hover:text-primary-text size-fit cursor-pointer bg-transparent transition-colors hover:bg-transparent sm:text-transparent"
        onClick={(e) => {
          e.stopPropagation();
          openForm({
            mode: ItemsManagementFormMode.EditList,
            item: list,
          });
        }}
      >
        <FaEdit />
      </Button>
      <Button
        size="icon"
        intent="ghost"
        className="text-secondary-text sm:group-hover:text-secondary-text sm:hover:text-primary-text size-fit cursor-pointer bg-transparent transition-colors hover:bg-transparent sm:text-transparent"
        onClick={(e) => {
          e.stopPropagation();
          openForm({
            mode: ItemsManagementFormMode.DeleteList,
            item: list,
          });
        }}
      >
        <FaTrash />
      </Button>
    </ItemCard>
  );
});
