import { Button } from '@ui/button/Button';
import { FaGithub, FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa';
import { AUTH_TEXTS } from '../auth.constants';

export const AuthForm = ({ isFormSignUp }: { isFormSignUp: boolean }) => {
  return (
    <div
      className={`glass-card flex w-full items-center justify-center self-start rounded-3xl p-4 text-xl transition-transform duration-700 ease-in-out sm:h-full sm:rounded-none sm:text-base ${isFormSignUp ? 'sm:-translate-x-full' : 'sm:translate-x-0'}`}
    >
      <form className="flex flex-1 flex-col items-center gap-4 sm:max-w-3/4">
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
          <label className="input-label">
            <input
              className="input-field"
              type={'text'}
              name={'username'}
              placeholder={'Username'}
              required
            />
          </label>
        )}
        <label className="input-label">
          <input
            className="input-field"
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            required
          />
        </label>
        <label className="input-label">
          <input
            className="input-field"
            type={'password'}
            name={'password'}
            placeholder={'Password'}
            required
          />
        </label>
        {!isFormSignUp && (
          <a
            href="#"
            className="text-muted-text hover:text-primary-text"
            onClick={() => alert("Doesn't implemented.")}
          >
            Forgot your password?
          </a>
        )}
        <Button className="w-1/2">
          {isFormSignUp ? AUTH_TEXTS.signUp.submitBtn : AUTH_TEXTS.signIn.submitBtn}
        </Button>
      </form>
    </div>
  );
};
