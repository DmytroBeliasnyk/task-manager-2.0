import { Button } from '@ui/button/Button';
import { useCallback, useEffect, useRef } from 'react';
import { useCloseForm } from './hooks/useCloseForm';
import { useFormActions } from './hooks/useFormActions';
import { useFormValidation } from './hooks/useFormValidation';
import { useFormValues } from './hooks/useFormValues';

export const ItemsManagementForm = () => {
  const closeForm = useCloseForm();
  const { formMode, isDeleteForm, inputTitleValue, inputDescriptionValue } = useFormValues();

  const inputTitleRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputTitleRef.current?.focus();
  }, []);

  const { validate, clearTitleError } = useFormValidation(inputTitleRef);
  const submitForm = useFormActions(closeForm);

  const formAction = useCallback(
    (formData: FormData): void => {
      if (!validate(formData)) {
        return;
      }
      submitForm(formData);
    },
    [validate, submitForm],
  );

  return (
    <div className="bg-accent/10 absolute inset-0 z-10 flex size-full items-center justify-center">
      <div className="bg-primary-bg flex w-3/4 flex-col gap-2 rounded-md p-4 sm:w-1/3">
        <h2 className="border-border border-b pb-2 text-xl font-semibold">{formMode}</h2>
        <form action={formAction} className="flex flex-col gap-2">
          {!isDeleteForm ? (
            <>
              <label className="input-label">
                <input
                  className="input-field"
                  type={'text'}
                  name={'title'}
                  ref={inputTitleRef}
                  placeholder={'Title'}
                  defaultValue={inputTitleValue}
                  onChange={clearTitleError}
                  required
                />
              </label>
              <label className="input-label h-36">
                <textarea
                  className="input-field scrollbar-thin scrollbar-theme size-full cursor-text resize-none"
                  name={'description'}
                  placeholder={'Description'}
                  defaultValue={inputDescriptionValue}
                ></textarea>
              </label>
            </>
          ) : (
            <>
              <p className="text-secondary-text">{`To confirm, type "${inputTitleValue}" in the field below`}</p>
              <label className="input-label">
                <input
                  className="input-field"
                  type={'text'}
                  name={'title'}
                  ref={inputTitleRef}
                  placeholder={'Confirm title'}
                  onChange={clearTitleError}
                  required
                />
              </label>
            </>
          )}
          <div className="mt-2 flex justify-end gap-4">
            <Button type="submit">Submit</Button>
            <Button intent="outline" type="reset" onClick={closeForm}>
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
