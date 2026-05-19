import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    title: 'Franchise Expansion',
    desc: 'Structured franchise expansion designed for scalable and sustainable business growth across India.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80',
    tag: 'Franchise Ready', tagDark: false,
  },
  {
    title: 'Territory Planning',
    desc: 'Identifying the right cities, markets, and geographies for disciplined, data-backed expansion.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
    tag: 'Market Mapping', tagDark: true,
  },
  {
    title: 'Channel Development',
    desc: 'Building organised channel and distribution frameworks for stronger market reach and brand presence.',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80',
    tag: 'Multi-Channel', tagDark: false,
  },
  {
    title: 'Partner Acquisition',
    desc: 'Connecting brands with commercially aligned franchise and business partners across tier-1 and tier-2 cities.',
    img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=300&q=80',
    tag: 'Partner Network', tagDark: true,
  },
  {
    title: 'Expansion Strategy',
    desc: 'Growth-focused expansion plans built around real scalability, unit economics, and operational clarity.',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=300&q=80',
    tag: 'Growth Planning', tagDark: false,
  },
  {
    title: 'Rollout Support',
    desc: 'End-to-end support for onboarding, coordination, and execution from day one through full rollout.',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=300&q=80',
    tag: 'Full Support', tagDark: true,
  },
];

const WHY = [
  { title: 'Structured expansion approach', desc: 'We build frameworks that hold when markets get complicated — not just plans that look good on paper.' },
  { title: 'Commercial clarity at every stage', desc: 'Every decision is grounded in real business logic. No guesswork, no assumptions.' },
  { title: 'Execution-focused support', desc: 'We stay involved until the work moves forward. Strategy without execution is noise.' },
  { title: 'Pan-India expansion reach', desc: 'Proven networks across tier-1 and tier-2 cities with on-ground partner and channel access.' },
  { title: 'Long-term scalability mindset', desc: 'We build for the next five years, not just the next quarter. Sustainable growth over quick wins.' },
];

function FadeSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} style={style}>{children}</div>;
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', brand: '', mobile: '', email: '', category: '', presence: '', goal: '', markets: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '16px' }}>Conversation started.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '16px' }}>Our team will connect with you within 48 hours to discuss your expansion plans.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="xb-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {[
        { name: 'name', label: 'Full Name', placeholder: 'Your full name', full: false },
        { name: 'brand', label: 'Brand / Company Name', placeholder: 'Brand name', full: false },
        { name: 'mobile', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX', full: false },
        { name: 'email', label: 'Email Address', placeholder: 'your@email.com', full: false },
        { name: 'category', label: 'Business Category', placeholder: 'e.g. F&B, Retail, Services…', full: false },
        { name: 'presence', label: 'Current Presence', placeholder: 'Cities / outlets currently operating', full: false },
        { name: 'goal', label: 'Expansion Goal', placeholder: 'What you want to achieve', full: false },
        { name: 'markets', label: 'Preferred Markets / Cities', placeholder: 'Target markets', full: false },
        { name: 'message', label: 'Message', placeholder: 'Tell us more about your requirement…', full: true, textarea: true },
      ].map(f => (
        <div key={f.name} className="form-group" style={f.full ? { gridColumn: '1 / -1' } : {}}>
          <label className="form-label">{f.label}</label>
          {f.textarea ? (
            <textarea name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={f.name === 'name' || f.name === 'email'} />
          ) : (
            <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={f.name === 'name' || f.name === 'email'} />
          )}
        </div>
      ))}
      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          Start the Conversation
        </button>
      </div>
    </form>
  );
}

export default function ForBrands() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* ── SPLIT HERO ── */}
      <div className="fb-hero">
        {/* Left content */}
        <div className="fb-hero-left">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ marginBottom: '32px' }}>For Brands</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4.5vw, 68px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, margin: '0 0 28px' }}>
              Expand with{' '}
              <span style={{ background: 'var(--orange)', color: '#fff', padding: '2px 14px', borderRadius: '4px', display: 'inline-block' }}>structure.</span>
              <br />Scale with clarity.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.75, maxWidth: '480px', marginBottom: '48px' }}>
              XPANDBHARAT helps brands grow through strategic expansion planning, market alignment, operational structure, and on-ground execution support.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Start Expanding →</Link>
              <div style={{ display: 'flex', gap: '32px' }}>
                {[{ n: '250+', l: 'Brands Supported' }, { n: '15+', l: 'Years Experience' }].map(s => (
                  <div key={s.l}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: '5px', letterSpacing: '0.05em' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right image panel */}
        <div className="fb-hero-right">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
            alt="Brand expansion"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="fb-hero-grad" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--navy-dark) 0%, rgba(7,15,35,0.4) 60%, rgba(7,15,35,0.5) 100%)' }} />
          {/* Floating metric card */}
          <div className="fb-float-card" style={{ position: 'absolute', bottom: '48px', right: '40px', background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '16px', padding: '28px 36px', zIndex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>180+</div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px', marginTop: '10px', lineHeight: 1.6 }}>Active franchise partners<br />across 30+ cities in India</div>
            <div style={{ marginTop: '16px', height: '2px', width: '40px', background: 'var(--orange)', borderRadius: '2px' }} />
          </div>
        </div>
      </div>

      {/* ── SIX PILLARS — Horizontal cards ── */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px' }}>
            <div className="section-label">What We Offer</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', maxWidth: '520px', lineHeight: 1.15, marginBottom: '0' }}>
              Six pillars of brand expansion.
            </h2>
          </FadeSection>
          <div className="fb-pillars-grid">
            {SERVICES.map((s, i) => (
              <FadeSection key={s.title} delay={i * 70}>
                <div className="fb-pillar-card">
                  {/* Left image */}
                  <div className="fb-pillar-img">
                    <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  {/* Right content */}
                  <div className="fb-pillar-body">
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px', lineHeight: 1.3 }}>{s.title}</h3>
                      <p style={{ color: 'var(--gray)', fontSize: '13.5px', lineHeight: 1.75, margin: 0 }}>{s.desc}</p>
                    </div>
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '5px 14px',
                        borderRadius: '100px',
                        fontSize: '11px', fontWeight: 700,
                        letterSpacing: '0.06em',
                        background: s.tagDark ? 'var(--navy)' : 'var(--orange)',
                        color: '#fff',
                      }}>{s.tag}</span>
                      <span style={{ fontSize: '11px', color: 'var(--gray)', fontWeight: 500 }}>· Core Service</span>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Hero ── */
        .fb-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 680px;
          background: var(--navy-dark);
          overflow: hidden;
        }
        .fb-hero-left {
          padding: 160px 56px 80px 40px;
          position: relative;
          display: flex;
          align-items: center;
          background: var(--navy-dark);
        }
        .fb-hero-right {
          position: relative;
          min-height: 480px;
        }

        /* ── Pillars ── */
        .fb-pillars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .fb-pillar-card {
          display: flex;
          gap: 0;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .fb-pillar-card:hover {
          box-shadow: 0 12px 48px rgba(0,0,0,0.08);
          transform: translateY(-3px);
        }
        .fb-pillar-img {
          width: 140px;
          flex-shrink: 0;
          overflow: hidden;
        }
        .fb-pillar-img img {
          transition: transform 0.5s ease;
        }
        .fb-pillar-card:hover .fb-pillar-img img {
          transform: scale(1.06);
        }
        .fb-pillar-body {
          flex: 1;
          padding: 28px 28px 24px;
          display: flex;
          flex-direction: column;
        }

        /* ── Tablet + Mobile ≤ 900px: image becomes background ── */
        @media (max-width: 900px) {
          .fb-hero {
            display: block;
            position: relative;
            min-height: 100vh;
          }
          /* Image panel fills the whole hero as background */
          .fb-hero-right {
            position: absolute;
            inset: 0;
            z-index: 0;
          }
          /* Override gradient to dark overall (not left-to-right) */
          .fb-hero-grad {
            background: linear-gradient(
              180deg,
              rgba(7,15,35,0.55) 0%,
              rgba(7,15,35,0.92) 100%
            ) !important;
          }
          /* Content sits on top */
          .fb-hero-left {
            position: relative;
            z-index: 1;
            background: transparent !important;
            padding: 110px 24px 72px;
            min-height: 100vh;
            display: flex;
            align-items: flex-end;
          }
          .fb-float-card { display: none; }
          .fb-pillars-grid { grid-template-columns: 1fr; }
        }

        /* ── Mobile ≤ 600px ── */
        @media (max-width: 600px) {
          .fb-hero-left { padding: 90px 16px 56px; }

          /* Stack pillar card: image on top, content below */
          .fb-pillar-card { flex-direction: column; }
          .fb-pillar-img { width: 100%; height: 180px; }
          .fb-pillar-body { padding: 20px 20px 18px; }
        }
      `}</style>

      {/* WHY SECTION */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
        {/* Large watermark number */}
        <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Playfair Display', serif", fontSize: '320px', fontWeight: 700, color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>05</div>

        <div className="xb-grid-2col" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '100px', alignItems: 'start' }}>
          {/* Left */}
          <FadeSection>
            <div className="section-label">Why Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: '#fff', marginBottom: '24px', lineHeight: 1.1 }}>
              Why brands work with<br />
              <span style={{ color: 'var(--orange)' }}>XPANDBHARAT.</span>
            </h2>
            <div style={{ width: '48px', height: '2px', background: 'var(--orange)', margin: '28px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '16px', lineHeight: 1.85, marginBottom: '48px', maxWidth: '380px' }}>
              Built for brands serious about growth — not brands looking for shortcuts. We bring structure, discipline, and real execution to every engagement.
            </p>
            <Link to="/contact" className="btn-primary">Start the Conversation</Link>

            {/* Small credibility stat */}
            <div style={{ marginTop: '56px', padding: '24px 28px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', display: 'inline-block' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>95%</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '6px' }}>Client retention rate</div>
            </div>
          </FadeSection>

          {/* Right — numbered list */}
          <FadeSection delay={150}>
            {WHY.map((item, i) => (
              <div key={item.title} style={{
                display: 'flex', gap: '28px', alignItems: 'flex-start',
                padding: '28px 0',
                borderBottom: i < WHY.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                {/* Number */}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', fontWeight: 700, color: 'var(--orange)', lineHeight: 0.9, flexShrink: 0, width: '56px', opacity: 0.9 }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                {/* Content */}
                <div style={{ paddingTop: '6px' }}>
                  <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </FadeSection>
        </div>
      </div>

      {/* FORM SECTION */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '56px', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's connect</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Let's discuss your expansion plans.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7 }}>
              Tell us about your brand, expansion goals, and preferred markets. Our team will reach out within 24 hours.
            </p>
          </FadeSection>
          <div className="xb-form-wrap" style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
