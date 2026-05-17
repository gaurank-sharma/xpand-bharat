import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'For Brands', to: '/for-brands' },
  { label: 'For Investors', to: '/for-investors' },
  { label: 'Growth Opportunities', to: '/growth-opportunities' },
  { label: 'Our Approach', to: '/our-approach' },
  { label: 'Industries', to: '/industries' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      {/* ── Outer strip that pins to top ── */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '10px 24px' : '16px 24px',
        transition: 'padding 0.35s ease',
        pointerEvents: 'none',          /* let clicks fall through the outer gap */
      }}>
        {/* ── Floating pill card ── */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '14px',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.14)'
            : '0 4px 24px rgba(0,0,0,0.09)',
          border: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          height: '64px',
          transition: 'box-shadow 0.35s ease',
          pointerEvents: 'auto',        /* re-enable on the card */
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Xpand Bharat"
              style={{ height: '38px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </Link>

          {/* Desktop links */}
          <div
            className="xb-desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '2px', flex: 1, justifyContent: 'center' }}
          >
            {NAV_LINKS.map(link => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    color: active ? 'var(--orange)' : 'var(--navy)',
                    fontWeight: active ? 600 : 400,
                    fontSize: '12.5px',
                    letterSpacing: '0.02em',
                    padding: '7px 10px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    fontFamily: "'Outfit', sans-serif",
                    opacity: active ? 1 : 0.7,
                    transition: 'color 0.2s, opacity 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.opacity = '1'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = active ? 'var(--orange)' : 'var(--navy)'; e.currentTarget.style.opacity = active ? '1' : '0.7'; }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <Link
              to="/contact"
              className="xb-cta-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'var(--orange)', color: '#fff',
                fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
                padding: '11px 22px', borderRadius: '8px',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'background 0.25s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--orange-light)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--orange)'}
            >
              {/* Phone icon inline */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Start a Conversation
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
              className="xb-hamburger"
              style={{
                background: 'none', border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '8px', cursor: 'pointer',
                padding: '10px', display: 'flex', flexDirection: 'column',
                gap: '4px', alignItems: 'center',
              }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: 'block', height: '2px',
                  background: 'var(--navy)', borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  width: i === 1 ? (menuOpen ? '18px' : '12px') : '18px',
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform:
                    i === 0 && menuOpen ? 'rotate(45deg) translateY(6px)'
                    : i === 2 && menuOpen ? 'rotate(-45deg) translateY(-6px)'
                    : 'none',
                }} />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* ── Full-screen mobile menu ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: '#fff',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '40px 48px',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: 'absolute', top: '24px', right: '32px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '30px', color: 'var(--navy)', lineHeight: 1,
        }}>×</button>

        <img src="/logo.png" alt="Xpand Bharat" style={{ height: '38px', width: 'auto', objectFit: 'contain', marginBottom: '48px', display: 'block' }} />

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[...NAV_LINKS, { label: 'Start a Conversation', to: '/contact' }].map((link) => (
            <Link key={link.to} to={link.to} style={{
              color: location.pathname === link.to ? 'var(--orange)' : 'var(--navy)',
              fontSize: 'clamp(20px, 4vw, 28px)',
              fontFamily: "'Playfair Display', serif", fontWeight: 600,
              lineHeight: 1.5, padding: '10px 0',
              borderBottom: '1px solid var(--border)',
              textDecoration: 'none', display: 'block',
              transition: 'color 0.2s',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        <p style={{ marginTop: '48px', color: 'var(--gray)', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>
          info@xpandbharat.com · Gurgaon, Haryana, India
        </p>
      </div>

      <style>{`
        @media (min-width: 1140px) { .xb-hamburger { display: none !important; } }
        @media (max-width: 1139px) { .xb-desktop-nav { display: none !important; } }
        @media (max-width: 560px)  { .xb-cta-btn    { display: none !important; } }
      `}</style>
    </>
  );
}
