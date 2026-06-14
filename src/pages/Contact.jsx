import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

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
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: 'url("/contact.png")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.55) 0%, rgba(7,15,35,0.32) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-card">
            <div className="section-label">Start a Conversation</div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
              Let's start the right<br />
              <span style={{ color: 'var(--orange)' }}>business conversation.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '540px' }}>
              Whether you are exploring expansion, investment opportunities, or strategic partnerships — XPANDBHARAT is ready to move the conversation forward.
            </p>
          </div>
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

            {/* Tagline callout */}
            <div style={{ marginTop: '40px', padding: '32px 30px', background: 'var(--navy)', borderRadius: '14px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(240,121,32,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ width: '40px', height: '3px', background: 'var(--orange)', borderRadius: '2px', marginBottom: '18px' }} />
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: '19px', fontWeight: 600, color: '#fff', lineHeight: 1.45, margin: 0, position: 'relative', zIndex: 1 }}>
                Connect with us. <span style={{ color: 'var(--orange)' }}>India&apos;s leading franchise expansion partner.</span>
              </p>
            </div>
          </FadeSection>

          {/* Form column */}
          <FadeSection delay={200}>
            <div style={{ marginBottom: '32px' }}>
              <div className="section-label" style={{ marginBottom: '14px' }}>Send a Message</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, margin: '0 0 12px' }}>
                How can we help you?
              </h2>
              <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
                Share a few details and our team will get back to you to discuss your expansion, investment, or partnership goals.
              </p>
            </div>
            <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
              <ContactForm />
            </div>
          </FadeSection>
        </div>
      </div>

      {/* EXTENSION SECTION */}
      <div className="ct-about-section" style={{ background: 'var(--navy)', padding: '110px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(240,121,32,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="ct-about-grid" style={{ maxWidth: '1320px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          {/* Image + badge */}
          <FadeSection>
            <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 30px 70px rgba(0,0,0,0.35)' }}>
              <img src="/image.png" alt="XPAND Bharat office" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', left: '18px', bottom: '18px', background: 'rgba(9,17,38,0.82)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(240,121,32,0.4)', borderRadius: '12px', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: '34px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1 }}>25+</span>
                <span style={{ color: 'rgba(255,255,255,0.82)', fontSize: '12px', lineHeight: 1.45 }}>Years of collective<br />industry experience</span>
              </div>
            </div>
          </FadeSection>

          {/* Content */}
          <FadeSection delay={150}>
            <div className="section-label">About XPAND Bharat</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: '#fff', lineHeight: 1.18, margin: '16px 0 22px' }}>
              Built on <span style={{ color: 'var(--orange)' }}>structured support.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.85, margin: '0 0 18px' }}>
              Headquartered in Gurugram, XPAND Bharat brings 25+ years of collective experience across franchise consulting, investor advisory, expansion planning, and execution-led business growth.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.85, margin: '0 0 10px' }}>
              Businesses do not struggle because of lack of ambition. They struggle without structured support.
            </p>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: '19px', fontWeight: 700, color: '#fff', margin: '0 0 30px', lineHeight: 1.4 }}>
              That is where XPAND comes in.
            </p>
            <Link to="/our-approach" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: 'var(--orange)', fontSize: '14px', fontWeight: 700, letterSpacing: '0.03em', textDecoration: 'none', border: '1px solid rgba(240,121,32,0.4)', borderRadius: '10px', padding: '13px 22px', transition: 'background 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(240,121,32,0.1)'; e.currentTarget.style.borderColor = 'var(--orange)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(240,121,32,0.4)'; }}
            >
              Understand our expansion framework <span style={{ fontSize: '16px' }}>→</span>
            </Link>
          </FadeSection>
        </div>
      </div>
      <style>{`
        @keyframes xbMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .xb-marquee-track { display: flex; width: max-content; animation: xbMarquee 55s linear infinite; }
        @media (max-width: 860px) {
          .ct-about-section { padding: 64px 24px !important; }
          .ct-about-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        .xb-marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
