'use client';

import { Toaster as Sonner, type ToasterProps } from 'sonner';

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-navy group-[.toaster]:text-pearl group-[.toaster]:border-pearl/20 group-[.toaster]:shadow-2xl backdrop-blur-md',
          description: 'group-[.toast]:text-platinum/70',
          actionButton: 'group-[.toast]:bg-rosegold group-[.toast]:text-pearl',
          cancelButton: 'group-[.toast]:bg-pearl/10 group-[.toast]:text-pearl',
          success: 'group-[.toast]:!border-green-500/30 group-[.toast]:!text-green-400',
          error: 'group-[.toast]:!border-red-500/30 group-[.toast]:!text-red-400',
        },
      }}
      {...props}
    />
  );
}
