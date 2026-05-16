import type { Project } from '@/src/types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    category: 'frontend',
    title: 'E-commerce Dashboard',
    description:
      'Un panel de administración moderno construido con React y Tailwind. Incluye gestión de inventario, analíticas en tiempo real y componentes interactivos.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    repo: '#',
    demo: '#',
    tags: ['React', 'Tailwind', 'Recharts'],
  },
  {
    id: '2',
    category: 'frontend',
    title: 'App de Finanzas PFE',
    description:
      'Aplicación web progresiva orientada al control de finanzas personales. Interfaz minimalista, cálculos en tiempo real y soporte offline.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    repo: '#',
    demo: '#',
    tags: ['Next.js', 'TypeScript', 'Prisma'],
  },
  {
    id: '3',
    category: 'backend',
    title: 'API de Microservicios Node',
    description:
      'Arquitectura de microservicios robusta para gestión de usuarios y pedidos. Autenticación JWT, rate limiting y documentación Swagger.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    repo: '#',
    demo: '#',
    tags: ['Node.js', 'Express', 'MongoDB'],
  },
  {
    id: '4',
    category: 'backend',
    title: 'Sistema de Reservas en la Nube',
    description:
      'Servicio backend desplegado en AWS para la gestión de reservas de hoteles. Utiliza colas de mensajería para actualizaciones asíncronas.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    repo: '#',
    demo: '#',
    tags: ['Python', 'AWS', 'PostgreSQL'],
  },
];

export async function fetchProjects(): Promise<Project[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return PROJECTS;
}
