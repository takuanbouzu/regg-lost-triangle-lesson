import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function NotFound() {
  return (
    <>
      <SiteNav />
      <main style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 56px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent)', margin: '0 0 24px' }}>
          404 · Not Found
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(56px, 9vw, 108px)', lineHeight: 0.88, letterSpacing: '-0.04em', margin: '0 0 32px', color: 'var(--tx)' }}>
          Lost<br />Triangle
        </h1>
        <p style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontWeight: 300, fontSize: 20, color: 'var(--tx-dim)', maxWidth: 480, margin: '0 0 44px', lineHeight: 1.6 }}>
          This page went the way of the unnamed triangle — somewhere between the known shapes, uncharted.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{ display: 'inline-block', padding: '13px 28px', background: 'var(--accent)', color: 'var(--bg)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}
          >
            Back to Home
          </Link>
          <Link
            href="/lost-triangle"
            style={{ display: 'inline-block', padding: '13px 28px', border: '1px solid var(--border-strong)', color: 'var(--tx-dim)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}
          >
            Open the Lesson
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
