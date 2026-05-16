import * as React from 'react';
import { cn } from '@/src/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[100px] w-full rounded-lg border border-pearl/30 bg-pearl/5 px-4 py-3 text-sm text-pearl shadow-sm transition-colors resize-none',
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
Textarea.displayName = 'Textarea';

export { Textarea };
