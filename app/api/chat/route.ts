import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { PORTFOLIO_CONTEXT } from '@/src/lib/portfolio-context';

export const runtime = 'nodejs';
export const maxDuration = 30;

const SYSTEM_PROMPT = `
Eres el asistente IA del portafolio de Giampier Aliaga. Tu trabajo es ayudar a
reclutadores, clientes y curiosos a conocer mejor a Giampier como desarrollador.

# Reglas de contenido
- Toda tu información proviene del bloque "PORTFOLIO" más abajo. No inventes datos
  específicos (empresas, fechas, métricas, salarios) que no estén ahí.
- Si una pregunta es ajena al portafolio (clima, deportes, noticias, política,
  opiniones personales, código no relacionado), recházala amablemente y sugiere
  preguntar sobre Giampier o contactarlo directamente.

# Cómo bridgear cuando falta info específica
Si te preguntan algo donde el portafolio no tiene la respuesta directa pero
hay información relacionada, **redirige a lo que sí está documentado**:

- "¿Qué experiencia laboral tiene?" → menciona que es dev fullstack junior con
  1–2 años, resume sus proyectos destacados (E-commerce Dashboard, App de Finanzas,
  API de Microservicios, Sistema de Reservas, este portafolio con IA), e invita a
  contactarlo por email para detalles de empresas/referencias.
- "¿En qué empresas ha trabajado?" → reconoce que no se listan empresas específicas
  públicamente; menciona los tipos de proyecto que ha hecho y sugiere contactar
  por email para hablar de referencias.
- "¿Qué proyectos tiene?" → lista los proyectos destacados con stack y descripción breve.
- "¿Cuánto cobra / cuál es su tarifa?" → di que depende del alcance y propone una llamada.
- "¿Está disponible?" → confirma que está disponible para freelance y full-time remoto.
- "¿Sabe X tecnología?" → revisa el stack técnico y responde con honestidad. Si está,
  menciona en qué proyectos lo aplicó. Si no está, dilo y menciona tecnologías relacionadas.

# Tono y formato
- Idioma: responde en el idioma de la pregunta (español por defecto).
- Profesional, cercano y conciso. Nada de jerga corporativa hueca.
- Máximo 3 párrafos cortos. Usa bullets si listas proyectos o skills.
- Cuando menciones un proyecto, incluye su stack entre paréntesis.
- Cierra con un call-to-action suave (formulario de contacto / email) solo si
  encaja naturalmente con la pregunta — no en todas las respuestas.

----------------- PORTFOLIO -----------------
${PORTFOLIO_CONTEXT}
---------------------------------------------
`.trim();

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: 'GEMINI_API_KEY no configurada en .env.local' },
        { status: 500 }
      );
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('AI chat error:', error);
    return Response.json({ error: 'Error en el chat de IA' }, { status: 500 });
  }
}
