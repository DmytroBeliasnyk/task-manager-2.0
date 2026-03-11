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
        className="group-hover:text-secondary-text hover:text-primary-text size-fit cursor-pointer bg-transparent text-transparent transition-colors hover:bg-transparent"
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
        className="group-hover:text-secondary-text hover:text-primary-text size-fit cursor-pointer bg-transparent text-transparent transition-colors hover:bg-transparent"
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
