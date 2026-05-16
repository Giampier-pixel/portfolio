import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Giampier Aliaga — Software Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(circle at 20% 20%, rgba(183,110,121,0.25), transparent 50%), radial-gradient(circle at 80% 80%, rgba(229,228,226,0.08), transparent 55%), #04191C',
          color: '#F8F9FA',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: '#B76E79',
              boxShadow: '0 0 24px rgba(183,110,121,0.8)',
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: 'rgba(229,228,226,0.7)',
            }}
          >
            Portafolio · 2026
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span
            style={{
              fontSize: 32,
              color: '#B76E79',
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Giampier Aliaga
          </span>
          <span
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#F8F9FA',
            }}
          >
            Software Developer
          </span>
          <span
            style={{
              fontSize: 28,
              color: 'rgba(229,228,226,0.75)',
              maxWidth: 900,
            }}
          >
            React · Next.js · TypeScript · Node.js · AI SDK
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: 'rgba(229,228,226,0.55)',
          }}
        >
          <span>portfolio-giampiers-projects.vercel.app</span>
          <span style={{ color: '#B76E79' }}>github.com/Giampier-pixel</span>
        </div>
      </div>
    ),
    size,
  );
}
