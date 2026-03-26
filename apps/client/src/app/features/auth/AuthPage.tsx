import { useState } from 'react';
import type { FormType } from './auth.types';
import { AuthForm } from './components/AuthForm';
import { FormSwitcher } from './components/FormSwitcher';
import { PromoSection } from './components/PromoSection';

export const AuthPage = () => {
  const [form, setForm] = useState<FormType>('signup');
  const isFormSignUp = form === 'signup';

  return (
    <div className="bg-gradient text-primary-text grid min-h-dvh grid-cols-1 grid-rows-[auto_auto_1fr] items-center justify-items-center gap-6 px-8 pt-4 text-base sm:grid-cols-2 sm:grid-rows-1 sm:justify-items-normal sm:gap-0 sm:p-0">
      <FormSwitcher isFormSignUp={isFormSignUp} setForm={setForm} />
      <PromoSection isFormSignUp={isFormSignUp} setForm={setForm} />
      <AuthForm isFormSignUp={isFormSignUp} />
    </div>
  );
};
