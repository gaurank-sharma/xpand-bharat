import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const INFO = [
  { label: 'Email Address', value: 'contact@xpandbharat.com', href: 'mailto:contact@xpandbharat.com', icon: '✉' },
  { label: 'WhatsApp / Phone', value: '+91 77172 72838', href: 'tel:+917717272838', icon: '✆' },
  { label: 'Office Address', value: 'Gurugram, Haryana, India', href: null, icon: '⊕' },
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

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const togglePill = (key, val) => setForm(f => ({ ...f, [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val] }));
  const setRole = role => setForm(f => ({ ...f, role, lookingFor: [], opportunityType: [] }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const selects = form.role === 'Business Owner' ? form.lookingFor : form.opportunityType;
    const requirement = [form.role, selects.length > 0 ? selects.join(', ') : ''].filter(Boolean).join(' — ');
    try {
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, company: form.company, mobile: form.mobile, email: form.email, requirement, markets: `${form.markets}${form.budget ? ' | Budget: ' + form.budget : ''}${form.industry ? ' | Industry: ' + form.industry : ''}`, message: form.message }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ width: '64px', height: '64px', background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px', color: '#fff' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', color: 'var(--navy)', marginBottom: '16px' }}>Inquiry Received.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto' }}>
        Your request has been forwarded to our team. We will shortly get in touch with you. A confirmation has been sent to your email.
      </p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Q1: Role */}
      <div>
        <label className="form-label" style={{ marginBottom: '12px', display: 'block' }}>Are you a Business Owner or an Investor?</label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {['Business Owner', 'Investor'].map(role => (
            <button key={role} type="button" onClick={() => setRole(role)} style={{ padding: '14px', borderRadius: '10px', border: `2px solid ${form.role === role ? 'var(--orange)' : 'var(--border)'}`, background: form.role === role ? 'rgba(240,121,32,0.06)' : 'transparent', color: form.role === role ? 'var(--orange)' : 'var(--gray)', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Outfit', sans-serif" }}>
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Q2: Conditional options */}
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

      {/* Common fields */}
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
          <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your business goals, expansion plans, or investment interests…" className="form-input" style={{ minHeight: '140px' }} />
        </div>
      </div>

      {error && (
        <div style={{ background: 'rgba(220,53,69,0.08)', border: '1px solid rgba(220,53,69,0.25)', borderRadius: '8px', padding: '12px 16px', color: '#c0392b', fontSize: '14px' }}>
          {error}
        </div>
      )}
      <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '14px', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
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
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
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
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
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
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#fff', lineHeight: 1.6, margin: '0 0 12px' }}>
                "Less noise. More execution. Brands + investors aligned."
              </p>
              <p style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>No drama, only delivery.</p>
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
              <ContactForm />
            </div>
          </FadeSection>
        </div>
      </div>

      {/* EXTENSION SECTION */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }}>
          <FadeSection>
            <div className="section-label" style={{ marginBottom: '20px' }}>About XPAND Bharat</div>
            <div style={{ width: '40px', height: '2px', background: 'var(--orange)' }} />
          </FadeSection>
          <FadeSection delay={150} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
              Headquartered in Gurugram, XPAND Bharat brings 25+ years of collective experience across franchise consulting, investor advisory, expansion planning, and execution-led business growth.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
              Businesses do not struggle because of lack of ambition. They struggle because expansion without structure, investor alignment, and operational planning becomes difficult to sustain at scale.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.4 }}>
              That is where XPAND comes in.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
              From franchise business structuring and investor-ready proposals to investor alignment, telesales-driven counseling, and expansion execution support, XPAND helps brands scale through commercially disciplined franchise growth systems designed for long-term expansion across India.
            </p>
            <div style={{ paddingTop: '8px' }}>
              <Link to="/our-approach" style={{ color: 'var(--orange)', fontSize: '15px', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Understand our expansion framework → <span style={{ textDecoration: 'underline' }}>Our Approach</span>
              </Link>
            </div>
          </FadeSection>
        </div>
      </div>
      <style>{`
        @keyframes xbMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .xb-marquee-track { display: flex; width: max-content; animation: xbMarquee 28s linear infinite; }
        .xb-marquee-track:hover { animation-play-state: paused; }
      `}</style>
    </div>
  );
}
