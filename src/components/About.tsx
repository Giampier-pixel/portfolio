'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Code2,
  LayoutTemplate,
  Database,
  Cloud,
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';

const SOCIALS = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn' },
  { Icon: Github, href: '#', label: 'GitHub' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
];

const STACK = [
  { Icon: LayoutTemplate, title: 'Frontend', items: ['React & React Native', 'TypeScript / JavaScript', 'Tailwind CSS', 'Next.js / HTML5 / CSS3'] },
  { Icon: Code2, title: 'Backend', items: ['Node.js / Express', 'Python / Django', 'API REST & GraphQL', 'Microservicios'] },
  { Icon: Database, title: 'Database', items: ['PostgreSQL & MySQL', 'MongoDB (NoSQL)', 'Redis', 'Prisma / ORM'] },
  { Icon: Cloud, title: 'Cloud & DevOps', items: ['AWS / Google Cloud', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Vercel / Netlify'] },
];

export function About() {
  return (
    <section id="about" className="py-24 px-4 bg-pearl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rosegold/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-navy/5 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-navy/90 backdrop-blur-xl border border-navy/10 rounded-[2rem] p-6 flex flex-col items-center text-center shadow-2xl h-full relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-rosegold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-full aspect-[4/5] rounded-[1.5rem] bg-platinum/5 mb-8 overflow-hidden relative flex items-center justify-center">
              <Image
                src="/about.jpg"
                alt="Fotografía profesional de Giampier Aliaga"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-pearl mb-4 tracking-wider uppercase">Giampier Aliaga</h2>

            <p className="text-platinum/70 text-sm leading-relaxed mb-8 px-4">
              Crea experiencias fluidas a través de web, móvil y backend con un enfoque sólido.
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-3 rounded-full border border-pearl/10 text-platinum/70 hover:text-rosegold hover:border-rosegold/50 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <Button asChild className="mt-auto w-full" size="lg">
              <Link href="#contact">Conectar</Link>
            </Button>
          </motion.div>

          <div className="md:col-span-8 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-navy/90 backdrop-blur-xl border border-navy/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-rosegold/20 blur-[50px] rounded-full group-hover:bg-rosegold/30 transition-colors duration-500" />
              <h3 className="text-2xl md:text-3xl font-medium text-pearl mb-6">
                ¡Hola! Soy <span className="font-semibold text-rosegold">Giampier Aliaga</span>,
              </h3>
              <div className="space-y-4 text-base md:text-lg text-platinum/80 leading-relaxed font-light">
                <p>
                  un desarrollador apasionado por construir experiencias digitales significativas. Con un enfoque en código limpio, diseño pensado y soluciones escalables, ayudo a transformar ideas en productos que la gente ama usar.
                </p>
                <p>
                  Me especializo en desarrollo web, aplicaciones full-stack y arquitecturas cloud, combinando creatividad con experiencia técnica para entregar un trabajo funcional y estructurado.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-navy/90 backdrop-blur-xl border border-navy/10 rounded-[2rem] p-8 md:p-10 flex-grow shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-rosegold/10 blur-[60px] rounded-full group-hover:bg-rosegold/20 transition-colors duration-500" />
              <h4 className="text-2xl font-medium text-pearl mb-8">Mi Stack Tecnológico</h4>

              <div className="grid sm:grid-cols-2 gap-8">
                {STACK.map(({ Icon, title, items }) => (
                  <div key={title}>
                    <div className="flex items-center gap-3 mb-4 text-platinum">
                      <Icon className="w-5 h-5 text-rosegold" />
                      <h5 className="font-medium text-lg">{title}</h5>
                    </div>
                    <ul className="space-y-2 text-platinum/70 text-sm">
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
