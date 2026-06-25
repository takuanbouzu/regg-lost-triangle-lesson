'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import LostTriangleAnimation from '@/components/LostTriangleAnimation';

export default function Home() {
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

  const [hovered, setHovered] = useState<number | null>(null);

  const cards = [
    {
      num: '01',
      href: '/lost-triangle',
      title: 'The Interactive Lesson',
      body: 'An 88-second animated proof — from a unit square to the 120° dihedral angle that defines Fleishman\'s joint. Seven chapters, fully scrubable.',
      cta: 'Open lesson →',
    },
    {
      num: '02',
      href: '/mathematics',
      title: 'The Lost Triangle',
      body: 'The mathematical story behind the geometry — original drawings, root sequences, and the right triangle with sides 1, √2, and √3 that sits unnamed between the square and the equilateral.',
      cta: 'Read the mathematics →',
    },
    {
      num: '03',
      href: '/gallery',
      title: 'Original Drawings',
      body: 'Six original plates drawn in Gregg Fleishman\'s own hand across four decades. The sequence, the triangle, the rhombic studies — all in color.',
      cta: 'View the gallery →',
    },
  ];

  return (
    <>
      <style>{`
        @media (max-width: 860px) {
          .three-paths-grid { grid-template-columns: 1fr !important; }
          .three-paths-section { padding: 72px 24px !important; }
          .insight-section { padding: 72px 24px !important; }
        }
      `}</style>

      <SiteNav />

      <section style={{
        height: 'calc(100vh - 74px)',
        position: 'relative',
        overflow: 'hidden',
        background: '#0B0B0B',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <LostTriangleAnimation heroMode />
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(11,11,11,0.94) 0%, rgba(11,11,11,0.72) 50%, transparent 100%)',
          padding: '60px 56px 48px',
        }}>
          <div style={{ maxWidth: 520 }}>
            <p style={{
              fontSize: '10px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              margin: '0 0 14px',
              fontFamily: 'var(--font-ui)',
            }}>
              Gregg Fleishman · Geometry
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(44px, 6vw, 80px)',
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: 'var(--tx)',
              margin: '0 0 28px',
            }}>
              regg lost<br />triangle<br />lesson
            </h1>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                href="/lost-triangle"
                style={{
                  display: 'inline-block',
                  padding: '13px 28px',
                  background: 'var(--accent)',
                  color: 'var(--bg)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                Interactive Lesson
              </Link>
              <Link
                href="/mathematics"
                style={{
                  display: 'inline-block',
                  padding: '13px 28px',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--tx-dim)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                The Mathematics
              </Link>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 18,
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, opacity: 0.35 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--tx-faint)', fontFamily: 'var(--font-ui)' }}>Scroll</span>
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1l6 6 6-6" stroke="var(--tx-faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>
      </section>

      <section className="three-paths-section" style={{ background: 'var(--bg-surface)', padding: '96px 56px' }}>
        <div data-reveal style={{ marginBottom: 56 }}>
          <p style={{
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            margin: '0 0 14px',
            fontFamily: 'var(--font-ui)',
          }}>
            Explore
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 44,
            letterSpacing: '-0.03em',
            color: 'var(--tx)',
            margin: 0,
          }}>
            Three ways in.
          </h2>
        </div>

        <div className="three-paths-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 2,
        }}>
          {cards.map((card, i) => (
            <Link
              key={card.num}
              href={card.href}
              style={{ textDecoration: 'none' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                padding: '40px 36px',
                background: '#1D1D1D',
                border: `1px solid ${hovered === i ? 'var(--border-strong)' : 'var(--border)'}`,
                borderRadius: 16,
                transform: hovered === i ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'border-color .22s ease, transform .22s ease',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxSizing: 'border-box',
              }}>
                <div style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 11,
                  color: 'var(--accent)',
                  marginBottom: 20,
                }}>
                  {card.num}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 24,
                  letterSpacing: '-0.02em',
                  color: 'var(--tx)',
                  marginBottom: 14,
                }}>
                  {card.title}
                </div>
                <div style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  color: 'var(--tx-dim)',
                  flex: 1,
                }}>
                  {card.body}
                </div>
                <div style={{
                  marginTop: 24,
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                }}>
                  {card.cta}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="insight-section" style={{ background: '#0A0A0A', padding: '96px 56px' }}>
        <div data-reveal style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(28px, 4vw, 44px)',
            lineHeight: 1.5,
            color: 'var(--tx-dim)',
            margin: 0,
          }}>
            "The Lost Triangle defines the Fleishman joint's 120° dihedral angle."
          </p>
          <p style={{
            fontSize: 12,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--tx-faint)',
            marginTop: 28,
          }}>
            Gregg Fleishman · 2017
          </p>
          <div style={{ marginTop: 44 }}>
            <Link
              href="/about"
              style={{
                display: 'inline-block',
                padding: '13px 28px',
                border: '1px solid var(--border-strong)',
                color: 'var(--tx-dim)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              About the Geometer
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
