import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SECTORS = [
  {
    icon: '◈',
    title: 'Food & Beverage',
    sub: 'QSR · Cloud Kitchens · Cafés · Fine Dining · Specialty F&B',
    desc: 'One of India\'s fastest-scaling sectors. From quick-service restaurant chains to cloud kitchen networks, F&B presents high-velocity expansion opportunities with proven models and strong unit economics.',
    metrics: ['High repeat business', 'Scalable operations', 'Multi-format potential'],
  },
  {
    icon: '◎',
    title: 'Retail & Lifestyle',
    sub: 'Fashion · Beauty · Wellness · Home · Specialty Retail',
    desc: 'Brand-driven retail formats scaling across tier-1 and tier-2 cities. Lifestyle retail is evolving rapidly with hybrid models, curated experiences, and strong brand loyalty driving expansion velocity.',
    metrics: ['Brand differentiation', 'Omnichannel ready', 'High footfall potential'],
  },
  {
    icon: '◉',
    title: 'Service Businesses',
    sub: 'Education · Healthcare · Logistics · Professional Services',
    desc: 'Service businesses with recurring revenue, low capex, and strong scalability. This sector offers structured expansion pathways with defensible positions once established in a market.',
    metrics: ['Recurring revenue', 'Low physical inventory', 'High scalability'],
  },
  {
    icon: '⬡',
    title: 'Health & Wellness',
    sub: 'Fitness · Nutrition · Mental Health · Alternative Medicine',
    desc: 'India\'s wellness economy is growing at pace. From fitness studios to nutraceutical brands, health and wellness businesses are scaling rapidly with strong consumer demand fundamentals.',
    metrics: ['Growing demand', 'Premium positioning', 'Franchise-ready models'],
  },
  {
    icon: '△',
    title: 'Technology & EdTech',
    sub: 'EdTech · SaaS · B2B Tech · Digital Services',
    desc: 'Technology businesses with asset-light models and geographic expansion potential. EdTech and SaaS businesses can scale across markets with minimal physical infrastructure requirements.',
    metrics: ['Asset-light model', 'High margin potential', 'Cross-market scalability'],
  },
  {
    icon: '◇',
    title: 'Real Estate & Infrastructure',
    sub: 'Co-working · Managed Spaces · Real Estate Services',
    desc: 'The managed real estate and co-working sector continues to expand across India\'s tier-1 and emerging tier-2 markets, driven by changing work patterns and commercial demand.',
    metrics: ['Long-term revenue', 'Institutional demand', 'Expansion across cities'],
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

export default function Industries() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div style={{ background: 'var(--navy)', backgroundImage: 'url("https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
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

      {/* SECTORS */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '72px' }}>
            <div className="section-label">Sectors We Work In</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 700, color: 'var(--navy)', maxWidth: '500px', lineHeight: 1.2 }}>
              Six sectors. Proven potential.
            </h2>
          </FadeSection>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {SECTORS.map((sector, i) => (
              <FadeSection key={sector.title} delay={i * 80}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr auto',
                  gap: '40px', padding: '60px 0',
                  borderBottom: '1px solid var(--border)',
                  alignItems: 'start',
                }}>
                  <div style={{ fontSize: '32px', color: 'var(--orange)', paddingTop: '4px' }}>{sector.icon}</div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 2vw, 30px)', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>{sector.title}</h3>
                    </div>
                    <p style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '20px' }}>{sector.sub}</p>
                    <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '24px' }}>{sector.desc}</p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {sector.metrics.map(m => (
                        <span key={m} className="pill" style={{ fontSize: '11px' }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ paddingTop: '4px' }}>
                    <Link to="/growth-opportunities" style={{
                      color: 'var(--orange)', fontWeight: 600, fontSize: '13px',
                      textDecoration: 'none', letterSpacing: '0.04em',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      whiteSpace: 'nowrap',
                    }}>
                      View Opportunities →
                    </Link>
                  </div>
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
              Whether you are a brand looking to expand or an investor looking to enter a growth sector, XPANDBHARAT helps create structured business movement.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/for-brands" className="btn-primary">For Brands</Link>
              <Link to="/for-investors" className="btn-outline">For Investors</Link>
            </div>
          </FadeSection>
        </div>
      </div>
    </div>
  );
}
