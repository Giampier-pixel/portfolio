'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Command } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import {
  Home,
  User,
  FolderGit2,
  Mail,
  MessageSquare,
  Sun,
  Moon,
  Github,
  Linkedin,
  FileDown,
  Search,
} from 'lucide-react';
import { useUIStore } from '@/src/lib/uiStore';

type Action = {
  id: string;
  label: string;
  hint?: string;
  shortcut?: string;
  group: 'Navegación' | 'Tema' | 'Acciones' | 'Enlaces';
  icon: React.ComponentType<{ className?: string }>;
  perform: () => void;
};

export function CommandPalette() {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const isOpen = useUIStore((s) => s.isPaletteOpen);
  const open = useUIStore((s) => s.openPalette);
  const close = useUIStore((s) => s.closePalette);
  const togglePalette = useUIStore((s) => s.togglePalette);
  const openChat = useUIStore((s) => s.openChat);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isPaletteShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const isChatShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'j';

      if (isPaletteShortcut) {
        event.preventDefault();
        togglePalette();
        return;
      }
      if (isChatShortcut) {
        event.preventDefault();
        openChat();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePalette, openChat]);

  const navigate = (hash: string) => {
    close();
    router.push(hash);
    requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const externalLink = (url: string) => {
    close();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const actions: Action[] = [
    { id: 'nav-home', label: 'Ir a Inicio', group: 'Navegación', icon: Home, perform: () => navigate('#home') },
    { id: 'nav-about', label: 'Ir a Sobre mí', group: 'Navegación', icon: User, perform: () => navigate('#about') },
    { id: 'nav-projects', label: 'Ir a Proyectos', group: 'Navegación', icon: FolderGit2, perform: () => navigate('#projects') },
    { id: 'nav-contact', label: 'Ir a Contacto', group: 'Navegación', icon: Mail, perform: () => navigate('#contact') },
    {
      id: 'action-chat',
      label: 'Abrir asistente IA',
      hint: 'Pregúntale sobre Giampier',
      shortcut: '⌘ J',
      group: 'Acciones',
      icon: MessageSquare,
      perform: () => {
        close();
        openChat();
      },
    },
    {
      id: 'action-email',
      label: 'Enviar correo',
      hint: 'giampieraliagaesquivel@gmail.com',
      group: 'Acciones',
      icon: Mail,
      perform: () => externalLink('mailto:giampieraliagaesquivel@gmail.com?subject=Hola%20Giampier%2C%20vengo%20desde%20tu%20portafolio'),
    },
    {
      id: 'action-resume',
      label: 'Descargar CV',
      hint: 'Pronto disponible',
      group: 'Acciones',
      icon: FileDown,
      perform: () => navigate('#contact'),
    },
    {
      id: 'theme-light',
      label: 'Activar modo claro',
      group: 'Tema',
      icon: Sun,
      perform: () => {
        setTheme('light');
        close();
      },
    },
    {
      id: 'theme-dark',
      label: 'Activar modo oscuro',
      group: 'Tema',
      icon: Moon,
      perform: () => {
        setTheme('dark');
        close();
      },
    },
    {
      id: 'theme-toggle',
      label: `Cambiar a modo ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`,
      group: 'Tema',
      icon: resolvedTheme === 'dark' ? Sun : Moon,
      perform: () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        close();
      },
    },
    {
      id: 'link-github',
      label: 'Abrir GitHub',
      hint: 'github.com/Giampier-pixel',
      group: 'Enlaces',
      icon: Github,
      perform: () => externalLink('https://github.com/Giampier-pixel'),
    },
    {
      id: 'link-linkedin',
      label: 'Abrir LinkedIn',
      hint: 'linkedin.com/in/giampier-aliaga-esquivel',
      group: 'Enlaces',
      icon: Linkedin,
      perform: () => externalLink('https://www.linkedin.com/in/giampier-aliaga-esquivel'),
    },
  ];

  const grouped = actions.reduce<Record<string, Action[]>>((acc, action) => {
    (acc[action.group] ??= []).push(action);
    return acc;
  }, {});

  return (
    <Dialog.Root open={isOpen} onOpenChange={(next) => (next ? open() : close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-navy/60 light:bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[20%] z-[90] w-[92vw] max-w-xl -translate-x-1/2 rounded-2xl border border-pearl/10 light:border-slate-200 bg-navy light:bg-white shadow-2xl overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="sr-only">Paleta de comandos</Dialog.Title>
          <Command
            label="Paleta de comandos"
            className="flex flex-col"
            loop
          >
            <div className="flex items-center gap-3 px-4 border-b border-pearl/10 light:border-slate-200">
              <Search className="w-4 h-4 text-platinum/60 light:text-slate-500 shrink-0" />
              <Command.Input
                placeholder="Busca una acción, sección o enlace..."
                className="flex-1 h-12 bg-transparent text-pearl light:text-slate-900 placeholder:text-platinum/50 light:placeholder:text-slate-400 outline-none text-sm"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 text-[10px] font-medium text-platinum/60 light:text-slate-500 border border-pearl/15 light:border-slate-300 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-platinum/60 light:text-slate-500">
                Sin resultados.
              </Command.Empty>

              {Object.entries(grouped).map(([group, items]) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="px-2 py-2 text-[10px] uppercase tracking-[0.18em] font-semibold text-platinum/45 light:text-slate-500 [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-2"
                >
                  {items.map((action) => {
                    const Icon = action.icon;
                    return (
                      <Command.Item
                        key={action.id}
                        value={`${action.group} ${action.label} ${action.hint ?? ''}`}
                        onSelect={action.perform}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-sm text-pearl light:text-slate-800 data-[selected=true]:bg-rosegold/15 light:data-[selected=true]:bg-rosegold/10 data-[selected=true]:text-rosegold transition-colors"
                      >
                        <Icon className="w-4 h-4 text-platinum/70 light:text-slate-500 group-data-[selected=true]:text-rosegold" />
                        <span className="flex-1">{action.label}</span>
                        {action.hint && (
                          <span className="text-xs text-platinum/50 light:text-slate-400 truncate max-w-[180px]">
                            {action.hint}
                          </span>
                        )}
                        {action.shortcut && (
                          <kbd className="text-[10px] font-medium border border-pearl/15 light:border-slate-300 rounded px-1.5 py-0.5 text-platinum/60 light:text-slate-500">
                            {action.shortcut}
                          </kbd>
                        )}
                      </Command.Item>
                    );
                  })}
                </Command.Group>
              ))}
            </Command.List>

            <div className="px-4 py-2.5 border-t border-pearl/10 light:border-slate-200 flex items-center justify-between text-[11px] text-platinum/55 light:text-slate-500">
              <span>↑↓ para navegar · ↵ para seleccionar</span>
              <span className="flex items-center gap-1">
                <kbd className="border border-pearl/15 light:border-slate-300 rounded px-1.5 py-0.5">⌘ K</kbd>
                para abrir
              </span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
