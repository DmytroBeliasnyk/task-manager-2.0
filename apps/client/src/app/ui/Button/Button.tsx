import clsx from 'clsx/lite';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...rest }: ButtonProps) => {
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
