import { useLoginMutation, useRegisterMutation } from '@api/auth/auth';
import { isFetchBaseQueryError, isUserDataErrors } from '@api/helpers/helpers';
import type { UserDataErrors, UserDataFieldName } from '@shared/types/userdata';

export const useSubmitForm = (isFormSignUp: boolean) => {
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const submitForm = async (formData: FormData) => {
    const formEntries = Object.fromEntries(formData) as Partial<Record<UserDataFieldName, string>>;

    const userData = {
      username: formEntries.username || '',
      email: formEntries.email || '',
      password: formEntries.password || '',
    };

    try {
      if (isFormSignUp) {
        await register(userData).unwrap();
      } else {
        await login(userData).unwrap();
      }

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
    submitForm,
    isLoading: isFormSignUp ? isRegisterLoading : isLoginLoading,
  };
};
