import { useAppSelector } from '@store/redux';
import { ItemsManagementFormMode } from '@utils/itemsManagementFormOptions';
import { itemsManagementFormSelectors } from '../slice/formSlice';

export const useFormValues = () => {
  const options = useAppSelector(itemsManagementFormSelectors.selectOptions);

  const formMode = options.mode;

  const isDeleteForm =
    formMode === ItemsManagementFormMode.DeleteList ||
    formMode === ItemsManagementFormMode.DeleteTask;

  const isEditMode =
    formMode === ItemsManagementFormMode.EditList || formMode === ItemsManagementFormMode.EditTask;

  const inputTitleValue = isEditMode || isDeleteForm ? options.item.title : '';
  const inputDescriptionValue = isEditMode ? options.item.description : '';

  return {
    formMode,
    isDeleteForm,
    inputTitleValue,
    inputDescriptionValue,
  };
};
