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
    <div className="flex justify-center items-center size-full bg-gray-500/50 absolute inset-0 z-10">
      <div className="flex flex-col w-1/3 gap-2 p-4 bg-primary-bg rounded-md">
        <h2 className="pb-2 border-b border-text-secondary text-xl font-semibold text-text-primary">
          {formMode}
        </h2>
        <form action={formAction} className="flex flex-col gap-2">
          {!isDeleteForm && (
            <>
              <label className="rounded-md bg-secondary-bg py-1 px-2 text-gray-400">
                <input
                  className="placeholder:text-gray-400 placeholder:italic focus:outline-none text-text-secondary cursor-text"
                  type={'text'}
                  name={'title'}
                  ref={inputTitle}
                  placeholder={'Title'}
                  defaultValue={inputTitleValue}
                  required
                />
              </label>
              <label className="h-18 rounded-md bg-secondary-bg py-1 px-2 text-gray-400">
                <textarea
                  className="placeholder:text-gray-400 placeholder:italic resize-none focus:outline-none text-text-secondary cursor-text"
                  name={'description'}
                  placeholder={'Description'}
                  defaultValue={inputDescriptionValue}
                ></textarea>
              </label>
            </>
          )}
          <div className="flex justify-end gap-4 mt-2">
            <Button type={'submit'}>Submit</Button>
            <Button type={'reset'} onClick={closeForm}>
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
