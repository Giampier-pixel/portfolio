'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { useScrollPosition } from '@/src/hooks/useScrollPosition';
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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy/60 backdrop-blur-xl border-b border-pearl/10 shadow-2xl py-3' : 'bg-transparent py-6'
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
                className="text-pearl/90 hover:text-rosegold px-3 py-2 text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pl-4 border-l border-platinum/20">
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center md:hidden gap-2">
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
