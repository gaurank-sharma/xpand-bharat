import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home',                  to: '/' },
  { label: 'Our Approach',          to: '/our-approach' },
  { label: 'Industries',            to: '/industries' },
  { label: 'Growth Opportunities',  to: '/growth-opportunities' },
  { label: 'For Investors',         to: '/for-investors' },
  { label: 'For Brands',            to: '/for-brands' },
  { label: 'About',                 to: '/about' },
  { label: 'Insights',              to: '/insights' },
  { label: 'Contact',               to: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const location                  = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header className={`xb-header${scrolled ? ' xb-header--scrolled' : ''}`}>
        <div className="xb-header-inner">

          {/* Logo */}
          <Link to="/" className="xb-logo">
            <img src="/logo.png" alt="Xpand Bharat" />
          </Link>

          {/* Desktop nav */}
          <nav className="xb-nav">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`xb-nav-link${location.pathname === link.to ? ' xb-nav-link--active' : ''}`}
              >
                {link.label}
                {location.pathname === link.to && <span className="xb-nav-dot" />}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="xb-header-right">
            <Link to="/get-started" className="xb-header-cta">
              Schedule a Strategy Call
            </Link>
            <button
              className={`xb-burger${menuOpen ? ' xb-burger--open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`xb-drawer${menuOpen ? ' xb-drawer--open' : ''}`}>
        <div className="xb-drawer-head">
          <img src="/logo.png" alt="Xpand Bharat" style={{ height: 32 }} />
          <button onClick={() => setMenuOpen(false)} className="xb-drawer-close">✕</button>
        </div>
        <nav className="xb-drawer-nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`xb-drawer-link${location.pathname === link.to ? ' xb-drawer-link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/get-started" className="xb-drawer-cta">Schedule a Strategy Call</Link>
        </nav>
      </div>
      {menuOpen && <div className="xb-overlay" onClick={() => setMenuOpen(false)} />}

      <style>{`
        /* ── Base header ── */
        .xb-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          height: 72px;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.07);
          transition: box-shadow 0.35s ease;
        }
        .xb-header--scrolled {
          box-shadow: 0 4px 24px rgba(0,0,0,0.09);
        }

        .xb-header-inner {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 40px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* ── Logo ── */
        .xb-logo { display: flex; align-items: center; flex-shrink: 0; text-decoration: none; }
        .xb-logo img { height: 68px; width: auto; object-fit: contain; display: block; }

        /* ── Desktop nav ── */
        .xb-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
        }
        .xb-nav-link {
          position: relative;
          color: rgba(13,27,62,0.62);
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 400;
          letter-spacing: 0.025em;
          padding: 6px 11px;
          border-radius: 6px;
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s, background 0.2s;
        }
        .xb-nav-link:hover {
          color: #0D1B3E;
          background: rgba(0,0,0,0.04);
        }
        .xb-nav-link--active {
          color: #f07920 !important;
          font-weight: 600;
        }
        .xb-nav-dot {
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #f07920;
        }

        /* ── Right side ── */
        .xb-header-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }

        /* CTA button */
        .xb-header-cta {
          display: inline-flex;
          align-items: center;
          background: #f07920;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 10px 22px;
          border-radius: 8px;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.25s ease, transform 0.15s ease;
        }
        .xb-header-cta:hover {
          background: #d96b1a;
          transform: translateY(-1px);
        }

        /* Hamburger */
        .xb-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          background: #f07920;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          padding: 11px;
          transition: background 0.2s, transform 0.15s;
        }
        .xb-burger span {
          display: block;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }
        .xb-header--scrolled .xb-burger {
          background: #f07920;
        }
        .xb-burger:hover { background: #d96b1a; transform: scale(1.05); }

        .xb-burger--open span:nth-child(1) { transform: rotate(45deg) translate(4.5px, 4.5px); }
        .xb-burger--open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .xb-burger--open span:nth-child(3) { transform: rotate(-45deg) translate(4.5px, -4.5px); }

        /* ── Mobile drawer ── */
        .xb-drawer {
          position: fixed;
          top: 0; right: 0;
          width: min(340px, 88vw);
          height: 100vh;
          background: #fff;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);
          box-shadow: -8px 0 40px rgba(0,0,0,0.15);
        }
        .xb-drawer--open { transform: translateX(0); }

        .xb-drawer-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }
        .xb-drawer-close {
          background: none; border: none; cursor: pointer;
          font-size: 20px; color: #0D1B3E;
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .xb-drawer-close:hover { background: rgba(0,0,0,0.05); }

        .xb-drawer-nav {
          flex: 1;
          overflow-y: auto;
          padding: 8px 12px 24px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .xb-drawer-link {
          display: block;
          color: rgba(13,27,62,0.75);
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 13px 16px;
          border-radius: 10px;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
        }
        .xb-drawer-link:hover { color: #0D1B3E; background: rgba(0,0,0,0.04); }
        .xb-drawer-link--active { color: #f07920 !important; background: rgba(240,121,32,0.07); font-weight: 600; }

        .xb-drawer-cta {
          display: block;
          margin-top: 12px;
          background: #f07920;
          color: #fff;
          text-align: center;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 14px;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .xb-drawer-cta:hover { background: #d96b1a; }

        /* Overlay */
        .xb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 1000;
          backdrop-filter: blur(2px);
        }

        /* ── Responsive ── */
        /* Medium laptops (≈14") — tighten so the full nav + CTA fit without clipping */
        @media (max-width: 1440px) {
          .xb-header-inner { padding: 0 22px; gap: 14px; }
          .xb-logo img { height: 54px; }
          .xb-nav { gap: 0; }
          .xb-nav-link { font-size: 11.5px; padding: 6px 8px; letter-spacing: 0.01em; }
          .xb-header-cta { font-size: 11px; padding: 9px 15px; letter-spacing: 0.04em; }
        }
        @media (max-width: 1300px) {
          .xb-logo img { height: 48px; }
          .xb-nav-link { font-size: 11px; padding: 5px 6px; }
          .xb-header-cta { font-size: 10.5px; padding: 8px 12px; }
        }
        @media (max-width: 1180px) {
          .xb-nav { display: none; }
          .xb-burger { display: flex; }
          .xb-logo img { height: 60px; }
        }
        @media (max-width: 560px) {
          .xb-header-cta { display: none; }
          .xb-header-inner { padding: 0 20px; }
        }
      `}</style>
    </>
  );
}
