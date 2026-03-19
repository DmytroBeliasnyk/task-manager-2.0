import { itemsManagementFormActions } from '@features/forms/itemsManagement/slice/formSlice';
import { useAppDispatch } from '@store/redux';
import { type ItemsManagementFormOptions } from '@utils/itemsManagementFormOptions';
import { useCallback } from 'react';

export const useOpenForm = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (options: ItemsManagementFormOptions) => {
      dispatch(itemsManagementFormActions.openForm({ options }));
    },
    [dispatch],
  );
};
