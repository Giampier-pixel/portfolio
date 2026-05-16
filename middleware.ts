import { NextResponse, type NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['es', 'en'] as const;
const DEFAULT_LOCALE = 'es';

export function middleware(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') ?? '';
  const preferred = acceptLanguage.split(',')[0]?.split('-')[0] ?? DEFAULT_LOCALE;
  const locale = (SUPPORTED_LOCALES as readonly string[]).includes(preferred) ? preferred : DEFAULT_LOCALE;

  const response = NextResponse.next();
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
