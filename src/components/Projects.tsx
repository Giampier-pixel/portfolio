'use client';

import { useState, useMemo, memo } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Search } from 'lucide-react';
import { useDebounce } from '@/src/hooks/useDebounce';
import { fetchProjects } from '@/src/lib/projects';
import { Input } from '@/src/components/ui/input';
import { Button } from '@/src/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui/tabs';
import type { Project, ProjectCategory } from '@/src/types';

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-navy/40 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-pearl/10 shadow-lg group hover:shadow-[0_20px_40px_rgba(183,110,121,0.15)] hover:border-rosegold/30 transition-all duration-300 flex flex-col relative h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rosegold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="h-56 overflow-hidden relative">
        <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      <div className="p-8 flex flex-col flex-grow relative z-20">
        <h3 className="text-2xl font-semibold text-pearl mb-3">{project.title}</h3>
        <p className="text-platinum/70 text-base mb-8 flex-grow leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-pearl/5 text-platinum text-xs rounded-full font-medium border border-pearl/10"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto">
          <Button asChild variant="outline" className="flex-1 rounded-full border-rosegold/50 hover:bg-rosegold/20 hover:border-rosegold">
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          </Button>
          <Button asChild variant="secondary" className="flex-1 rounded-full">
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Repo
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
});

export function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('backend');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const filteredProjects = useMemo(() => {
    const query = debouncedSearch.toLowerCase();
    return projects.filter((project) => {
      const matchesTab = project.category === activeTab;
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query));
      return matchesTab && matchesSearch;
    });
  }, [projects, activeTab, debouncedSearch]);

  return (
    <section id="projects" className="py-24 px-4 bg-navy relative overflow-hidden">
      <div className="absolute top-[30%] -left-[10%] w-[500px] h-[500px] bg-rosegold/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-[10%] w-[600px] h-[600px] bg-pearl/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pearl via-pearl to-rosegold">
            Proyectos
          </h2>
          <div className="w-16 h-1 bg-rosegold mx-auto rounded-full mb-10 shadow-[0_0_15px_rgba(183,110,121,0.5)]" />

          <div className="max-w-md mx-auto mb-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-platinum/60 w-5 h-5 pointer-events-none z-10" />
            <Input
              type="search"
              placeholder="Buscar por tecnología o título..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 rounded-2xl border-pearl/30"
              aria-label="Buscar proyectos"
            />
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as ProjectCategory)}>
            <TabsList>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-8 relative z-20 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [1, 2].map((n) => (
                <div key={n} className="bg-navy/40 rounded-[2rem] h-[450px] animate-pulse border border-pearl/10" />
              ))
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-center"
              >
                <p className="text-platinum/40 text-xl">No se encontraron proyectos con esos criterios.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
