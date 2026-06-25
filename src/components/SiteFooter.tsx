import Link from 'next/link';

const links: [string, string][] = [
  ['/lost-triangle', 'Geometry Lesson'],
  ['/mathematics', 'The Lost Triangle'],
  ['/gallery', 'Gallery'],
  ['/about', 'About'],
];

export default function SiteFooter() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid var(--hairline)', padding: '40px 56px' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tx)' }}>
            Gregg Fleishman
          </div>
          <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: 12, color: 'var(--tx-faint)', marginTop: 6 }}>
            Geometry · Structure · Form
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="footer-link">{label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
