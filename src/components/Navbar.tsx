'use client';

import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { useScrollPosition } from '@/src/hooks/useScrollPosition';
import { useUIStore } from '@/src/lib/uiStore';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/src/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/src/components/ui/sheet';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contacts', href: '#contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollPosition = useScrollPosition();
  const scrolled = scrollPosition > 20;
  const openPalette = useUIStore((s) => s.openPalette);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy/60 light:bg-white/80 backdrop-blur-xl border-b border-pearl/10 light:border-slate-200 shadow-2xl light:shadow-md py-3' : 'bg-transparent py-6'
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="#home"
              className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pearl to-rosegold hover:opacity-80 transition-opacity"
            >
              Giampier Aliaga
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:space-x-8 md:items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-pearl/90 light:text-slate-700 hover:text-rosegold light:hover:text-rosegold px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <button
              type="button"
              onClick={openPalette}
              className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-pearl/15 light:border-slate-300 text-platinum/70 light:text-slate-600 hover:text-rosegold hover:border-rosegold/40 transition-colors text-xs"
              aria-label="Abrir paleta de comandos"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Buscar</span>
              <kbd className="text-[10px] font-medium border border-pearl/15 light:border-slate-300 rounded px-1.5 py-0.5 ml-1">
                ⌘ K
              </kbd>
            </button>
            <div className="pl-4 border-l border-platinum/20 light:border-slate-300">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center md:hidden gap-2">
            <button
              type="button"
              onClick={openPalette}
              className="p-2 rounded-lg text-pearl/80 light:text-slate-600 hover:text-rosegold transition-colors"
              aria-label="Abrir paleta de comandos"
            >
              <Search className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-navy">
                <SheetHeader>
                  <SheetTitle className="text-pearl">Menú</SheetTitle>
                </SheetHeader>
                <ul className="mt-8 space-y-2">
                  {NAV_LINKS.map((link) => (
                    <li key={link.name}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          className="block px-3 py-3 rounded-md text-base font-medium text-pearl hover:text-rosegold hover:bg-platinum/5"
                        >
                          {link.name}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
