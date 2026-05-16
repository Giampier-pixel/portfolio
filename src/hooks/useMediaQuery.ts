import { useState, useEffect } from 'react';

/**
 * Hook para detectar si una media query hace match.
 * Extremadamente útil para responsividad desde JS y accesibilidad (ej: prefers-reduced-motion).
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Verificamos window porque en renderizados iniciales SSR window no está disponible
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Incializamos con el valor actual
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Listener compatible con navegadores antiguos y modernos
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    
    // Fallback para navegadores antiguos que no soportan addEventListener en matchMedia
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } else {
      // Para Safari antiguo
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
}
