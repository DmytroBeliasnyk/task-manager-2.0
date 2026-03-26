import { type ItemsManagementFormOptions } from '@features/itemsManagementForm/itemsManagementForm.types';
import { itemsManagementFormActions } from '@features/itemsManagementForm/slice/formSlice';
import { useAppDispatch } from '@store/redux';
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
