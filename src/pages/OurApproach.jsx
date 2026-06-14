import { useRef, useEffect } from 'react';
import Seo from '../components/Seo';
import { useContent } from '../hooks/useContent';
import LeadForm from '../components/LeadForm';

const STEPS = [
  {
    num: '01',
    title: 'Understand',
    desc: 'We understand the brand, category, operational model, expansion ambitions, funding needs, and target market.',
  },
  {
    num: '02',
    title: 'Structure',
    desc: 'Once onboarded, XPAND helps your brand become a successful franchise business by helping you with structured proposals and expansion documentation.',
    quote: 'Structure is everything. It cuts through ambiguity.',
  },
  {
    num: '03',
    title: 'Align',
    desc: 'Once we have your needs mapped, we align you with qualified investors from our database that match your investor expectations and brand requirements because the goal is to create trusted long-term partnerships.',
  },
  {
    num: '04',
    title: 'Execute',
    desc: 'Our job does not end at matching your franchise goals with investors. Rather, we support you throughout the deal by taking care of legal compliance, deal alignment, follow-ups, and closure assistance.',
  },
  {
    num: '05',
    title: 'Scale',
    desc: 'We map out how many outlets you can open now and in the future with investor assistance, supporting long-term growth through helping your franchise business scale sustainably.',
  },
];

const PRINCIPLES = [
  {
    num: '01',
    label: 'Diagnose',
    intro: 'Before businesses scale, they need clarity.',
    lead: 'We understand:',
    items: ['the business model', 'operational strengths', 'expansion ambitions', 'market positioning', 'funding requirements', 'franchise scalability potential'],
    closing: 'because expansion decisions work better when the fundamentals are understood properly.',
  },
  {
    num: '02',
    label: 'Structure',
    intro: 'Good businesses often fail at expansion because they are not structured for franchising.',
    lead: 'XPAND helps build:',
    items: ['investor-ready proposals', 'franchise growth frameworks', 'rollout strategies', 'expansion positioning', 'commercial narratives', 'scalable business systems'],
    closing: 'designed for long-term franchise expansion across India.',
  },
  {
    num: '03',
    label: 'Align',
    paras: [
      'The right investors matter more than a larger database.',
      'Through franchise lead generation systems, CRM-led investor management, investor counseling, and commercially relevant alignment, XPAND helps businesses connect with qualified investors actively exploring franchise investment opportunities.',
    ],
  },
  {
    num: '04',
    label: 'Execute',
    paras: [
      'Franchise growth rarely scales through introductions alone.',
      'From investor conversations and follow-ups to commercial coordination, onboarding support, and expansion movement, XPAND remains involved throughout the execution journey.',
      'Because operational discipline matters once the real work begins.',
    ],
  },
  {
    num: '05',
    label: 'Scale',
    intro: 'Opening more outlets is easy.',
    lead: 'Building a commercially scalable franchise business across multiple cities requires:',
    items: ['operational consistency', 'expansion structure', 'investor clarity', 'disciplined rollout systems', 'long-term market scalability'],
    closing: 'which is exactly what XPAND Bharat focuses on building.',
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

export default function OurApproach() {
  const { hero, section } = useContent('our-approach');
  const steps = section('steps', STEPS).map(item => ({
    num: item.badge || item.num,
    title: item.title,
    desc: item.description || item.desc,
    quote: item.quote,
  }));
  const principles = section('principles', PRINCIPLES).map(item => ({
    num: item.num,
    label: item.title || item.label,
    intro: item.intro,
    lead: item.lead,
    items: item.items,
    closing: item.closing,
    paras: item.paras,
    quote: item.quote,
  }));
  const heroImg = hero?.backgroundImage || '/img/photo-1553877522-43269d4ea984.jpg';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Seo
        path="/our-approach"
        title={"How XPAND Bharat Works - Franchise Expansion Process India"}
        description={"See how XPAND Bharat takes brands from business understanding to structured investor matchmaking and deal closure. India's most commercially structured franchise expansion process."}
        keywords={"franchise expansion framework India, franchise consulting approach, franchise expansion strategy India, franchise business structuring, investor-ready franchise India"}
      />
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.55) 0%, rgba(7,15,35,0.32) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-card">
            <div className="section-label">Our Approach</div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '760px' }}>
              Good businesses deserve<br />
              <span style={{ color: 'var(--orange)' }}>more than random expansion.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', lineHeight: 1.7, maxWidth: '600px' }}>
              XPAND helps brands become investor-ready, scale through structured franchising, and align with commercially serious investors looking for profitable franchise opportunities in India.
            </p>
          </div>
        </div>
      </div>

      {/* STEPS — alternating layout */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '80px', maxWidth: '600px' }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.2 }}>
              The XPAND Franchise Expansion Framework
            </h2>
          </FadeSection>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, i) => (
              <FadeSection key={step.num} delay={i * 100}>
                <div className="oa-step-row" style={{
                  borderBottom: i < steps.length - 1 ? '1px solid var(--border)' : 'none',
                }}>
                  <div>
                    <div className="oa-step-num" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--orange)', lineHeight: 1 }}>{step.num}</div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>{step.title}</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7, maxWidth: '600px' }}>{step.desc}</p>
                    {step.quote && (
                      <div style={{ marginTop: '24px', borderLeft: '3px solid var(--orange)', paddingLeft: '20px', maxWidth: '560px' }}>
                        <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--orange)', margin: 0, lineHeight: 1.65, letterSpacing: '0.01em' }}>
                          "{step.quote}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>

      {/* PRINCIPLES */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '64px', textAlign: 'center', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>What Drives Our Approach</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
              Structured franchise growth rarely happens accidentally.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.8, margin: 0 }}>
              XPAND Bharat works through a commercially disciplined expansion process designed to help businesses scale through franchising with stronger investor alignment, operational clarity, and execution-backed growth systems.
            </p>
          </FadeSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2px' }}>
            {principles.map((p, i) => {
              const isOrange = i === 3;
              const textMuted = isOrange ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.5)';
              return (
                <FadeSection key={p.label} delay={i * 80} style={{
                  padding: '48px 40px',
                  background: isOrange ? 'var(--orange)' : 'rgba(255,255,255,0.03)',
                  borderRight: i < PRINCIPLES.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                }}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: '40px', fontWeight: 700, color: isOrange ? 'rgba(255,255,255,0.9)' : 'var(--orange)', lineHeight: 1, marginBottom: '16px' }}>{p.num}</div>
                  <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>{p.label}</h4>
                  {p.intro && <p style={{ color: textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: '10px' }}>{p.intro}</p>}
                  {p.lead && <p style={{ color: isOrange ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '8px' }}>{p.lead}</p>}
                  {p.items && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      {p.items.map(item => (
                        <li key={item} style={{ color: textMuted, fontSize: '12px', lineHeight: 1.6, paddingLeft: '14px', position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: isOrange ? 'rgba(255,255,255,0.7)' : 'var(--orange)', fontSize: '10px', top: '3px' }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.closing && <p style={{ color: textMuted, fontSize: '12px', lineHeight: 1.6, fontStyle: 'italic' }}>{p.closing}</p>}
                  {p.paras && p.paras.map((para, pi) => (
                    <p key={pi} style={{ color: textMuted, fontSize: '13px', lineHeight: 1.7, marginBottom: pi < p.paras.length - 1 ? '10px' : 0 }}>{para}</p>
                  ))}
                  {p.quote && (
                    <div style={{ marginTop: '14px', borderLeft: '2px solid rgba(255,255,255,0.4)', paddingLeft: '12px' }}>
                      <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: '12px', color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.6 }}>"{p.quote}"</p>
                    </div>
                  )}
                </FadeSection>
              );
            })}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '56px', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's talk</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Let's move the conversation forward.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7 }}>
              Tell us about your business goals, expansion plans, or investment interests. Our team will connect with you to discuss the next stage of growth.
            </p>
          </FadeSection>
          <div className="xb-form-wrap" style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
            <LeadForm source="our-approach" submitLabel="Get My Report" />
          </div>
        </div>
      </div>

      <style>{`
        .oa-step-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 48px;
          padding: 56px 0;
          align-items: start;
        }
        .oa-step-num { font-size: 64px; opacity: 0.35; }
        @media (max-width: 700px) {
          .oa-step-row { grid-template-columns: 1fr; gap: 10px; padding: 36px 0; }
          .oa-step-num { font-size: 40px; opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
