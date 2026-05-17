import { useRef, useEffect, useState } from 'react';

const INFO = [
  { label: 'Email Address', value: 'info@xpandbharat.com', href: 'mailto:info@xpandbharat.com', icon: '✉' },
  { label: 'Phone Number', value: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX', icon: '✆' },
  { label: 'Office Address', value: 'Gurgaon, Haryana, India', href: null, icon: '⊕' },
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

function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', mobile: '', email: '', requirement: '', markets: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ fontSize: '56px', marginBottom: '24px', color: 'var(--orange)' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', color: 'var(--navy)', marginBottom: '16px' }}>Conversation started.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.7 }}>
        Less noise. More execution. Our team will connect with you within 48 hours to discuss your goals.
      </p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {[
        { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
        { name: 'company', label: 'Company Name', placeholder: 'Your company or brand name' },
        { name: 'mobile', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
        { name: 'email', label: 'Email Address', placeholder: 'your@email.com' },
        { name: 'requirement', label: 'Business Requirement', placeholder: 'What you are looking for' },
        { name: 'markets', label: 'Preferred Markets', placeholder: 'Target cities or regions' },
      ].map(f => (
        <div key={f.name} className="form-group">
          <label className="form-label">{f.label}</label>
          <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={f.name === 'name' || f.name === 'email'} />
        </div>
      ))}
      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label className="form-label">Message</label>
        <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your business goals, expansion plans, or investment interests…" className="form-input" style={{ minHeight: '140px' }} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '14px' }}>
          Send Message
        </button>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div style={{ background: 'var(--navy)', minHeight: '440px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
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

      {/* MAIN CONTENT */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px', alignItems: 'start' }}>

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
    </div>
  );
}
