import { FaEdit, FaTrash } from 'react-icons/fa';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { useOpenForm } from '@hooks/useOpenForm';
import type { List } from '@shared/types/list';
import { memo } from 'react';

export const TasksPanelHeader = memo(({ selectedList }: { selectedList: List }) => {
  const openForm = useOpenForm();
  const iconClassName = 'cursor-pointer hover:text-text-primary transition-colors duration-300';

  return (
    <header className="flex justify-between items-center pb-2 border-b border-text-secondary text-2xl font-semibold text-text-primary">
      <h2>{selectedList.title}</h2>
      <section className="flex gap-2 text-base text-text-secondary">
        <FaEdit
          className={iconClassName}
          onClick={() =>
            openForm({
              mode: ItemsManagementFormMode.EditList,
              item: selectedList,
            })
          }
        />
        <FaTrash
          className={iconClassName}
          onClick={() =>
            openForm({
              mode: ItemsManagementFormMode.DeleteList,
              item: selectedList,
            })
          }
        />
      </section>
    </header>
  );
});
