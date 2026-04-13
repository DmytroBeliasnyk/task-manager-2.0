import type { FieldName } from '@f-types/form';
import { useValidateUserData } from '@hooks/useValidateUserData';
import { Button } from '@ui/button/Button';
import { Input } from '@ui/input/Input';
import { useCallback, useState } from 'react';
import { useSubmitPassword } from '../hooks/useSubmitPassword';

export const UpdatePasswordForm = () => {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const { validate, validateField, setError, errors, clearErrors, clearFieldError } =
    useValidateUserData();
  const { submit, isLoading } = useSubmitPassword();

  const formAction = useCallback(
    async (formData: FormData) => {
      if (!validate(formData)) return;

      const { isSuccess, errors, message } = await submit(formData);
      if (isSuccess) {
        clearErrors();
        setPassword('');
        setConfirmPassword('');
        setMessage(message);
      } else if (errors) {
        Object.entries(errors).forEach(([key, error]) => {
          const field = key as FieldName;
          setError(field, error);
        });
      }
    },
    [validate, submit, clearErrors],
  );

  return (
    <div className="border-border mt-4 flex w-5/6 flex-col gap-4 border-b pb-2 sm:w-1/2">
      <h2 className="text-secondary-text text-lg">Change your password:</h2>
      <form action={formAction} className="flex flex-col gap-2">
        <Input
          type={'password'}
          name={'password'}
          value={password}
          labelClassName="bg-primary-bg"
          inputTitle="New password:"
          error={errors.password}
          onBlur={(e) => validateField('password', e.target.value)}
          onChange={(e) => {
            setPassword(e.target.value);
            message && setMessage('');
            errors.password && clearFieldError('password');
          }}
        />
        <Input
          type={'password'}
          name={'confirmPassword'}
          value={confirmPassword}
          labelClassName="bg-primary-bg"
          inputTitle="Confirm password:"
          error={errors.confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            message && setMessage('');
            errors.confirmPassword && clearFieldError('confirmPassword');
          }}
        />
        {message && <span className="text-success ml-2 text-sm">{message}</span>}
        <Button size="sm" className="w-fit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
