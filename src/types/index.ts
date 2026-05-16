export type TechTag =
  | 'React'
  | 'Next.js'
  | 'TypeScript'
  | 'Node.js'
  | 'PostgreSQL'
  | 'MongoDB'
  | 'Tailwind'
  | 'Express'
  | 'Recharts'
  | 'Prisma'
  | 'AWS'
  | 'Python';

export type ProjectCategory = 'frontend' | 'backend';

export interface Project {
  id: string;
  category: ProjectCategory;
  title: string;
  description: string;
  image: string;
  repo: string;
  demo: string;
  tags: TechTag[];
}

export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export type RequireFields<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
