import { useEffect, useRef, useState } from 'react';
import Seo from '../components/Seo';
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
    img: '/img/photo-1441986300917-64674bd600d8.jpg',
    to: '/for-brands',
  },
  {
    tag: 'For Investors',
    title: 'Invest with Clarity',
    sub: 'Curated business opportunities',
    img: '/img/photo-1559526324-4b87b5e36e44.jpg',
    to: '/for-investors',
  },
  {
    tag: 'Opportunities',
    title: 'Growth at Scale',
    sub: 'Scalable business models',
    img: '/img/photo-1486406146926-c627a92ad1ab.jpg',
    to: '/growth-opportunities',
  },
  {
    tag: 'Our Approach',
    title: 'Structured Execution',
    sub: 'Five-stage growth framework',
    img: '/img/photo-1553877522-43269d4ea984.jpg',
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
  const heroSubtitle = hero?.subtitle || 'XPAND helps brands become investor-ready, scale through structured franchising, and align with commercially serious investors looking for profitable franchise opportunities in India.';
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
  // Auto-slide testimonials on mobile (the slider only scrolls horizontally ≤900px)
  const testimonialsRef = useRef(null);
  useEffect(() => {
    const el = testimonialsRef.current;
    if (!el) return;
    let timer;
    let paused = false;
    const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

    const tick = () => {
      if (paused || !isMobile() || !el) return;
      const cards = el.querySelectorAll('.xb-tcard');
      if (!cards.length) return;
      const gap = parseFloat(getComputedStyle(el).columnGap || '20') || 20;
      const step = cards[0].offsetWidth + gap;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: 'smooth' });
    };

    const start = () => { clearInterval(timer); timer = setInterval(tick, 3500); };
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    start();
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', () => { resume(); }, { passive: true });
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    return () => {
      clearInterval(timer);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <>
      <Seo
        path="/"
        title={"XPAND Bharat - India's #1 Franchise Expansion and Investment Advisory"}
        description={"XPAND Bharat helps growth-stage brands scale through structured franchising and connects qualified investors with franchise businesses across India. Because serious money deserves serious structure."}
        keywords={"franchise consulting company, franchise expansion consultants India, franchise investment advisory India, franchise lead generation, franchise investor network India, best franchise advisory India, franchise consulting firms India, business expansion advisory"}
      />
      {/* ─── HERO — full-screen video, EBG-style wordmark + content block ─── */}
      <div className="home-hero" style={{ background: 'var(--navy-dark)', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        <video
          autoPlay muted loop playsInline
          onLoadedMetadata={(e) => { e.currentTarget.playbackRate = 1.5; }}
          poster="https://images.pexels.com/videos/12731888/cityscape-downtown-downtown-minneapolis-minneapolis-12731888.jpeg?auto=compress&cs=tinysrgb&w=1600"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92 }}
        >
          {/* Self-hosted free aerial clip — no people (Pexels, royalty-free). Lives in /public/video/hero.mp4 */}
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>

        {/* Readability wash — darker top-left (wordmark) and bottom (content block) */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(7,15,35,0.62) 0%, rgba(7,15,35,0.18) 38%, rgba(7,15,35,0.86) 100%)' }} />

        {/* Full-height column: wordmark pinned top, content block pinned bottom */}
        <div className="home-hero-inner" style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '30px', maxWidth: '1440px', width: '100%', margin: '0 auto', padding: '120px 40px 88px', boxSizing: 'border-box' }}>

          {/* Content block (EBG-style frosted card) */}
          <div className="home-hero-card" style={{ maxWidth: '640px', background: 'rgba(9,17,38,0.5)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px', padding: '30px 38px' }}>
            <div className="section-label" style={{ marginBottom: '14px' }}>India's Leading Franchise Expansion &amp; Advisory Platform</div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, lineHeight: 1.08, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
              <span style={{ color: '#fff' }}>Good businesses deserve </span>
              <span style={{ color: 'var(--orange)' }}>more than random expansion.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '15px', lineHeight: 1.6, margin: '0 0 22px' }}>{heroSubtitle}</p>
            <div className="xb-hero-cta">
              <Link to="/get-started" className="btn-primary">Discuss Your Requirement</Link>
              <Link to="/growth-opportunities" className="btn-outline">Explore Opportunities</Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RISING CONTENT PANEL ─── */}
      <div className="rising-panel">

        {/* Philosophy section */}
        <div className="xb-philosophy-section" style={{ background: 'var(--cream-light)' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div className="xb-philosophy-grid">
              <FadeSection>
                <div className="section-label">Our Philosophy</div>
                <h2 style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700,
                  color: 'var(--navy)', lineHeight: 1.15, marginBottom: '28px',
                }}>
                  Structured franchise growth rarely happens accidentally.
                </h2>
                <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px', maxWidth: '480px' }}>
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

        {/* ── ABOUT US ── */}
        <div className="xb-about-section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '-15%', left: '-5%', width: '520px', height: '520px', background: 'radial-gradient(circle, rgba(240,121,32,0.08) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
          </div>
          <div className="xb-about-grid" style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1, alignItems: 'start' }}>
            <FadeSection className="xb-about-left">
              <div className="section-label">Who We Are</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, margin: '0 0 32px' }}>
                Who We Are
              </h2>
              <Link to="/about" className="btn-primary">Know More →</Link>
            </FadeSection>
            <FadeSection delay={150}>
              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '16px', lineHeight: 1.85, marginBottom: '22px' }}>
                XPAND Bharat is India's leading franchise expansion and investment consulting company, backed by 25+ years of collective industry experience in franchise growth, investor alignment, and business expansion strategy.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '16px', lineHeight: 1.85, marginBottom: '22px' }}>
                We help businesses scale through structured franchising by aligning brands with qualified investors, expansion opportunities, and commercially viable growth systems. Through our investor network, lead-generation capabilities, and strategic expansion approach, we help brands connect with investors actively looking for profitable franchise business opportunities across sectors like F&B, electronics, fashion, retail, and emerging consumer categories.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
                We act as perfect matchmakers mapping your business to qualified investors by providing structured proposal support and expansion roadmap.
              </p>
            </FadeSection>
          </div>
        </div>

        {/* ── TRUSTED PARTNER SECTION ── */}
        <div style={{ background: 'var(--cream)', padding: '6px 40px' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: '64px' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Our Promise</div>
              <h2 style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 700, color: 'var(--navy)',
                lineHeight: 1.15, maxWidth: '720px', margin: '0 auto',
              }}>
                Trusted Expansion Partner<br />for High-Growth Brands
              </h2>
            </FadeSection>

            <div className="xb-partner-photos">
              <div className="xb-photo-slot xb-photo-left">
                <img src="/img/photo-1521791136064-7986c2920216.jpg" alt="Business partnership" />
              </div>
              <div className="xb-photo-slot xb-photo-center">
                <img src="/img/photo-1556761175-b413da4baf72.jpg" alt="Team meeting" />
              </div>
              <div className="xb-photo-slot xb-photo-right">
                <img src="/img/photo-1600880292203-757bb62b4baf.jpg" alt="Partnership handshake" />
              </div>
            </div>
          </div>
        </div>

        {/* ── PHOTO CARD GRID ── */}
        <div style={{ background: 'var(--navy)' }}>
          {/* Heading inside the dark area */}
          <div style={{ padding: '80px 40px 52px' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px' }}>
              <FadeSection>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(240,121,32,0.85)', textTransform: 'uppercase', marginBottom: '18px' }}>
                  Explore the Platform
                </div>
                <h2 style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(28px, 3.4vw, 44px)',
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
                    border: '1px solid rgba(230,178,70,0.7)',
                    background: 'rgba(13,27,62,0.35)',
                    color: 'rgba(238,190,90,1)',
                    fontSize: '14px', fontWeight: 700,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    padding: '11px 24px',
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
                    fontFamily: "'Fraunces', serif",
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
        <div className="xb-serious-section" style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: '-20%', right: '-5%',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(240,121,32,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <FadeSection>
              <div className="section-label" style={{ justifyContent: 'center' }}>Built for serious business</div>
              <h2 style={{
                fontFamily: "'Fraunces', serif", color: 'var(--navy)',
                fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 600,
                maxWidth: '960px', margin: '0 auto 28px', lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}>
                We are the best franchise <br className="br-desktop" />advisory partners in India
              </h2>
              <p style={{ fontFamily: "'Fraunces', serif", color: 'var(--gray)', fontSize: 'clamp(16px, 1.6vw, 20px)', lineHeight: 1.65, maxWidth: '640px', margin: '0 auto 56px' }}>
                Whether you are scaling a brand, exploring opportunities, or building strategic partnerships, XPAND Bharat is designed to support serious franchise business growth across India.
              </p>
              <div className="xb-hero-cta" style={{ justifyContent: 'center' }}>
                <Link to="/for-brands" className="btn-primary">For Brands</Link>
                <Link to="/for-investors" className="btn-outline-dark">For Investors</Link>
              </div>
            </FadeSection>
          </div>
        </div>

        {/* Two-path cards */}
        <div className="xb-two-path-section" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />
          <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <FadeSection style={{ textAlign: 'center', marginBottom: '48px' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Two paths. One platform.</div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', margin: 0 }}>
                Where brands meet investors.
              </h2>
            </FadeSection>
            <div className="xb-two-path-grid">
              {[
                {
                  eyebrow: 'For Brands',
                  title: 'Built to expand.',
                  subtitle: 'Everything a brand needs to franchise and scale with structure.',
                  items: ['Expansion Strategy & Roadmap', 'Investor Readiness Assessment', 'Territory Planning & Analysis', 'Franchise Model Development', 'Legal & Compliance Framework', 'Rollout Systems & Support'],
                  cta: 'Start Your Expansion Journey',
                  to: '/for-brands',
                  filled: true,
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
                    </svg>
                  ),
                },
                {
                  eyebrow: 'For Investors',
                  title: 'Built to invest.',
                  subtitle: 'Curated, due-diligenced franchise opportunities matched to your goals.',
                  items: ['Curated Franchise Opportunities', 'Commercial Due Diligence', 'Scalable Business Models', 'Sector Diversification Options', 'ROI Analysis & Projections', 'Post-Investment Support'],
                  cta: 'Explore Investment Opportunities',
                  to: '/for-investors',
                  filled: false,
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--orange)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" />
                    </svg>
                  ),
                },
              ].map((card, ci) => (
                <FadeSection key={card.eyebrow} delay={ci * 120} className={`xb-two-path-card xb-tp-card${card.filled ? ' xb-tp-card--accent' : ''}`}>
                  {/* top accent bar */}
                  <div className="xb-tp-bar" />
                  {/* corner glow */}
                  <div className="xb-tp-glow" />

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    {/* header */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--orange)', marginBottom: '10px' }}>{card.eyebrow}</div>
                        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 2.3vw, 32px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.05, letterSpacing: '-0.01em' }}>{card.title}</h3>
                      </div>
                      <div className="xb-tp-icon">{card.icon}</div>
                    </div>

                    <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '14px', lineHeight: 1.6, margin: '0 0 22px', maxWidth: '92%' }}>{card.subtitle}</p>

                    <ul className="xb-tp-list">
                      {card.items.map((item, ii) => (
                        <li key={item} className="xb-tp-row" style={{ transitionDelay: `${ii * 20}ms` }}>
                          <span className="xb-tp-check">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12.5l4 4 10-11" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          <span className="xb-tp-text">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to={card.to} className={`xb-tp-btn${card.filled ? ' xb-tp-btn--accent' : ' xb-tp-btn--light'}`}>
                      {card.cta}
                      <span className="xb-tp-arrow">→</span>
                    </Link>
                  </div>
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
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(28px, 3.4vw, 44px)',
                fontWeight: 700, color: 'var(--navy)',
                lineHeight: 1.15, maxWidth: '820px',
              }}>
                Don't take our word for it.<br />Hear it from our partners.
              </h2>
            </FadeSection>

            <div className="xb-testimonials" ref={testimonialsRef}>
              {/* Card 1 */}
              <FadeSection delay={0} className="xb-tcard">
                <img src="/abhishek.png" alt="Abhishek Gupta"
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '28px' }} />
                <div style={{ fontSize: '52px', color: 'var(--orange)', fontFamily: "'Fraunces', serif", lineHeight: 0.8, marginBottom: '20px' }}>"</div>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '40px', flexGrow: 1 }}>
                  Xpand Bharat has been a game-changer for our expansion journey. Their structured approach helped us scale faster while maintaining brand consistency. Within months, we were closing multiple franchise locations seamlessly.
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--navy)', margin: '0 0 5px' }}>Abhishek Gupta</p>
                  <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray)', margin: 0 }}>Founder — Haldiwale</p>
                </div>
              </FadeSection>

              {/* Card 2 — Featured dark */}
              <FadeSection delay={150} className="xb-tcard xb-tcard-featured">
                <div className="xb-tcard-bg" style={{ backgroundImage: 'url("/img/photo-1556761175-b413da4baf72.jpg")' }} />
                <div className="xb-tcard-overlay" />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <img src="/Dikshant.png" alt="Dikshant Rai"
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '28px', border: '2px solid rgba(240,121,32,0.7)' }} />
                  <div style={{ fontSize: '52px', color: 'var(--orange)', fontFamily: "'Fraunces', serif", lineHeight: 0.8, marginBottom: '20px' }}>"</div>
                  <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'rgba(255,255,255,0.88)', fontStyle: 'italic', marginBottom: '40px', flexGrow: 1 }}>
                    As an investor, finding the right brand is always a challenge. Xpand Bharat made the entire process transparent and data-driven. Their insights and support helped me make confident investment decisions. Highly recommended.
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '24px' }}>
                    <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '16px', color: '#fff', margin: '0 0 5px' }}>Dikshant Rai</p>
                    <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,121,32,0.85)', margin: 0 }}>Franchise Investor</p>
                  </div>
                </div>
              </FadeSection>

              {/* Card 3 */}
              <FadeSection delay={300} className="xb-tcard">
                <img src="/Karan.png" alt="Karan Gupta"
                  style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', marginBottom: '28px' }} />
                <div style={{ fontSize: '52px', color: 'var(--orange)', fontFamily: "'Fraunces', serif", lineHeight: 0.8, marginBottom: '20px' }}>"</div>
                <p style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--charcoal)', fontStyle: 'italic', marginBottom: '40px', flexGrow: 1 }}>
                  Xpand Bharat made my first franchise investment smooth and stress-free. From shortlisting the right brand to guiding me through financials and location strategy — it didn't feel like a service, it felt like a long-term partner.
                </p>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
                  <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--navy)', margin: '0 0 5px' }}>Karan Gupta</p>
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
            { q: 'How does franchise expansion actually work?', a: 'Franchise expansion involves transforming an operational business into a scalable growth model through market analysis, business planning, investor onboarding, legal structuring, and operational systems that are built with the help of experts with years of experience.' },
            { q: 'Why are businesses expanding through franchising in India?', a: 'Franchising allows businesses to scale faster while giving investors access to structured, growth-focused business opportunities beyond traditional investments like stocks, mutual funds, or real estate. XPAND helps reduce expansion risk through strategy, investor alignment, lead generation, legal structuring, and execution support.' },
            { q: 'How does XPAND help businesses scale?', a: 'XPAND helps businesses scale by aligning their funding and expansion needs with qualified investors. It helps with investor-ready business proposals, helping you secure the best funding deal with end-to-end execution support.' },
            { q: 'What industries does XPAND work with?', a: 'XPAND works with businesses across F&B, electronics, fashion, retail, and emerging scalable business categories looking to expand through franchising.' },
            { q: 'Why invest in franchise businesses?', a: 'Franchise businesses offer operational support, structured business models, brand recognition, and scalability compared to building a business entirely from scratch.' },
            { q: 'Franchise vs starting your own business — what is better?', a: 'Franchise businesses often reduce operational uncertainty because investors enter businesses with established systems, processes, market positioning, and brand visibility, whereas an independent business requires building everything from the ground up.' },
            { q: 'Are franchise businesses profitable in India?', a: 'Franchise businesses in India are growing rapidly because they combine brand recognition, operational support, and scalable business systems with lower expansion risk compared to building a business entirely from scratch. Many investors today evaluate franchise opportunities alongside mutual funds, stocks, and real estate because franchise models can offer structured growth potential, operational guidance, and long-term commercial scalability when backed by the right market demand and execution systems. XPAND helps reduce expansion uncertainty through investor alignment, market analysis, business planning, legal structuring, execution-led support, and investor advisory.' },
          ];
          const [open, setOpen] = useState(0);
          return (
            <div className="xb-faq-section" style={{ background: 'var(--cream-light)', padding: '100px 40px' }}>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": FAQS.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }) }} />
              <div className="xb-faq-grid" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '80px', alignItems: 'start' }}>
                <div>
                  <FadeSection style={{ marginBottom: '48px' }}>
                    <div className="section-label">Frequently Asked Questions</div>
                    <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, margin: 0 }}>
                      Everything you need to know about franchise expansion
                    </h2>
                  </FadeSection>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {FAQS.map((item, i) => (
                      <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${open === i ? 'var(--orange)' : 'var(--border)'}`, transition: 'border-color 0.25s' }}>
                        <button onClick={() => setOpen(open === i ? -1 : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: open === i ? 'var(--navy)' : 'var(--white)', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px', transition: 'background 0.25s' }}>
                          <span style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 700, color: open === i ? '#fff' : 'var(--navy)', lineHeight: 1.3 }}>{item.q}</span>
                          <span style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1.5px solid ${open === i ? 'rgba(255,255,255,0.3)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: open === i ? 'var(--orange)' : 'var(--gray)', fontSize: '16px', lineHeight: 1, transition: 'all 0.25s' }}>
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
                <FadeSection delay={200} className="xb-faq-cta" style={{ position: 'sticky', top: '120px' }}>
                  <div style={{ background: 'var(--navy)', borderRadius: '20px', padding: '48px 40px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{ position: 'absolute', bottom: '-40%', right: '-20%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(240,121,32,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '40px', height: '3px', background: 'var(--orange)', marginBottom: '28px', borderRadius: '2px' }} />
                      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(22px, 2.2vw, 30px)', fontWeight: 700, color: '#fff', lineHeight: 1.25, marginBottom: '16px' }}>
                        Still have questions?<br /><span style={{ color: 'var(--orange)' }}>Let's talk directly.</span>
                      </h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.75, marginBottom: '32px' }}>
                        Our team will connect with you to discuss your business goals, expansion plans, or investment interests within 24 hours.
                      </p>
                      <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}>Contact Us</Link>
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

        /* ── Full-screen home hero (EBG-style wordmark + content block) ── */
        .home-hero { min-height: 100vh; }
        .home-hero-inner { padding: 84px 40px 44px; }
        .home-hero-mark span { font-size: clamp(36px, 4.8vw, 68px); }
        /* Keep the card compact so it fits one viewport (and stays robust to browser zoom) */
        .home-hero-card h1 { font-size: clamp(26px, 3vw, 42px) !important; }
        /* Equal-width hero CTAs — compact so they sit on one line and don't push the card past the fold */
        .home-hero-card .xb-hero-cta { gap: 12px; }
        .home-hero-card .xb-hero-cta .btn-primary,
        .home-hero-card .xb-hero-cta .btn-outline { flex: 1 1 200px; justify-content: center; text-align: center; font-size: 12px; padding: 12px 16px; }
        @media (max-width: 768px) {
          .home-hero { min-height: 88vh; }
          .home-hero-inner { padding: 92px 20px 40px !important; justify-content: center !important; }
          .home-hero-mark { display: none; }
          .home-hero-card { padding: 26px 22px !important; }
        }
        @media (max-width: 600px) {
          /* Stack CTAs as natural-height full-width buttons (flex-basis must not become a 200px height in a column) */
          .home-hero-card .xb-hero-cta { flex-direction: column; gap: 12px; }
          .home-hero-card .xb-hero-cta .btn-primary,
          .home-hero-card .xb-hero-cta .btn-outline { flex: 0 0 auto; width: 100%; padding: 14px 18px; font-size: 12px; }
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
        /* Short viewports: tighten so the hero never clips */
        @media (max-height: 780px) {
          .xb-hero-inner { padding-top: 78px; }
          .xb-hero-inner .section-label { margin-bottom: 16px !important; }
          .xb-hero-inner p { margin-bottom: 28px !important; }
        }

        /* ── Offerings ── */
        .xb-offerings-strip { padding: 100px 40px; }
        .xb-offering-item { padding: 56px 48px; }

        /* ── Stats ── */
        .xb-stats-bar { padding: 0 40px; }
        .xb-stat-item { padding: 48px 40px; }

        /* ── FAQ ── */
        @media (max-width: 900px) {
          .xb-faq-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
          .xb-faq-cta { position: static !important; }
          .xb-faq-section { padding: 64px 20px !important; }
        }

        /* ── Marquee ── */
        @keyframes xbMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .xb-marquee-track {
          display: flex;
          width: max-content;
          animation: xbMarquee 55s linear infinite;
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

        /* ── About Us ── */
        .xb-about-section { padding: 110px 40px; }
        .xb-about-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 80px;
          align-items: start;
        }
        .xb-about-left { position: sticky; top: 96px; }
        @media (max-width: 900px) {
          .xb-about-section { padding: 72px 24px; }
          .xb-about-grid { grid-template-columns: 1fr; gap: 32px; }
          .xb-about-left { position: static; }
        }
        @media (max-width: 560px) {
          .xb-about-section { padding: 56px 18px; }
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
          height: 400px;
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
        .xb-two-path-section { padding: 80px 40px; }
        .xb-two-path-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .xb-two-path-card { padding: 40px 40px; }

        /* ── Two-path premium cards ── */
        .xb-tp-card {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          background:
            radial-gradient(120% 120% at 100% 0%, rgba(240,121,32,0.05) 0%, transparent 45%),
            linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.012) 60%);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.4s, box-shadow 0.4s;
        }
        .xb-tp-card--accent { border-color: rgba(240,121,32,0.22); }
        .xb-tp-card:hover {
          transform: translateY(-8px);
          border-color: rgba(240,121,32,0.45);
          box-shadow: 0 30px 70px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07);
        }

        /* top accent bar */
        .xb-tp-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--orange), rgba(240,121,32,0));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .xb-tp-card:hover .xb-tp-bar { transform: scaleX(1); }

        /* corner glow */
        .xb-tp-glow {
          position: absolute; top: -28%; right: -18%;
          width: 340px; height: 340px;
          background: radial-gradient(circle, rgba(240,121,32,0.16) 0%, transparent 70%);
          pointer-events: none; opacity: 0.6;
          transition: opacity 0.4s ease;
        }
        .xb-tp-card:hover .xb-tp-glow { opacity: 1; }

        /* icon tile */
        .xb-tp-icon {
          width: 48px; height: 48px; border-radius: 13px; flex-shrink: 0;
          background: rgba(240,121,32,0.1);
          border: 1px solid rgba(240,121,32,0.25);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.4s ease, background 0.3s ease;
        }
        .xb-tp-card:hover .xb-tp-icon { transform: rotate(-6deg) scale(1.06); background: rgba(240,121,32,0.16); }

        /* list */
        .xb-tp-list { list-style: none; padding: 0; margin: 0 0 28px; flex: 1; }
        .xb-tp-row {
          display: flex; align-items: center; gap: 13px;
          padding: 10px 12px; margin: 0 -12px;
          border-radius: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.25s ease, padding-left 0.25s ease;
        }
        .xb-tp-row:last-child { border-bottom: none; }
        .xb-tp-row:hover { background: rgba(255,255,255,0.03); }
        .xb-tp-check {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          color: var(--orange);
          background: rgba(240,121,32,0.12);
          border: 1px solid rgba(240,121,32,0.3);
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }
        .xb-tp-row:hover .xb-tp-check { background: var(--orange); color: #fff; transform: scale(1.08); }
        .xb-tp-text { color: rgba(255,255,255,0.9); font-size: 15px; font-weight: 500; flex: 1; }

        /* CTA button */
        .xb-tp-btn {
          display: flex; align-items: center; justify-content: center; gap: 9px;
          font-weight: 700; font-size: 13.5px; letter-spacing: 0.03em;
          padding: 15px 24px; border-radius: 12px; text-decoration: none;
          transition: transform 0.25s ease, box-shadow 0.3s ease, filter 0.25s ease;
        }
        .xb-tp-btn--accent {
          background: linear-gradient(135deg, #f8862e 0%, var(--orange) 55%, #e06b12 100%);
          color: #fff;
          box-shadow: 0 10px 30px rgba(240,121,32,0.32);
        }
        .xb-tp-btn--accent:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(240,121,32,0.45); filter: brightness(1.04); }
        .xb-tp-btn--light {
          background: #fff; color: var(--navy);
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }
        .xb-tp-btn--light:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
        .xb-tp-arrow { display: inline-block; transition: transform 0.25s ease; }
        .xb-tp-btn:hover .xb-tp-arrow { transform: translateX(5px); }

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

        /* Heading: let it wrap naturally on phones (drop the forced break) */
        @media (max-width: 700px) {
          .br-desktop { display: none; }
        }

        /* ══════════════════════════════════════
           SMALL MOBILE  ≤ 520px
        ══════════════════════════════════════ */
        @media (max-width: 520px) {
          .xb-photo-grid { grid-template-columns: 1fr !important; }
          .xb-photo-card { height: 300px !important; }

          .xb-hero-cta { flex-direction: column; }
          .xb-hero-cta .btn-primary,
          .xb-hero-cta .btn-outline,
          .xb-hero-cta .btn-outline-dark { width: 100%; justify-content: center; text-align: center; }

          .xb-stat-item { border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.1); }
          .xb-stat-item:last-child { border-bottom: none; }
        }
      `}</style>

    </>
  );
}
