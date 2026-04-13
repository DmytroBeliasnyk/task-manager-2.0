import type { FieldName } from '@f-types/form';
import { authSelectors } from '@features/auth/slice/authSlice';
import { useValidateUserData } from '@hooks/useValidateUserData';
import type { User } from '@shared/types/user';
import { useAppSelector } from '@store/redux';
import { Button } from '@ui/button/Button';
import { Input } from '@ui/input/Input';
import { useCallback, useState } from 'react';
import { useSubmitProfile } from '../hooks/useSubmitProfile';
import { useValidateProfile } from '../hooks/useValidateProfile';

export const SetNewDataForm = () => {
  const [message, setMessage] = useState<string>('');
  const user = useAppSelector(authSelectors.selectUser) as User;
  const { validate, validateField, setError, errors, clearErrors, clearFieldError } =
    useValidateUserData();
  const isProfileUnchanged = useValidateProfile(user);
  const { submit, isLoading } = useSubmitProfile();

  const formAction = useCallback(
    async (formData: FormData) => {
      if (isProfileUnchanged(formData)) {
        setMessage("There's nothing to update");
        return;
      }

      if (!validate(formData)) return;

      const { isSuccess, errors, message } = await submit(formData);
      if (isSuccess) {
        clearErrors();
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
    <div className="border-border flex w-5/6 flex-col gap-4 border-b pb-2 sm:w-1/2">
      <h2 className="text-secondary-text text-lg">Change your personal data:</h2>
      <form action={formAction} className="flex flex-col gap-2">
        <Input
          type={'email'}
          name={'email'}
          defaultValue={user.email}
          labelClassName="bg-primary-bg"
          inputTitle="Email:"
          error={errors.email}
          onBlur={(e) => validateField('email', e.target.value)}
          onChange={() => {
            message && setMessage('');
            errors.email && clearFieldError('email');
          }}
        />
        <Input
          type={'text'}
          name={'username'}
          defaultValue={user.username}
          labelClassName="bg-primary-bg"
          inputTitle="Username:"
          error={errors.username}
          onBlur={(e) => validateField('username', e.target.value)}
          onChange={() => {
            message && setMessage('');
            errors.username && clearFieldError('username');
          }}
        />
        {message && <span className="text-success ml-2 text-sm">{message}</span>}
        <Button className="w-fit" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  );
};
