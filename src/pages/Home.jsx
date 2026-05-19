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
    desc: 'Structured plans for entering new markets, territories, and geographies — built to scale without losing operational control.',
  },
  {
    icon: '◉',
    title: 'Investor Alignment',
    desc: 'Commercially sound opportunities matched to investors who understand long-term business growth over short-term noise.',
  },
  {
    icon: '◎',
    title: 'Execution Support',
    desc: 'On-ground discipline that turns strategy into real movement — deals closed, systems built, brands launched.',
  },
];

const STATS = [
  { number: '250+', label: 'Projects Supported' },
  { number: '15+', label: 'Years of Experience' },
  { number: '180+', label: 'Satisfied Partners' },
  { number: '25+', label: 'Expert Team' },
];

const PHOTO_CARDS = [
  {
    tag: 'For Brands',
    title: 'Expand with Structure',
    sub: 'Franchise and market expansion',
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
];

function FadeSection({ children, delay = 0, style = {}, className = '' }) {
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
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

export default function Home() {
  return (
    <>
      {/* ─── HERO WRAPPER ─── */}
      <div className="hero-wrapper">
        <section className="hero-sticky" style={{ background: 'var(--navy-dark)' }}>
          <video
            autoPlay muted loop playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>

          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />

          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(7,15,35,0.85) 0%, rgba(13,27,62,0.6) 50%, rgba(7,15,35,0.75) 100%)',
          }} />

          <div style={{
            position: 'absolute', bottom: '-10%', left: '5%',
            width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(240,121,32,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div className="xb-hero-content">
            <div className="xb-hero-inner">
              <div className="section-label" style={{ marginBottom: '28px', animationDelay: '0.2s' }}>
                Premium Business Expansion Platform
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(38px, 7vw, 90px)',
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
                fontSize: 'clamp(38px, 7vw, 90px)',
                fontWeight: 700,
                color: 'var(--orange)',
                lineHeight: 1.05,
                margin: '0 0 32px',
                letterSpacing: '-0.02em',
              }}>
                More execution.
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px, 1.8vw, 20px)',
                lineHeight: 1.7, maxWidth: '560px', marginBottom: '48px',
                fontWeight: 300,
              }}>
                Brands + investors aligned. XPANDBHARAT is a premium business expansion platform focused on structured growth, investor alignment, and execution-led business movement.
              </p>

              <div className="xb-hero-cta">
                <Link to="/contact" className="btn-primary">Discuss Your Requirement</Link>
                <Link to="/growth-opportunities" className="btn-outline">Explore Opportunities</Link>
              </div>
            </div>
          </div>

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

        {/* Offerings strip */}
        <div className="xb-offerings-strip" style={{ background: 'var(--navy)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
              {OFFERINGS.map((item, i) => (
                <FadeSection
                  key={item.title}
                  delay={i * 120}
                  className="xb-offering-item"
                  style={{ borderRight: i < OFFERINGS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}
                >
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
        <div className="xb-stats-bar" style={{ background: 'var(--orange)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0' }}>
            {STATS.map((stat, i) => (
              <FadeSection
                key={stat.label}
                delay={i * 100}
                className="xb-stat-item"
                style={{ borderRight: i < STATS.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none', textAlign: 'center' }}
              >
                <div style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: '#fff', fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
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
        <div className="xb-philosophy-section" style={{ background: 'var(--cream-light)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="xb-philosophy-grid">
              <FadeSection>
                <div className="section-label">Our Philosophy</div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(28px, 4vw, 54px)', fontWeight: 700,
                  color: 'var(--navy)', lineHeight: 1.15, marginBottom: '28px',
                }}>
                  Growth without structure creates noise.
                </h2>
                <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px', maxWidth: '480px' }}>
                  Every business decision deserves structure. We bring brands and investors together with the commercial clarity, operational framework, and execution discipline that serious growth actually demands.
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
        </div>

        {/* ── TRUSTED PARTNER SECTION ── */}
        <div style={{ background: 'var(--cream)', padding: '6px 40px' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Our Promise</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 4.5vw, 54px)',
                fontWeight: 700, color: 'var(--navy)',
                lineHeight: 1.15, maxWidth: '720px', margin: '0 auto',
              }}>
                Trusted Expansion Partner<br />for High-Growth Brands
              </h2>
            </FadeSection>

            <div className="xb-partner-photos">
              <div className="xb-photo-slot xb-photo-left">
                <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=700&q=80" alt="Business partnership" />
              </div>
              <div className="xb-photo-slot xb-photo-center">
                <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80" alt="Team meeting" />
              </div>
              <div className="xb-photo-slot xb-photo-right">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=700&q=80" alt="Partnership handshake" />
              </div>
            </div>

            <FadeSection style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto' }}>
              <p style={{ color: 'var(--gray)', fontSize: 'clamp(15px, 1.4vw, 17px)', lineHeight: 1.9, margin: 0 }}>
                We support brands with structured franchise expansion, partner acquisition, and rollout governance across multiple cities and states in India.
              </p>
            </FadeSection>
          </div>
        </div>

        {/* ── PHOTO CARD GRID ── */}
        <div style={{ background: '#04080f' }}>
          {/* Heading inside the dark area */}
          <div style={{ padding: '80px 40px 52px' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
              <FadeSection>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(240,121,32,0.85)', textTransform: 'uppercase', marginBottom: '18px' }}>
                  Explore the Platform
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(28px, 3.5vw, 48px)',
                  fontWeight: 700, color: '#fff',
                  lineHeight: 1.15, margin: 0,
                }}>
                  Where would you<br />like to begin?
                </h2>
              </FadeSection>
              <FadeSection delay={150}>
                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '15px', lineHeight: 1.75, maxWidth: '380px', margin: 0 }}>
                  Brands that want to scale. Investors looking for the right entry. Both find their direction here.
                </p>
              </FadeSection>
            </div>
          </div>
          <div className="xb-photo-grid" style={{ gap: '10px', padding: '0 10px 10px' }}>
            {PHOTO_CARDS.map((card) => (
              <Link
                key={card.tag}
                to={card.to}
                className="xb-photo-card"
                onMouseEnter={e => {
                  e.currentTarget.querySelector('.xb-img-scale').style.transform = 'scale(1.07)';
                  e.currentTarget.querySelector('.xb-img-scale').style.filter = 'brightness(1.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.querySelector('.xb-img-scale').style.transform = 'scale(1)';
                  e.currentTarget.querySelector('.xb-img-scale').style.filter = 'brightness(1)';
                }}
              >
                {/* Image */}
                <div className="xb-img-scale" style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url("${card.img}")`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  transition: 'transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease',
                  zIndex: 0,
                }} />

                {/* Cinematic dual gradient */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 1,
                  background: 'linear-gradient(180deg, rgba(4,8,15,0.72) 0%, rgba(4,8,15,0.08) 38%, rgba(4,8,15,0.10) 58%, rgba(4,8,15,0.88) 100%)',
                }} />

                {/* Tag — top left */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <span style={{
                    display: 'inline-block',
                    border: '1px solid rgba(220,168,60,0.5)',
                    color: 'rgba(230,178,70,0.9)',
                    fontSize: '9px', fontWeight: 700,
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    padding: '5px 13px',
                  }}>{card.tag}</span>
                </div>

                {/* Bottom title */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    width: '22px', height: '1px',
                    background: 'rgba(255,255,255,0.38)',
                    marginBottom: '16px',
                  }} />
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(20px, 1.7vw, 28px)',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.3,
                    letterSpacing: '0.01em',
                  }}>{card.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* "Built for serious business" section */}
        <div className="xb-serious-section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
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
                fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 700,
                maxWidth: '800px', margin: '0 auto 28px', lineHeight: 1.15,
              }}>
                Clarity first. Business next.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 56px' }}>
                Whether you are scaling a brand or exploring opportunities, XPANDBHARAT is built to move serious business conversations forward with structure, discipline, and execution.
              </p>
              <div className="xb-hero-cta" style={{ justifyContent: 'center' }}>
                <Link to="/for-brands" className="btn-primary">For Brands</Link>
                <Link to="/for-investors" className="btn-outline">For Investors</Link>
              </div>
            </FadeSection>
          </div>
        </div>

        {/* Two-path cards */}
        <div className="xb-two-path-section" style={{ background: 'var(--cream)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Two paths. One platform.</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3.5vw, 44px)', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>
                Where brands meet investors.
              </h2>
            </FadeSection>
            <div className="xb-two-path-grid">
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
                <FadeSection key={card.tag} className="xb-two-path-card" style={{
                  background: card.dark ? 'var(--navy)' : 'var(--white)',
                  borderRadius: '16px',
                  border: '1px solid var(--border)',
                }}>
                  <div className="pill" style={{
                    background: card.dark ? 'rgba(240,121,32,0.15)' : 'var(--orange-pale)',
                    color: 'var(--orange)', marginBottom: '32px',
                  }}>{card.tag}</div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(24px, 2.5vw, 32px)', fontWeight: 700,
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

        {/* ── CLIENT TESTIMONIALS ── */}
        <div style={{ background: 'var(--cream)', padding: '120px 40px' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <FadeSection style={{ marginBottom: '64px' }}>
              <div className="section-label">Testimonials</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(26px, 4vw, 54px)',
                fontWeight: 700, color: 'var(--navy)',
                lineHeight: 1.15, maxWidth: '580px',
              }}>
                Don't take our word for it.<br />Hear it from our partners.
              </h2>
            </FadeSection>

            <div className="xb-testimonials">
              {/* Card 1 */}
              <FadeSection delay={0} className="xb-tcard">
                <img src="/abhishek.png" alt="Abhishek Gupta"
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '28px' }} />
                <div style={{ fontSize: '52px', color: 'var(--orange)', fontFamily: "'Playfair Display', serif", lineHeight: 0.8, marginBottom: '20px' }}>"</div>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '40px', flexGrow: 1 }}>
                  Xpand Bharat has been a game-changer for our expansion journey. Their structured approach helped us scale faster while maintaining brand consistency. Within months, we were closing multiple franchise locations seamlessly.
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '19px', color: 'var(--navy)', margin: '0 0 5px' }}>Abhishek Gupta</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)', margin: 0 }}>Founder — Haldiwale</p>
                </div>
              </FadeSection>

              {/* Card 2 — Featured dark */}
              <FadeSection delay={150} className="xb-tcard xb-tcard-featured">
                <div className="xb-tcard-bg" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80")' }} />
                <div className="xb-tcard-overlay" />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <img src="/Dikshant.png" alt="Dikshant Rai"
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '28px', border: '2px solid rgba(240,121,32,0.7)' }} />
                  <div style={{ fontSize: '52px', color: 'var(--orange)', fontFamily: "'Playfair Display', serif", lineHeight: 0.8, marginBottom: '20px' }}>"</div>
                  <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(255,255,255,0.88)', fontStyle: 'italic', marginBottom: '40px', flexGrow: 1 }}>
                    As an investor, finding the right brand is always a challenge. Xpand Bharat made the entire process transparent and data-driven. Their insights and support helped me make confident investment decisions. Highly recommended.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '24px' }}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '19px', color: '#fff', margin: '0 0 5px' }}>Dikshant Rai</p>
                    <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,121,32,0.85)', margin: 0 }}>Franchise Investor</p>
                  </div>
                </div>
              </FadeSection>

              {/* Card 3 */}
              <FadeSection delay={300} className="xb-tcard">
                <img src="/Karan.png" alt="Karan Gupta"
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '28px' }} />
                <div style={{ fontSize: '52px', color: 'var(--orange)', fontFamily: "'Playfair Display', serif", lineHeight: 0.8, marginBottom: '20px' }}>"</div>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '40px', flexGrow: 1 }}>
                  Xpand Bharat made my first franchise investment smooth and stress-free. From shortlisting the right brand to guiding me through financials and location strategy — it didn't feel like a service, it felt like a long-term partner.
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '19px', color: 'var(--navy)', margin: '0 0 5px' }}>Karan Gupta</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)', margin: 0 }}>Franchise Partner & Investor</p>
                </div>
              </FadeSection>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scrollLine {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); }
        }

        /* ── Hero content ── */
        .xb-hero-content {
          position: relative; z-index: 2;
          max-width: 1440px; margin: 0 auto;
          padding: 0 40px;
          height: 100%; display: flex; flex-direction: column; justify-content: center;
        }
        .xb-hero-inner { max-width: 760px; padding-top: 96px; }
        .xb-hero-cta { display: flex; gap: 16px; flex-wrap: wrap; }

        /* ── Offerings ── */
        .xb-offerings-strip { padding: 100px 40px; }
        .xb-offering-item { padding: 56px 48px; }

        /* ── Stats ── */
        .xb-stats-bar { padding: 0 40px; }
        .xb-stat-item { padding: 48px 40px; }

        /* ── Philosophy ── */
        .xb-philosophy-section { padding: 120px 40px; }
        .xb-philosophy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* ── Trusted partner photos ── */
        .xb-partner-photos {
          display: grid;
          grid-template-columns: 1fr 1.1fr 1fr;
          gap: 20px;
          align-items: end;
          margin-bottom: 72px;
        }
        .xb-photo-slot img {
          width: 100%; display: block;
          border-radius: 16px; object-fit: cover;
        }
        .xb-photo-left img  { height: 380px; }
        .xb-photo-left      { padding-top: 110px; }
        .xb-photo-center img{ height: 500px; }
        .xb-photo-right img { height: 310px; }

        /* ── Testimonials ── */
        .xb-testimonials {
          display: grid;
          grid-template-columns: 1fr 1.15fr 1fr;
          gap: 24px;
          align-items: stretch;
        }
        .xb-tcard {
          background: var(--white);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.05);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          overflow-wrap: break-word;
          word-break: break-word;
          min-width: 0;
        }
        .xb-tcard-featured {
          background: var(--navy-dark);
          position: relative;
          overflow: hidden;
        }
        .xb-tcard-bg {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          border-radius: 20px;
          opacity: 0.35;
        }
        .xb-tcard-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(7,15,35,0.55) 0%, rgba(7,15,35,0.96) 100%);
          border-radius: 20px;
        }

        /* ── Photo card ── */
        .xb-photo-card {
          position: relative;
          height: 560px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 28px;
          text-decoration: none;
          border-radius: 10px;
        }

        /* ── Serious section ── */
        .xb-serious-section { padding: 120px 40px; }

        /* ── Two-path ── */
        .xb-two-path-section { padding: 100px 40px; }
        .xb-two-path-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .xb-two-path-card { padding: 56px 48px; }

        /* ══════════════════════════════════════
           TABLET  ≤ 900px
        ══════════════════════════════════════ */
        @media (max-width: 900px) {
          .xb-photo-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .xb-photo-card { height: 380px; }
          /* partner photos tablet */
          .xb-partner-photos { grid-template-columns: 1fr 1fr; }
          .xb-photo-left { padding-top: 60px; }
          .xb-photo-right { display: none; }
          /* testimonials tablet — scroll slider */
          .xb-testimonials {
            display: flex !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 20px;
            margin: 0 -40px;
            padding: 0 40px 8px;
          }
          .xb-testimonials::-webkit-scrollbar { display: none; }
          .xb-tcard {
            width: min(72vw, 420px);
            flex-shrink: 0;
            scroll-snap-align: start;
            overflow: hidden;
          }
          .xb-tcard-featured { min-height: 480px; }

          .xb-philosophy-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .xb-two-path-grid { grid-template-columns: 1fr !important; }
        }

        /* ══════════════════════════════════════
           MOBILE  ≤ 768px
        ══════════════════════════════════════ */
        @media (max-width: 768px) {
          .rising-panel { border-radius: 32px 32px 0 0; margin-top: -32px; }

          .xb-hero-content { padding: 0 20px; }
          .xb-hero-inner { padding-top: 110px; }

          .xb-offerings-strip { padding: 56px 20px; }
          .xb-offering-item {
            padding: 32px 24px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.07);
          }
          .xb-offering-item:last-child { border-bottom: none; }

          .xb-stats-bar { padding: 0 20px; }
          .xb-stat-item { padding: 28px 20px !important; }

          .xb-philosophy-section { padding: 64px 20px; }

          .xb-serious-section { padding: 80px 20px; }

          .xb-two-path-section { padding: 60px 20px; }
          .xb-two-path-card { padding: 36px 28px !important; }

          /* partner photos mobile */
          .xb-partner-photos { grid-template-columns: 1fr; gap: 14px; margin-bottom: 48px; }
          .xb-photo-left { padding-top: 0; }
          .xb-photo-left img, .xb-photo-center img, .xb-photo-right img { height: 240px; }

          /* testimonials mobile — scroll slider (tighter) */
          .xb-testimonials {
            margin: 0 -20px;
            padding: 0 20px 8px;
          }
          .xb-tcard {
            width: min(80vw, 300px);
            padding: 28px 24px;
          }
          .xb-tcard-featured { min-height: 440px; }
        }

        /* ══════════════════════════════════════
           SMALL MOBILE  ≤ 520px
        ══════════════════════════════════════ */
        @media (max-width: 520px) {
          .xb-photo-grid { grid-template-columns: 1fr !important; }
          .xb-photo-card { height: 300px !important; }

          .xb-hero-cta { flex-direction: column; }
          .xb-hero-cta .btn-primary,
          .xb-hero-cta .btn-outline { width: 100%; justify-content: center; text-align: center; }

          .xb-stat-item { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.1); }
          .xb-stat-item:last-child { border-bottom: none; }
        }
      `}</style>
    </>
  );
}
