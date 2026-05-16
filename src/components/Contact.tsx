'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { sendContactEmail } from '@/actions/contact';
import { contactSchema, type ContactFormData } from '@/src/lib/schemas';
import type { ActionResult } from '@/src/types';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Label } from '@/src/components/ui/label';

const initialState: ActionResult = { success: false, error: '' };

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, isPending] = useActionState(sendContactEmail, initialState);

  const {
    register,
    formState: { errors },
    reset,
    getValues,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    if (state.success) {
      const { name } = getValues();
      toast.success(`¡Gracias ${name}! Tu mensaje ha sido enviado.`);
      reset();
      formRef.current?.reset();
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, getValues, reset]);

  return (
    <section id="contact" className="py-24 px-4 bg-pearl flex justify-center">
      <div className="max-w-6xl w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy rounded-[2rem] overflow-hidden relative border border-platinum/20 shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute w-[800px] h-[800px] border-[1px] border-rosegold rounded-full blur-[2px] -bottom-[400px] -left-[200px]" />
            <div className="absolute w-[600px] h-[600px] border-[1px] border-rosegold rounded-full blur-[1px] -bottom-[200px] -left-[100px]" />
            <div className="absolute w-[1000px] h-[1000px] border-[1px] border-platinum rounded-full blur-[3px] -bottom-[500px] -left-[300px]" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-16 relative z-10 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-rosegold tracking-tight leading-tight">
                Trayendo tus ideas a la vida.
                <br />
                <span className="text-pearl">Hagamos tu visión realidad</span>
              </h2>
              <p className="text-platinum/70 text-lg">
                ¿Tienes un proyecto en mente o solo quieres charlar? ¡Conectemos!
              </p>
            </div>

            <div className="bg-[#020d0f]/50 backdrop-blur-md p-8 rounded-2xl border border-pearl/5 shadow-inner">
              <form
                ref={formRef}
                action={action}
                noValidate
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre"
                    disabled={isPending}
                    aria-invalid={!!errors.name}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p role="alert" className="text-red-400 text-xs">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    disabled={isPending}
                    aria-invalid={!!errors.email}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p role="alert" className="text-red-400 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Escribe tu mensaje aquí..."
                    disabled={isPending}
                    aria-invalid={!!errors.message}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p role="alert" className="text-red-400 text-xs">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="outline" disabled={isPending} aria-busy={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar'
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
