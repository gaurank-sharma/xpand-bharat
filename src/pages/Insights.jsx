import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TOPICS = [
  { icon: '◈', label: 'Business Expansion', desc: 'Growth strategies, expansion planning, and scalable market movement.' },
  { icon: '◉', label: 'Franchise Growth', desc: 'Franchise models, territory planning, and expansion frameworks.' },
  { icon: '◎', label: 'Investor Perspectives', desc: 'Business opportunities, investment alignment, and growth sectors.' },
  { icon: '⬡', label: 'Market Trends', desc: 'Emerging industries, growth sectors, and changing business opportunities.' },
  { icon: '△', label: 'Execution & Governance', desc: 'Operational discipline, process structure, and scalable business systems.' },
];

const ARTICLES = [
  {
    tag: 'Franchise Growth',
    title: 'Why structure matters more than speed in franchise expansion.',
    excerpt: 'Most franchise failures stem not from poor products but from poor systems. The difference between a brand that scales and one that stalls is almost always structural.',
    readTime: '6 min read',
    date: 'May 2025',
  },
  {
    tag: 'Business Expansion',
    title: 'The five signals that tell you a brand is expansion-ready.',
    excerpt: 'Not every business that wants to scale is ready to scale. Before expansion, a brand must pass five critical readiness tests that determine whether growth will be sustainable.',
    readTime: '5 min read',
    date: 'April 2025',
  },
  {
    tag: 'Investor Perspectives',
    title: 'What smart investors look for before entering a franchise opportunity.',
    excerpt: 'Investment in franchise businesses has surged, but so have the failures. Here is what distinguishes the opportunities worth backing from the ones worth walking away from.',
    readTime: '7 min read',
    date: 'April 2025',
  },
  {
    tag: 'Market Trends',
    title: 'Tier-2 India: the next frontier for brand expansion.',
    excerpt: 'The story of India\'s consumption growth is no longer just a metro story. Brands that are still ignoring tier-2 and tier-3 cities are missing the most significant opportunity of this decade.',
    readTime: '8 min read',
    date: 'March 2025',
  },
  {
    tag: 'Execution & Governance',
    title: 'Building operational systems that scale without breaking.',
    excerpt: 'Operational systems are the backbone of every scalable business. Most businesses reach a growth ceiling not because of market limitations but because of internal system limitations.',
    readTime: '5 min read',
    date: 'March 2025',
  },
  {
    tag: 'Business Expansion',
    title: 'Commercial clarity: the most underrated competitive advantage.',
    excerpt: 'When businesses have genuine commercial clarity — about their model, their margins, their unit economics, and their customer — expansion becomes a structured movement, not a gamble.',
    readTime: '6 min read',
    date: 'February 2025',
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

export default function Insights() {
  return (
    <div style={{ background: 'var(--cream-light)' }}>
      {/* HERO */}
      <div style={{ background: 'var(--navy)', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Growth Insights</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
            Perspectives on growth,<br />
            <span style={{ color: 'var(--orange)' }}>expansion & execution.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '540px' }}>
            Business expansion insights, market trends, franchise growth articles, investor perspectives, and strategic content for growth-focused professionals.
          </p>
        </div>
      </div>

      {/* TOPICS */}
      <div style={{ background: 'var(--navy)', padding: '0 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto' }}>
          {TOPICS.map((t, i) => (
            <div key={t.label} style={{
              padding: '32px 40px', borderRight: i < TOPICS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              minWidth: '200px', cursor: 'pointer', transition: 'background 0.2s',
              flexShrink: 0,
            }}>
              <div style={{ fontSize: '20px', color: 'var(--orange)', marginBottom: '8px' }}>{t.icon}</div>
              <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>{t.label}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED ARTICLE */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px' }}>
            <div className="section-label">Featured</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: 'var(--navy)' }}>
              Latest thinking from XPANDBHARAT.
            </h2>
          </FadeSection>

          {/* Featured big card */}
          <FadeSection style={{ marginBottom: '40px' }}>
            <div style={{
              background: 'var(--navy)', borderRadius: '20px', padding: '64px',
              display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'end',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(240,121,32,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <span className="pill" style={{ background: 'rgba(240,121,32,0.15)', color: 'var(--orange)', marginBottom: '24px', display: 'inline-block' }}>{ARTICLES[0].tag}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 700, color: '#fff', marginBottom: '20px', lineHeight: 1.25 }}>
                  {ARTICLES[0].title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, maxWidth: '600px', marginBottom: '32px' }}>{ARTICLES[0].excerpt}</p>
                <div style={{ display: 'flex', gap: '24px', color: 'rgba(255,255,255,0.35)', fontSize: '13px' }}>
                  <span>{ARTICLES[0].date}</span>
                  <span>{ARTICLES[0].readTime}</span>
                </div>
              </div>
              <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
                <button style={{ background: 'var(--orange)', color: '#fff', border: 'none', padding: '14px 28px', borderRadius: '4px', fontWeight: 600, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>
                  Read Article →
                </button>
              </div>
            </div>
          </FadeSection>

          {/* Article grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {ARTICLES.slice(1).map((article, i) => (
              <FadeSection key={article.title} delay={i * 80}>
                <div className="card" style={{ height: '100%', cursor: 'pointer' }}>
                  <span className="pill" style={{ marginBottom: '20px', display: 'inline-block' }}>{article.tag}</span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--navy)', marginBottom: '14px', lineHeight: 1.35 }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>{article.excerpt}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                    <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{article.date} · {article.readTime}</span>
                    <span style={{ color: 'var(--orange)', fontWeight: 600, fontSize: '13px' }}>Read →</span>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* NEWSLETTER CTA */}
      <div style={{ background: 'var(--cream)', padding: '100px 40px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <FadeSection>
            <div className="section-label" style={{ justifyContent: 'center' }}>Stay ahead</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Built around practical business thinking.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px' }}>
              XPANDBHARAT focuses on insights that support commercially intelligent and execution-focused business movement.
            </p>
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
          </FadeSection>
        </div>
      </div>
    </div>
  );
}
