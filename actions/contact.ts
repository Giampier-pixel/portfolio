'use server';

import { contactSchema } from '@/src/lib/schemas';
import type { ActionResult } from '@/src/types';

export async function sendContactEmail(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return { success: false, error: firstIssue?.message ?? 'Datos inválidos' };
  }

  try {
    // Aquí se integra el envío real con Resend, Nodemailer, etc.
    // Por ahora, log + simulación de latencia para no bloquear la UX local.
    console.log('[contact] mensaje recibido:', parsed.data);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: 'Error al enviar el mensaje. Inténtalo más tarde.' };
  }
}
