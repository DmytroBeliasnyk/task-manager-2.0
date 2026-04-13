import type { FormFields } from '@f-types/form';
import type { User } from '@shared/types/user';
import { useCallback } from 'react';

export const useValidateProfile = (user: User) => {
  const isProfileUnchanged = useCallback(
    (formData: FormData) => {
      const values = Object.fromEntries(formData.entries()) as FormFields;

      const isEmailSame = (values.email ?? '') === user.email;
      const isUsernameSame = (values.username ?? '') === user.username;

      return isEmailSame && isUsernameSame;
    },
    [user.email, user.username],
  );

  return isProfileUnchanged;
};
