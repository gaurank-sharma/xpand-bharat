import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeadForm from '../components/LeadForm';

const INFO = [
  { label: 'Email Address', value: 'contact@xpandbharat.com', href: 'mailto:contact@xpandbharat.com', icon: '✉' },
  { label: 'WhatsApp / Phone', value: '+91 77172 72838', href: 'tel:+917717272838', icon: '✆' },
  { label: 'Office Address', value: 'Good Earth Business Bay 1, 6th Floor, Sector 58, Gurugram, Haryana', href: null, icon: '⊕' },
];

function FadeSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0'; el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} style={style}>{children}</div>;
}

export default function Contact() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: 'url("https://images.unsplash.com/photo-1497366754035-f200968a677a?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Start a Conversation</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
            Let's start the right<br />
            <span style={{ color: 'var(--orange)' }}>business conversation.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '540px' }}>
            Whether you are exploring expansion, investment opportunities, or strategic partnerships — XPANDBHARAT is ready to move the conversation forward.
          </p>
        </div>
      </div>

      {/* Marquee brand statement */}
      <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '22px 0', overflow: 'hidden' }}>
        <div className="xb-marquee-track">
          {[0,1].map(k => (
            <div key={k} style={{ display: 'flex', alignItems: 'center' }} aria-hidden={k === 1}>
              {Array(6).fill(null).map((_, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', paddingRight: '32px' }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                    We Are The Best Franchise Advisory Partners In India
                  </span>
                  <span style={{ color: 'var(--orange)', fontSize: '10px' }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT — form */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div className="xb-grid-2col" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>

          {/* Contact info column */}
          <FadeSection>
            <div className="section-label" style={{ marginBottom: '32px' }}>Contact Information</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {INFO.map(info => (
                <div key={info.label} style={{ paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ width: '36px', height: '36px', background: 'var(--orange-pale)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--orange)', fontSize: '16px' }}>{info.icon}</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)' }}>{info.label}</span>
                  </div>
                  {info.href ? (
                    <a href={info.href} style={{ color: 'var(--navy)', fontWeight: 600, fontSize: '16px', textDecoration: 'none' }}>{info.value}</a>
                  ) : (
                    <p style={{ color: 'var(--navy)', fontWeight: 600, fontSize: '16px', margin: 0 }}>{info.value}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Tagline */}
            <div style={{ marginTop: '48px', padding: '32px', background: 'var(--navy)', borderRadius: '12px' }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', color: '#fff', lineHeight: 1.6, margin: 0 }}>
                Connect with us. India's Leading Franchise Expansion.
              </p>
            </div>
          </FadeSection>

          {/* Form column */}
          <FadeSection delay={200}>
            <div style={{ marginBottom: '32px' }}>
              <div className="section-label" style={{ marginBottom: '12px' }}>Tell us about your requirement</div>
              <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7 }}>
                Our team will connect with you to discuss your business goals, expansion plans, or investment interests.
              </p>
            </div>
            <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
              <LeadForm source="contact" submitLabel="Send Message" />
            </div>
          </FadeSection>
        </div>
      </div>

      {/* EXTENSION SECTION */}
      <div className="ct-about-section" style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div className="ct-about-grid" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }}>
          <FadeSection>
            <div className="section-label" style={{ marginBottom: '20px' }}>About XPAND Bharat</div>
            <div style={{ width: '40px', height: '2px', background: 'var(--orange)' }} />
          </FadeSection>
          <FadeSection delay={150} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
              Headquartered in Gurugram, XPAND Bharat brings 25+ years of collective experience across franchise consulting, investor advisory, expansion planning, and execution-led business growth.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
              Businesses do not struggle because of lack of ambition. They struggle without structured support.
            </p>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4 }}>
              That is where XPAND comes in.
            </p>
            <div style={{ paddingTop: '8px' }}>
              <Link to="/our-approach" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--orange)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.03em', textDecoration: 'none', border: '1px solid rgba(240,121,32,0.4)', borderRadius: '10px', padding: '12px 20px', transition: 'background 0.2s, border-color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,121,32,0.1)'; e.currentTarget.style.borderColor = 'var(--orange)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(240,121,32,0.4)'; }}
              >
                Understand our expansion framework <span style={{ fontSize: '16px' }}>→</span>
              </Link>
            </div>
          </FadeSection>
        </div>
      </div>
      <style>{`
        @keyframes xbMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .xb-marquee-track { display: flex; width: max-content; animation: xbMarquee 28s linear infinite; }
        @media (max-width: 860px) {
          .ct-about-section { padding: 64px 24px !important; }
          .ct-about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        .xb-marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
