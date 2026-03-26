import { useCallback } from 'react';
import { useFormValues } from './useFormValues';

const TITLE_ERROR_CLASS = 'title-error';

export const useFormValidation = (inputTitleRef: React.RefObject<HTMLInputElement | null>) => {
  const { isDeleteForm, inputTitleValue } = useFormValues();

  const clearTitleError = useCallback(() => {
    inputTitleRef.current?.classList.remove(TITLE_ERROR_CLASS);
  }, [inputTitleRef]);

  const validate = useCallback(
    (formData: FormData): boolean => {
      if (isDeleteForm) {
        if (inputTitleValue !== String(formData.get('title'))) {
          inputTitleRef.current?.focus();
          inputTitleRef.current?.classList.add(TITLE_ERROR_CLASS);
          return false;
        }
      }

      clearTitleError();
      return true;
    },
    [isDeleteForm, inputTitleValue, inputTitleRef, clearTitleError],
  );

  return { validate, clearTitleError };
};
