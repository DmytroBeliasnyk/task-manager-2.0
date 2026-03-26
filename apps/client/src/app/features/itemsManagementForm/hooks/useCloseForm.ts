import { useAppDispatch } from '@store/redux';
import { useCallback } from 'react';
import { itemsManagementFormActions } from '../slice/formSlice';

export const useCloseForm = () => {
  const dispatch = useAppDispatch();

  return useCallback(() => {
    dispatch(itemsManagementFormActions.closeForm());
  }, [dispatch]);
};
