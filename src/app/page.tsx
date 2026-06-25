import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '56px', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '24px' }}>
        Gregg Fleishman · Geometry
      </p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 0.92, letterSpacing: '-0.04em', margin: '0 0 40px' }}>
        regg lost<br />triangle<br />lesson
      </h1>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/lost-triangle" style={{ display: 'inline-block', padding: '14px 32px', background: 'var(--accent)', color: 'var(--bg)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}>
          Interactive Lesson
        </Link>
        <Link href="/mathematics" style={{ display: 'inline-block', padding: '14px 32px', border: '1px solid var(--border-strong)', color: 'var(--tx-dim)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}>
          The Mathematics
        </Link>
      </div>
    </main>
  );
}
