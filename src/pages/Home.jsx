import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const PILLARS = [
  { label: 'Alignment', desc: 'Bringing the right brands and investors together around shared commercial direction.' },
  { label: 'Structure', desc: 'Creating organised frameworks for scalable and disciplined business growth.' },
  { label: 'Clarity', desc: 'Removing noise so opportunities and decisions move with sharper direction.' },
  { label: 'Execution', desc: 'Turning strategy into real business movement through operational discipline.' },
  { label: 'Governance', desc: 'Maintaining standards, processes, and accountability across all engagements.' },
];

const OFFERINGS = [
  {
    icon: '◈',
    title: 'Expansion Strategy',
    desc: 'Structured business growth designed for scalable expansion across markets and geographies.',
  },
  {
    icon: '◉',
    title: 'Investor Alignment',
    desc: 'Commercially aligned opportunities built for long-term investment movement and growth.',
  },
  {
    icon: '◎',
    title: 'Execution Support',
    desc: 'Operational discipline and process-led business execution that keeps momentum alive.',
  },
];

const STATS = [
  { number: '250+', label: 'Projects Supported' },
  { number: '15+', label: 'Years of Experience' },
  { number: '180+', label: 'Satisfied Partners' },
  { number: '25+', label: 'Expert Team' },
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
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} style={style}>{children}</div>;
}

export default function Home() {
  return (
    <>
      {/* ─── HERO WRAPPER (sticky scroll effect) ─── */}
      <div className="hero-wrapper">
        <section className="hero-sticky" style={{ background: 'var(--navy-dark)' }}>
          {/* Video background */}
          <video
            autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>

          {/* Grid overlay for premium texture */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(7,15,35,0.85) 0%, rgba(13,27,62,0.6) 50%, rgba(7,15,35,0.75) 100%)',
          }} />

          {/* Orange accent glow */}
          <div style={{
            position: 'absolute', bottom: '-10%', left: '5%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(240,121,32,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Hero content */}
          <div style={{
            position: 'relative', zIndex: 2,
            maxWidth: '1440px', margin: '0 auto',
            padding: '0 40px',
            height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>
            <div style={{ maxWidth: '760px', paddingTop: '96px' }}>
              <div className="section-label" style={{ marginBottom: '28px', animationDelay: '0.2s' }}>
                Premium Business Expansion Platform
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(44px, 7vw, 90px)',
                fontWeight: 700,
                color: '#fff',
                lineHeight: 1.05,
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}>
                Less noise.
              </h1>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(44px, 7vw, 90px)',
                fontWeight: 700,
                color: 'var(--orange)',
                lineHeight: 1.05,
                margin: '0 0 32px',
                letterSpacing: '-0.02em',
              }}>
                More execution.
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(16px, 1.8vw, 20px)',
                lineHeight: 1.7, maxWidth: '560px', marginBottom: '48px',
                fontWeight: 300,
              }}>
                Brands + investors aligned. XPANDBHARAT is a premium business expansion platform focused on structured growth, investor alignment, and execution-led business movement.
              </p>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn-primary">Discuss Your Requirement</Link>
                <Link to="/growth-opportunities" className="btn-outline">Explore Opportunities</Link>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 3,
          }}>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</p>
            <div style={{
              width: '1px', height: '60px',
              background: 'linear-gradient(to bottom, rgba(240,121,32,0.8), transparent)',
              animation: 'scrollLine 2s ease-in-out infinite',
            }} />
          </div>
        </section>
      </div>

      {/* ─── RISING CONTENT PANEL ─── */}
      <div className="rising-panel">

        {/* Overview / Intro strip */}
        <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
              {OFFERINGS.map((item, i) => (
                <FadeSection key={item.title} delay={i * 120} style={{
                  padding: '56px 48px',
                  borderRight: i < OFFERINGS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}>
                  <div style={{ fontSize: '28px', color: 'var(--orange)', marginBottom: '24px' }}>{item.icon}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif", color: '#fff',
                    fontSize: '22px', fontWeight: 600, marginBottom: '16px',
                  }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.7 }}>{item.desc}</p>
                </FadeSection>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background: 'var(--orange)', padding: '0 40px' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0' }}>
            {STATS.map((stat, i) => (
              <FadeSection key={stat.label} delay={i * 100} style={{
                padding: '48px 40px',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(0,0,0,0.6)', marginTop: '8px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>

        {/* Philosophy section */}
        <div style={{ padding: '120px 40px', background: 'var(--cream-light)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <FadeSection>
              <div className="section-label">Our Philosophy</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 4vw, 54px)', fontWeight: 700,
                color: 'var(--navy)', lineHeight: 1.15, marginBottom: '28px',
              }}>
                Growth without structure creates noise.
              </h2>
              <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px', maxWidth: '480px' }}>
                XPANDBHARAT focuses on clarity, alignment, and execution to help opportunities move with stronger direction and better business outcomes. We work with businesses that are serious about scalable growth.
              </p>
              <Link to="/our-approach" className="btn-outline-dark">Discover Our Approach</Link>
            </FadeSection>

            <FadeSection delay={200} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {PILLARS.map((p, i) => (
                <div key={p.label} style={{
                  background: i === 0 ? 'var(--navy)' : i === 4 ? 'var(--orange)' : 'var(--white)',
                  borderRadius: '12px', padding: '32px 28px',
                  border: '1px solid var(--border)',
                  gridColumn: i === 4 ? '1 / -1' : 'auto',
                }}>
                  <h4 style={{
                    fontSize: '15px', fontWeight: 700, marginBottom: '10px',
                    color: i === 0 || i === 4 ? '#fff' : 'var(--navy)',
                    letterSpacing: '0.04em',
                  }}>{p.label}</h4>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, margin: 0, color: i === 0 || i === 4 ? 'rgba(255,255,255,0.7)' : 'var(--gray)' }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </FadeSection>
          </div>
        </div>

        {/* ── PREMIUM PHOTO CARD GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%' }} className="xb-photo-grid">
          {[
            {
              tag: 'For Brands',
              title: 'Expand with Structure',
              sub: 'Franchise & market expansion',
              img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=80',
              to: '/for-brands',
            },
            {
              tag: 'For Investors',
              title: 'Invest with Clarity',
              sub: 'Curated business opportunities',
              img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80',
              to: '/for-investors',
            },
            {
              tag: 'Opportunities',
              title: 'Growth at Scale',
              sub: 'Scalable business models',
              img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
              to: '/growth-opportunities',
            },
            {
              tag: 'Our Approach',
              title: 'Structured Execution',
              sub: 'Five-stage growth framework',
              img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80',
              to: '/our-approach',
            },
          ].map((card, i) => (
            <Link key={card.tag} to={card.to} style={{
              position: 'relative',
              height: '520px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '32px',
              backgroundImage: `url("${card.img}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textDecoration: 'none',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.xb-img-scale').style.transform = 'scale(1.06)';
                e.currentTarget.querySelector('.xb-card-arrow').style.opacity = '1';
                e.currentTarget.querySelector('.xb-card-arrow').style.transform = 'translateX(0)';
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.xb-img-scale').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.xb-card-arrow').style.opacity = '0';
                e.currentTarget.querySelector('.xb-card-arrow').style.transform = 'translateX(-8px)';
              }}
            >
              {/* Image layer (for scale animation) */}
              <div className="xb-img-scale" style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("${card.img}")`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                transition: 'transform 0.6s ease',
                zIndex: 0,
              }} />
              {/* Dark gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.25) 100%)',
              }} />

              {/* Tag */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{
                  display: 'inline-block',
                  border: '1px solid rgba(240,121,32,0.7)',
                  color: 'var(--orange)',
                  background: 'rgba(240,121,32,0.1)',
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  padding: '6px 14px', borderRadius: '2px',
                }}>{card.tag}</span>
              </div>

              {/* Bottom content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(20px, 1.8vw, 26px)', fontWeight: 600,
                  color: '#fff', margin: '0 0 8px', lineHeight: 1.25,
                }}>{card.title}</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', margin: 0 }}>{card.sub}</p>
                  <span className="xb-card-arrow" style={{
                    color: 'var(--orange)', fontSize: '20px',
                    opacity: 0, transform: 'translateX(-8px)',
                    transition: 'all 0.3s ease', flexShrink: 0,
                  }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* "Built for serious business" section */}
        <div style={{ background: 'var(--navy)', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '-5%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(240,121,32,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <FadeSection>
              <div className="section-label" style={{ justifyContent: 'center' }}>Built for serious business</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", color: '#fff',
                fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700,
                maxWidth: '800px', margin: '0 auto 28px', lineHeight: 1.15,
              }}>
                Clarity first. Business next.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 56px' }}>
                Whether you are scaling a brand or exploring opportunities, XPANDBHARAT is built to move serious business conversations forward with structure, discipline, and execution.
              </p>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/for-brands" className="btn-primary">For Brands</Link>
                <Link to="/for-investors" className="btn-outline">For Investors</Link>
              </div>
            </FadeSection>
          </div>
        </div>

        {/* Two-path cards */}
        <div style={{ padding: '100px 40px', background: 'var(--cream)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Two paths. One platform.</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>
                Where brands meet investors.
              </h2>
            </FadeSection>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
              {[
                {
                  tag: 'For Brands',
                  title: 'Expand with structure.',
                  body: 'Franchise expansion, territory planning, channel development, partner acquisition, and rollout support — all structured for disciplined growth.',
                  cta: 'Explore Brand Solutions',
                  to: '/for-brands',
                  dark: true,
                },
                {
                  tag: 'For Investors',
                  title: 'Invest with clarity.',
                  body: 'Curated business opportunities across scalable sectors, designed around commercial clarity, expansion readiness, and long-term growth potential.',
                  cta: 'Explore Opportunities',
                  to: '/for-investors',
                  dark: false,
                },
              ].map(card => (
                <FadeSection key={card.tag} style={{
                  background: card.dark ? 'var(--navy)' : 'var(--white)',
                  borderRadius: '16px', padding: '56px 48px',
                  border: '1px solid var(--border)',
                }}>
                  <div className="pill" style={{
                    background: card.dark ? 'rgba(240,121,32,0.15)' : 'var(--orange-pale)',
                    color: 'var(--orange)', marginBottom: '32px',
                  }}>{card.tag}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '32px', fontWeight: 700,
                    color: card.dark ? '#fff' : 'var(--navy)',
                    marginBottom: '20px', lineHeight: 1.2,
                  }}>{card.title}</h3>
                  <p style={{ color: card.dark ? 'rgba(255,255,255,0.6)' : 'var(--gray)', fontSize: '15px', lineHeight: 1.7, marginBottom: '40px' }}>
                    {card.body}
                  </p>
                  <Link to={card.to} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    color: 'var(--orange)', fontWeight: 600, fontSize: '14px',
                    textDecoration: 'none', letterSpacing: '0.04em',
                  }}>
                    {card.cta} <span>→</span>
                  </Link>
                </FadeSection>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); }
        }
        @media (max-width: 768px) {
          .rising-panel > div:nth-child(3) > div > div {
            grid-template-columns: 1fr !important;
          }
          .rising-panel > div:nth-child(5) > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
