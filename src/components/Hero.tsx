'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/button';

const SKILLS = ['HTML5', 'CSS', 'Javascript', 'Node.js', 'React', 'Git', 'Github'];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-navy flex flex-col pt-24 overflow-hidden"
    >
      <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-rosegold/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-platinum/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="z-10"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pearl via-pearl to-rosegold">
              Hello<span className="text-rosegold">.</span>
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-[2px] bg-rosegold" />
              <h2 className="text-3xl md:text-4xl text-pearl font-medium tracking-wide">I&apos;m Giampier</h2>
            </div>

            <h3 className="text-5xl md:text-[4.5rem] font-bold text-pearl mb-12 tracking-tight leading-tight">
              Software Developer
            </h3>

            <div className="flex flex-wrap gap-6">
              <Button asChild size="lg">
                <Link href="#projects">Ver proyectos</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#contact">Resume</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center items-center h-[400px] md:h-[600px] mt-10 md:mt-0"
          >
            <div className="absolute left-8 top-1/3 text-rosegold/40 transform -translate-y-1/2">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
                <path d="M9 18l-6-6 6-6" className="transform translate-x-2 opacity-50" />
              </svg>
            </div>
            <div className="absolute right-8 bottom-1/4 text-rosegold/40">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
                <path d="M15 18l6-6-6-6" className="transform -translate-x-2 opacity-50" />
              </svg>
            </div>

            <div className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-[12px] md:border-[16px] border-rosegold opacity-90 shadow-[0_0_80px_rgba(183,110,121,0.2)]" />

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative z-20 w-full h-full flex flex-col justify-end items-center md:-mb-12"
            >
              <div className="w-[70%] max-w-[320px] aspect-[4/5] relative z-30 flex items-end justify-center">
                <Image
                  src="/hero.png"
                  alt="Foto de Giampier Aliaga"
                  fill
                  priority
                  sizes="(max-width: 768px) 70vw, 320px"
                  className="object-contain object-bottom drop-shadow-[0_10px_30px_rgba(4,25,28,0.5)]"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="w-full mt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-between gap-6 overflow-x-auto text-platinum/40 font-medium text-sm md:text-lg tracking-[0.2em] md:tracking-[0.3em] uppercase">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="hover:text-platinum/80 transition-colors cursor-default whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
