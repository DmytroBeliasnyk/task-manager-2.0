import clsx from 'clsx/lite';
import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  const buttonClassName: string = clsx(
    'py-2 px-4 rounded-md bg-highlight-bg outline-none cursor-pointer',
    'font-xl font-semibold text-text-secondary',
    'hover:bg-focus-bg transition-colors',
  );

  return (
    <button {...rest} className={buttonClassName}>
      {children}
    </button>
  );
};
