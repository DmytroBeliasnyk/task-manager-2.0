import { Button } from '@ui/button/Button';
import { AUTH_TEXTS } from '../auth.constants';
import type { FormType } from '../auth.types';

export const FormSwitcher = ({
  isFormSignUp,
  setForm,
}: {
  isFormSignUp: boolean;
  setForm: (form: FormType) => void;
}) => {
  return (
    <nav className="glass-card relative flex w-4/5 rounded-3xl p-1 sm:hidden">
      <div
        className={`bg-accent absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-3xl transition-transform duration-500 ease-in-out ${
          isFormSignUp ? 'translate-x-0' : 'translate-x-full'
        }`}
      />
      <Button
        intent="ghost"
        transformed={false}
        className={`relative z-10 flex-1 transition-colors duration-500 ${
          isFormSignUp ? 'text-primary-text' : 'text-secondary-text'
        }`}
        onClick={() => setForm('signup')}
      >
        <span className="translate-z-px">{AUTH_TEXTS.signUp.switchBtn}</span>
      </Button>
      <Button
        intent="ghost"
        transformed={false}
        className={`relative z-10 flex-1 transition-colors duration-500 ${
          isFormSignUp ? 'text-secondary-text' : 'text-primary-text'
        }`}
        onClick={() => setForm('signin')}
      >
        <span className="translate-z-px">{AUTH_TEXTS.signIn.switchBtn}</span>
      </Button>
    </nav>
  );
};
