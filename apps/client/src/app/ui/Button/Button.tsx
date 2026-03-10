import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-medium whitespace-nowrap transition-transform active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50',
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
    },
    defaultVariants: {
      intent: 'primary',
      size: 'md',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
  };

export const Button = ({ intent, size, className, children, ...rest }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ intent, size, className }))} {...rest}>
      {children}
    </button>
  );
};
