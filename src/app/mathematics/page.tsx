'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function MathematicsPage() {
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

  return (
    <>
      <style>{`
        .wrap { max-width: 1180px; margin: 0 auto; }
        .sec  { padding: 120px 56px; border-bottom: 1px solid var(--hairline); }
        .eyebrow { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 18px; }
        .h2   { font-family: var(--font-display); font-weight: 800; font-size: 44px; line-height: 1.04; letter-spacing: -0.03em; margin: 0 0 22px; }
        .intro{ font-family: var(--font-editorial); font-style: italic; font-weight: 300; font-size: 23px; line-height: 1.6; color: var(--tx-dim); margin: 0; }
        .body { font-size: 15px; line-height: 1.85; color: var(--tx-dim); }
        .plate{ background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        .plate.dark { background: #000; }
        .plate img  { display: block; width: 100%; height: auto; }
        .plate .cap { padding: 16px 22px; border-top: 1px solid var(--border); background: var(--bg-surface); }
        .plate .cap .t { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--tx); }
        .plate .cap .s { font-size: 12px; color: var(--tx-dim); margin-top: 5px; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
        .split { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center; }
        @media (max-width: 860px) {
          .split, .grid2 { grid-template-columns: 1fr; gap: 32px; }
          .sec  { padding: 80px 24px; }
          .h2   { font-size: 34px; }
        }
      `}</style>

      <SiteNav active="math" />

      {/* HERO */}
      <header className="sec" style={{ paddingTop: '96px' }}>
        <div className="wrap split">
          <div data-reveal>
            <div className="eyebrow">The Mathematics of Structure · What lies beneath</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '84px', lineHeight: 0.9, letterSpacing: '-0.04em', margin: '0 0 26px' }}>
              The Lost<br />Triangle
            </h1>
            <p className="intro" style={{ maxWidth: '520px', marginBottom: '18px' }}>
              A single right triangle — edges of one, the square root of two, and the square root of three — sits, unnamed, between the square and the equilateral triangle. From it, an entire geometry of structure unfolds.
            </p>
            <p style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--tx-faint)', marginTop: '30px' }}>
              In Gregg Fleishman's own hand · 2016 — 2017
            </p>
          </div>
          <div data-reveal className="plate">
            <Image src="/assets/drawings/fleishman-sequence-poster.png" alt="The Fleishman Sequence — original drawing by Gregg Fleishman" width={800} height={600} style={{ width: '100%', height: 'auto' }} />
            <div className="cap">
              <div className="t">The Fleishman Sequence</div>
              <div className="s">Original plate · 2017 · a new root-triangle sequence including the "Lost Triangle" of three dimensions</div>
            </div>
          </div>
        </div>
      </header>

      {/* ROOT SEQUENCE */}
      <section className="sec">
        <div className="wrap split">
          <div data-reveal className="plate">
            <Image src="/assets/drawings/root-sequence.png" alt="Root sequence construction — 1, root 2, root 3" width={800} height={600} style={{ width: '100%', height: 'auto' }} />
            <div className="cap">
              <div className="t">Root sequence · 1, √2, √3</div>
              <div className="s">The square roots, built one from the next</div>
            </div>
          </div>
          <div data-reveal>
            <div className="eyebrow">One · The sequence</div>
            <h2 className="h2">The Fleishman Sequence</h2>
            <p className="intro" style={{ marginBottom: '26px' }}>
              A new root-triangle sequence — the spiral of square roots, carried into three dimensions.
            </p>
            <p className="body" style={{ margin: '0 0 18px' }}>
              Begin with a unit right triangle. Its hypotenuse is √2. Raise a unit leg from that hypotenuse and the new hypotenuse is √3 — and so on, winding outward forever.
            </p>
            <p className="body" style={{ margin: 0 }}>
              Each turn is a whole-number area, each edge an irrational length. The triangle with legs of <span style={{ color: 'var(--tx)' }}>1</span> and <span style={{ color: 'var(--tx)' }}>√2</span> and hypotenuse <span style={{ color: 'var(--geo-space)', fontWeight: 500 }}>√3</span> is the one that matters most.
            </p>
          </div>
        </div>
      </section>

      {/* THE LOST TRIANGLE */}
      <section className="sec" style={{ background: '#0D0D0D' }}>
        <div className="wrap">
          <div data-reveal style={{ maxWidth: '680px', marginBottom: '56px' }}>
            <div className="eyebrow">Two · The triangle</div>
            <h2 className="h2">It fits where nothing else does.</h2>
            <p className="intro">
              Between the right angle of the square and the sixty degrees of the equilateral triangle there is a gap — and exactly one triangle that fills it. Its acute angle is 55°.
            </p>
          </div>
          <div className="grid2">
            <div data-reveal className="plate dark">
              <Image src="/assets/drawings/lost-triangle-color.png" alt="The Lost Triangle, in color — original drawing" width={800} height={600} style={{ width: '100%', height: 'auto' }} />
              <div className="cap">
                <div className="t">The Lost Triangle · in color</div>
                <div className="s">The square, the √2 fold, and the √3 hypotenuse</div>
              </div>
            </div>
            <div data-reveal className="plate">
              <Image src="/assets/drawings/lost-triangle-template.png" alt="Lost Triangle template with radii and angles" width={800} height={600} style={{ width: '100%', height: 'auto' }} />
              <div className="cap">
                <div className="t">Lost Triangle template · 1 : √2 : √3</div>
                <div className="s">Construction radii R=1, √2, √3 · angles 55° and 35°</div>
              </div>
            </div>
          </div>
          <p data-reveal className="body" style={{ maxWidth: '760px', margin: '34px auto 0', textAlign: 'center' }}>
            Found inside a unit cube, the triangle is read straight off the solid: an <span style={{ color: 'var(--tx)' }}>edge</span> is 1, a <span style={{ color: 'var(--geo-face)' }}>face diagonal</span> is √2, and the <span style={{ color: 'var(--geo-space)', fontWeight: 500 }}>corner-to-corner space diagonal</span> is √3 — meeting at a single right angle.
          </p>
        </div>
      </section>

      {/* THE WORK */}
      <section className="sec">
        <div className="wrap">
          <div data-reveal style={{ maxWidth: '680px', marginBottom: '52px' }}>
            <div className="eyebrow">Three · The work</div>
            <h2 className="h2">From one triangle, everything.</h2>
            <p className="intro">
              Reflected, the Lost Triangle builds the rhombic dodecahedron and defines the dihedral angles of every cubic polyhedron — and from there, the panels, pods and portals.
            </p>
          </div>
          <div className="grid2">
            <div data-reveal className="plate dark">
              <Image src="/assets/drawings/artwork-gold.png" alt="Gregg Fleishman geometric artwork, gold" width={800} height={600} style={{ width: '100%', height: 'auto' }} />
              <div className="cap">
                <div className="t">Rhombic study · gold</div>
                <div className="s">Original artwork</div>
              </div>
            </div>
            <div data-reveal className="plate">
              <Image src="/assets/drawings/artwork-bronze.png" alt="Gregg Fleishman geometric artwork, bronze" width={800} height={600} style={{ width: '100%', height: 'auto' }} />
              <div className="cap">
                <div className="t">Reflection study · bronze</div>
                <div className="s">Original artwork</div>
              </div>
            </div>
          </div>
          <div data-reveal style={{ marginTop: '44px', display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/lost-triangle" style={{ display: 'inline-block', padding: '15px 36px', background: 'var(--accent)', color: 'var(--bg)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}>
              Open the interactive lesson
            </Link>
            <Link href="/gallery" style={{ display: 'inline-block', padding: '15px 36px', border: '1px solid var(--border-strong)', color: 'var(--tx-dim)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)' }}>
              View the gallery
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
