import { cn } from '@utils/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputTitle?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputTitle, labelClassName, inputClassName, error, ...rest }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        {inputTitle && <span className="text-secondary-text ml-2 text-sm">{inputTitle}</span>}
        <label
          className={cn(
            'bg-secondary-bg text-muted-text w-full rounded-md',
            labelClassName,
            error && 'ring-error border-error rounded-md border-1',
          )}
        >
          <input
            ref={ref}
            {...rest}
            className={cn(
              'placeholder:text-muted-text text-secondary-text w-full cursor-text p-2 placeholder:italic focus:outline-none',
              inputClassName,
            )}
          />
        </label>
        {error && <span className="text-error ml-2 text-xs font-medium">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
