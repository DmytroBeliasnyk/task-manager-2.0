import { useValidateUserData } from '@hooks/useFormValidation';
import type { AuthFieldName } from '@shared/types/auth';
import { Button } from '@ui/button/Button';
import { Input } from '@ui/input/Input';
import { useCallback, useEffect, useState } from 'react';
import { FaGithub, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AUTH_TEXTS } from '../auth.constants';
import { useSubmitForm } from '../hooks/useSubmitForm';

export const AuthForm = ({ isFormSignUp }: { isFormSignUp: boolean }) => {
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { validate, validateField, setError, errors, clearErrors, clearFieldError } =
    useValidateUserData();

  const { submitForm, isLoading } = useSubmitForm(isFormSignUp);
  const navigate = useNavigate();

  useEffect(() => {
    clearErrors();
  }, [isFormSignUp, clearErrors]);

  const formAction = useCallback(
    async (formData: FormData) => {
      if (!validate(formData)) return;

      const { isSuccess, errors, message } = await submitForm(formData);
      if (isSuccess) {
        clearErrors();
        navigate('/');
      } else {
        if (errors) {
          Object.entries(errors).forEach(([key, error]) => {
            const field = key as AuthFieldName;
            setError(field, error);
          });
        } else {
          setGeneralError(message);
        }
      }

      return isSuccess;
    },
    [validate, submitForm, clearErrors, navigate],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const isSuccess = await formAction(formData);
    if (isSuccess) form.reset();
  };

  return (
    <div
      className={`glass-card flex w-full items-center justify-center self-start rounded-3xl p-4 text-xl transition-transform duration-700 ease-in-out sm:h-full sm:rounded-none sm:text-base ${isFormSignUp ? 'sm:-translate-x-full' : 'sm:translate-x-0'}`}
    >
      <form
        onSubmit={handleSubmit}
        key={isFormSignUp ? 'signup' : 'signin'}
        className="flex flex-1 flex-col items-center gap-4 sm:max-w-3/4"
        onChange={() => {
          if (generalError) setGeneralError(null);
        }}
        noValidate
      >
        <h2 className="text-3xl font-bold sm:text-2xl">
          {isFormSignUp ? AUTH_TEXTS.signUp.formTitle : AUTH_TEXTS.signIn.formTitle}
        </h2>
        <div className="flex w-full items-center justify-center gap-3 py-4 text-2xl sm:text-base">
          <Button
            intent="ghost"
            size="icon"
            type="button"
            className="text-3xl sm:text-xl"
            onClick={() => alert("Doesn't implemented.")}
          >
            <FaGooglePlusG />
          </Button>
          <Button
            intent="ghost"
            size="icon"
            type="button"
            onClick={() => alert("Doesn't implemented.")}
          >
            <FaGithub />
          </Button>
          <Button
            intent="ghost"
            size="icon"
            type="button"
            onClick={() => alert("Doesn't implemented.")}
          >
            <FaLinkedinIn />
          </Button>
        </div>
        {isFormSignUp && (
          <Input
            type={'text'}
            name={'username'}
            placeholder={'Username'}
            error={errors.username}
            onBlur={(e) => {
              if (e.relatedTarget?.hasAttribute('data-auth-switch')) return;
              validateField('username', e.target.value);
            }}
            onChange={() => errors.username && clearFieldError('username')}
          />
        )}
        <Input
          type={'email'}
          name={'email'}
          placeholder={'Email'}
          error={errors.email}
          onBlur={(e) => {
            if (e.relatedTarget?.hasAttribute('data-auth-switch')) return;
            validateField('email', e.target.value);
          }}
          onChange={() => errors.email && clearFieldError('email')}
        />
        <Input
          type={'password'}
          name={'password'}
          placeholder={'Password'}
          error={errors.password}
          onBlur={(e) => {
            if (e.relatedTarget?.hasAttribute('data-auth-switch')) return;
            validateField('password', e.target.value);
          }}
          onChange={() => errors.password && clearFieldError('password')}
        />
        {!isFormSignUp && (
          <a
            href="#"
            className="text-secondary-text hover:text-primary-text"
            onClick={() => alert("Doesn't implemented.")}
          >
            {AUTH_TEXTS.forgotPassword}
          </a>
        )}
        {generalError && <span className="text-error text-sm font-medium">{generalError}</span>}
        <Button className="w-1/2" disabled={isLoading}>
          {isFormSignUp ? AUTH_TEXTS.signUp.submitBtn : AUTH_TEXTS.signIn.submitBtn}
        </Button>
      </form>
    </div>
  );
};
