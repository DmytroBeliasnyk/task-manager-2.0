import { Button } from '@ui/button/Button';
import { AUTH_TEXTS } from '../auth.constants';
import type { FormType } from '../auth.types';

export const PromoSection = ({
  isFormSignUp,
  setForm,
}: {
  isFormSignUp: boolean;
  setForm: (form: FormType) => void;
}) => {
  const mobileContent = {
    title: isFormSignUp ? AUTH_TEXTS.signUp.title : AUTH_TEXTS.signIn.title,
    subTitle: isFormSignUp ? AUTH_TEXTS.signUp.subTitle : AUTH_TEXTS.signIn.subTitle,
  };

  const desktopContent = {
    title: isFormSignUp ? AUTH_TEXTS.signIn.title : AUTH_TEXTS.signUp.title,
    subTitle: isFormSignUp ? AUTH_TEXTS.signIn.subTitle : AUTH_TEXTS.signUp.subTitle,
  };

  return (
    <div
      className={`flex flex-col items-center gap-2 text-center transition-transform duration-700 ease-in-out ${isFormSignUp ? 'sm:translate-x-full' : 'sm:translate-x-0'}`}
    >
      <h1 className="text-secondary-text text-2xl font-bold">
        <span className="sm:hidden">{mobileContent.title}</span>
        <span className="hidden sm:inline">{desktopContent.title}</span>
      </h1>
      <p className="text-muted-text w-8/10">
        <span className="sm:hidden">{mobileContent.subTitle}</span>
        <span className="hidden sm:inline">{desktopContent.subTitle}</span>
      </p>
      <Button
        intent="outline"
        className="hidden bg-transparent sm:block"
        onClick={() => setForm(isFormSignUp ? 'signin' : 'signup')}
      >
        {isFormSignUp ? AUTH_TEXTS.signIn.switchBtn : AUTH_TEXTS.signUp.switchBtn}
      </Button>
    </div>
  );
};
