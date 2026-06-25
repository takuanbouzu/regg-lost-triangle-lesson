'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';

export default function AboutPage() {
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
        .wrap  { max-width: 1180px; margin: 0 auto; }
        .sec   { padding: 120px 56px; border-bottom: 1px solid var(--hairline); }
        .eyebrow { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--accent); margin-bottom: 18px; }
        .h2    { font-family: var(--font-display); font-weight: 800; font-size: 44px; line-height: 1.04; letter-spacing: -0.03em; margin: 0 0 22px; }
        .intro { font-family: var(--font-editorial); font-style: italic; font-weight: 300; font-size: 23px; line-height: 1.6; color: var(--tx-dim); margin: 0; }
        .body  { font-size: 15px; line-height: 1.85; color: var(--tx-dim); }
        .plate { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; }
        .plate.dark  { background: #000; }
        .plate img   { display: block; width: 100%; height: auto; }
        .plate .cap  { padding: 16px 22px; border-top: 1px solid var(--border); background: var(--bg-surface); }
        .plate .cap .t { font-family: var(--font-display); font-weight: 700; font-size: 14px; color: var(--tx); }
        .plate .cap .s { font-size: 12px; color: var(--tx-dim); margin-top: 5px; }
        .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
        .split { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 64px; align-items: center; }
        .split-rev { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 64px; align-items: center; }
        .prose { max-width: 720px; margin: 0 auto; }
        .gal-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; align-items: start; }
        .fact-cards { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
        .fact-card {
          flex: 1 1 160px;
          padding: 18px 20px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        .fact-card .fc-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--tx-faint);
          margin-bottom: 10px;
        }
        .fact-card .fc-value {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 16px;
          color: var(--tx);
          line-height: 1.3;
        }
        @media (max-width: 860px) {
          .split, .split-rev, .grid2, .gal-pair { grid-template-columns: 1fr; gap: 32px; }
          .sec  { padding: 80px 24px; }
          .h2   { font-size: 34px; }
          .fact-cards { flex-direction: column; }
        }
      `}</style>

      <SiteNav active="about" />

      {/* HERO */}
      <header className="sec" style={{ background: '#0A0A0A', paddingTop: '96px' }}>
        <div className="wrap" data-reveal>
          <div className="eyebrow">Gregg Fleishman · American Designer</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '76px',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            margin: '0 0 32px',
          }}>
            The Geometer
          </h1>
          <p style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '22px',
            lineHeight: 1.65,
            color: 'var(--tx-dim)',
            maxWidth: '620px',
            margin: '0 0 32px',
          }}>
            A furniture designer who found, hidden inside the unit cube, a triangle that nobody had named — and built an entire geometry of structure around it.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="conf conf-confirmed">Confirmed</span>
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--tx-faint)',
            }}>
              Active since 1970s
            </span>
          </div>
        </div>
      </header>

      {/* THE DESIGNER */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: '52px', maxWidth: '680px' }}>
            <div className="eyebrow">I · The Man</div>
            <h2 className="h2">Form follows geometry.</h2>
          </div>
          <div className="split">
            <div data-reveal>
              <p className="body" style={{ marginBottom: '22px' }}>
                Gregg Fleishman is a California-based furniture designer and architect whose practice has, for more than four decades, revolved around a single obsession: how a flat panel can become a three-dimensional object without any additional fastener, screw, or glue.
              </p>
              <p className="body" style={{ marginBottom: '22px' }}>
                His work ranges from intimate chairs and side tables to room-sized pavilions and temporary structures. Whether small or large, they share the same vocabulary: slotted panels that interlock at precise geometric angles, assembled and disassembled entirely by hand. The joint itself is the structure.
              </p>
              <p className="body">
                The geometry was always the same. The question was always the same. And eventually, the answer revealed itself inside the most ordinary of solids — the unit cube — in the form of a triangle nobody had bothered to name.
              </p>
            </div>
            <div data-reveal className="plate dark">
              <Image
                src="/assets/drawings/artwork-gold.png"
                alt="Gregg Fleishman rhombic study, gold tones"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="cap">
                <div className="t">Rhombic study · gold</div>
                <div className="s">Original artwork</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE JOINT */}
      <section className="sec" style={{ background: '#0A0A0A' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: '52px', maxWidth: '680px' }}>
            <div className="eyebrow">II · The System</div>
            <h2 className="h2">120° — the one angle that works.</h2>
            <p className="intro">
              At the heart of Fleishman's furniture is a joint cut at exactly 120° — the angle at which three flat panels can meet in a stable, lockable configuration without any additional fastener. Discover it once, and a whole family of structures opens up.
            </p>
          </div>
          <div data-reveal className="grid2" style={{ marginBottom: '52px' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--tx)', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                The Cut
              </div>
              <p className="body">
                Each panel is slotted with a precise kerf — no wider than the material itself — cut at the dihedral angle that the geometry demands: 120°. Two panels offered to each other at that angle click into a lock that resists shear, twist, and pull without adhesive or hardware of any kind.
              </p>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', color: 'var(--tx)', marginBottom: '14px', letterSpacing: '-0.01em' }}>
                The Structure
              </div>
              <p className="body">
                Because the logic is purely geometric, it scales without limit. The same joint angle that produces a compact stool can, with longer panels and more facets, produce a six-metre dome. Everything from flat panels; nothing but the cut.
              </p>
            </div>
          </div>
          <div data-reveal className="plate dark">
            <Image
              src="/assets/drawings/lost-triangle-color.png"
              alt="The Lost Triangle in color — the dihedral angle relationship"
              width={1200}
              height={900}
              style={{ width: '100%', height: 'auto' }}
            />
            <div className="cap">
              <div className="t">The dihedral angle · 120°</div>
              <div className="s">The angle at which the Lost Triangle's space diagonal meets its mirror</div>
            </div>
          </div>
        </div>
      </section>

      {/* THE TRIANGLE */}
      <section className="sec" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: '52px', maxWidth: '680px' }}>
            <div className="eyebrow">III · The Discovery</div>
            <h2 className="h2">Lost between the square and the triangle.</h2>
          </div>
          <div className="split-rev">
            <div data-reveal>
              <p className="body" style={{ marginBottom: '22px' }}>
                Between the right angle of the square and the 60° angle of the equilateral triangle, there is a gap. For centuries, the shape that fills it — a right triangle with sides 1, √2, and √3 — went unnamed and, in the geometry of structures, unused.
              </p>
              <p className="body" style={{ marginBottom: '22px' }}>
                Gregg Fleishman found it inside the unit cube: one edge of the cube, one face diagonal, and the body diagonal all meeting at a single vertex, forming a right angle between the face diagonal and the body diagonal. The angle from edge to body diagonal? Approximately 54.7°. The angle formed when two of these triangles meet across the long axis? Exactly 120°.
              </p>
              <p className="body">
                That 120° dihedral is the key. It is why the joint works. It is why the panels lock. The Lost Triangle was always there, embedded in the most familiar solid in mathematics — it just needed someone patient enough to look.
              </p>
              <div className="fact-cards">
                <div className="fact-card">
                  <div className="fc-label">Sides</div>
                  <div className="fc-value">1 · √2 · √3</div>
                </div>
                <div className="fact-card">
                  <div className="fc-label">Right angle at</div>
                  <div className="fc-value">The face diagonal</div>
                </div>
                <div className="fact-card">
                  <div className="fc-label">Dihedral when reflected</div>
                  <div className="fc-value">120° exactly</div>
                </div>
              </div>
            </div>
            <div data-reveal className="plate">
              <Image
                src="/assets/drawings/lost-triangle-template.png"
                alt="Lost Triangle template with construction radii and angles"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="cap">
                <div className="t">Lost Triangle template · 1 : √2 : √3</div>
                <div className="s">Construction radii R=1, √2, √3 · angles 55° and 35°</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE WORK */}
      <section className="sec" style={{ background: '#0A0A0A' }}>
        <div className="wrap">
          <div data-reveal style={{ marginBottom: '48px', maxWidth: '680px' }}>
            <div className="eyebrow">IV · The Practice</div>
            <h2 className="h2">Forty years of building with one idea.</h2>
            <p className="intro">
              One triangle. One angle. Endless structure.
            </p>
          </div>
          <div data-reveal className="gal-pair" style={{ marginBottom: '44px' }}>
            <div className="plate">
              <Image
                src="/assets/drawings/root-sequence.png"
                alt="The root sequence — original drawing by Gregg Fleishman"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="cap">
                <div className="t">The root sequence · original drawing</div>
                <div className="s">1, √2, √3 — the spiral from which everything begins</div>
              </div>
            </div>
            <div className="plate dark">
              <Image
                src="/assets/drawings/artwork-bronze.png"
                alt="Gregg Fleishman reflection study, bronze tones"
                width={800}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="cap">
                <div className="t">Reflection study · bronze</div>
                <div className="s">Original artwork</div>
              </div>
            </div>
          </div>
          <p data-reveal className="body" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            From small-scale furniture — stools, chairs, low tables — to large-scale temporary installations and architectural pavilions, every structure Fleishman has built in four decades of practice is an expression of the same geometric insight. The materials change; the wood species, the panel gauge, the finish. The angle never does.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="sec" style={{ background: 'var(--bg)', borderBottom: 'none' }}>
        <div className="wrap" style={{ textAlign: 'center' }} data-reveal>
          <h2 className="h2" style={{ fontSize: '32px', marginBottom: '14px' }}>Explore the geometry</h2>
          <p className="body" style={{ marginBottom: '36px' }}>
            Work through the lesson interactively, or read the full mathematical treatment.
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
              Open the Geometry Lesson
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
              Study the Mathematics
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
