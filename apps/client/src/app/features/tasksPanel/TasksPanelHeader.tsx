import { FaEdit, FaTrash } from 'react-icons/fa';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { useOpenForm } from '@hooks/useOpenForm';
import type { List } from '@shared/types/list';
import { Button } from '@ui/button/Button';
import { memo } from 'react';

export const TasksPanelHeader = memo(({ selectedList }: { selectedList: List }) => {
  const openForm = useOpenForm();

  return (
    <header className="border-border flex items-center justify-between border-b pb-2 text-2xl font-semibold">
      <h2>{selectedList.title}</h2>
      <div className="flex gap-2 text-base">
        <Button
          size="icon"
          intent="ghost"
          className="size-fit transition-colors duration-300"
          onClick={() =>
            openForm({
              mode: ItemsManagementFormMode.EditList,
              item: selectedList,
            })
          }
        >
          <FaEdit />
        </Button>
        <Button
          size="icon"
          intent="ghost"
          className="size-fit transition-colors duration-300"
          onClick={() =>
            openForm({
              mode: ItemsManagementFormMode.DeleteList,
              item: selectedList,
            })
          }
        >
          <FaTrash />
        </Button>
      </div>
    </header>
  );
});
