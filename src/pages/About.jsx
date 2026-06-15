import { useRef, useEffect } from 'react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import { Home, Search, FileText, Users, Gift } from 'lucide-react';

const PROCESS_STEPS = [
  {
    num: 1, eyebrow: 'YOU COME TO US', title: 'You Come to XPAND Bharat', Icon: Home,
    lead: 'We understand your:',
    items: ['business model', 'expansion vision', 'funding requirements', 'target cities', 'scalability potential'],
  },
  {
    num: 2, eyebrow: 'WE MAP', title: 'We Map Your Expansion Needs', Icon: Search,
    lead: 'Our team helps evaluate:',
    items: ['market opportunities', 'city-wise expansion potential', 'investor fit', 'commercial viability', 'rollout strategy'],
    closing: '…so the business is positioned for structured franchise growth.',
  },
  {
    num: 3, eyebrow: 'WE PREPARE', title: 'We Help You Become Investor-Ready', Icon: FileText,
    lead: 'We create:',
    items: ['investor-ready business proposals', 'franchise growth frameworks', 'expansion positioning', 'commercial narratives', 'structured business presentations'],
    closing: '…designed to attract serious franchise investors.',
  },
  {
    num: 4, eyebrow: 'WE CONNECT', title: 'We Connect You With Qualified Investors', Icon: Users,
    para: 'Using our lead-generation systems, investor network, and telesales-driven investor counseling process, we help align your business with commercially relevant investors actively looking for profitable franchise opportunities.',
  },
  {
    num: 5, eyebrow: 'WE CLOSE', title: 'We Support the Deal Till Closure', Icon: Gift,
    para: 'From investor alignment and coordination to execution support and commercial discussions, XPAND remains involved throughout the expansion journey to help move opportunities toward closure.',
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

export default function About() {
  const { hero } = useContent('about');
  const heroImg = hero?.backgroundImage || '/about%20us.png';

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Seo
        path="/about"
        title={"About XPAND Bharat - India's Leading Franchise Advisory Company"}
        description={"Headquartered in Gurugram, XPAND Bharat is India's leading franchise consulting and investment advisory platform. 25+ years of collective experience. Structured growth. Serious results."}
        keywords={"franchise consulting company India, franchise expansion India, franchise investment advisory India, business expansion advisory Gurugram, franchise consulting firms India, franchise advisory company India, best franchise advisory India, franchise business consultants India, franchise consultants in India, franchise consultants in Punjab, franchise advisory India, franchise consulting company"}
      />
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy-dark)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', minHeight: '100vh', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 140px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(7,15,35,0.9) 0%, rgba(7,15,35,0.72) 30%, rgba(7,15,35,0.38) 56%, rgba(7,15,35,0.1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,15,35,0.6) 0%, transparent 45%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle,rgba(240,121,32,0.09) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">About XPAND Bharat</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '800px' }}>
            About<br />
            <span style={{ color: 'var(--orange)' }}>XPAND Bharat</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: 1.7, maxWidth: '560px' }}>
            India's leading franchise expansion and investment consulting company, backed by 25+ years of collective industry experience in franchise growth, investor alignment, and business expansion strategy.
          </p>
        </div>
      </div>

      {/* BRAND STATEMENT — About XPAND Bharat */}
      <div className="ab-statement" style={{ padding: '110px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '1180px', margin: '0 auto' }}>

          {/* Header */}
          <FadeSection style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Who We Are</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.1, margin: 0 }}>
              About XPAND Bharat
            </h2>
          </FadeSection>

          {/* Hero pull-quote */}
          <FadeSection style={{ maxWidth: '900px', margin: '0 auto 80px', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: '60px', color: 'rgba(240,121,32,0.28)', lineHeight: 0.6, marginBottom: '8px' }}>“</div>
            <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(23px, 2.9vw, 38px)', color: 'var(--navy)', lineHeight: 1.32, margin: 0, letterSpacing: '-0.01em' }}>
              Anyone can help you open another outlet. We help you build a business that deserves <span style={{ color: 'var(--orange)' }}>fifty more.</span>
            </p>
            <div style={{ width: '44px', height: '3px', background: 'var(--orange)', borderRadius: '2px', margin: '32px auto 0' }} />
          </FadeSection>

          {/* Image + body */}
          <div className="ab-about-grid">
            <FadeSection>
              <div className="ab-about-img">
                <img src="/image.png" alt="XPAND Bharat office" />
                <div className="ab-img-badge">
                  <span className="ab-img-badge-num">25+</span>
                  <span className="ab-img-badge-label">Years of collective<br />industry experience</span>
                </div>
              </div>
            </FadeSection>
            <FadeSection delay={150}>
              <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
                Headquartered in Gurugram, XPAND Bharat — a venture by XPANDVERSE PVT. LTD. — is a franchise consulting and business expansion platform built to help brands scale through structured franchising, qualified investor networks, and commercially disciplined growth strategies.
              </p>
              <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.85, marginBottom: '20px' }}>
                With 25+ years of collective industry experience, we work alongside businesses across food, retail, electronics, fashion, and consumer sectors to create expansion models that are scalable, investable, and execution-ready.
              </p>
              <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.85, marginBottom: '24px' }}>
                From franchise advisory and investor alignment to territory planning and rollout support, every solution is designed around one objective: helping businesses expand with clarity, confidence, and commercial viability.
              </p>
              <div style={{ borderLeft: '3px solid var(--orange)', paddingLeft: '20px' }}>
                <p style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: '16px', color: 'var(--navy)', lineHeight: 1.5, margin: 0 }}>
                  Because real expansion isn't about growing bigger. It's about growing stronger.
                </p>
              </div>
            </FadeSection>
          </div>

          {/* Navy quote band */}
          <FadeSection style={{ marginTop: '80px' }}>
            <div className="ab-quote-band" style={{ background: 'var(--navy)', borderRadius: '22px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: '360px', height: '360px', background: 'radial-gradient(circle,rgba(240,121,32,0.13) 0%,transparent 70%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: '10px', left: '32px', fontFamily: "'Fraunces', serif", fontSize: '140px', color: 'rgba(255,255,255,0.04)', lineHeight: 1, pointerEvents: 'none' }}>“</div>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 600, fontSize: 'clamp(21px, 2.3vw, 32px)', color: '#fff', lineHeight: 1.4, margin: '0 auto 18px', maxWidth: '760px' }}>
                  Every successful franchise started with a business that was built to scale.
                </p>
                <p style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
                  Where ambitious brands become scalable businesses
                </p>
              </div>
            </div>
          </FadeSection>

          {/* Closing taglines */}
          <FadeSection style={{ marginTop: '60px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(19px, 2.1vw, 28px)', fontWeight: 600, color: 'var(--navy)', margin: '0 0 14px' }}>
              <span style={{ color: 'var(--orange)' }}>“</span>Xpand your business to new heights<span style={{ color: 'var(--orange)' }}>”</span>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', margin: '0 auto 14px', maxWidth: '320px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span style={{ color: 'var(--orange)', fontSize: '10px' }}>◆</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>
            <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 'clamp(19px, 2.1vw, 28px)', fontWeight: 600, color: 'var(--orange)', margin: 0 }}>
              <span>“</span>We are the best franchise advisory partners in India<span>”</span>
            </p>
            <div style={{ marginTop: '36px' }}>
              <Link to="/our-approach" className="btn-outline-dark">Discover Our Approach</Link>
            </div>
          </FadeSection>

        </div>
      </div>


      <style>{`
        /* ── About image + body ── */
        .ab-about-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 64px;
          align-items: center;
        }
        .ab-about-img {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 60px rgba(13,27,62,0.16);
        }
        .ab-about-img img {
          width: 100%; height: 100%; min-height: 420px;
          object-fit: cover; display: block;
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        .ab-about-img:hover img { transform: scale(1.04); }
        /* floating badge */
        .ab-img-badge {
          position: absolute; left: 20px; bottom: 20px;
          display: flex; align-items: center; gap: 12px;
          background: rgba(13,27,62,0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 14px 18px;
        }
        .ab-img-badge-num {
          font-family: 'Fraunces', serif;
          font-size: 30px; font-weight: 700; color: var(--orange); line-height: 1;
        }
        .ab-img-badge-label {
          font-size: 11px; color: rgba(255,255,255,0.7); line-height: 1.4; font-weight: 500;
        }

        /* quote band */
        .ab-quote-band { padding: 60px 48px; }

        @media (max-width: 860px) {
          .ab-statement { padding: 64px 22px !important; }
          .ab-about-grid { grid-template-columns: 1fr; gap: 28px; }
          .ab-about-img img { min-height: 280px; }
          .ab-quote-band { padding: 44px 26px; }
          .ab-img-badge { left: 14px; bottom: 14px; padding: 12px 15px; }
          .ab-img-badge-num { font-size: 26px; }
        }

        /* ── Focus areas grid ── */
        .fa-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          padding: 0 10px 10px;
        }

        /* ── Tablet: 3 + 2 scroll ── */
        @media (max-width: 900px) {
          .fa-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            gap: 12px;
            padding: 0 20px 12px;
          }
          .fa-grid::-webkit-scrollbar { display: none; }
          .fa-card {
            width: 72vw;
            min-width: 72vw;
            height: 460px;
            scroll-snap-align: start;
          }
          /* Show description by default on tablet */
          .fa-desc {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .fa-grad {
            background: linear-gradient(
              180deg,
              rgba(4,8,15,0.6) 0%,
              rgba(4,8,15,0.1) 30%,
              rgba(4,8,15,0.96) 100%
            ) !important;
          }
        }

        /* ── Mobile: tighter cards ── */
        @media (max-width: 520px) {
          .fa-grid { padding: 0 16px 12px; gap: 10px; }
          .fa-card { width: 82vw; min-width: 82vw; height: 400px; }
        }

        /* ── How We Work ── */
        .hw-section { padding: 100px 40px 120px; }
        .hw-flow {
          display: grid;
          grid-template-columns: 1fr 32px 1fr 32px 1fr 32px 1fr 32px 1fr;
          align-items: stretch;
        }
        .hw-flow > div { height: 100%; }
        .hw-arrow-sep {
          display: flex; justify-content: center; align-items: flex-start;
          padding-top: 26px; color: rgba(240,121,32,0.4); font-size: 20px; flex-shrink: 0;
        }
        .hw-step { display: flex; flex-direction: column; align-items: center; height: 100%; }
        .hw-step-icon {
          width: 72px; height: 72px; border-radius: 50%;
          background: rgba(240,121,32,0.08); border: 1px solid rgba(240,121,32,0.3);
          box-shadow: 0 0 28px rgba(240,121,32,0.1);
          display: flex; align-items: center; justify-content: center;
          position: relative; flex-shrink: 0;
        }
        .hw-step-badge {
          position: absolute; top: -5px; right: -5px;
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--orange); border: 2px solid var(--navy);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: #fff; line-height: 1;
        }
        .hw-step-line { width: 1px; height: 28px; background: rgba(240,121,32,0.22); flex-shrink: 0; }
        .hw-step-card {
          width: 100%; flex: 1;
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 22px 16px;
        }
        .hw-card-eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 0.18em; color: var(--orange); text-transform: uppercase; margin: 0 0 10px; }
        .hw-card-title { font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; color: #fff; margin: 0 0 14px; line-height: 1.4; }
        .hw-card-lead { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.7); margin: 0 0 8px; }
        .hw-card-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 7px; }
        .hw-card-list li { display: flex; align-items: flex-start; gap: 7px; color: rgba(255,255,255,0.48); font-size: 11.5px; line-height: 1.5; }
        .hw-card-list li span { color: rgba(240,121,32,0.7); flex-shrink: 0; }
        .hw-card-closing { font-size: 11px; font-style: italic; color: rgba(255,255,255,0.4); line-height: 1.55; margin: 10px 0 0; }
        .hw-card-para { font-size: 11.5px; color: rgba(255,255,255,0.5); line-height: 1.6; margin: 0; }

        @media (max-width: 900px) {
          .hw-section { padding: 60px 20px 80px; }
          .hw-flow { display: flex; flex-direction: column; align-items: center; }
          .hw-flow > div { width: 100%; }
          .hw-step { flex-direction: column; align-items: center; width: 100%; }
          .hw-step-line { display: block; }
          .hw-step-card { width: 100%; padding: 32px 28px; }
          .hw-card-eyebrow { text-align: center; margin-bottom: 12px; }
          .hw-card-title { text-align: center; font-size: 17px; margin-bottom: 20px; }
          .hw-card-lead { text-align: center; font-size: 13px; }
          .hw-card-list { gap: 12px; width: fit-content; margin: 0 auto; }
          .hw-card-list li { font-size: 13.5px; }
          .hw-card-closing { text-align: center; font-size: 12.5px; }
          .hw-card-para { text-align: center; font-size: 13.5px; }
          .hw-arrow-sep {
            width: 100%; font-size: 0;
            display: flex; justify-content: center; align-items: center;
            padding: 8px 0;
          }
          .hw-arrow-sep::after {
            content: '↓'; font-size: 20px; color: rgba(240,121,32,0.5);
          }
        }
        @media (max-width: 480px) {
          .hw-section { padding: 48px 16px 64px; }
          .hw-step-icon { width: 54px; height: 54px; }
          .hw-step-badge { width: 18px; height: 18px; font-size: 9px; top: -3px; right: -3px; }
          .hw-step-card { padding: 28px 20px; }
          .hw-card-title { font-size: 15px; }
          .hw-card-list li { font-size: 12.5px; }
        }
      `}</style>

      {/* HOW WE WORK */}
      <div className="hw-section" style={{ background: 'var(--navy)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <FadeSection>
            <div style={{ textAlign: 'center', marginBottom: '80px' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--orange)', textTransform: 'uppercase', margin: '0 0 18px' }}>Our Process</p>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.05 }}>
                How We <span style={{ color: 'var(--orange)' }}>Work</span>
              </h2>
            </div>
          </FadeSection>

          <div className="hw-flow">
            {PROCESS_STEPS.flatMap((step, i) => {
              const Icon = step.Icon;
              const stepEl = (
                <FadeSection key={`s${i}`} delay={i * 120}>
                  <div className="hw-step">
                    <div className="hw-step-icon">
                      <Icon size={22} color="rgba(240,121,32,0.85)" />
                      <div className="hw-step-badge">{step.num}</div>
                    </div>
                    <div className="hw-step-line" />
                    <div className="hw-step-card">
                      <p className="hw-card-eyebrow">{step.eyebrow}</p>
                      <h3 className="hw-card-title">{step.title}</h3>
                      {step.lead && <p className="hw-card-lead">{step.lead}</p>}
                      {step.items && (
                        <ul className="hw-card-list">
                          {step.items.map(item => (
                            <li key={item}><span>→</span>{item}</li>
                          ))}
                        </ul>
                      )}
                      {step.closing && <p className="hw-card-closing">{step.closing}</p>}
                      {step.para && <p className="hw-card-para">{step.para}</p>}
                    </div>
                  </div>
                </FadeSection>
              );
              if (i < PROCESS_STEPS.length - 1) {
                return [stepEl, <div key={`a${i}`} className="hw-arrow-sep">→</div>];
              }
              return [stepEl];
            })}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <FadeSection>
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's build together</div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '24px', lineHeight: 1.15 }}>
              Let's build something that actually lasts.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7, marginBottom: '48px' }}>
              Whether you are scaling a brand, exploring opportunities, or building strategic partnerships, XPANDBHARAT is designed to support serious business growth.
            </p>
            <Link to="/contact" className="btn-primary" style={{ fontSize: '14px' }}>Let's Talk Business</Link>
          </FadeSection>
        </div>
      </div>
    </div>
  );
}
