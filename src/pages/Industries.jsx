import { useRef, useEffect, useState } from 'react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { Eye, Monitor, Globe, DollarSign, Activity, Layers } from 'lucide-react';

const SECTORS = [
  {
    num: '01',
    title: 'Food & Beverage Franchises',
    sub: 'QSR · Cloud Kitchens · Cafés · Restaurant Brands',
    frontDesc: 'Helping cafés, QSRs, cloud kitchens, and restaurant brands scale through structured franchise expansion and investor-ready growth systems.',
    backStat: "McDonald's India is targeting nearly 600+ outlets across the country through aggressive franchise-led expansion, proving how scalable structured food franchise systems can become in India's growing consumer market.",
    backDesc: 'XPAND helps cafés, QSRs, cloud kitchens, and regional food brands structure investor-ready franchise opportunities designed for scalable expansion across Indian cities.',
  },
  {
    num: '02',
    title: 'Electronics & Consumer Retail',
    sub: 'Consumer Electronics · Retail Chains · Multi-brand Outlets',
    frontDesc: 'Supporting electronics and retail businesses looking to expand across cities through commercially aligned franchise opportunities.',
    backStat: 'Croma has already scaled to 540+ stores across 200+ Indian cities through structured retail expansion and multi-market growth systems backed by operational consistency and brand trust.',
    backDesc: 'XPAND helps electronics and retail businesses structure franchise expansion, investor alignment, and scalable rollout planning designed for long-term market growth.',
  },
  {
    num: '03',
    title: 'Salon & Lifestyle Businesses',
    sub: 'Salons · Wellness · Personal Care · Lifestyle Services',
    frontDesc: 'Helping salon, wellness, and lifestyle brands structure scalable franchise growth models backed by investor alignment and expansion strategy.',
    backStat: 'Green Trends has expanded to 375+ salons across 50+ cities, showing how service-led franchise businesses continue scaling rapidly across India through repeat consumer demand and operational scalability.',
    backDesc: 'XPAND supports salon, wellness, and lifestyle brands through franchise business structuring, investor-ready positioning, and expansion-focused growth systems.',
  },
  {
    num: '04',
    title: 'Fashion & Lifestyle Brands',
    sub: 'Apparel · Accessories · Lifestyle Retail · Fashion Formats',
    frontDesc: 'Helping fashion and lifestyle businesses structure scalable franchise growth models backed by investor alignment and expansion strategy.',
    backStat: 'Max Fashion has scaled to 510+ stores across 200+ Indian cities through structured retail growth, strong operational systems, and expansion-focused market penetration.',
    backDesc: 'XPAND helps fashion and retail brands expand through franchising by supporting franchise rollout strategy, investor alignment, expansion planning, and scalable business structuring across Indian markets.',
  },
  {
    num: '05',
    title: 'Retail & Consumer Businesses',
    sub: 'Regional Brands · Emerging Consumer · Specialty Retail',
    frontDesc: 'From regional brands to emerging consumer businesses, XPAND supports expansion through franchising, market mapping, and investor connectivity.',
    backStat: 'Reliance SMART Bazaar operates 260 stores across 100+ Indian cities, demonstrating how structured retail expansion, operational standardization, and market-led growth can create a scalable national footprint.',
    backDesc: 'XPAND supports regional and consumer businesses through franchise expansion, market mapping, and investor connectivity across Indian markets.',
  },
];

const ROADMAP = [
  {
    num: '01',
    label: 'FOUNDATION',
    Icon: Eye,
    title: 'Proven Business Model',
    desc: 'The business should already demonstrate operational consistency, customer demand, and market validation before expansion begins.',
  },
  {
    num: '02',
    label: 'SYSTEMS',
    Icon: Monitor,
    title: 'Scalable Operations',
    desc: 'A business must be capable of replicating its operational systems, customer experience, and commercial performance across multiple locations.',
  },
  {
    num: '03',
    label: 'MARKETS',
    Icon: Globe,
    title: 'Market Expansion Potential',
    desc: 'We evaluate whether the business has the ability to scale across tier-1, tier-2, and emerging Indian markets through franchising.',
  },
  {
    num: '04',
    label: 'VIABILITY',
    Icon: DollarSign,
    title: 'Investor Viability',
    lead: 'Businesses are assessed around:',
    items: ['investment attractiveness', 'operational sustainability', 'commercial clarity', 'franchise scalability', 'long-term growth potential'],
  },
  {
    num: '05',
    label: 'EXECUTION',
    Icon: Activity,
    title: 'Structured Franchise Expansion',
    lead: 'XPAND helps structure:',
    items: ['franchise rollout strategy', 'investor-ready proposals', 'franchise positioning', 'market mapping', 'investor alignment', 'expansion planning'],
  },
  {
    num: '06',
    label: 'EXECUTION SUPPORT',
    Icon: Layers,
    title: 'Expansion With Execution Support',
    paras: [
      'Growth is not just about finding investors. It is about building operationally scalable systems capable of sustaining long-term expansion across markets.',
      'XPAND supports businesses through investor alignment, coordination, franchise expansion support, and commercially structured growth execution.',
    ],
  },
];

function FadeSection({ children, delay = 0, style = {}, className = '' }) {
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
  return <div ref={ref} style={style} className={className}>{children}</div>;
}

function RoadmapViz() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const cardRefs = useRef([]);
  const [animated, setAnimated] = useState(false);

  const VB_W = 1300, VB_H = 420;
  const PAD_TOP = 200, PAD_BOT = 200;
  const ROAD = 'M 60,340 C 150,340 185,260 295,244 C 405,228 445,308 555,290 C 665,272 705,172 815,156 C 880,144 920,164 960,198 C 1000,232 1060,152 1200,138';
  const DOTS = [
    { x: 105, y: 338, side: 'above' }, { x: 290, y: 244, side: 'below' },
    { x: 490, y: 292, side: 'above' }, { x: 710, y: 254, side: 'below' },
    { x: 940, y: 170, side: 'above' }, { x: 1175, y: 142, side: 'below' },
  ];
  const STEMS = [
    [105,326,105,170], [290,256,290,360],
    [490,280,490,140], [710,266,710,360],
    [940,158,940,50],  [1175,154,1175,260],
  ];

  const adjust = () => {
    const svg = svgRef.current, cont = containerRef.current;
    if (!svg || !cont) return;
    const sr = svg.getBoundingClientRect();
    const cr = cont.getBoundingClientRect();
    const sx = sr.width / VB_W, sy = sr.height / VB_H;
    const svgTop = sr.top - cr.top, svgLeft = sr.left - cr.left;
    DOTS.forEach((d, i) => {
      const c = cardRefs.current[i]; if (!c) return;
      const px = svgLeft + d.x * sx, py = svgTop + d.y * sy;
      let l = px - c.offsetWidth / 2;
      let t = d.side === 'above' ? py - c.offsetHeight - 100 : py + 100;
      l = Math.max(0, Math.min(l, cr.width - c.offsetWidth));
      c.style.left = l + 'px'; c.style.top = t + 'px';
    });
  };

  useEffect(() => {
    const t1 = setTimeout(adjust, 100);
    const t2 = setTimeout(adjust, 500);
    window.addEventListener('resize', adjust);

    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      adjust();
      // Two rAFs: first applies initial CSS state, second triggers transition
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
      obs.disconnect();
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    if (containerRef.current) obs.observe(containerRef.current);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener('resize', adjust);
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className={`rm-responsive${animated ? ' rm-in-view' : ''}`}
      style={{ position: 'relative', width: '100%', paddingTop: `${PAD_TOP}px`, paddingBottom: `${PAD_BOT}px` }}>
      <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}>
        <path d={ROAD} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="52" strokeLinecap="round"/>
        <path className="rm-road-body" d={ROAD} fill="none" stroke="rgba(13,27,62,0.95)" strokeWidth="44" strokeLinecap="round"/>
        <path d={ROAD} fill="none" stroke="rgba(240,121,32,0.3)" strokeWidth="1.5" strokeLinecap="round"/>
        <path className="rm-flow" d={ROAD} fill="none" stroke="rgba(240,121,32,0.4)" strokeWidth="1.5" strokeDasharray="18 24" strokeLinecap="round"/>
        {STEMS.map(([x1,y1,x2,y2], i) => (
          <line key={i} className="rm-stem" x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(240,121,32,0.45)" strokeWidth="1.5"
            style={{ transitionDelay: `${0.85 + i * 0.25}s` }}/>
        ))}
        {DOTS.map((d, i) => (
          <g key={i} className="rm-dot" style={{ transformOrigin: `${d.x}px ${d.y}px`, transitionDelay: `${0.82 + i * 0.25}s` }}>
            <circle cx={d.x} cy={d.y} r="9" fill="var(--orange)"/>
            <circle cx={d.x} cy={d.y} r="4" fill="var(--navy)"/>
          </g>
        ))}
      </svg>
      {ROADMAP.map((item, i) => (
        <div key={item.num} ref={el => cardRefs.current[i] = el} className="rm-svg-card"
          style={{ transitionDelay: `${1.0 + i * 0.25}s` }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--orange)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>{item.num} — {item.label}</span>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(240,121,32,0.1)', border: '1px solid rgba(240,121,32,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
            <item.Icon size={15} color="var(--orange)" strokeWidth={1.5}/>
          </div>
          <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '13px', fontWeight: 700, color: '#fff', margin: '0 0 7px', lineHeight: 1.3 }}>{item.title}</h4>
          {item.desc && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>}
          {item.lead && <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '10px', fontWeight: 600, marginBottom: '5px' }}>{item.lead}</p>}
          {item.items && <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{item.items.map(it => <li key={it} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '10px', lineHeight: 1.65, paddingLeft: '11px', position: 'relative' }}><span style={{ position: 'absolute', left: 0, color: 'var(--orange)', fontSize: '8px', top: '2px' }}>→</span>{it}</li>)}</ul>}
          {item.paras && item.paras.map((p, pi) => <p key={pi} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', lineHeight: 1.7, margin: pi < item.paras.length - 1 ? '0 0 7px' : '0' }}>{p}</p>)}
        </div>
      ))}
    </div>
  );
}

export default function Industries() {
  const { hero } = useContent('industries');
  const heroImg = hero?.backgroundImage || '/img/photo-1480714378408-67cf0d13bc1b.jpg';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Seo
        path="/industries"
        title={"Franchise Industries We Work With | F&B, Retail, Fashion | XPAND Bharat"}
        description={"XPAND Bharat helps franchise businesses scale across F&B, electronics, fashion, retail, salon, and emerging consumer sectors through structured expansion and qualified investor alignment."}
        keywords={"food franchise India, retail franchise India, salon franchise India, fashion franchise India, franchise expansion India, franchise opportunities India, franchise investment advisory, electronics franchise India, franchise industries India, franchise services India, multi-location franchise India"}
      />

      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.55) 0%, rgba(7,15,35,0.32) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-card">
            <div className="section-label">Industries</div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '760px' }}>
              Industries we help scale<br />
              <span style={{ color: 'var(--orange)' }}>through expansion.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '620px' }}>
              Whether you are exploring how to expand your brand through franchising or looking for investor-ready franchise opportunities in India, XPAND provides structured franchise business advisory, franchise expansion support, investor alignment, and execution-led growth strategy under one framework.
            </p>
          </div>
        </div>
      </div>

      {/* QUOTE BAR */}
      <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <div style={{ width: '32px', height: '1px', background: 'var(--orange)', opacity: 0.6 }} />
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(16px, 1.8vw, 22px)', color: 'rgba(255,255,255,0.8)', margin: 0, textAlign: 'center' }}>
            "Good businesses should not struggle with expansion."
          </p>
          <div style={{ width: '32px', height: '1px', background: 'var(--orange)', opacity: 0.6 }} />
        </div>
      </div>

      {/* FLIP CARDS */}
      <div style={{ background: 'var(--cream-light)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '72px' }}>
            <div className="section-label">Sectors We Work In</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, margin: 0 }}>
                Five sectors. Proven franchise potential.
              </h2>
              <p style={{ color: 'var(--gray)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
                Hover each card to see the market case.
              </p>
            </div>
          </FadeSection>

          <div className="ind-flip-grid">
            {SECTORS.map((sector, i) => (
              <FadeSection key={sector.title} delay={i * 70} className={`ind-flip-card ind-card-${i + 1}`}>
                <div className="ind-flip-inner">
                  {/* FRONT */}
                  <div className="ind-flip-front">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                      <span style={{ fontFamily: "'Fraunces', serif", fontSize: '52px', fontWeight: 700, color: 'var(--orange)', lineHeight: 1 }}>{sector.num}</span>
                      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'rgba(240,121,32,0.6)', textTransform: 'uppercase', paddingTop: '14px' }}>Hover →</span>
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(17px, 1.6vw, 22px)', fontWeight: 700, color: 'var(--navy)', margin: '0 0 8px', lineHeight: 1.25 }}>{sector.title}</h3>
                    <p style={{ color: 'var(--orange)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', lineHeight: 1.6 }}>{sector.sub}</p>
                    <div style={{ height: '1px', background: 'var(--border)', marginBottom: '16px' }} />
                    <p style={{ color: 'var(--gray)', fontSize: '13px', lineHeight: 1.85, flex: 1, margin: 0 }}>{sector.frontDesc}</p>
                  </div>

                  {/* BACK */}
                  <div className="ind-flip-back">
                    <div style={{ marginBottom: '16px' }}>
                      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '10px' }}>Market Context</p>
                      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', lineHeight: 1.85, margin: 0 }}>{sector.backStat}</p>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '16px 0' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: '10px' }}>How XPAND Helps</p>
                      <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '12px', lineHeight: 1.85, margin: 0 }}>{sector.backDesc}</p>
                    </div>
                    <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: '16px' }}>
                      <Link to="/for-brands" style={{ color: 'var(--orange)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textDecoration: 'none' }}>
                        Explore Brand Solutions →
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* EXPANSION READINESS ROADMAP */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          {/* Section heading */}
          <FadeSection style={{ marginBottom: '64px', maxWidth: '720px' }}>
            <div className="section-label" style={{ color: 'rgba(240,121,32,0.85)' }}>Expansion Readiness</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '20px' }}>
              The XPAND <em style={{ color: 'var(--orange)', fontStyle: 'italic' }}>Expansion</em> Readiness Roadmap
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '16px', lineHeight: 1.85, margin: 0 }}>
              Not every business is ready for franchising. We help identify the ones that are — and structure them for scalable, investor-ready growth.
            </p>
          </FadeSection>

          {/* Pre-qualifier block */}
          <FadeSection style={{ marginBottom: '80px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '48px' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.85, marginBottom: '12px' }}>
                Not every business is ready for franchising. We help identify the ones that are.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '15px', lineHeight: 1.85, marginBottom: '20px' }}>
                Before any opportunity reaches investors, XPAND evaluates:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                {['business scalability', 'operational structure', 'expansion potential', 'market positioning', 'investor attractiveness', 'commercial sustainability', 'multi-location viability'].map(tag => (
                  <span key={tag} style={{ fontSize: '11px', fontWeight: 700, padding: '7px 15px', borderRadius: '100px', background: 'rgba(240,121,32,0.14)', border: '1px solid rgba(240,121,32,0.45)', color: 'var(--orange)', letterSpacing: '0.03em' }}>{tag}</span>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>
                The focus is not just on "growth-stage" businesses, but on businesses capable of building structured franchise systems across markets.
              </p>
            </div>
          </FadeSection>

          {/* H3 */}
          <FadeSection style={{ marginBottom: '56px' }}>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(20px, 2.5vw, 30px)', fontWeight: 700, color: '#fff', margin: 0 }}>
              How does XPAND fit in?
            </h3>
          </FadeSection>

          <RoadmapViz />

          {/* Roadmap mobile — vertical list */}
          <div className="rm-mobile" style={{ flexDirection: 'column', gap: '0' }}>
            {ROADMAP.map((item, i) => (
              <div key={item.num} style={{ display: 'flex', gap: '20px', paddingBottom: i < ROADMAP.length - 1 ? '0' : '0' }}>
                {/* Left: dot + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '20px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--orange)', boxShadow: '0 0 6px rgba(240,121,32,0.6)', flexShrink: 0 }} />
                  {i < ROADMAP.length - 1 && <div style={{ width: '1px', flex: 1, minHeight: '24px', background: 'rgba(240,121,32,0.35)', marginTop: '6px' }} />}
                </div>
                {/* Right: card */}
                <div style={{ flex: 1, paddingBottom: '16px' }}>
                  <div className="rm-card" style={{ marginBottom: '0' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--orange)', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>{item.num} — {item.label}</span>
                    <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(240,121,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                      <item.Icon size={14} color="var(--orange)" strokeWidth={1.5} />
                    </div>
                    <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px', lineHeight: 1.3 }}>{item.title}</h4>
                    {item.desc && <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>}
                    {item.lead && <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>{item.lead}</p>}
                    {item.items && (
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        {item.items.map(it => (
                          <li key={it} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', lineHeight: 1.7, paddingLeft: '14px', position: 'relative' }}>
                            <span style={{ position: 'absolute', left: 0, color: 'var(--orange)', fontSize: '9px', top: '3px' }}>→</span>{it}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.paras && item.paras.map((p, pi) => (
                      <p key={pi} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.75, margin: pi < item.paras.length - 1 ? '0 0 10px' : '0' }}>{p}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom tagline + pills */}
          <FadeSection style={{ marginTop: '56px' }}>
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '40px 48px' }}>
              <p style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(17px, 2vw, 24px)', fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.4 }}>
                Businesses built for <span style={{ color: 'var(--orange)' }}>structured, scalable</span> franchise growth.
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {['Franchise Readiness', 'Investor Alignment', 'Market Mapping', 'Commercial Sustainability', 'Multi-location Viability'].map(tag => (
                  <span key={tag} style={{ fontSize: '11px', fontWeight: 700, padding: '7px 16px', borderRadius: '100px', border: '1px solid rgba(240,121,32,0.5)', color: 'var(--orange)', letterSpacing: '0.04em' }}>{tag}</span>
                ))}
              </div>
            </div>
          </FadeSection>

        </div>
      </div>

      {/* Why Businesses Choose XPAND Bharat */}
      <div style={{ background: 'var(--cream-light)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px' }}>
            <div className="section-label">Why Us</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.15, margin: 0 }}>
                Why Businesses Choose XPAND Bharat
              </h2>
              <p style={{ color: 'var(--gray)', fontSize: '16px', fontStyle: 'italic', margin: 0, maxWidth: '360px' }}>
                Because expansion without structure becomes expensive very quickly.
              </p>
            </div>
          </FadeSection>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              { num: '01', title: 'We Do Not Just Generate Franchise Leads. We Help Close Expansion Opportunities.', desc: 'Most franchise consulting firms stop at introductions. XPAND helps businesses move from investor interest to commercially aligned expansion through investor counseling, follow-ups, franchise alignment, and execution support.' },
              { num: '02', title: 'Qualified Investors Matter More Than Large Databases.', desc: 'A business does not need 500 random inquiries. It needs the right investors. XPAND focuses on franchise investor alignment through structured lead generation, investor mapping, CRM-led tracking, and commercially relevant franchise opportunities designed around actual business scalability.' },
              { num: '03', title: 'Good Businesses Often Fail At Expansion Because They Are Not Investor-Ready.', intro: 'Many businesses are operationally successful but commercially unstructured for franchising. XPAND helps brands with:', items: ['franchise business structuring', 'investor-ready proposals', 'franchise rollout strategy', 'expansion planning', 'market positioning', 'franchise growth systems before investor conversations even begin.'] },
              { num: '04', title: 'Franchising Is Not Just Expansion. It Is Controlled Expansion.', desc: 'Opening multiple locations without operational structure creates inconsistency very quickly. XPAND helps businesses scale through structured franchise expansion systems designed around operational scalability, franchise governance, investor alignment, and commercially sustainable growth across India.' },
              { num: '05', title: 'We Understand Investor Psychology, Not Just Franchise Consulting.', intro: 'A 40+ business owner investing ₹50 lakh to ₹2 crore is not casually "exploring opportunities." They are comparing:', items: ['franchise investments', 'real estate', 'mutual funds', 'independent businesses', 'expansion risk', 'long-term scalability.'], closing: "XPAND's investor counseling and telesales-driven approach helps businesses communicate stronger commercial clarity to serious investors looking for structured franchise investment opportunities in India." },
            ].map((item, i, arr) => (
              <FadeSection key={item.num} delay={i * 80} className="ind-why-row" style={{ borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="ind-why-num" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--orange)', lineHeight: 1 }}>{item.num}</div>
                <div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(16px, 1.5vw, 20px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '12px', lineHeight: 1.3 }}>{item.title}</h4>
                  {item.desc && <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{item.desc}</p>}
                  {item.intro && <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: 1.8, marginBottom: '10px' }}>{item.intro}</p>}
                  {item.items && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {item.items.map(it => (
                        <li key={it} style={{ color: 'var(--gray)', fontSize: '14px', lineHeight: 1.7, paddingLeft: '16px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--orange)', fontSize: '10px', top: '3px' }}>→</span>{it}
                        </li>
                      ))}
                    </ul>
                  )}
                  {item.closing && <p style={{ color: 'var(--gray)', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>{item.closing}</p>}
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
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: '24px', lineHeight: 1.15 }}>
              Ready to explore your sector?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, marginBottom: '48px' }}>
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
        /* ── Why-us numbered rows ── */
        .ind-why-row {
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 32px;
          padding: 36px 0;
          align-items: start;
        }
        .ind-why-num { font-size: 52px; opacity: 0.5; }
        @media (max-width: 700px) {
          .ind-why-row { grid-template-columns: 1fr; gap: 8px; padding: 28px 0; }
          .ind-why-num { font-size: 38px; opacity: 0.9; }
        }

        /* ── Flip Card Grid ── */
        .ind-flip-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }
        .ind-card-1,
        .ind-card-2,
        .ind-card-3 { grid-column: span 2; }
        .ind-card-4,
        .ind-card-5 { grid-column: span 3; }

        /* ── Flip Card ── */
        .ind-flip-card {
          perspective: 1200px;
          height: 400px;
          cursor: pointer;
        }
        .ind-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ind-flip-card:hover .ind-flip-inner {
          transform: rotateY(180deg);
        }
        .ind-flip-front,
        .ind-flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 16px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .ind-flip-front {
          background: var(--cream-light);
          transition: background 0.25s;
        }
        .ind-flip-front:hover { background: var(--white); }
        .ind-flip-back {
          background: var(--navy);
          border-color: rgba(255,255,255,0.07);
          transform: rotateY(180deg);
        }

        /* ── SVG Road flow animation (always running) ── */
        @keyframes rmFlow { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -42; } }
        .rm-flow { animation: rmFlow 1.2s linear infinite; }

        /* ── SVG Roadmap transitions (class-driven, no inline conflict) ── */
        .rm-road-body { stroke-dasharray: 2800; stroke-dashoffset: 2800; transition: stroke-dashoffset 2.5s ease; }
        .rm-in-view .rm-road-body { stroke-dashoffset: 0; }

        .rm-stem { stroke-dasharray: 160; stroke-dashoffset: 160; transition: stroke-dashoffset 0.4s ease; }
        .rm-in-view .rm-stem { stroke-dashoffset: 0; }

        .rm-dot { opacity: 0; transform: scale(0); transition: opacity 0.35s ease, transform 0.35s ease; }
        .rm-in-view .rm-dot { opacity: 1; transform: scale(1); }

        .rm-svg-card {
          position: absolute;
          width: 200px;
          background: rgba(10, 20, 50, 0.97);
          border: 1px solid rgba(240,121,32,0.25);
          border-radius: 14px;
          padding: 16px 15px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease, border-color 0.3s, box-shadow 0.3s;
        }
        .rm-in-view .rm-svg-card { opacity: 1; transform: translateY(0); }
        .rm-svg-card:hover {
          border-color: rgba(240,121,32,0.6);
          box-shadow: 0 8px 28px rgba(240,121,32,0.13);
        }

        /* ── Tablet ≤ 1100px ── */
        @media (max-width: 1100px) {
          .ind-flip-grid { grid-template-columns: 1fr 1fr; }
          .ind-card-1, .ind-card-2, .ind-card-3,
          .ind-card-4, .ind-card-5 { grid-column: span 1; }
        }

        /* ── Mobile ≤ 768px ── */
        @media (max-width: 768px) {
          .ind-flip-grid { grid-template-columns: 1fr; }
          .ind-flip-card { height: auto; perspective: none; }
          .ind-flip-inner { transform-style: flat; position: static; height: auto; }
          .ind-flip-card:hover .ind-flip-inner { transform: none; }
          .ind-flip-front {
            position: static;
            border-radius: 16px 16px 0 0;
            border-bottom: none;
          }
          .ind-flip-back {
            position: static;
            transform: none;
            border-radius: 0 0 16px 16px;
            backface-visibility: visible;
            -webkit-backface-visibility: visible;
          }
        }

        /* ── Roadmap mobile: stack as vertical list ≤ 900px ── */
        @media (max-width: 900px) {
          .rm-responsive { display: none !important; }
          .rm-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .rm-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
}
