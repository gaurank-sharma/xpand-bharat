import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  { icon: '◈', title: 'Franchise Expansion', desc: 'Structured franchise expansion designed for scalable and sustainable business growth.' },
  { icon: '◎', title: 'Territory Planning', desc: 'Identifying the right cities, markets, and growth opportunities for disciplined expansion.' },
  { icon: '◉', title: 'Channel Development', desc: 'Building organised channel and distribution growth frameworks for stronger market presence.' },
  { icon: '⬡', title: 'Partner Acquisition', desc: 'Helping brands connect with commercially aligned franchise and business partners.' },
  { icon: '△', title: 'Expansion Strategy', desc: 'Creating growth-focused expansion plans built around scalability and operational clarity.' },
  { icon: '◇', title: 'Rollout Support', desc: 'Supporting onboarding, coordination, and execution during expansion movement.' },
];

const WHY = [
  'Structured expansion approach',
  'Commercial clarity at every stage',
  'Execution-focused support',
  'Organised growth movement',
  'Long-term scalability mindset',
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
    <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
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
      {/* PAGE HERO */}
      <div style={{ background: 'var(--navy)', backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">For Brands</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '700px' }}>
            Expand with structure.<br />
            <span style={{ color: 'var(--orange)' }}>Scale with clarity.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px' }}>
            XPANDBHARAT helps brands grow through strategic expansion planning, market alignment, operational structure, and execution-focused business support.
          </p>
          <Link to="/contact" className="btn-primary">Discuss Your Requirement</Link>
        </div>
      </div>

      {/* SERVICES GRID */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px' }}>
            <div className="section-label">What We Offer</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', maxWidth: '500px', lineHeight: 1.2 }}>
              Six pillars of brand expansion.
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {SERVICES.map((s, i) => (
              <FadeSection key={s.title} delay={i * 80}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ fontSize: '32px', color: 'var(--orange)', marginBottom: '20px' }}>{s.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>{s.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* WHY SECTION */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeSection>
            <div className="section-label">Why Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: '32px', lineHeight: 1.2 }}>
              Why brands work with XPANDBHARAT.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
              Built for brands serious about growth. We focus on helping businesses expand through stronger planning, operational discipline, and execution-led growth support.
            </p>
            <Link to="/contact" className="btn-primary">Start the Conversation</Link>
          </FadeSection>
          <FadeSection delay={200} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {WHY.map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--orange)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', fontWeight: 500 }}>{item}</span>
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
              Tell us about your brand, expansion goals, and preferred markets. Our team will connect with you to take the conversation forward.
            </p>
          </FadeSection>
          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
