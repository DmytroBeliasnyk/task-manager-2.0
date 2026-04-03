import { cn } from '@utils/cn';
import { forwardRef, type InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...rest }, ref) => {
  return (
    <div className="flex w-full flex-col gap-1">
      <label
        className={cn(
          'bg-secondary-bg text-muted-text w-full rounded-md',
          error && 'ring-error border-error rounded-md border-1',
        )}
      >
        <input
          ref={ref}
          className="placeholder:text-muted-text text-secondary-text w-full cursor-text p-2 placeholder:italic focus:outline-none"
          {...rest}
        />
      </label>
      {error && <span className="text-error ml-2 text-xs font-medium">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
