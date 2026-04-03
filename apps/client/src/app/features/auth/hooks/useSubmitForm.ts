import { useLoginMutation, useRegisterMutation } from '@api/auth/auth';
import { isAuthErrors, isFetchBaseQueryError } from '@api/helpers/helpers';
import type { AuthErrors, AuthFieldName } from '@shared/types/auth';

export const useSubmitForm = (isFormSignUp: boolean) => {
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const submitForm = async (formData: FormData) => {
    const formEntries = Object.fromEntries(formData) as Partial<Record<AuthFieldName, string>>;

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
      let errors: AuthErrors | undefined = undefined;
      let message = 'Unknown error occured. Please try again.';

      if (isFetchBaseQueryError(err)) {
        if (isAuthErrors(err)) {
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
