import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { Home, Search, FileText, Users, Gift } from 'lucide-react';

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

const PROCESS_STEPS = [
  {
    num: 1, eyebrow: 'YOU COME TO US', title: 'We Understand Your Business', Icon: Home,
    items: ['Business model', 'Expansion vision', 'Funding requirements', 'Target cities', 'Scalability potential'],
  },
  {
    num: 2, eyebrow: 'WE MAP', title: 'Expansion Needs Analysis', Icon: Search,
    items: ['Market opportunities', 'City-wise potential', 'Investor fit', 'Commercial viability', 'Rollout strategy'],
  },
  {
    num: 3, eyebrow: 'WE PREPARE', title: 'Investor-Ready Positioning', Icon: FileText,
    items: ['Business proposals', 'Franchise frameworks', 'Expansion positioning', 'Commercial narratives', 'Structured presentations'],
  },
  {
    num: 4, eyebrow: 'WE CONNECT', title: 'Qualified Investor Matchmaking', Icon: Users,
    items: ['Lead-gen systems', 'Investor network access', 'Telesales counseling', 'Investor alignment', 'Franchise matching'],
  },
  {
    num: 5, eyebrow: 'WE CLOSE', title: 'Deal Support Till Closure', Icon: Gift,
    items: ['Investor coordination', 'Execution support', 'Commercial discussions', 'Closure facilitation', 'Scalable growth'],
  },
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
  const heroImg = hero?.backgroundImage || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Helmet>
        <title>About XPAND Bharat — India's Leading Franchise Expansion & Investment Consulting Company</title>
        <meta name="description" content="XPAND Bharat is India's leading franchise expansion and investment consulting company backed by 25+ years of experience. Headquartered in Gurugram, we help brands scale through structured franchising, investor alignment, and execution-led growth." />
        <meta name="keywords" content="franchise consulting company India, franchise expansion India, franchise investment advisory India, business expansion advisory Gurugram, franchise consulting firms India" />
      </Helmet>
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">About XPAND Bharat</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '800px' }}>
            About<br />
            <span style={{ color: 'var(--orange)' }}>XPAND Bharat</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px' }}>
            India's leading franchise expansion and investment consulting company, backed by 25+ years of collective industry experience in franchise growth, investor alignment, and business expansion strategy.
          </p>
        </div>
      </div>

      {/* BRAND STATEMENT */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div className="xb-grid-2col" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
          <FadeSection>
            <div className="section-label">Who We Are</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, marginBottom: '32px' }}>
              Who We Are
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '20px' }}>
              XPAND Bharat is India's leading franchise expansion and investment consulting company, backed by 25+ years of collective industry experience in franchise growth, investor alignment, and business expansion strategy.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '20px' }}>
              We help businesses scale through structured franchising by aligning brands with qualified investors, expansion opportunities, and commercially viable growth systems. Through our investor network, lead-generation capabilities, and strategic expansion approach, we help brands connect with investors actively looking for profitable franchise business opportunities across sectors like F&B, electronics, fashion, retail, and emerging consumer categories.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px' }}>
              From investor-ready business proposals and franchise expansion planning to investor counseling, lead generation, and execution support, XPAND focuses on building scalable business growth with stronger commercial direction and long-term expansion potential across India.
            </p>
            <Link to="/our-approach" className="btn-outline-dark">Discover Our Approach</Link>
          </FadeSection>
          <FadeSection delay={200}>
            {/* Philosophy card */}
            <div style={{ background: 'var(--navy)', borderRadius: '20px', padding: '60px 48px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '300px', height: '300px', background: 'radial-gradient(circle,rgba(240,121,32,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <div className="section-label" style={{ marginBottom: '24px' }}>Our Philosophy</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, color: '#fff', lineHeight: 1.5, marginBottom: '32px' }}>
                "Xpand your business to new heights."
              </p>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.7 }}>
                As the name suggests, XPAND Bharat was built with one clear vision — helping businesses expand to greater commercial heights through structured franchising, investor alignment, and execution-led growth. Headquartered in Gurugram, we operate as a franchise consulting and business expansion platform helping brands scale across India.
              </p>
            </div>
          </FadeSection>
        </div>
      </div>

      {/* FOCUS AREAS — Cinematic card grid */}
      <div style={{ background: 'var(--navy)' }}>
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

        /* ── How We Work ── */
        .hw-section { padding: 100px 40px 120px; }
        .hw-flow {
          display: grid;
          grid-template-columns: 1fr 32px 1fr 32px 1fr 32px 1fr 32px 1fr;
          align-items: start;
        }
        .hw-arrow-sep {
          display: flex; justify-content: center; align-items: flex-start;
          padding-top: 26px; color: rgba(240,121,32,0.4); font-size: 20px; flex-shrink: 0;
        }
        .hw-step { display: flex; flex-direction: column; align-items: center; height: 100%; }
        .hw-step-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(240,121,32,0.08); border: 1px solid rgba(240,121,32,0.3);
          box-shadow: 0 0 28px rgba(240,121,32,0.1);
          display: flex; align-items: center; justify-content: center;
          position: relative; flex-shrink: 0;
        }
        .hw-step-badge {
          position: absolute; top: -5px; right: -5px;
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--orange); border: 2px solid var(--navy);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #fff; line-height: 1;
        }
        .hw-step-line { width: 1px; height: 28px; background: rgba(240,121,32,0.22); flex-shrink: 0; }
        .hw-step-card {
          width: 100%; flex: 1;
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 22px 16px;
        }
        .hw-card-eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; color: var(--orange); text-transform: uppercase; margin: 0 0 10px; }
        .hw-card-title { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 700; color: #fff; margin: 0 0 14px; line-height: 1.4; }
        .hw-card-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
        .hw-card-list li { display: flex; align-items: flex-start; gap: 7px; color: rgba(255,255,255,0.48); font-size: 11.5px; line-height: 1.5; }
        .hw-card-list li span { color: rgba(240,121,32,0.7); flex-shrink: 0; }

        @media (max-width: 900px) {
          .hw-section { padding: 60px 20px 80px; }
          .hw-flow { display: flex; flex-direction: column; align-items: center; }
          .hw-flow > div { width: 100%; }
          .hw-step { flex-direction: column; align-items: center; width: 100%; }
          .hw-step-line { display: block; }
          .hw-step-card { width: 100%; padding: 32px 28px; }
          .hw-card-eyebrow { text-align: center; margin-bottom: 12px; }
          .hw-card-title { text-align: center; font-size: 17px; margin-bottom: 20px; }
          .hw-card-list { gap: 12px; width: fit-content; margin: 0 auto; }
          .hw-card-list li { font-size: 13.5px; }
          .hw-arrow-sep {
            width: 100%; font-size: 0;
            display: flex; justify-content: center; align-items: center;
            padding: 8px 0;
          }
          .hw-arrow-sep::after {
            content: '↓'; font-size: 20px; color: rgba(240,121,32,0.5);
          }
        }
        @media (max-width: 480px) {
          .hw-section { padding: 48px 16px 64px; }
          .hw-step-icon { width: 54px; height: 54px; }
          .hw-step-badge { width: 18px; height: 18px; font-size: 9px; top: -3px; right: -3px; }
          .hw-step-card { padding: 28px 20px; }
          .hw-card-title { font-size: 15px; }
          .hw-card-list li { font-size: 12.5px; }
        }
      `}</style>

      {/* HOW WE WORK */}
      <div className="hw-section" style={{ background: 'var(--navy)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--orange)', textTransform: 'uppercase', margin: '0 0 18px' }}>Our Process</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.05 }}>
                How We <span style={{ color: 'var(--orange)' }}>Work</span>
              </h2>
            </div>
          </FadeSection>

          <div className="hw-flow">
            {PROCESS_STEPS.flatMap((step, i) => {
              const Icon = step.Icon;
              const stepEl = (
                <FadeSection key={`s${i}`} delay={i * 120}>
                  <div className="hw-step">
                    <div className="hw-step-icon">
                      <Icon size={22} color="rgba(240,121,32,0.85)" />
                      <div className="hw-step-badge">{step.num}</div>
                    </div>
                    <div className="hw-step-line" />
                    <div className="hw-step-card">
                      <p className="hw-card-eyebrow">{step.eyebrow}</p>
                      <h3 className="hw-card-title">{step.title}</h3>
                      <ul className="hw-card-list">
                        {step.items.map(item => (
                          <li key={item}><span>→</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeSection>
              );
              if (i < PROCESS_STEPS.length - 1) {
                return [stepEl, <div key={`a${i}`} className="hw-arrow-sep">→</div>];
              }
              return [stepEl];
            })}
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
