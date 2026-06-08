import { useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const CATEGORIES = [
  {
    tag: 'Food and Beverage',
    title: 'F&B Expansion',
    desc: 'From QSR chains to cloud kitchens — high-velocity expansion opportunities with proven models and strong unit economics.',
    range: '₹30L – ₹2Cr',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Retail and Lifestyle',
    title: 'Retail Formats',
    desc: 'Brand-driven retail scaling across tier-1 and tier-2 cities with hybrid models and strong brand loyalty.',
    range: '₹50L – ₹5Cr',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Service Businesses',
    title: 'Service Sector',
    desc: 'Recurring revenue, low capex, and strong scalability across defensible service business categories.',
    range: '₹20L – ₹1Cr',
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Emerging Brands',
    title: 'Growth Stage',
    desc: 'Growth-ready businesses with proven models seeking strategic alignment, capital, and expansion support.',
    range: '₹1Cr – ₹10Cr',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Franchise',
    title: 'Franchise Models',
    desc: 'Structured franchise systems with defined operations, proven replication, and disciplined rollout support.',
    range: '₹25L – ₹3Cr',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Multi-Market',
    title: 'Expansion-Led Businesses',
    desc: 'Businesses positioned for pan-India multi-market growth with long-term operational scalability.',
    range: '₹2Cr – ₹20Cr',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
];

const DIFFERENTIATORS = [
  { num: '01', title: 'Commercially aligned models', desc: 'Every opportunity is positioned around real commercial logic — not just market potential.' },
  { num: '02', title: 'Scalable business structure', desc: 'Built to replicate across markets without losing operational discipline or brand integrity.' },
  { num: '03', title: 'Growth-focused from day one', desc: 'We only present businesses that are genuinely positioned for expansion — not just growth-stage hopefuls.' },
  { num: '04', title: 'Expansion readiness verified', desc: 'Operational, financial, and structural readiness is assessed before any opportunity reaches an investor.' },
  { num: '05', title: 'Execution support included', desc: 'We stay involved after the match — from initial conversations to final commitment and rollout.' },
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

export default function GrowthOpportunities() {
  const { hero, section } = useContent('growth-opportunities');
  const categories = section('categories', CATEGORIES).map(item => ({
    tag: item.tag,
    title: item.title,
    desc: item.description || item.desc,
    range: item.extra || item.range || '',
    img: item.imageUrl || item.img,
  }));
  const differentiators = section('differentiators', DIFFERENTIATORS).map(item => ({
    num: item.badge || item.num,
    title: item.title,
    desc: item.description || item.desc,
  }));
  const heroImg = hero?.backgroundImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Helmet>
        <title>Growth Opportunities — Franchise Investment Opportunities India | XPAND Bharat</title>
        <meta name="description" content="Explore curated franchise investment opportunities across F&B, retail, lifestyle, and emerging sectors in India. XPAND Bharat connects serious investors with structured, expansion-ready franchise businesses." />
        <meta name="keywords" content="franchise opportunities India, franchise investment opportunities India, food franchise India, retail franchise India, multi-unit franchise opportunities, franchise investor network India, best franchise investment India" />
      </Helmet>
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '5%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(240,121,32,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Growth Opportunities</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
            Opportunities built for<br />
            <span style={{ color: 'var(--orange)' }}>scalable franchise growth.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px' }}>
            Curated franchise investment opportunities designed around commercial clarity, operational structure, and long-term scalability across India.
          </p>
          <Link to="/growth-opportunities" className="btn-primary">Explore Opportunities</Link>
        </div>
      </div>

      {/* OPPORTUNITY CATEGORIES — Premium cinematic grid */}
      <div style={{ background: '#04080f', padding: '100px 0' }}>
        {/* Header */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', marginBottom: '56px' }}>
          <FadeSection>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.25em', color: 'rgba(220,168,60,0.85)', textTransform: 'uppercase', marginBottom: '18px' }}>Business Opportunities</div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: 0 }}>
                  Sectors we bring to the table.
                </h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '14px', lineHeight: 1.75, maxWidth: '320px', margin: 0 }}>
                Every sector is chosen for its expansion potential, proven demand, and scalability across Indian markets.
              </p>
            </div>
          </FadeSection>
        </div>

        {/* 3-column cinematic card grid */}
        <div className="go-grid-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', padding: '0 12px' }}>
          {categories.map((cat, i) => (
            <div
              key={cat.tag}
              style={{ position: 'relative', height: '480px', overflow: 'hidden', borderRadius: '6px' }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.go-img').style.transform = 'scale(1.06)';
                e.currentTarget.querySelector('.go-desc').style.opacity = '1';
                e.currentTarget.querySelector('.go-desc').style.transform = 'translateY(0)';
                e.currentTarget.querySelector('.go-grad').style.background = 'linear-gradient(180deg,rgba(4,8,15,0.6) 0%,rgba(4,8,15,0.08) 30%,rgba(4,8,15,0.97) 100%)';
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.go-img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.go-desc').style.opacity = '0';
                e.currentTarget.querySelector('.go-desc').style.transform = 'translateY(8px)';
                e.currentTarget.querySelector('.go-grad').style.background = 'linear-gradient(180deg,rgba(4,8,15,0.55) 0%,rgba(4,8,15,0.08) 38%,rgba(4,8,15,0.88) 100%)';
              }}
            >
              {/* Image */}
              <div className="go-img" style={{ position: 'absolute', inset: 0, backgroundImage: `url("${cat.img}")`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94)' }} />

              {/* Gradient */}
              <div className="go-grad" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(4,8,15,0.55) 0%,rgba(4,8,15,0.08) 38%,rgba(4,8,15,0.88) 100%)', transition: 'background 0.4s ease' }} />

              {/* Tag — top left */}
              <div style={{ position: 'absolute', top: '22px', left: '22px', zIndex: 2 }}>
                <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '5px 13px', border: '1px solid rgba(220,168,60,0.52)', color: 'rgba(230,178,70,0.9)' }}>
                  {cat.tag}
                </span>
              </div>

              {/* Bottom content */}
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 2 }}>
                {/* Investment range badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px', background: 'rgba(7,15,35,0.75)', backdropFilter: 'blur(8px)', border: '1px solid rgba(240,121,32,0.55)', borderRadius: '4px', padding: '6px 14px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Range</span>
                  <span style={{ width: '1px', height: '12px', background: 'rgba(240,121,32,0.45)', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--orange)', fontFamily: "'Inter', sans-serif", letterSpacing: '0.02em' }}>{cat.range}</span>
                </div>

                <div style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.35)', marginBottom: '12px' }} />

                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(20px, 1.8vw, 26px)', fontWeight: 600, fontStyle: 'italic', color: '#fff', margin: 0, lineHeight: 1.25 }}>
                  {cat.title}
                </h3>

                <p className="go-desc" style={{ color: 'rgba(255,255,255,0.72)', fontSize: '13px', lineHeight: 1.7, margin: '12px 0 0', opacity: 0, transform: 'translateY(8px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}>
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: 1-col scroll */}
        <style>{`
          @media (max-width: 768px) {
            .go-grid-wrap { display: flex !important; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; gap: 12px; padding: 0 16px !important; }
            .go-grid-wrap > div { min-width: 82vw; width: 82vw; scroll-snap-align: start; height: 400px !important; }
            .go-desc { opacity: 1 !important; transform: translateY(0) !important; }
            .go-grad { background: linear-gradient(180deg,rgba(4,8,15,0.6) 0%,rgba(4,8,15,0.08) 30%,rgba(4,8,15,0.97) 100%) !important; }
          }
          @media (max-width: 900px) and (min-width: 769px) {
            .go-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>

      {/* DIFFERENTIATORS */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Fraunces', serif", fontSize: '300px', fontWeight: 700, color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>05</div>
        <div className="xb-grid-2col" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '100px', alignItems: 'start', position: 'relative', zIndex: 1 }}>
          <FadeSection>
            <div className="section-label">What Makes These Different</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: '24px', lineHeight: 1.1 }}>
              Built for serious,<br /><span style={{ color: 'var(--orange)' }}>scalable growth.</span>
            </h2>
            <div style={{ width: '48px', height: '2px', background: 'var(--orange)', margin: '28px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '16px', lineHeight: 1.85, marginBottom: '48px', maxWidth: '360px' }}>
              Every opportunity on our platform passes through a structured screening process before it reaches a serious investor.
            </p>
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
          </FadeSection>
          <FadeSection delay={150}>
            {differentiators.map((item, i) => (
              <div key={item.num} style={{ display: 'flex', gap: '28px', alignItems: 'flex-start', padding: '28px 0', borderBottom: i < differentiators.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: '40px', fontWeight: 700, color: 'var(--orange)', lineHeight: 0.9, flexShrink: 0, width: '52px', opacity: 0.9 }}>{item.num}</div>
                <div style={{ paddingTop: '4px' }}>
                  <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </FadeSection>
        </div>
      </div>

    </div>
  );
}
