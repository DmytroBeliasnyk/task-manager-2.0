import { FORM_ERRORS } from '@consts/errors';
import type { FieldName, FormErrors, FormFields } from '@f-types/form';
import { useCallback, useState } from 'react';

export const useValidateUserData = () => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = useCallback((formData: FormData) => {
    const values = Object.fromEntries(formData.entries()) as FormFields;
    const validationErrors = validateForm(values);
    const isValid = Object.keys(validationErrors).length === 0;

    setErrors(validationErrors);
    return isValid;
  }, []);

  const validateField = useCallback((name: FieldName, value: string) => {
    if (!value) return;

    const error = validateFormField(name, value);

    setErrors((prev) => {
      if (prev[name] === error) return prev;
      return { ...prev, [name]: error || '' };
    });
  }, []);

  const setError = useCallback((fieldName: FieldName, errorMessage: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  }, []);

  const clearErrors = useCallback(() => setErrors({}), []);

  const clearFieldError = useCallback((fieldName: FieldName) => {
    setErrors((prev) => {
      if (!(fieldName in prev)) return prev;
      const errors = { ...prev };
      delete errors[fieldName];

      return errors;
    });
  }, []);

  return { validate, validateField, setError, errors, clearErrors, clearFieldError };
};

function validateForm(values: FormFields) {
  const errors: FormErrors = {};

  const fields = Object.keys(values) as FieldName[];

  fields.forEach((field) => {
    const error = validateFormField(field, values[field], values.password);
    if (error) errors[field] = error;
  });

  return errors;
}

function validateFormField(
  fieldName: FieldName,
  value: string = '',
  password: string = '',
): string | undefined {
  switch (fieldName) {
    case 'username':
      if (value.length < 3) return FORM_ERRORS.username;
      return;
    case 'email':
      if (!value.includes('@')) return FORM_ERRORS.email;
      return;
    case 'password':
      if (value.length < 6) return FORM_ERRORS.password;
      return;
    case 'confirmPassword':
      if (value !== password) return FORM_ERRORS.confirmPassword;
      return;
    default:
      return;
  }
}
