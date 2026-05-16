import { Github, Linkedin, Mail } from 'lucide-react';

const SOCIALS = [
  {
    Icon: Mail,
    href: 'mailto:giampieraliagaesquivel@gmail.com?subject=Hola%20Giampier%2C%20vengo%20desde%20tu%20portafolio',
    label: 'Enviar email a Giampier',
  },
  {
    Icon: Github,
    href: 'https://github.com/Giampier-pixel',
    label: 'Perfil de GitHub',
  },
  {
    Icon: Linkedin,
    href: 'https://www.linkedin.com/in/giampier-aliaga-esquivel',
    label: 'Perfil de LinkedIn',
  },
];

export function Footer() {
  return (
    <footer className="bg-navy light:bg-slate-100 py-12 px-4 border-t border-pearl/5 light:border-slate-200">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
        <div>
          <h2 className="text-xl font-bold text-pearl tracking-tight mb-2">Giampier Aliaga</h2>
          <p className="text-platinum/60 light:text-slate-600 text-sm">
            Diseñado con amor, todos los derechos reservados para Giampier Aliaga.
          </p>
        </div>

        <div className="flex items-center gap-4 mt-2">
          {SOCIALS.map(({ Icon, href, label }) => {
            const isExternal = href.startsWith('http');
            return (
              <a
                key={label}
                href={href}
                {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                className="w-10 h-10 rounded-full bg-pearl light:bg-navy hover:bg-rosegold light:hover:bg-rosegold flex items-center justify-center text-navy light:text-pearl hover:text-pearl transition-colors"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
