import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const FOCUS_AREAS = [
  {
    tag: 'Expansion',
    label: 'Business Expansion',
    desc: 'Helping brands grow through structured, scalable, and execution-led expansion systems across India.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Investors',
    label: 'Investor Alignment',
    desc: 'Connecting investors with commercially verified, growth-ready opportunities backed by real due diligence.',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Clarity',
    label: 'Commercial Clarity',
    desc: 'Creating clear commercial frameworks so every business decision is backed by structured, data-driven thinking.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Execution',
    label: 'Execution Support',
    desc: 'Operational discipline and on-ground coordination to ensure strategy becomes tangible progress.',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Growth',
    label: 'Scalable Growth',
    desc: 'Building systems, processes, and governance structures that sustain momentum at every stage of growth.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
  },
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
  const { hero, section } = useContent('about');
  const focusAreas = section('focus-areas', FOCUS_AREAS).map(item => ({
    tag: item.tag,
    label: item.title || item.label,
    desc: item.description || item.desc,
    img: item.imageUrl || item.img,
  }));
  const whyItems = section('why-us', WHY).map(item => ({
    num: item.badge || item.num,
    title: item.title,
    desc: item.description || item.desc,
  }));
  const heroImg = hero?.backgroundImage || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
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
        <div className="xb-grid-2col" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
          <FadeSection>
            <div className="section-label">Who We Are</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: '32px' }}>
              Where brands meet<br />
              <em style={{ fontStyle: 'italic', color: 'var(--orange)' }}>investors</em>.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '24px' }}>
              XPANDBHARAT works with brands, investors, and growth-stage businesses that want stronger commercial alignment, scalable expansion, and disciplined execution.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px' }}>
              Our approach is built on strategy, structure, and operational clarity. We don't make noise — we make progress.
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

      {/* FOCUS AREAS — Cinematic card grid */}
      <div style={{ background: '#04080f' }}>
        {/* Section header */}
        <div style={{ padding: '80px 40px 52px' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <FadeSection>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(220,168,60,0.85)', textTransform: 'uppercase', marginBottom: '18px' }}>
                What We Focus On
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: 0 }}>
                Five areas. One direction.
              </h2>
            </FadeSection>
            <FadeSection delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '14px', lineHeight: 1.7, maxWidth: '320px', margin: 0 }}>
                Every service, conversation, and engagement traces back to one of these five areas.
              </p>
            </FadeSection>
          </div>
        </div>

        {/* 5-card cinematic grid */}
        <div className="fa-grid">
          {focusAreas.map((area) => (
            <div
              key={area.label}
              className="fa-card"
              style={{ position: 'relative', height: '540px', overflow: 'hidden', borderRadius: '4px', cursor: 'default', flexShrink: 0 }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.fa-img').style.transform = 'scale(1.06)';
                e.currentTarget.querySelector('.fa-desc').style.opacity = '1';
                e.currentTarget.querySelector('.fa-desc').style.transform = 'translateY(0)';
                e.currentTarget.querySelector('.fa-grad').style.background = 'linear-gradient(180deg, rgba(4,8,15,0.6) 0%, rgba(4,8,15,0.1) 30%, rgba(4,8,15,0.96) 100%)';
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.fa-img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.fa-desc').style.opacity = '0';
                e.currentTarget.querySelector('.fa-desc').style.transform = 'translateY(10px)';
                e.currentTarget.querySelector('.fa-grad').style.background = 'linear-gradient(180deg, rgba(4,8,15,0.55) 0%, rgba(4,8,15,0.1) 38%, rgba(4,8,15,0.85) 100%)';
              }}
            >
              {/* Image */}
              <div className="fa-img" style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("${area.img}")`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94)',
              }} />

              {/* Cinematic gradient */}
              <div className="fa-grad" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,8,15,0.55) 0%, rgba(4,8,15,0.1) 38%, rgba(4,8,15,0.85) 100%)', transition: 'background 0.4s ease' }} />

              {/* Tag — top left */}
              <div style={{ position: 'absolute', top: '22px', left: '22px', zIndex: 2 }}>
                <span style={{
                  fontSize: '9px', fontWeight: 700, letterSpacing: '0.28em',
                  textTransform: 'uppercase', padding: '5px 12px',
                  border: '1px solid rgba(220,168,60,0.55)',
                  color: 'rgba(230,178,70,0.92)',
                }}>{area.tag}</span>
              </div>

              {/* Bottom title */}
              <div style={{ position: 'absolute', bottom: '28px', left: '22px', right: '22px', zIndex: 2 }}>
                <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.4)', marginBottom: '14px' }} />
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(18px, 1.6vw, 24px)',
                  fontWeight: 400, fontStyle: 'italic',
                  color: '#fff', margin: 0, lineHeight: 1.3,
                }}>{area.label}</h3>
                <p className="fa-desc" style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: '13px', lineHeight: 1.7,
                  margin: '12px 0 0',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                }}>{area.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Focus areas grid ── */
        .fa-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          padding: 0 10px 10px;
        }

        /* ── Tablet: 3 + 2 scroll ── */
        @media (max-width: 900px) {
          .fa-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 12px;
            padding: 0 20px 12px;
          }
          .fa-grid::-webkit-scrollbar { display: none; }
          .fa-card {
            width: 72vw;
            min-width: 72vw;
            height: 460px;
            scroll-snap-align: start;
          }
          /* Show description by default on tablet */
          .fa-desc {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .fa-grad {
            background: linear-gradient(
              180deg,
              rgba(4,8,15,0.6) 0%,
              rgba(4,8,15,0.1) 30%,
              rgba(4,8,15,0.96) 100%
            ) !important;
          }
        }

        /* ── Mobile: tighter cards ── */
        @media (max-width: 520px) {
          .fa-grid { padding: 0 16px 12px; gap: 10px; }
          .fa-card { width: 82vw; min-width: 82vw; height: 400px; }
        }
      `}</style>

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
            {whyItems.map((item, i) => (
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
              Let's build something that actually lasts.
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
