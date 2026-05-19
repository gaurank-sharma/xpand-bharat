import { Link } from 'react-router-dom';

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

const SOCIALS = [
  { label: 'LinkedIn', href: '#', icon: 'IN' },
  { label: 'Instagram', href: '#', icon: 'IG' },
  { label: 'Twitter / X', href: '#', icon: 'X' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#F5F2EC', borderTop: '1px solid #E5E2DC', fontFamily: "'Outfit', sans-serif" }}>

      {/* Top CTA strip */}
      <div className="xb-footer-cta" style={{ borderBottom: '1px solid #E5E2DC', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
          <div>
            <div className="section-label" style={{ marginBottom: '12px' }}>Ready to move?</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 44px)', fontWeight: 700, margin: 0, color: 'var(--navy)', lineHeight: 1.2 }}>
              Less noise. More execution.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', marginTop: '8px', marginBottom: 0 }}>Brands + investors aligned. No drama, only delivery.</p>
          </div>
          <Link to="/contact" className="btn-primary" style={{ flexShrink: 0 }}>
            Start a Conversation
          </Link>
        </div>
      </div>

      {/* Main footer body */}
      <div className="xb-footer-body" style={{ maxWidth: '1440px', margin: '0 auto', padding: '72px 40px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '56px', marginBottom: '72px' }}>

          {/* Brand column */}
          <div>
            <img src="/logo.png" alt="Xpand Bharat" style={{ height: 'auto', width: '80%', objectFit: 'contain', marginBottom: '6px', display: 'block' }} />
            <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.8, maxWidth: '280px', marginBottom: '32px' }}>
              A premium business expansion platform focused on structured growth, investor alignment, and execution-led business movement.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#999', fontSize: '11px', marginBottom: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Email</p>
              <a href="mailto:info@xpandbharat.com" style={{ color: 'var(--orange)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>info@xpandbharat.com</a>
            </div>
            <div>
              <p style={{ color: '#999', fontSize: '11px', marginBottom: '4px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>Location</p>
              <p style={{ color: 'var(--navy)', fontSize: '14px', margin: 0, fontWeight: 500 }}>Gurgaon, Haryana, India</p>
            </div>
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
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid #E5E2DC',
          paddingTop: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>
            © {new Date().getFullYear()} XPANDBHARAT. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {SOCIALS.map(s => (
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
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
