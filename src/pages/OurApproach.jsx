import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const STEPS = [
  {
    num: '01',
    title: 'Understand',
    desc: 'We begin by understanding the business, growth requirement, expansion goals, and commercial direction behind the opportunity. No assumptions — just clarity.',
  },
  {
    num: '02',
    title: 'Structure',
    desc: 'We help organise the opportunity through clearer positioning, scalable planning, and stronger operational direction that creates the foundation for real growth.',
  },
  {
    num: '03',
    title: 'Align',
    desc: 'We focus on bringing the right businesses, investors, and opportunities together through commercially aligned conversations and shared commercial direction.',
  },
  {
    num: '04',
    title: 'Execute',
    desc: 'From coordination and follow-ups to onboarding and rollout support, we focus on disciplined business movement that turns strategy into tangible outcomes.',
  },
  {
    num: '05',
    title: 'Scale',
    desc: 'We support long-term growth through operational structure, execution discipline, and scalable business systems that sustain momentum beyond the initial push.',
  },
];

const PRINCIPLES = [
  { label: 'Alignment', desc: 'Right businesses, right partners, right direction.' },
  { label: 'Structure', desc: 'Organised frameworks that scale with you.' },
  { label: 'Clarity', desc: 'Remove noise, sharpen decision-making.' },
  { label: 'Execution', desc: 'Disciplined movement over scattered activity.' },
  { label: 'Governance', desc: 'Standards and accountability at every stage.' },
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

function ApproachForm() {
  const [form, setForm] = useState({ name: '', company: '', mobile: '', email: '', requirement: '', interest: '', markets: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '16px' }}>Conversation initiated.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '16px' }}>Our team will connect with you to discuss the next stage of growth.</p>
    </div>
  );

  return (
    <form onSubmit={submit} className="xb-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {[
        { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
        { name: 'company', label: 'Company Name', placeholder: 'Your company name' },
        { name: 'mobile', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
        { name: 'email', label: 'Email Address', placeholder: 'your@email.com' },
        { name: 'requirement', label: 'Business Requirement', placeholder: 'What you need help with' },
        { name: 'interest', label: 'Expansion / Investment Interest', placeholder: 'Your primary goal' },
        { name: 'markets', label: 'Preferred Markets', placeholder: 'Target cities or regions' },
      ].map(f => (
        <div key={f.name} className="form-group">
          <label className="form-label">{f.label}</label>
          <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={f.name === 'name' || f.name === 'email'} />
        </div>
      ))}
      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label className="form-label">Message</label>
        <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your business goals and what kind of support you need…" className="form-input" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Move the Conversation Forward</button>
      </div>
    </form>
  );
}

export default function OurApproach() {
  const { hero, section } = useContent('our-approach');
  const steps = section('steps', STEPS).map(item => ({
    num: item.badge || item.num,
    title: item.title,
    desc: item.description || item.desc,
  }));
  const principles = section('principles', PRINCIPLES).map(item => ({
    label: item.title || item.label,
    desc: item.description || item.desc,
  }));
  const heroImg = hero?.backgroundImage || 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Our Approach</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '760px' }}>
            Structured thinking.<br />
            <span style={{ color: 'var(--orange)' }}>Disciplined execution.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px' }}>
            A practical, execution-focused approach designed to help brands and investors move with sharper direction, commercial clarity, and the operational structure that serious growth demands.
          </p>
        </div>
      </div>

      {/* STEPS — alternating layout */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '80px', maxWidth: '600px' }}>
            <div className="section-label">Five-Stage Framework</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>
              How we move opportunities forward.
            </h2>
          </FadeSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, i) => (
              <FadeSection key={step.num} delay={i * 100}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr',
                  gap: '48px',
                  padding: '56px 0',
                  borderBottom: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'start',
                }}>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '64px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1, opacity: 0.3 }}>{step.num}</div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>{step.title}</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px' }}>{step.desc}</p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* PRINCIPLES */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>What Drives Our Approach</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff' }}>
              Five principles. One direction.
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {principles.map((p, i) => (
              <FadeSection key={p.label} delay={i * 80} style={{
                padding: '48px 40px',
                background: i === 2 ? 'var(--orange)' : 'rgba(255,255,255,0.03)',
                borderRight: i < PRINCIPLES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textAlign: 'center',
              }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>{p.label}</h4>
                <p style={{ color: i === 2 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '56px', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's talk</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Let's move the conversation forward.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7 }}>
              Tell us about your business goals, expansion plans, or investment interests. Our team will connect with you to discuss the next stage of growth.
            </p>
          </FadeSection>
          <div className="xb-form-wrap" style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
            <ApproachForm />
          </div>
        </div>
      </div>
    </div>
  );
}
