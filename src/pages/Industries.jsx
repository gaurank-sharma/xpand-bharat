import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SECTORS = [
  {
    num: '01',
    title: 'Food and Beverage',
    sub: 'QSR · Cloud Kitchens · Cafés · Fine Dining · Specialty F&B',
    desc: 'One of India\'s fastest-scaling sectors. From quick-service chains to cloud kitchen networks, F&B presents high-velocity opportunities with proven models and strong unit economics.',
    metrics: ['High repeat business', 'Scalable operations', 'Multi-format potential'],
  },
  {
    num: '02',
    title: 'Retail and Lifestyle',
    sub: 'Fashion · Beauty · Wellness · Home · Specialty Retail',
    desc: 'Brand-driven retail formats scaling across tier-1 and tier-2 cities — evolving rapidly with hybrid models, curated experiences, and strong brand loyalty driving expansion velocity.',
    metrics: ['Brand differentiation', 'Omnichannel ready', 'High footfall potential'],
  },
  {
    num: '03',
    title: 'Service Businesses',
    sub: 'Education · Healthcare · Logistics · Professional Services',
    desc: 'Recurring revenue, low capex, and strong scalability. This sector offers structured expansion pathways with defensible positions once established in a market.',
    metrics: ['Recurring revenue', 'Low capex model', 'High scalability'],
  },
  {
    num: '04',
    title: 'Health and Wellness',
    sub: 'Fitness · Nutrition · Mental Health · Alternative Medicine',
    desc: 'India\'s wellness economy is growing at pace. From fitness studios to nutraceutical brands, health businesses are scaling rapidly with strong consumer demand fundamentals.',
    metrics: ['Growing demand', 'Premium positioning', 'Franchise-ready models'],
  },
  {
    num: '05',
    title: 'Technology and EdTech',
    sub: 'EdTech · SaaS · B2B Tech · Digital Services',
    desc: 'Asset-light models with strong geographic expansion potential. EdTech and SaaS businesses scale across markets with minimal physical infrastructure requirements.',
    metrics: ['Asset-light model', 'High margin potential', 'Cross-market scalable'],
  },
  {
    num: '06',
    title: 'Real Estate and Infrastructure',
    sub: 'Co-working · Managed Spaces · Real Estate Services',
    desc: 'The managed real estate and co-working sector continues to expand across India\'s tier-1 and emerging tier-2 markets, driven by changing work patterns and commercial demand.',
    metrics: ['Long-term revenue', 'Institutional demand', 'Pan-India expansion'],
  },
];

function FadeSection({ children, delay = 0, style = {}, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0'; el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

export default function Industries() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>

      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.88) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Industries</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '700px' }}>
            Sectors we<br />
            <span style={{ color: 'var(--orange)' }}>support and scale.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px' }}>
            XPANDBHARAT works across India's highest-growth sectors — identifying expansion-ready opportunities and connecting them with the right capital and execution support.
          </p>
        </div>
      </div>

      {/* SECTORS — Premium numbered card grid */}
      <div style={{ background: 'var(--cream-light)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          {/* Header */}
          <FadeSection>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '72px' }}>
              <div>
                <div className="section-label">Sectors We Work In</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, margin: 0 }}>
                  Six sectors. Proven potential.
                </h2>
              </div>
              <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: 1.75, maxWidth: '360px', margin: 0 }}>
                Each sector is chosen for expansion readiness, scalable economics, and real demand across Indian markets.
              </p>
            </div>
          </FadeSection>

          {/* 2-column card grid */}
          <div className="ind-grid">
            {SECTORS.map((sector, i) => (
              <FadeSection key={sector.title} delay={i * 70} className="ind-card">
                {/* Card top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', fontWeight: 700, color: 'rgba(240,121,32,0.12)', lineHeight: 1 }}>
                    {sector.num}
                  </span>
                  <Link to="/growth-opportunities" style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '12px', letterSpacing: '0.06em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', paddingTop: '8px', whiteSpace: 'nowrap' }}>
                    Explore →
                  </Link>
                </div>

                {/* Title */}
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(20px, 2vw, 26px)', fontWeight: 700, color: 'var(--navy)', margin: '0 0 10px', lineHeight: 1.2 }}>
                  {sector.title}
                </h3>

                {/* Sub-categories */}
                <p style={{ color: 'var(--orange)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px', lineHeight: 1.6 }}>
                  {sector.sub}
                </p>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '18px' }} />

                {/* Description */}
                <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.8, marginBottom: '24px', flex: 1 }}>
                  {sector.desc}
                </p>

                {/* Metrics */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {sector.metrics.map(m => (
                    <span key={m} style={{
                      fontSize: '11px', fontWeight: 600, letterSpacing: '0.05em',
                      padding: '5px 12px', borderRadius: '100px',
                      background: 'var(--orange-pale)', color: 'var(--orange)',
                    }}>{m}</span>
                  ))}
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <FadeSection>
            <div className="section-label" style={{ justifyContent: 'center' }}>Work with us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#fff', marginBottom: '24px', lineHeight: 1.15 }}>
              Ready to explore your sector?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', lineHeight: 1.7, marginBottom: '48px' }}>
              Whether you are a brand ready to expand or an investor looking to enter a high-growth sector, XPANDBHARAT gives you the structure, clarity, and execution support to move with confidence.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/for-brands" className="btn-primary">For Brands</Link>
              <Link to="/for-investors" className="btn-outline">For Investors</Link>
            </div>
          </FadeSection>
        </div>
      </div>

      <style>{`
        /* Sector card grid */
        .ind-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          background: var(--border);
        }
        .ind-card {
          background: var(--cream-light);
          padding: 48px 40px;
          display: flex;
          flex-direction: column;
          transition: background 0.25s ease;
        }
        .ind-card:hover { background: var(--white); }

        /* Mobile */
        @media (max-width: 768px) {
          .ind-grid { grid-template-columns: 1fr; }
          .ind-card { padding: 36px 20px; }
        }
      `}</style>
    </div>
  );
}
