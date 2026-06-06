import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useContent } from '../hooks/useContent';
import { Link } from 'react-router-dom';

const PILLARS = [
  { label: 'Diagnose', desc: 'Before businesses scale, they need clarity.' },
  { label: 'Structure', desc: 'Good businesses often fail at expansion because they are not structured for franchising.' },
  { label: 'Align', desc: 'The right investors matter more than a larger database.' },
  { label: 'Execute', desc: 'Franchise growth rarely scales through introductions alone.' },
  { label: 'Scale', desc: 'Opening more outlets is easy.' },
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
  const { hero, section } = useContent('home');
  const pillars = section('pillars', PILLARS).map(p => ({
    label: p.title || p.label,
    desc: p.description || p.desc,
  }));
  const photoCards = section('photo-cards', PHOTO_CARDS).map(c => ({
    tag: c.tag,
    title: c.title,
    sub: c.subtitle || c.sub,
    img: c.imageUrl || c.img,
    to: c.link || c.to,
  }));
  const heroSubtitle = hero?.subtitle || 'XPAND helps brands become investor-ready, scale through structured franchising, and align with commercially serious investors looking for profitable franchise opportunities in India.';

  return (
    <>
      <Helmet>
        <title>XPAND Bharat — India's Leading Franchise Expansion & Advisory Platform</title>
        <meta name="description" content="XPAND Bharat is India's leading franchise consulting company helping brands expand through structured franchising, investor alignment, and execution-led growth. Connect with serious franchise investors across India." />
        <meta name="keywords" content="franchise consulting company, franchise expansion consultants India, franchise investment advisory India, franchise lead generation, franchise investor network India, best franchise advisory India, franchise consulting firms India, business expansion advisory" />
      </Helmet>
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
                India's Leading Franchise Expansion & Advisory Platform
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
                Good businesses deserve
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
                more than random expansion.
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px, 1.8vw, 20px)',
                lineHeight: 1.7, maxWidth: '560px', marginBottom: '48px',
                fontWeight: 300,
              }}>
                {heroSubtitle}
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

        {/* Marquee brand statement */}
        <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '22px 0', overflow: 'hidden' }}>
          <div className="xb-marquee-track">
            {[0,1].map(k => (
              <div key={k} className="xb-marquee-inner" aria-hidden={k === 1}>
                {Array(6).fill(null).map((_, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '32px', paddingRight: '32px' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      We Are The Best Franchise Advisory Partners In India
                    </span>
                    <span style={{ color: 'var(--orange)', fontSize: '10px' }}>◆</span>
                  </span>
                ))}
              </div>
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
                  Structured franchise growth rarely happens accidentally.
                </h2>
                <p style={{ color: 'var(--gray)', fontSize: '17px', lineHeight: 1.8, marginBottom: '40px', maxWidth: '480px' }}>
                  XPAND Bharat works through a commercially disciplined expansion process designed to help businesses scale through franchising with stronger investor alignment, operational clarity, and execution-backed growth systems.
                </p>
                <Link to="/our-approach" className="btn-outline-dark">Discover Our Approach</Link>
              </FadeSection>

              <FadeSection delay={200} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {pillars.map((p, i) => (
                  <div key={p.label} style={{
                    background: i === 0 ? 'var(--navy)' : i === 3 ? 'var(--orange)' : 'var(--white)',
                    borderRadius: '12px', padding: '32px 28px',
                    border: '1px solid var(--border)',
                    gridColumn: i === 4 ? '1 / -1' : 'auto',
                  }}>
                    <h4 style={{
                      fontSize: '15px', fontWeight: 700, marginBottom: '10px',
                      color: i === 0 || i === 3 ? '#fff' : 'var(--navy)',
                      letterSpacing: '0.04em',
                    }}>{p.label}</h4>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, margin: 0, color: i === 0 || i === 3 ? 'rgba(255,255,255,0.7)' : 'var(--gray)' }}>
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
                Headquartered in Gurugram, XPAND Bharat brings 25+ years of collective experience across franchise consulting, investor advisory, expansion planning, and execution-led business growth.
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
            {photoCards.map((card) => (
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
                maxWidth: '900px', margin: '0 auto 28px', lineHeight: 1.15,
                letterSpacing: '0.02em', textTransform: 'uppercase',
              }}>
                We are the best franchise advisory partners in India
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 56px' }}>
                Whether you are scaling a brand, exploring opportunities, or building strategic partnerships, XPAND Bharat is designed to support serious franchise business growth across India.
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
                  body: 'Franchise expansion, investor-ready business structuring, rollout strategy, and expansion planning — all structured for disciplined franchise growth across India.',
                  cta: 'Explore Brand Solutions',
                  to: '/for-brands',
                  dark: true,
                },
                {
                  tag: 'For Investors',
                  title: 'Invest with clarity.',
                  body: 'Curated franchise investment opportunities designed around commercial clarity, operational structure, and long-term scalability across India\'s fastest-growing sectors.',
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

        {/* ── FAQ SECTION ── */}
        {(() => {
          const FAQS = [
            { q: 'What does XPAND Bharat do?', a: 'XPAND Bharat acts as a perfect matchmaker between flourishing businesses and qualified investors with growth capital through our structured 6-principle philosophy: Alignment, Structure, Clarity, Execution, and Governance.' },
            { q: 'How does franchise expansion actually work?', a: 'Franchise expansion involves transforming an operational business into a scalable growth model through market analysis, business planning, investor onboarding, legal structuring, and operational systems built with the help of experts with years of experience.' },
            { q: 'Why are businesses expanding through franchising in India?', a: 'Franchising allows businesses to scale faster while giving investors access to structured, growth-focused business opportunities beyond traditional investments like stocks, mutual funds, or real estate. XPAND helps reduce expansion risk through strategy, investor alignment, lead generation, legal structuring, and execution support.' },
            { q: 'How does XPAND help businesses scale?', a: 'XPAND helps businesses scale by aligning their funding and expansion needs with qualified investors. It helps with investor-ready business proposals, helping you secure the best funding deal with end-to-end execution support.' },
            { q: 'What industries does XPAND work with?', a: 'XPAND works with businesses across F&B, electronics, fashion, retail, and emerging scalable business categories looking to expand through franchising.' },
            { q: 'Why invest in franchise businesses?', a: 'Franchise businesses offer operational support, structured business models, brand recognition, and scalability compared to building a business entirely from scratch.' },
            { q: 'Franchise vs starting your own business — what is better?', a: 'Franchise businesses often reduce operational uncertainty because investors enter businesses with established systems, processes, market positioning, and brand visibility, whereas an independent business requires building everything from the ground up.' },
            { q: 'Are franchise businesses profitable in India?', a: 'Franchise businesses in India are growing rapidly because they combine brand recognition, operational support, and scalable business systems with lower expansion risk. XPAND helps reduce expansion uncertainty through investor alignment, market analysis, business planning, legal structuring, and execution-led support.' },
          ];
          const [open, setOpen] = useState(0);
          return (
            <div style={{ background: 'var(--cream-light)', padding: '100px 40px' }}>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }) }} />
              <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '80px', alignItems: 'start' }}>
                <div>
                  <FadeSection style={{ marginBottom: '48px' }}>
                    <div className="section-label">Frequently Asked Questions</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, margin: 0 }}>
                      Everything you need to know about franchise expansion
                    </h2>
                  </FadeSection>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {FAQS.map((item, i) => (
                      <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${open === i ? 'var(--orange)' : 'var(--border)'}`, transition: 'border-color 0.25s' }}>
                        <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: open === i ? 'var(--navy)' : 'var(--white)', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px', transition: 'background 0.25s' }}>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: open === i ? '#fff' : 'var(--navy)', lineHeight: 1.3 }}>{item.q}</span>
                          <span style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1.5px solid ${open === i ? 'rgba(255,255,255,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: open === i ? 'var(--orange)' : 'var(--gray)', fontSize: '18px', lineHeight: 1, transition: 'all 0.25s' }}>
                            {open === i ? '−' : '+'}
                          </span>
                        </button>
                        {open === i && (
                          <div style={{ padding: '20px 24px 24px', background: 'var(--white)', borderTop: '1px solid var(--border)' }}>
                            <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{item.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <FadeSection delay={200} style={{ position: 'sticky', top: '120px' }}>
                  <div style={{ background: 'var(--navy)', borderRadius: '20px', padding: '48px 40px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '-40%', right: '-20%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(240,121,32,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '40px', height: '3px', background: 'var(--orange)', marginBottom: '28px', borderRadius: '2px' }} />
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 2.2vw, 30px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: '16px' }}>
                        Still have questions?<br /><span style={{ color: 'var(--orange)' }}>Let's talk directly.</span>
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.75, marginBottom: '32px' }}>
                        Our team will connect with you to discuss your business goals, expansion plans, or investment interests within 24 hours.
                      </p>
                      <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}>Start a Conversation</Link>
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textAlign: 'center', margin: 0 }}>No commitment. Just clarity.</p>
                    </div>
                  </div>
                </FadeSection>
              </div>
            </div>
          );
        })()}

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

        /* ── FAQ ── */
        @media (max-width: 900px) {
          .xb-faq-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Marquee ── */
        @keyframes xbMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .xb-marquee-track {
          display: flex;
          width: max-content;
          animation: xbMarquee 28s linear infinite;
        }
        .xb-marquee-track:hover { animation-play-state: paused; }
        .xb-marquee-inner { display: flex; align-items: center; }

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
