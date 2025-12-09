import { useAppDispatch } from '@store/redux';
import { itemsManagementFormActions } from '@store/slices/formSlice';
import { useCallback } from 'react';

export const useCloseForm = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(itemsManagementFormActions.closeForm());
  }, [dispatch]);
};
