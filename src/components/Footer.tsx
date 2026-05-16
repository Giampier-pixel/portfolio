import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy py-12 px-4 border-t border-pearl/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-6 text-center">
        
        <div>
          <h2 className="text-xl font-bold text-pearl tracking-tight mb-2">Giampier Aliaga</h2>
          <p className="text-platinum/60 text-sm">
            Diseñado con amor, todos los derechos reservados para Giampier Aliaga.
          </p>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <a href="mailto:hola@ejemplo.com" className="w-10 h-10 rounded-full bg-pearl hover:bg-rosegold flex items-center justify-center text-navy transition-colors" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-pearl hover:bg-rosegold flex items-center justify-center text-navy transition-colors" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-pearl hover:bg-rosegold flex items-center justify-center text-navy transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
