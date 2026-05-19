import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    tag: 'Franchise Growth',
    title: 'Why structure matters more than speed in franchise expansion.',
    excerpt: 'Most franchise failures stem not from poor products but from poor systems. The difference between a brand that scales and one that stalls is almost always structural.',
    readTime: '6 min read',
    date: 'May 2025',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Business Expansion',
    title: 'The five signals that tell you a brand is expansion-ready.',
    excerpt: 'Not every business that wants to scale is ready to scale. Before expansion, a brand must pass five critical readiness tests that determine whether growth will be sustainable.',
    readTime: '5 min read',
    date: 'April 2025',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Investor Perspectives',
    title: 'What smart investors look for before entering a franchise opportunity.',
    excerpt: 'Investment in franchise businesses has surged, but so have the failures. Here is what distinguishes the opportunities worth backing from the ones worth walking away from.',
    readTime: '7 min read',
    date: 'April 2025',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Market Trends',
    title: 'Tier-2 India: the next frontier for brand expansion.',
    excerpt: "The story of India's consumption growth is no longer just a metro story. Brands still ignoring tier-2 and tier-3 cities are missing the most significant opportunity of this decade.",
    readTime: '8 min read',
    date: 'March 2025',
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Execution & Governance',
    title: 'Building operational systems that scale without breaking.',
    excerpt: 'Operational systems are the backbone of every scalable business. Most businesses hit a ceiling not because of market limits but because of internal system limits.',
    readTime: '5 min read',
    date: 'March 2025',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  },
  {
    tag: 'Business Expansion',
    title: 'Commercial clarity: the most underrated competitive advantage.',
    excerpt: 'When businesses have genuine commercial clarity — about their model, margins, unit economics, and customer — expansion becomes a structured movement, not a gamble.',
    readTime: '6 min read',
    date: 'February 2025',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
];

const TAG_COLORS = {
  'Franchise Growth':      { bg: 'rgba(240,121,32,0.15)', color: 'var(--orange)' },
  'Business Expansion':    { bg: 'rgba(13,27,62,0.5)',    color: '#fff' },
  'Investor Perspectives': { bg: 'rgba(240,121,32,0.15)', color: 'var(--orange)' },
  'Market Trends':         { bg: 'rgba(13,27,62,0.5)',    color: '#fff' },
  'Execution & Governance':{ bg: 'rgba(13,27,62,0.5)',    color: '#fff' },
};

function FadeSection({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0'; el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} style={style}>{children}</div>;
}

export default function Insights() {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'var(--cream-light)' }}>

      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: 'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.88) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Growth Insights</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
            Perspectives on growth,<br />
            <span style={{ color: 'var(--orange)' }}>expansion and execution.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '540px' }}>
            Franchise growth, market trends, investor perspectives, and strategic content for serious business professionals.
          </p>
        </div>
      </div>

      {/* ── ARTICLES SLIDER ── */}
      <div style={{ background: 'var(--cream-light)', padding: '50px 15px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>

          {/* Header row */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
            <FadeSection>
              <p style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '18px', margin: '0 0 18px',
              }}>
                INSIGHTS&nbsp;
                <span style={{ color: 'var(--orange)', fontFamily: 'monospace' }}>({ARTICLES.length})</span>
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(30px, 4vw, 52px)',
                fontWeight: 700, color: 'var(--navy)',
                lineHeight: 1.1, margin: 0,
              }}>
                Stay ahead of<br />what's next.
              </h2>
            </FadeSection>

            {/* Arrow buttons */}
            <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
              <button
                onClick={() => scroll(-1)}
                aria-label="Previous"
                style={{
                  width: '48px', height: '48px', borderRadius: '6px',
                  border: '1px solid #D5D2CC', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: '16px', color: 'var(--navy)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#D5D2CC'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--navy)'; }}
              >←</button>
              <button
                onClick={() => scroll(1)}
                aria-label="Next"
                style={{
                  width: '48px', height: '48px', borderRadius: '6px',
                  border: '1px solid #D5D2CC', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: '16px', color: 'var(--navy)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#D5D2CC'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--navy)'; }}
              >→</button>
            </div>
          </div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={sliderRef}
          style={{
            display: 'flex',
            gap: '20px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            padding: '0 40px 12px',
          }}
        >
          <style>{`.ins-slider::-webkit-scrollbar { display: none; }`}</style>

          {ARTICLES.map((article, i) => (
            <div
              key={article.title}
              style={{
                width: '380px', flexShrink: 0,
                scrollSnapAlign: 'start',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.querySelector('.ins-img').style.transform = 'scale(1.05)';
                e.currentTarget.querySelector('.ins-read').style.color = 'var(--orange)';
              }}
              onMouseLeave={e => {
                e.currentTarget.querySelector('.ins-img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('.ins-read').style.color = 'var(--navy)';
              }}
            >
              {/* Thumbnail */}
              <div style={{ borderRadius: '4px', overflow: 'hidden', height: '248px', marginBottom: '24px', position: 'relative' }}>
                <img
                  className="ins-img"
                  src={article.img}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,15,35,0.75) 0%, rgba(7,15,35,0.08) 60%)' }} />
                <div style={{ position: 'absolute', bottom: '18px', left: '18px' }}>
                  <span style={{
                    fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em',
                    textTransform: 'uppercase', padding: '5px 12px',
                    border: '1px solid rgba(220,168,60,0.5)',
                    color: 'rgba(230,178,70,0.92)',
                  }}>{article.tag}</span>
                </div>
              </div>

              {/* Text */}
              <div style={{ padding: '0 6px' }}>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '19px', fontWeight: 700,
                color: 'var(--navy)', lineHeight: 1.35,
                marginBottom: '12px',
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>{article.title}</h3>

              <p style={{
                color: 'var(--gray)', fontSize: '14px', lineHeight: 1.7,
                marginBottom: '20px',
                display: '-webkit-box', WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
              }}>{article.excerpt}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{article.date} · {article.readTime}</span>
                <span
                  className="ins-read"
                  style={{ fontSize: '13px', fontWeight: 600, color: 'var(--navy)', transition: 'color 0.2s' }}
                >Read →</span>
              </div>
              </div>
            </div>
          ))}

          {/* trailing spacer */}
          <div style={{ width: '20px', flexShrink: 0 }} />
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
              XPANDBHARAT produces insights that help brands, investors, and operators make smarter, faster, and more structured business decisions.
            </p>
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
          </FadeSection>
        </div>
      </div>
    </div>
  );
}
