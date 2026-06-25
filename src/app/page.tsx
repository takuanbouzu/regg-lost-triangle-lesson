'use client';
import Link from 'next/link';
import LostTriangleAnimation from '@/components/LostTriangleAnimation';

export default function Home() {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#0B0B0B' }}>
      {/* Background animation — loops silently */}
      <LostTriangleAnimation heroMode />

      {/* Top nav */}
      <nav id="gfnav" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <span className="brand">Gregg Fleishman</span>
        <Link className="navlink" href="/lost-triangle">Geometry Lesson</Link>
        <Link className="navlink" href="/mathematics">The Lost Triangle</Link>
        <Link className="navlink" href="/gallery">Gallery</Link>
        <Link className="navlink" href="/about">About</Link>
      </nav>

      {/* Bottom-left title + CTAs over gradient scrim */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        padding: '80px 56px 52px',
        background: 'linear-gradient(to top, rgba(11,11,11,0.92) 0%, rgba(11,11,11,0.70) 55%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 560, pointerEvents: 'auto' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: '10px',
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: 'var(--accent)', margin: '0 0 16px',
          }}>
            Gregg Fleishman · Geometry
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(44px, 6vw, 80px)', lineHeight: 0.9,
            letterSpacing: '-0.04em', color: 'var(--tx)', margin: '0 0 32px',
          }}>
            regg lost<br />triangle<br />lesson
          </h1>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/lost-triangle"
              style={{
                display: 'inline-block', padding: '13px 28px',
                background: 'var(--accent)', color: 'var(--bg)',
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Interactive Lesson
            </Link>
            <Link
              href="/mathematics"
              style={{
                display: 'inline-block', padding: '13px 28px',
                border: '1px solid var(--border-strong)', color: 'var(--tx-dim)',
                fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em',
                textTransform: 'uppercase', textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              The Mathematics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
