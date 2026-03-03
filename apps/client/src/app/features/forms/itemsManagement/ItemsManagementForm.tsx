import { useEffect, useRef } from 'react';
import { useCloseForm } from './hooks/useCloseForm';
import { useFormActions } from './hooks/useFormActions';
import { useFormValues } from './hooks/useFormValues';
import { Button } from '@ui/button/Button';

export const ItemsManagementForm = () => {
  const closeForm = useCloseForm();
  const formAction = useFormActions(closeForm);
  const { formMode, isDeleteForm, inputTitleValue, inputDescriptionValue } = useFormValues();

  const inputTitle = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputTitle.current?.focus();
  }, []);

  return (
    <div className="bg-accent/10 absolute inset-0 z-10 flex size-full items-center justify-center">
      <div className="bg-primary-bg flex w-1/3 flex-col gap-2 rounded-md p-4">
        <h2 className="border-border border-b pb-2 text-xl font-semibold">{formMode}</h2>
        <form action={formAction} className="flex flex-col gap-2">
          {!isDeleteForm && (
            <>
              <label className="bg-secondary-bg text-muted-text rounded-md px-2 py-1">
                <input
                  className="placeholder:text-muted-text text-secondary-text cursor-text placeholder:italic focus:outline-none"
                  type={'text'}
                  name={'title'}
                  ref={inputTitle}
                  placeholder={'Title'}
                  defaultValue={inputTitleValue}
                  required
                />
              </label>
              <label className="bg-secondary-bg text-muted-text h-18 rounded-md px-2 py-1">
                <textarea
                  className="placeholder:text-muted-text text-secondary-text cursor-text resize-none placeholder:italic focus:outline-none"
                  name={'description'}
                  placeholder={'Description'}
                  defaultValue={inputDescriptionValue}
                ></textarea>
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
