import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OFFERINGS = [
  { icon: '◈', title: 'Curated Business Opportunities', desc: 'Access to growth-focused business opportunities across scalable sectors and expansion-driven models.' },
  { icon: '◉', title: 'Commercial Clarity', desc: 'Better understanding of business models, market direction, and expansion potential before committing.' },
  { icon: '◎', title: 'Strategic Alignment', desc: 'Opportunities positioned with clearer structure, operational direction, and growth visibility.' },
  { icon: '⬡', title: 'Expansion-Focused Businesses', desc: 'Businesses designed for scalable market movement and long-term development across geographies.' },
  { icon: '△', title: 'Growth-Oriented Sectors', desc: 'Opportunities across industries with expansion potential and strong business scalability fundamentals.' },
  { icon: '◇', title: 'Execution-Focused Support', desc: 'Structured coordination and business support designed to help opportunities move forward efficiently.' },
];

const WHY = [
  'Structured opportunities across sectors',
  'Commercial understanding built-in',
  'Growth-focused approach from day one',
  'Strategic business alignment',
  'Execution-led movement and follow-through',
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

function InvestorForm() {
  const [form, setForm] = useState({ name: '', company: '', mobile: '', email: '', range: '', sector: '', geography: '', intent: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '16px' }}>Conversation started.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '16px' }}>Our team will connect with you to explore the right opportunity within 48 hours.</p>
    </div>
  );

  const fields = [
    { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
    { name: 'company', label: 'Company Name', placeholder: 'Your company or fund name' },
    { name: 'mobile', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
    { name: 'email', label: 'Email Address', placeholder: 'your@email.com' },
    { name: 'range', label: 'Preferred Investment Range', placeholder: 'e.g. ₹50L – ₹2Cr' },
    { name: 'sector', label: 'Sector Interest', placeholder: 'e.g. F&B, Retail, Services…' },
    { name: 'geography', label: 'Preferred Geography', placeholder: 'Target cities or states' },
    { name: 'intent', label: 'Investment Intent', placeholder: 'e.g. franchise, equity, partnership…' },
  ];

  return (
    <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {fields.map(f => (
        <div key={f.name} className="form-group">
          <label className="form-label">{f.label}</label>
          <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={f.name === 'name' || f.name === 'email'} />
        </div>
      ))}
      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label className="form-label">Message</label>
        <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your investment goals and what you are looking for…" className="form-input" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Explore Opportunities</button>
      </div>
    </form>
  );
}

export default function ForInvestors() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div style={{ background: 'var(--navy)', backgroundImage: 'url("https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">For Investors</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
            Discover opportunities built for<br />
            <span style={{ color: 'var(--orange)' }}>serious business growth.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px' }}>
            XPANDBHARAT helps investors explore structured business opportunities designed around commercial clarity, scalability, and long-term growth potential.
          </p>
          <Link to="/growth-opportunities" className="btn-primary">Explore Opportunities</Link>
        </div>
      </div>

      {/* OFFERINGS */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px' }}>
            <div className="section-label">What We Offer</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', maxWidth: '500px', lineHeight: 1.2 }}>
              Six ways we support investors.
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {OFFERINGS.map((item, i) => (
              <FadeSection key={item.title} delay={i * 80}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ fontSize: '32px', color: 'var(--orange)', marginBottom: '20px' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* WHY */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeSection>
            <div className="section-label">Why Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: '24px', lineHeight: 1.2 }}>
              Built for investors looking beyond short-term movement.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
              Whether you are exploring emerging businesses or expansion-driven opportunities, we help create more meaningful investment conversations.
            </p>
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
          </FadeSection>
          <FadeSection delay={200} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {WHY.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px 24px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--orange)', flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </FadeSection>
        </div>
      </div>

      {/* FORM */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '56px', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's explore together</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Let's explore the right opportunity.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7 }}>
              Tell us about your investment interests, preferred sectors, and business goals. Our team will connect with you to take the conversation forward.
            </p>
          </FadeSection>
          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
            <InvestorForm />
          </div>
        </div>
      </div>
    </div>
  );
}
