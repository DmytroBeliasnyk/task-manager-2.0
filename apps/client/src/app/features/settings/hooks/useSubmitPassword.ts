import { isFetchBaseQueryError, isUserDataErrors } from '@api/helpers/helpers';
import { usePasswordMutation } from '@api/user/api';
import type { FormFields } from '@f-types/form';
import type { UserDataErrors } from '@shared/types/userdata';

export const useSubmitPassword = () => {
  const [password, { isLoading }] = usePasswordMutation();

  const submit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as FormFields;

    try {
      const payload = { password: data.password as string };
      await password(payload).unwrap();

      return { isSuccess: true, errors: undefined, message: 'Success' };
    } catch (err) {
      let errors: UserDataErrors | undefined = undefined;
      let message = 'Unknown error occured. Please try again.';

      if (isFetchBaseQueryError(err)) {
        if (isUserDataErrors(err)) {
          errors = err.data.errors;
          message = err.data.message;
        }
      }

      return {
        isSuccess: false,
        errors,
        message,
      };
    }
  };

  return {
    submit,
    isLoading,
  };
};
