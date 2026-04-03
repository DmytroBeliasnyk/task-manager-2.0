import type { AuthFieldName } from '@shared/types/auth';
import { useCallback, useState } from 'react';
import { ERRORS } from '../auth.constants';

type FormErrors = Partial<Record<AuthFieldName, string>>;
type AuthFormData = Partial<Record<AuthFieldName, string>>;

export const useFormValidation = (isFormSignUp: boolean) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback(
    (formData: FormData) => {
      const values = Object.fromEntries(formData.entries()) as AuthFormData;
      const validationErrors = validateAuthForm(values, isFormSignUp);
      const isValid = Object.keys(validationErrors).length === 0;

      setErrors(validationErrors);
      return isValid;
    },
    [isFormSignUp],
  );

  const validateField = useCallback((name: AuthFieldName, value: string) => {
    if (!value) return;

    const error = validateAuthField(name, value);

    setErrors((prev) => {
      if (prev[name] === error) return prev;
      return { ...prev, [name]: error || '' };
    });
  }, []);

  const setError = useCallback((fieldName: AuthFieldName, errorMessage: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  }, []);

  const clearErrors = useCallback(() => setErrors({}), []);

  const clearFieldError = useCallback((fieldName: AuthFieldName) => {
    setErrors((prev) => {
      if (!(fieldName in prev)) return prev;
      const errors = { ...prev };
      delete errors[fieldName];

      return errors;
    });
  }, []);

  return { validate, validateField, setError, errors, clearErrors, clearFieldError };
};

function validateAuthForm(values: AuthFormData, isFormSignUp: boolean) {
  const errors: FormErrors = {};

  const fieldsToValidate: AuthFieldName[] = isFormSignUp
    ? ['username', 'email', 'password']
    : ['email', 'password'];

  fieldsToValidate.forEach((field) => {
    const error = validateAuthField(field, values[field]);
    if (error) errors[field] = error;
  });

  return errors;
}

function validateAuthField(fieldName: AuthFieldName, value: string = ''): string | undefined {
  switch (fieldName) {
    case 'username':
      if (value.length < 3) return ERRORS.username;
      return;
    case 'email':
      if (!value.includes('@')) return ERRORS.email;
      return;
    case 'password':
      if (value.length < 6) return ERRORS.password;
      return;
    default:
      return;
  }
}
