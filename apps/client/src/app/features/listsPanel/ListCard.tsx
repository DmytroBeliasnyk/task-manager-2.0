import type { List } from '@shared/types/list';
import { useAppDispatch } from '@store/redux';
import { listActions } from '@store/slices/listSlice';
import { memo } from 'react';
import { Button } from '@ui/button/Button';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useOpenForm } from '@hooks/useOpenForm';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';

export const ListCard = memo(({ list }: { list: List }) => {
  const dispatch = useAppDispatch();
  const openForm = useOpenForm();

  return (
    <div
      onClick={() => dispatch(listActions.setSelectedList({ list }))}
      className="group bg-highlite-bg flex cursor-pointer justify-between rounded-md p-2 hover:shadow-sm"
    >
      <div className="flex max-w-3/4 flex-col">
        <h3 className="text-primary-text line-clamp-1 font-semibold break-all">{list.title}</h3>
        <span className="text-secondary-text line-clamp-2 text-sm break-all">
          {list.description}
        </span>
      </div>
      <div className="flex items-center gap-4 text-xl">
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
      </div>
    </div>
  );
});
