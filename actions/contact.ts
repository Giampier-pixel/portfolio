'use server';

import { Resend } from 'resend';
import { contactSchema } from '@/src/lib/schemas';
import type { ActionResult } from '@/src/types';

const CONTACT_TO = 'giampieraliagaesquivel@gmail.com';
const CONTACT_FROM = 'Portafolio Giampier <onboarding@resend.dev>';

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY no configurada');
    return { success: false, error: 'El servicio de correo no está configurado.' };
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Nuevo mensaje del portafolio · ${name}`,
      html: renderEmail({ name, email, message }),
      text: `${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error('[contact] resend error:', error);
      return { success: false, error: 'No se pudo enviar el mensaje. Inténtalo más tarde.' };
    }

    return { success: true, data: undefined };
  } catch (err) {
    console.error('[contact] excepción:', err);
    return { success: false, error: 'Error al enviar el mensaje. Inténtalo más tarde.' };
  }
}

function renderEmail({ name, email, message }: { name: string; email: string; message: string }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#04191c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#e8e6e1;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#04191c;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0a242a;border:1px solid rgba(232,230,225,0.08);border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 16px 32px;border-bottom:1px solid rgba(232,230,225,0.08);">
                <div style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#b76e79;font-weight:600;">Portafolio · Nuevo mensaje</div>
                <h1 style="margin:12px 0 0 0;font-size:22px;color:#f5f4f0;font-weight:600;">${safeName}</h1>
                <a href="mailto:${safeEmail}" style="color:#b76e79;text-decoration:none;font-size:14px;">${safeEmail}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px 32px;">
                <p style="margin:0;line-height:1.6;color:#d6d3cc;white-space:pre-wrap;">${safeMessage}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;border-top:1px solid rgba(232,230,225,0.08);font-size:12px;color:rgba(232,230,225,0.5);">
                Responde directamente a este correo para contactar a ${safeName}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
