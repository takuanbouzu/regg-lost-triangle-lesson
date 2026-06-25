'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption: string; sub: string } | null>(null);

  const openLightbox = (src: string, alt: string, caption: string, sub: string) => setLightbox({ src, alt, caption, sub });
  const closeLightbox = () => setLightbox(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <style>{`
        .wrap    { max-width: 1180px; margin: 0 auto; }
        .sec     { padding: 120px 56px; border-bottom: 1px solid var(--hairline); }
        .eyebrow { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 18px; }
        .h2      { font-family: var(--font-display); font-weight: 800; font-size: 44px; line-height: 1.04; letter-spacing: -0.03em; margin: 0 0 22px; }
        .intro   { font-family: var(--font-editorial); font-style: italic; font-weight: 300; font-size: 23px; line-height: 1.6; color: var(--tx-dim); margin: 0; }
        .body    { font-size: 15px; line-height: 1.85; color: var(--tx-dim); }
        .plate   { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        .plate.dark  { background: #000; }
        .plate img   { display: block; width: 100%; height: auto; }
        .plate .cap  { padding: 16px 22px; border-top: 1px solid var(--border); background: var(--bg-surface); }
        .plate .cap .t { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--tx); }
        .plate .cap .s { font-size: 12px; color: var(--tx-dim); margin-top: 5px; }
        .plate-xl    { background: #000; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        .plate-xl img    { display: block; width: 100%; height: auto; }
        .plate-xl .cap   { padding: 16px 22px; border-top: 1px solid var(--border); background: var(--bg-surface); }
        .plate-xl .cap .t { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--tx); }
        .plate-xl .cap .s { font-size: 12px; color: var(--tx-dim); margin-top: 5px; }
        .grid2   { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
        .split   { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center; }
        .gal-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
        @media (max-width: 860px) {
          .split, .grid2, .gal-pair { grid-template-columns: 1fr; gap: 32px; }
          .sec  { padding: 80px 24px; }
          .h2   { font-size: 34px; }
        }
      `}</style>

      <SiteNav active="gallery" />

      {/* HERO */}
      <header className="sec" style={{ background: '#0A0A0A', paddingTop: '96px' }}>
        <div className="wrap" data-reveal>
          <div className="eyebrow">The Work of Gregg Fleishman</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '80px',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            margin: '0 0 32px',
            whiteSpace: 'pre-line',
          }}>
            {'Drawings,\nStudies &\nOriginal Work'}
          </h1>
          <p className="intro" style={{ maxWidth: '580px' }}>
            These originals — drawn in Gregg Fleishman's own hand across four decades — trace a single geometric insight from its mathematical roots to its realization in furniture, structure, and space.
          </p>
        </div>
      </header>

      {/* THE SEQUENCE */}
      <section className="sec" style={{ background: '#0A0A0A' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: '48px', maxWidth: '680px' }}>
            <div className="eyebrow">I · The Sequence</div>
            <h2 className="h2">The Fleishman Sequence</h2>
          </div>
          <div className="split">
            <div data-reveal>
              <p className="intro" style={{ marginBottom: '24px' }}>
                A new root-triangle sequence — the spiral of square roots, carried into three dimensions.
              </p>
              <p className="body">
                Begin with a unit right triangle. Its hypotenuse is √2. Raise a unit leg from that hypotenuse and the new hypotenuse is √3 — and so on, winding outward forever. Each turn is a whole-number area; each edge an irrational length.
              </p>
              <p className="body" style={{ marginTop: '16px' }}>
                This new sequence carries the square-root spiral into 3D. The triangle with sides 1, √2, and √3 is the one that matters most — it is the triangle that lives inside every cube.
              </p>
            </div>
            <div data-reveal className="plate dark">
              <button
                onClick={() => openLightbox('/assets/drawings/fleishman-sequence-poster.png', 'The Fleishman Sequence — original plate by Gregg Fleishman', 'The Fleishman Sequence · Original plate · 2017', 'A new root-triangle sequence including the Lost Triangle of three dimensions')}
                style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'none', cursor: 'zoom-in' }}
                aria-label="View The Fleishman Sequence · Original plate · 2017 fullscreen"
              >
                <Image
                  src="/assets/drawings/fleishman-sequence-poster.png"
                  alt="The Fleishman Sequence — original plate by Gregg Fleishman"
                  width={900}
                  height={700}
                  style={{ width: '100%', height: 'auto' }}
                />
              </button>
              <div className="cap">
                <div className="t">The Fleishman Sequence · Original plate · 2017</div>
                <div className="s">A new root-triangle sequence including the Lost Triangle of three dimensions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE ROOT CONSTRUCTION */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: '48px', maxWidth: '680px' }}>
            <div className="eyebrow">II · The Triangle</div>
            <h2 className="h2">The Lost Triangle</h2>
            <p className="intro">
              A right triangle with edges 1, √2, and √3 — found hiding inside the unit cube, where no one had thought to look.
            </p>
          </div>
          <div data-reveal className="gal-pair">
            <div className="plate">
              <button
                onClick={() => openLightbox('/assets/drawings/root-sequence.png', 'Root sequence construction — 1, root 2, root 3', 'Root sequence · 1, √2, √3', 'The square roots, built one from the next')}
                style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'none', cursor: 'zoom-in' }}
                aria-label="View Root sequence · 1, √2, √3 fullscreen"
              >
                <Image
                  src="/assets/drawings/root-sequence.png"
                  alt="Root sequence construction — 1, root 2, root 3"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                />
              </button>
              <div className="cap">
                <div className="t">Root sequence · 1, √2, √3</div>
                <div className="s">The square roots, built one from the next</div>
              </div>
            </div>
            <div className="plate">
              <button
                onClick={() => openLightbox('/assets/drawings/lost-triangle-template.png', 'Lost Triangle template with construction radii and angles', 'Lost Triangle template · 1 : √2 : √3', 'Construction radii R=1, √2, √3 · angles 55° and 35°')}
                style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'none', cursor: 'zoom-in' }}
                aria-label="View Lost Triangle template · 1 : √2 : √3 fullscreen"
              >
                <Image
                  src="/assets/drawings/lost-triangle-template.png"
                  alt="Lost Triangle template with construction radii and angles"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                />
              </button>
              <div className="cap">
                <div className="t">Lost Triangle template · 1 : √2 : √3</div>
                <div className="s">Construction radii R=1, √2, √3 · angles 55° and 35°</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IN COLOR */}
      <section className="sec" style={{ background: '#0A0A0A' }}>
        <div className="wrap">
          <div data-reveal className="plate-xl">
            <button
              onClick={() => openLightbox('/assets/drawings/lost-triangle-color.png', 'The Lost Triangle in color — original drawing by Gregg Fleishman', 'The Lost Triangle · in color', 'The square, the √2 fold, and the √3 hypotenuse')}
              style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'none', cursor: 'zoom-in' }}
              aria-label="View The Lost Triangle · in color fullscreen"
            >
              <Image
                src="/assets/drawings/lost-triangle-color.png"
                alt="The Lost Triangle in color — original drawing by Gregg Fleishman"
                width={1200}
                height={900}
                style={{ width: '100%', height: 'auto' }}
              />
            </button>
            <div className="cap">
              <div className="t">The Lost Triangle · in color</div>
              <div className="s">The square, the √2 fold, and the √3 hypotenuse</div>
            </div>
          </div>
          <p data-reveal className="body" style={{ maxWidth: '760px', margin: '36px auto 0', textAlign: 'center' }}>
            Colored by dimension: white for the unit edge, blue for the face diagonal, magenta for the space diagonal. The three colors map directly to the role-colors used throughout this site.
          </p>
        </div>
      </section>

      {/* THE ART */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: '48px', maxWidth: '680px' }}>
            <div className="eyebrow">III · The Art</div>
            <h2 className="h2">Rhombic Studies</h2>
            <p className="intro">
              Reflected across the upright plane, the Lost Triangle builds the rhombic dodecahedron — and from it, Fleishman's full vocabulary of panels, joints, and spaces.
            </p>
          </div>
          <div data-reveal className="gal-pair">
            <div className="plate dark">
              <button
                onClick={() => openLightbox('/assets/drawings/artwork-gold.png', 'Gregg Fleishman rhombic geometric artwork, gold tones', 'Rhombic study · gold', 'Original artwork')}
                style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'none', cursor: 'zoom-in' }}
                aria-label="View Rhombic study · gold fullscreen"
              >
                <Image
                  src="/assets/drawings/artwork-gold.png"
                  alt="Gregg Fleishman rhombic geometric artwork, gold tones"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                />
              </button>
              <div className="cap">
                <div className="t">Rhombic study · gold</div>
                <div className="s">Original artwork</div>
              </div>
            </div>
            <div className="plate">
              <button
                onClick={() => openLightbox('/assets/drawings/artwork-bronze.png', 'Gregg Fleishman reflection geometric artwork, bronze tones', 'Reflection study · bronze', 'Original artwork')}
                style={{ display: 'block', width: '100%', border: 'none', padding: 0, background: 'none', cursor: 'zoom-in' }}
                aria-label="View Reflection study · bronze fullscreen"
              >
                <Image
                  src="/assets/drawings/artwork-bronze.png"
                  alt="Gregg Fleishman reflection geometric artwork, bronze tones"
                  width={800}
                  height={600}
                  style={{ width: '100%', height: 'auto' }}
                />
              </button>
              <div className="cap">
                <div className="t">Reflection study · bronze</div>
                <div className="s">Original artwork</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: '#0A0A0A', borderBottom: 'none' }}>
        <div className="wrap" style={{ textAlign: 'center' }} data-reveal>
          <h2 className="h2" style={{ fontSize: '32px', marginBottom: '14px' }}>Go deeper</h2>
          <p className="body" style={{ marginBottom: '36px' }}>
            Work through the geometry step by step, or study the full mathematical treatment.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/lost-triangle"
              style={{
                display: 'inline-block',
                padding: '15px 36px',
                background: 'var(--accent)',
                color: 'var(--bg)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Begin the lesson
            </Link>
            <Link
              href="/mathematics"
              style={{
                display: 'inline-block',
                padding: '15px 36px',
                background: 'transparent',
                color: 'var(--accent)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(200,169,110,0.4)',
              }}
            >
              Read the mathematics
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      {lightbox && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(8px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: '40px 24px', cursor: 'zoom-out',
          }}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute', top: 24, right: 32,
              background: 'none', border: 'none', color: '#8A8480', fontSize: 28,
              cursor: 'pointer', lineHeight: 1, padding: 0,
            }}
            aria-label="Close"
          >×</button>

          {/* Image */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: 'min(1200px, 90vw)', maxHeight: '80vh', position: 'relative', cursor: 'default' }}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{ display: 'block', maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 8 }}
            />
          </div>

          {/* Caption */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ marginTop: 24, textAlign: 'center', cursor: 'default' }}
          >
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: '#F0EDE8', marginBottom: 6 }}>
              {lightbox.caption}
            </div>
            <div style={{ fontSize: 12, color: '#8A8480' }}>{lightbox.sub}</div>
            <div style={{ fontSize: 11, color: '#4A4643', marginTop: 12, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Press Esc to close
            </div>
          </div>
        </div>
      )}
    </>
  );
}
