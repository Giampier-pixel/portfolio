import * as React from 'react';
import { cn } from '@/src/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-11 w-full rounded-lg border border-pearl/30 bg-pearl/5 px-4 py-2 text-sm text-pearl shadow-sm transition-colors',
          'placeholder:text-platinum/60',
          'focus:outline-none focus:ring-2 focus:ring-rosegold focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-red-500',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
