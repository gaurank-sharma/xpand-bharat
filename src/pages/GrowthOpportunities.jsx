import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    icon: '◈',
    tag: 'Food & Beverage',
    title: 'F&B Expansion',
    desc: 'Expansion-focused opportunities across scalable food and beverage business formats — from QSR to cloud kitchens.',
    range: '₹30L – ₹2Cr',
  },
  {
    icon: '◎',
    tag: 'Retail & Lifestyle',
    title: 'Retail Formats',
    desc: 'Structured retail opportunities designed for market growth and brand expansion across tier-1 and tier-2 cities.',
    range: '₹50L – ₹5Cr',
  },
  {
    icon: '◉',
    tag: 'Service Businesses',
    title: 'Service Sector',
    desc: 'Operationally scalable business opportunities across high-growth service sectors with strong recurring revenue.',
    range: '₹20L – ₹1Cr',
  },
  {
    icon: '⬡',
    tag: 'Emerging Brands',
    title: 'Growth Stage',
    desc: 'Growth-stage businesses looking for expansion, strategic alignment, and market movement with proven models.',
    range: '₹1Cr – ₹10Cr',
  },
  {
    icon: '△',
    tag: 'Franchise',
    title: 'Franchise Models',
    desc: 'Structured franchise models built for organised and scalable business growth with defined operational systems.',
    range: '₹25L – ₹3Cr',
  },
  {
    icon: '◇',
    tag: 'Multi-Market',
    title: 'Expansion-Led Businesses',
    desc: 'Businesses positioned for multi-market growth and long-term operational scalability across India.',
    range: '₹2Cr – ₹20Cr',
  },
];

const DIFFERENTIATORS = [
  'Commercially aligned models',
  'Scalable business structure',
  'Growth-focused positioning',
  'Expansion readiness verified',
  'Execution-focused movement',
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

function OppForm() {
  const [form, setForm] = useState({ name: '', company: '', mobile: '', email: '', sector: '', category: '', interest: '', markets: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '16px' }}>Enquiry received.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '16px' }}>We'll match you with the most relevant opportunities within 48 hours.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {[
        { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
        { name: 'company', label: 'Company Name', placeholder: 'Your company name' },
        { name: 'mobile', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
        { name: 'email', label: 'Email Address', placeholder: 'your@email.com' },
        { name: 'sector', label: 'Sector Interest', placeholder: 'e.g. F&B, Retail, Services…' },
        { name: 'category', label: 'Preferred Business Category', placeholder: 'Category of interest' },
        { name: 'interest', label: 'Investment / Expansion Interest', placeholder: 'Your intent or budget range' },
        { name: 'markets', label: 'Preferred Markets', placeholder: 'Target cities or states' },
      ].map(f => (
        <div key={f.name} className="form-group">
          <label className="form-label">{f.label}</label>
          <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={f.name === 'name' || f.name === 'email'} />
        </div>
      ))}
      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label className="form-label">Message</label>
        <textarea name="message" value={form.message} onChange={handle} placeholder="Describe what kind of opportunity you are looking for…" className="form-input" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Explore Opportunities</button>
      </div>
    </form>
  );
}

export default function GrowthOpportunities() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div style={{ background: 'var(--navy)', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(240,121,32,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Growth Opportunities</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
            Opportunities built for<br />
            <span style={{ color: 'var(--orange)' }}>scalable business growth.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px' }}>
            Curated business opportunities designed around commercial clarity, operational structure, and long-term scalability across India.
          </p>
          <Link to="/contact" className="btn-primary">Explore Opportunities</Link>
        </div>
      </div>

      {/* OPPORTUNITY CATEGORIES */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px' }}>
            <div className="section-label">Business Opportunities</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', maxWidth: '520px', lineHeight: 1.2 }}>
              Sectors we bring to the table.
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {CATEGORIES.map((cat, i) => (
              <FadeSection key={cat.tag} delay={i * 70}>
                <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <span style={{ fontSize: '28px', color: 'var(--orange)' }}>{cat.icon}</span>
                    <span className="pill">{cat.tag}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>{cat.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>{cat.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)' }}>Investment range</span>
                    <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '14px' }}>{cat.range}</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* DIFFERENTIATORS */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <FadeSection>
            <div className="section-label">What Makes These Different</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: '24px', lineHeight: 1.2 }}>
              Built for serious business movement.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px' }}>
              XPANDBHARAT focuses on opportunities backed by stronger structure, clearer growth direction, and commercially intelligent expansion thinking.
            </p>
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
          </FadeSection>
          <FadeSection delay={200} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {DIFFERENTIATORS.map((item, i) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'var(--orange)', width: '32px', flexShrink: 0 }}>0{i + 1}</span>
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
            <div className="section-label" style={{ justifyContent: 'center' }}>Enquire now</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Let's explore the right opportunity.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7 }}>
              Tell us about your business interests, preferred sectors, and growth goals. Our team will connect to take the conversation forward.
            </p>
          </FadeSection>
          <div style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
            <OppForm />
          </div>
        </div>
      </div>
    </div>
  );
}
