import { Link, useLocation } from 'react-router-dom';
import { useSettings } from '../hooks/useContent';

const COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'For Brands', to: '/for-brands' },
      { label: 'For Investors', to: '/for-investors' },
      { label: 'Growth Opportunities', to: '/growth-opportunities' },
      { label: 'Industries', to: '/industries' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About XPANDBHARAT', to: '/about' },
      { label: 'Our Approach', to: '/our-approach' },
      { label: 'Insights', to: '/insights' },
      { label: 'Start a Conversation', to: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Disclaimer', to: '/disclaimer' },
    ],
  },
];

// Social icons are fixed; their hrefs come from Site Settings (admin-editable).
const SOCIAL_ICONS = {
  linkedin: {
    label: 'LinkedIn',
    fallback: 'https://www.linkedin.com/company/xpandbharat/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  instagram: {
    label: 'Instagram',
    fallback: 'https://www.instagram.com/xpandbharat',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  facebook: {
    label: 'Facebook',
    fallback: 'https://www.facebook.com/share/1HFEiRkeXX/?mibextid=wwXIfr',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
};

const FB = {
  description: "XPAND Bharat is India's leading franchise expansion and investment consulting company, backed by 25+ years of collective industry experience in franchise growth, investor alignment, and business expansion strategy.",
  email: 'contact@xpandbharat.com',
  phone: '+91 77172 72838',
  address: 'Gurugram, Haryana, India',
  footerHeading: 'Ready to move',
  footerTagline: 'Less noise. More execution.',
  copyrightText: 'XPANDBHARAT. All rights reserved.',
};

const telHref = (phone) => `tel:${(phone || '').replace(/[^\d+]/g, '')}`;

export default function Footer() {
  const { pathname } = useLocation();
  const settings = useSettings();
  const s = settings || {};
  const social = s.socialLinks || {};
  const description   = s.footerDescription || FB.description;
  const email         = s.email || FB.email;
  const phone         = s.phone || FB.phone;
  const address       = s.address || FB.address;
  const footerHeading = s.footerHeading || FB.footerHeading;
  const footerTagline = s.footerTagline || FB.footerTagline;
  const copyrightText = s.copyrightText || FB.copyrightText;
  const socials = Object.entries(SOCIAL_ICONS)
    .map(([key, cfg]) => ({ ...cfg, href: social[key] || cfg.fallback }))
    .filter(item => item.href);

  return (
    <footer style={{ background: '#F5F2EC', borderTop: '1px solid #E5E2DC', fontFamily: "'Outfit', sans-serif" }}>

      {/* Top CTA strip — hidden on Contact page */}
      {pathname !== '/contact' && (
      <div className="xb-footer-cta" style={{ borderBottom: '1px solid #E5E2DC', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, margin: '0 0 8px', color: 'var(--navy)', lineHeight: 1.2 }}>
              {footerHeading}
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', margin: 0 }}>{footerTagline}</p>
          </div>
          <Link to="/contact" className="btn-primary" style={{ flexShrink: 0 }}>
            Start a Conversation
          </Link>
        </div>
      </div>
      )}

      {/* Main footer body */}
      <div className="xb-footer-body" style={{ maxWidth: '1440px', margin: '0 auto', padding: '72px 40px 40px' }}>
        <div className="xb-footer-grid">

          {/* Col 1 — Brand */}
          <div>
            <img src="/logo.png" alt="Xpand Bharat" style={{ height: 'auto', width: '85%', objectFit: 'contain', marginBottom: '16px', display: 'block' }} />
            <p style={{ color: 'var(--gray)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>
              {description}
            </p>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.heading}>
              <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '24px' }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to} style={{
                      color: 'var(--gray)', fontSize: '14px', textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--navy)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--gray)'}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Last col — Contact info */}
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '24px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Email', value: email, href: `mailto:${email}` },
                { label: 'Phone', value: phone, href: telHref(phone) },
                { label: 'Location', value: address, href: null },
              ].map(item => (
                <div key={item.label}>
                  <p style={{ color: '#999', fontSize: '10px', marginBottom: '3px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>{item.label}</p>
                  {item.href
                    ? <a href={item.href} style={{ color: 'var(--orange)', textDecoration: 'none', fontSize: '13px', fontWeight: 500 }}>{item.value}</a>
                    : <p style={{ color: 'var(--navy)', fontSize: '13px', margin: 0, fontWeight: 500 }}>{item.value}</p>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #E5E2DC',
          paddingTop: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>
            © {new Date().getFullYear()} {copyrightText}
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer" style={{
                width: '36px', height: '36px', borderRadius: '50%',
                border: '1px solid #D5D2CC',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gray)', fontSize: '10px', fontWeight: 700,
                textDecoration: 'none', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.color = 'var(--orange)'; e.currentTarget.style.background = 'rgba(240,121,32,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#D5D2CC'; e.currentTarget.style.color = 'var(--gray)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .xb-footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1.2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 72px;
        }
        @media (max-width: 1100px) {
          .xb-footer-grid { grid-template-columns: 1fr 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .xb-footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
        }
      `}</style>
    </footer>
  );
}
