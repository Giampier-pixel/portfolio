import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { PORTFOLIO_CONTEXT } from '@/src/lib/portfolio-context';

export const runtime = 'nodejs';
export const maxDuration = 30;

const SYSTEM_PROMPT = `
Eres el asistente IA del portafolio de Giampier Aliaga.

Responde SOLO con la información del bloque "PORTFOLIO" más abajo.
Si te preguntan algo que no esté ahí (clima, deportes, noticias, opiniones personales, etc.):
- Recházalo amablemente
- Sugiere contactar a Giampier directamente
- No inventes información

Responde en el idioma de la pregunta (español por defecto). Sé conciso, profesional y amable.
Máximo 3 párrafos cortos por respuesta.

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
