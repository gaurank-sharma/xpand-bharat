import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FOCUS_AREAS = [
  { label: 'Business Expansion', desc: 'Helping brands grow through structured, scalable, and execution-led expansion systems.' },
  { label: 'Investor Alignment', desc: 'Connecting investors with commercially viable, growth-ready opportunities across India.' },
  { label: 'Commercial Clarity', desc: 'Creating clear commercial frameworks so every decision is backed by structured thinking.' },
  { label: 'Execution Support', desc: 'Operational discipline and coordination to ensure strategy becomes real business movement.' },
  { label: 'Scalable Growth', desc: 'Building systems, processes, and governance that sustain momentum at every stage.' },
];

const WHY = [
  { num: '01', title: 'Structured business approach', desc: 'Everything we do is built on a framework, not instinct.' },
  { num: '02', title: 'Commercially aligned movement', desc: 'Growth decisions are anchored in commercial reality.' },
  { num: '03', title: 'Execution-focused support', desc: 'We stay involved until the opportunity moves forward.' },
  { num: '04', title: 'Organised growth planning', desc: 'No shortcuts — disciplined planning at every stage.' },
  { num: '05', title: 'Long-term scalability mindset', desc: 'Built for the next 10 years, not just the next quarter.' },
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

export default function About() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div style={{ background: 'var(--navy)', backgroundImage: 'url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '560px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">About XPANDBHARAT</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '800px' }}>
            Built for serious<br />
            <span style={{ color: 'var(--orange)' }}>business movement.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px' }}>
            A business expansion and investor-alignment platform focused on structured growth, commercial clarity, and execution-led business movement.
          </p>
        </div>
      </div>

      {/* BRAND STATEMENT */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
          <FadeSection>
            <div className="section-label">Who We Are</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: '32px' }}>
              Where brands meet<br />
              <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>investors</em>.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '24px' }}>
              XPANDBHARAT works with brands, investors, and growth opportunities looking for stronger alignment, scalable expansion, and disciplined execution support.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px' }}>
              Our approach is built around creating organised business movement through strategy, structure, coordination, and operational clarity. We don't do noise — we do execution.
            </p>
            <Link to="/our-approach" className="btn-outline-dark">Discover Our Approach</Link>
          </FadeSection>
          <FadeSection delay={200}>
            {/* Philosophy card */}
            <div style={{ background: 'var(--navy)', borderRadius: '20px', padding: '60px 48px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(240,121,32,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <div className="section-label" style={{ marginBottom: '24px' }}>Our Philosophy</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, color: '#fff', lineHeight: 1.5, marginBottom: '32px' }}>
                "Growth works better when businesses move with clarity, structure, and execution discipline."
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.7 }}>
                We believe meaningful growth is built through stronger planning, commercially aligned movement, and scalable execution systems — not through scattered activity or market noise.
              </p>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* FOCUS AREAS */}
      <div style={{ background: 'var(--cream)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>What We Focus On</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)' }}>
              Five areas. One direction.
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {FOCUS_AREAS.map((area, i) => (
              <FadeSection key={area.label} delay={i * 80}>
                <div className="card" style={{ height: '100%' }}>
                  <div style={{ width: '40px', height: '3px', background: 'var(--orange)', marginBottom: '24px' }} />
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--navy)', marginBottom: '14px' }}>{area.label}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{area.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* WHY XPANDBHARAT */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px' }}>
            <div className="section-label">Why XPANDBHARAT</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', maxWidth: '540px', lineHeight: 1.2 }}>
              Five reasons businesses choose us.
            </h2>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {WHY.map((item, i) => (
              <FadeSection key={item.num} delay={i * 80}>
                <div className="card-dark" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, color: 'var(--orange)', opacity: 0.4, lineHeight: 1, flexShrink: 0 }}>{item.num}</span>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <FadeSection>
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's build together</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.15 }}>
              Let's build meaningful business movement.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '18px', lineHeight: 1.7, marginBottom: '48px' }}>
              Whether you are scaling a brand, exploring opportunities, or building strategic partnerships, XPANDBHARAT is designed to support serious business growth.
            </p>
            <Link to="/contact" className="btn-primary" style={{ fontSize: '14px' }}>Let's Talk Business</Link>
          </FadeSection>
        </div>
      </div>
    </div>
  );
}
