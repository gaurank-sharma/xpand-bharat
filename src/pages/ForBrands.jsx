import { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

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
  {
    num: '01',
    title: 'We Do Not Just Generate Franchise Leads. We Help Close Expansion Opportunities.',
    desc: 'Most franchise consulting firms stop at introductions. XPAND helps businesses move from investor interest to commercially aligned expansion through investor counseling, follow-ups, franchise alignment, and execution support.',
  },
  {
    num: '02',
    title: 'Qualified Investors Matter More Than Large Databases.',
    desc: 'A business does not need 500 random inquiries. It needs the right investors. XPAND focuses on franchise investor alignment through structured lead generation, investor mapping, CRM-led tracking, and commercially relevant franchise opportunities designed around actual business scalability.',
  },
  {
    num: '03',
    title: 'Good Businesses Often Fail At Expansion Because They Are Not Investor-Ready.',
    intro: 'Many businesses are operationally successful but commercially unstructured for franchising. XPAND helps brands with:',
    items: ['franchise business structuring', 'investor-ready proposals', 'franchise rollout strategy', 'expansion planning', 'market positioning', 'franchise growth systems before investor conversations even begin.'],
  },
  {
    num: '04',
    title: 'Franchising Is Not Just Expansion. It Is Controlled Expansion.',
    desc: 'Opening multiple locations without operational structure creates inconsistency very quickly. XPAND helps businesses scale through structured franchise expansion systems designed around operational scalability, franchise governance, investor alignment, and commercially sustainable growth across India.',
  },
  {
    num: '05',
    title: 'We Understand Investor Psychology, Not Just Franchise Consulting.',
    intro: 'A 40+ business owner investing ₹50 lakh to ₹2 crore is not casually "exploring opportunities." They are comparing:',
    items: ['franchise investments', 'real estate', 'mutual funds', 'independent businesses', 'expansion risk', 'long-term scalability.'],
    closing: "XPAND's investor counseling and telesales-driven approach helps businesses communicate stronger commercial clarity to serious investors looking for structured franchise investment opportunities in India.",
  },
];

function FadeSection({ children, delay = 0, style = {}, className = '' }) {
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
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

const BUSINESS_OPTIONS = ['Franchise your business', 'Expand your business across cities', 'Looking for funding/investors', 'Franchise expansion advisory', 'Investor alignment support', 'Franchise rollout strategy'];
const INVESTOR_OPTIONS = ['Franchise investment opportunities', 'Passive income franchise businesses', 'Multi-location franchise businesses', 'Retail franchise opportunities', 'Food & beverage franchise opportunities', 'Expansion-ready businesses', 'Scalable business investments'];

function PillToggle({ options, selected, onToggle }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {options.map(opt => {
        const active = selected.includes(opt);
        return (
          <button key={opt} type="button" onClick={() => onToggle(opt)} style={{ padding: '8px 16px', borderRadius: '100px', border: `1px solid ${active ? 'var(--orange)' : 'var(--border)'}`, background: active ? 'rgba(240,121,32,0.08)' : 'transparent', color: active ? 'var(--orange)' : 'var(--gray)', fontSize: '13px', fontWeight: active ? 600 : 400, cursor: 'pointer', transition: 'all 0.2s' }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ role: '', lookingFor: [], opportunityType: [], name: '', company: '', mobile: '', email: '', budget: '', markets: '', industry: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const togglePill = (key, val) => setForm(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '16px' }}>Conversation started.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '16px' }}>Our team will connect with you within 48 hours to discuss your expansion plans.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>Are you a Business Owner or an Investor?</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {['Business Owner', 'Investor'].map(role => (
            <button key={role} type="button" onClick={() => setForm(f => ({ ...f, role, lookingFor: [], opportunityType: [] }))} style={{ padding: '14px', borderRadius: '10px', border: `2px solid ${form.role === role ? 'var(--orange)' : 'var(--border)'}`, background: form.role === role ? 'rgba(240,121,32,0.06)' : 'transparent', color: form.role === role ? 'var(--orange)' : 'var(--gray)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Outfit', sans-serif" }}>
              {role}
            </button>
          ))}
        </div>
      </div>
      {form.role === 'Business Owner' && (
        <div>
          <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>What are you looking for?</label>
          <PillToggle options={BUSINESS_OPTIONS} selected={form.lookingFor} onToggle={v => togglePill('lookingFor', v)} />
        </div>
      )}
      {form.role === 'Investor' && (
        <div>
          <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>What type of opportunity are you exploring?</label>
          <PillToggle options={INVESTOR_OPTIONS} selected={form.opportunityType} onToggle={v => togglePill('opportunityType', v)} />
        </div>
      )}
      <div className="xb-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {[
          { name: 'name', label: 'Full Name', placeholder: 'Your full name', req: true },
          { name: 'company', label: 'Company Name', placeholder: 'Your company or brand name' },
          { name: 'mobile', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
          { name: 'email', label: 'Email Address', placeholder: 'your@email.com', req: true },
          { name: 'budget', label: 'Preferred Investment / Expansion Budget', placeholder: 'e.g. ₹50L – ₹2Cr' },
          { name: 'markets', label: 'Preferred Cities / Markets', placeholder: 'Target cities or regions' },
          { name: 'industry', label: 'Industry Preference', placeholder: 'e.g. F&B, Retail, Lifestyle' },
        ].map(f => (
          <div key={f.name} className="form-group">
            <label className="form-label">{f.label}</label>
            <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={!!f.req} />
          </div>
        ))}
        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
          <label className="form-label">Message / Requirement</label>
          <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us more about your requirement…" className="form-input" style={{ minHeight: '120px' }} />
        </div>
      </div>
      <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start the Conversation</button>
    </form>
  );
}

export default function ForBrands() {
  const { hero, section } = useContent('for-brands');
  const services = section('services', SERVICES).map((item, i) => ({
    title: item.title,
    desc: item.description || item.desc,
    img: item.imageUrl || item.img,
    tag: item.tag,
    tagDark: item.tagDark !== undefined ? item.tagDark : i % 2 !== 0,
  }));
  const whyItems = section('why-us', WHY).map(item => ({
    num: item.num,
    title: item.title,
    desc: item.description || item.desc,
    intro: item.intro,
    items: item.items,
    closing: item.closing,
  }));
  const bgImage = hero?.backgroundImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Helmet>
        <title>For Brands — Franchise Expansion Consultants India | XPAND Bharat</title>
        <meta name="description" content="XPAND Bharat helps brands expand across India through structured franchising, investor alignment, and execution-led growth. India's leading franchise expansion consultants helping brands scale city by city." />
        <meta name="keywords" content="franchise expansion consultants India, franchise consulting company India, franchise lead generation, business expansion advisory India, franchise rollout strategy, franchise partner acquisition" />
      </Helmet>
      {/* ── SPLIT HERO ── */}
      <div className="fb-hero">
        {/* Left content */}
        <div className="fb-hero-left">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ marginBottom: '32px' }}>For Brands</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 4vw, 60px)', fontWeight: 700, color: '#fff', lineHeight: 1.08, margin: '0 0 28px' }}>
              Expanding India's Best Franchise Businesses,{' '}
              <span style={{ color: 'var(--orange)' }}>One City At A Time.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.75, maxWidth: '480px', marginBottom: '48px' }}>
              You've built the business. You know it works. Now it's time to take it to more cities, more customers, and more markets — with the structure, investor alignment, and expansion support that actually gets it done.
            </p>
            <Link to="/contact" className="btn-primary">Start Expanding →</Link>
          </div>
        </div>

        {/* Right image panel */}
        <div className="fb-hero-right">
          <img
            src={bgImage}
            alt="Brand expansion"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="fb-hero-grad" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--navy-dark) 0%, rgba(7,15,35,0.4) 60%, rgba(7,15,35,0.5) 100%)' }} />
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
            {services.map((s, i) => (
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
          .fb-pillar-card { flex-direction: column; }
          .fb-pillar-img { width: 100%; height: 180px; }
          .fb-pillar-body { padding: 20px 20px 18px; }
        }

        /* ── Why cards grid ── */
        .fb-why-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        .fb-why-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 36px 32px;
          transition: background 0.25s, border-color 0.25s;
        }
        .fb-why-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(240,121,32,0.2);
        }
        .fb-why-card-1,
        .fb-why-card-2,
        .fb-why-card-3 { grid-column: span 2; }
        .fb-why-card-4,
        .fb-why-card-5 { grid-column: span 3; }

        @media (max-width: 1024px) {
          .fb-why-grid { grid-template-columns: 1fr 1fr; }
          .fb-why-card-1, .fb-why-card-2, .fb-why-card-3,
          .fb-why-card-4, .fb-why-card-5 { grid-column: span 1; }
        }
        @media (max-width: 600px) {
          .fb-why-grid { grid-template-columns: 1fr; }
          .fb-why-card { padding: 28px 24px; }
        }
      `}</style>

      {/* WHY SECTION */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          {/* Header row */}
          <FadeSection style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', marginBottom: '72px' }}>
            <div>
              <div className="section-label">Why Us</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.1 }}>
                Why businesses choose<br />
                <span style={{ color: 'var(--orange)' }}>XPAND Bharat.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '24px' }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', fontStyle: 'italic', margin: 0, textAlign: 'right' }}>
                Because expansion without structure becomes expensive very quickly.
              </p>
              <Link to="/contact" className="btn-primary">Start the Conversation</Link>
            </div>
          </FadeSection>

          {/* 3+2 card grid */}
          <div className="fb-why-grid">
            {whyItems.map((item, i) => (
              <FadeSection key={item.title} delay={i * 80} className={`fb-why-card fb-why-card-${i + 1}`}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1, opacity: 0.25, marginBottom: '20px' }}>
                  {item.num}
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(15px, 1.4vw, 18px)', fontWeight: 700, color: '#fff', marginBottom: '14px', lineHeight: 1.35 }}>{item.title}</h4>
                {item.desc && <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>}
                {item.intro && <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.8, marginBottom: '10px' }}>{item.intro}</p>}
                {item.items && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {item.items.map(it => (
                      <li key={it} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', lineHeight: 1.7, paddingLeft: '15px', position: 'relative' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--orange)', fontSize: '9px', top: '3px' }}>→</span>{it}
                      </li>
                    ))}
                  </ul>
                )}
                {item.closing && <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: 1.8, margin: 0 }}>{item.closing}</p>}
              </FadeSection>
            ))}
          </div>


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
