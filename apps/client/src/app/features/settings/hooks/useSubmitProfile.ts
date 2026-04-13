import { isFetchBaseQueryError, isUserDataErrors } from '@api/helpers/helpers';
import { useProfileMutation } from '@api/user/api';
import type { FormFields } from '@f-types/form';
import type { UserDataErrors } from '@shared/types/userdata';

export const useSubmitProfile = () => {
  const [profile, { isLoading }] = useProfileMutation();

  const submit = async (formData: FormData) => {
    const data = Object.fromEntries(formData) as FormFields;

    try {
      const payload = {
        email: data.email as string,
        username: data.username as string,
      };
      await profile(payload).unwrap();

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
