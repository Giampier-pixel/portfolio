# Portafolio · Giampier Aliaga

Portafolio fullstack con asistente IA integrado.

## Stack

- **Next.js 15** (App Router, Server Components, Server Actions)
- **React 19** + **TypeScript** strict
- **Tailwind CSS v4** + **shadcn/ui**
- **Zustand** (UI state) + **TanStack Query** (server state)
- **Motion** (animaciones)
- **Vercel AI SDK v6** + **Gemini 2.5 Flash** (chat)
- **next-themes**, **sonner**, **react-hook-form** + **zod**
- **Edge Middleware** (detección de idioma)

## Características

- Landing single-page con secciones animadas (Hero / About / Projects / Contact)
- Asistente IA grounded al contexto del portafolio (no responde fuera de tema)
- Formulario de contacto con Server Action + validación isomórfica (Zod en cliente y servidor)
- Tema dark/light SSR-safe vía `next-themes`
- SEO completo: metadata, OpenGraph, Twitter cards
- Accesibilidad: skip-to-content, ARIA roles, focus visible, navegación por teclado

## Desarrollo local

**Requisitos:** Node.js 20+

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local y pon tu GEMINI_API_KEY de https://aistudio.google.com/apikey

# 3. Arrancar
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Correr el build |
| `npm run lint` | Type-check con `tsc --noEmit` |

## Estructura

```
app/                  Next.js App Router
  layout.tsx          Root layout + metadata
  page.tsx            Landing
  providers.tsx       QueryClient + ThemeProvider
  api/chat/route.ts   Endpoint AI (stream)
actions/
  contact.ts          Server Action del formulario
middleware.ts         Edge middleware
src/
  components/         Secciones (Hero, About, Projects, Contact, PortfolioChat, Navbar, Footer)
  components/ui/      Primitivos shadcn
  hooks/              useDebounce, useScrollPosition, useMediaQuery
  lib/                Schemas, queryClient, utils, portfolio-context, projects
  types/              Tipos globales
```

## Personalizar el asistente IA

El contexto que el LLM conoce está en `src/lib/portfolio-context.ts`. Edita ese archivo (bio, proyectos, skills, contacto) y el asistente queda actualizado al siguiente request — sin redeploy.

## Deploy

Optimizado para [Vercel](https://vercel.com): `vercel` desde la raíz del repo. Recuerda configurar `GEMINI_API_KEY` en el dashboard de Vercel.

---

© Giampier Aliaga
