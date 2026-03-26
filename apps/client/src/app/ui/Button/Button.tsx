import { cn } from '@utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium whitespace-nowrap disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      intent: {
        primary: 'bg-accent hover:bg-hover text-button-primary-text',
        outline:
          'inset-ring-2 inset-ring-accent/20  text-secondary-text hover:text-primary-text bg-primary-bg hover:bg-secondary-bg',
        ghost: 'text-secondary-text hover:text-primary-text hover:bg-secondary-bg',
      },
      size: {
        sm: 'h-8 px-2 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 py-4 text-lg',
        icon: 'size-10',
      },
      transformed: {
        true: 'transition-transform active:scale-[0.96]',
        false: '',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
      transformed: true,
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

export const Button = ({
  intent,
  size,
  transformed,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ intent, size, transformed, className }))} {...rest}>
      {children}
    </button>
  );
};
