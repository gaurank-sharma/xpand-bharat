import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { API } from '../hooks/useContent';

export default function InsightDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [others, setOthers] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPost(null); setNotFound(false);
    fetch(`${API}/insights/${slug}`)
      .then(r => r.json())
      .then(d => { if (d.success) setPost(d.data); else setNotFound(true); })
      .catch(() => setNotFound(true));
    fetch(`${API}/insights?limit=6`)
      .then(r => r.json())
      .then(d => { if (d.success) setOthers(d.data); })
      .catch(() => {});
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      setProgress(scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (notFound) return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream-light)', textAlign: 'center', padding: '40px' }}>
      <div>
        <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '32px', color: 'var(--navy)', marginBottom: '16px' }}>Article not found.</h2>
        <Link to="/insights" className="btn-primary">← Back to Insights</Link>
      </div>
    </div>
  );

  if (!post) return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream-light)' }}>
      <div style={{ width: '34px', height: '34px', border: '3px solid var(--orange)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const related = others.filter(p => p.slug !== post.slug).slice(0, 3);

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Helmet>
        <title>{post.title} — XPAND Bharat Insights</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Reading progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, height: '3px', width: `${progress}%`, background: 'var(--orange)', zIndex: 1100, transition: 'width 0.1s linear' }} />

      {/* HERO */}
      <div style={{ background: 'var(--navy)', padding: '150px 40px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <Link to="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: 600, textDecoration: 'none', marginBottom: '28px' }}>
            ← All Insights
          </Link>
          <div style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--orange)', border: '1px solid rgba(240,121,32,0.4)', padding: '6px 14px', borderRadius: '100px', marginBottom: '24px' }}>
            {post.tag}
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(30px, 4.2vw, 52px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '24px' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            <span>{post.displayDate}</span>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* FEATURE IMAGE */}
      {post.img && (
        <div style={{ maxWidth: '900px', margin: '-40px auto 0', padding: '0 40px', position: 'relative', zIndex: 2 }}>
          <div style={{ borderRadius: '18px', overflow: 'hidden', boxShadow: '0 24px 60px rgba(13,27,62,0.22)' }}>
            <img src={post.img} alt={post.title} style={{ width: '100%', display: 'block', maxHeight: '460px', objectFit: 'cover' }} />
          </div>
        </div>
      )}

      {/* BODY */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '60px 40px 40px' }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '16px', lineHeight: 1.6, color: 'var(--navy)', marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
          {post.excerpt}
        </p>
        <div className="insight-prose" dangerouslySetInnerHTML={{ __html: post.content || '<p>Full article coming soon.</p>' }} />
      </div>

      {/* CONTINUE READING */}
      {related.length > 0 && (
        <div style={{ background: 'var(--cream)', padding: '80px 40px', borderTop: '1px solid var(--border)' }}>
          <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div className="section-label">Continue reading</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '40px' }}>
              More from XPAND Insights
            </h2>
            <div className="id-related-grid">
              {related.map(r => (
                <Link key={r.slug} to={`/insights/${r.slug}`} className="id-related-card">
                  <div className="id-related-img">
                    <img src={r.img} alt={r.title} />
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--orange)' }}>{r.tag}</span>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '18px', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.35, margin: '8px 0 10px' }}>{r.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '13px', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Article typography ── */
        .insight-prose { color: #3a4256; font-size: 17px; line-height: 1.9; }
        .insight-prose > *:first-child { margin-top: 0; }
        .insight-prose h2 {
          font-family: 'Fraunces', serif; font-size: clamp(22px, 2.4vw, 30px); font-weight: 700;
          color: var(--navy); line-height: 1.25; margin: 48px 0 16px;
          padding-left: 18px; border-left: 3px solid var(--orange);
        }
        .insight-prose h3 {
          font-family: 'Fraunces', serif; font-size: 21px; font-weight: 700;
          color: var(--navy); margin: 36px 0 12px; line-height: 1.3;
        }
        .insight-prose p { margin: 0 0 22px; }
        .insight-prose a { color: var(--orange); font-weight: 600; text-decoration: none; }
        .insight-prose a:hover { text-decoration: underline; }
        .insight-prose strong { color: var(--navy); font-weight: 700; }
        .insight-prose ul, .insight-prose ol { margin: 0 0 24px; padding-left: 4px; list-style: none; }
        .insight-prose li {
          position: relative; padding-left: 28px; margin-bottom: 12px; line-height: 1.75;
        }
        .insight-prose ul li::before {
          content: ''; position: absolute; left: 4px; top: 11px;
          width: 7px; height: 7px; border-radius: 50%; background: var(--orange);
        }
        .insight-prose ol { counter-reset: li; }
        .insight-prose ol li { counter-increment: li; }
        .insight-prose ol li::before {
          content: counter(li); position: absolute; left: 0; top: 1px;
          width: 20px; height: 20px; font-size: 11px; font-weight: 700; color: var(--orange);
          display: flex; align-items: center; justify-content: center;
          background: rgba(240,121,32,0.1); border-radius: 50%;
        }
        .insight-prose blockquote {
          margin: 32px 0; padding: 4px 0 4px 24px; border-left: 3px solid var(--orange);
          font-family: 'Fraunces', serif; font-style: italic; font-size: 21px;
          color: var(--navy); line-height: 1.5;
        }
        .insight-prose img { width: 100%; border-radius: 14px; margin: 28px 0; }
        .insight-prose hr { border: none; border-top: 1px solid var(--border); margin: 40px 0; }

        /* ── Related cards ── */
        .id-related-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .id-related-card { text-decoration: none; display: block; }
        .id-related-img { border-radius: 12px; overflow: hidden; height: 200px; margin-bottom: 16px; }
        .id-related-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .id-related-card:hover .id-related-img img { transform: scale(1.05); }

        @media (max-width: 860px) {
          .id-related-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .insight-prose { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}
