import { useRef, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';

const OFFERINGS = [
  {
    tag: 'Curated Access',
    title: 'Business opportunities built for serious investors.',
    desc: 'Handpicked, commercially verified opportunities across scalable sectors and expansion-ready business models.',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Market Clarity',
    title: 'Understand the model before you commit.',
    desc: 'We give you a clear picture of unit economics, market direction, and expansion potential — before any decision is made.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Strategic Match',
    title: 'The right opportunity matched to the right investor.',
    desc: 'We align business opportunities with investors who share the same commercial direction and long-term growth mindset.',
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Proven Models',
    title: 'Expansion-ready businesses with real fundamentals.',
    desc: 'Every business we present is screened for scalability, operational structure, and genuine growth readiness.',
    img: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Growth Sectors',
    title: 'Sectors chosen for their expansion trajectory.',
    desc: 'F&B, retail, services, EdTech, health — opportunities in India\'s fastest-growing industries with proven demand.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=80',
  },
  {
    tag: 'Full Support',
    title: 'We stay involved until the investment moves forward.',
    desc: 'From initial conversation to final commitment, our team ensures every investor-brand engagement is handled with structure and accountability.',
    img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=700&q=80',
  },
];

const WHY = [
  { num: '01', title: 'We Only Bring You Businesses Built To Last', sub: 'Not every business deserves your capital. After decades of building wealth, you know the difference between a business with energy and a business with systems. XPAND works exclusively with franchise businesses that demonstrate operational structure, market-proven demand, scalability across locations, and commercially sustainable growth — before they ever reach you. No noise. No speculation. Just structured franchise businesses ready for serious expansion.' },
  { num: '02', title: 'Your Goals Come First. Opportunities Come Second.', sub: 'A 500-option listing is not alignment. It\'s homework. XPAND doesn\'t hand you a catalogue and walk away. We understand your investment goals, sector preference, capital appetite, and growth horizon — then align you with franchise opportunities built around your commercial intent. Right sector. Right model. Right market. Right fit. Because at this stage of your journey, your time is the most valuable asset in the room.' },
  { num: '03', title: 'Why Franchise Over Stocks, Real Estate, or Mutual Funds?', sub: 'The question every sharp investor is already asking. Franchise businesses offer something most asset classes can\'t — an operational system you don\'t have to build from scratch, a brand customers already trust, and a scalable growth model designed for multi-location expansion. XPAND helps you navigate India\'s franchise investment landscape with clarity — comparing models, evaluating structures, and identifying opportunities with real commercial depth. This isn\'t passive investing. This is structured business ownership.' },
  { num: '04', title: 'We Stay In The Room Until The Deal Is Done', sub: 'Not a platform. A partner. Most portals stop at the introduction. XPAND stays involved through investor counselling, business alignment, commercial discussions, follow-ups, and execution support — every step of the franchise expansion journey. We don\'t disappear after the first meeting. Because the real work begins after hello.' },
  { num: '05', title: 'Built For Investors Who Think In Decades, Not Quarters', sub: 'Food. Retail. Lifestyle. Electronics. Emerging Categories. Whether you\'re looking at food franchise expansion in Tier-1 cities, retail franchise opportunities across India, or emerging consumer category businesses built for the next decade — XPAND focuses on one thing: helping serious investors participate in commercially scalable franchise businesses backed by structure, planning, and execution-led growth.' },
];

const STATS = [
  { stat: 'India', desc: 'Franchise economy being built right now. Are you positioned inside it?' },
  { stat: '#1', desc: 'Franchise Advisory Partner in India' },
  { stat: '500+', desc: 'Expansion-ready franchise businesses evaluated' },
  { stat: 'PanIndia', desc: 'Tier-1, Tier-2 & emerging market coverage' },
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

function InvestorForm() {
  const [form, setForm] = useState({ name: '', company: '', mobile: '', email: '', range: '', sector: '', geography: '', intent: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSubmitted(true); };

  if (submitted) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <div style={{ fontSize: '48px', marginBottom: '24px' }}>✓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '16px' }}>Conversation started.</h3>
      <p style={{ color: 'var(--gray)', fontSize: '16px' }}>Our team will connect with you to explore the right opportunity within 48 hours.</p>
    </div>
  );

  const fields = [
    { name: 'name', label: 'Full Name', placeholder: 'Your full name' },
    { name: 'company', label: 'Company Name', placeholder: 'Your company or fund name' },
    { name: 'mobile', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX' },
    { name: 'email', label: 'Email Address', placeholder: 'your@email.com' },
    { name: 'range', label: 'Preferred Investment Range', placeholder: 'e.g. ₹50L – ₹2Cr' },
    { name: 'sector', label: 'Sector Interest', placeholder: 'e.g. F&B, Retail, Services…' },
    { name: 'geography', label: 'Preferred Geography', placeholder: 'Target cities or states' },
    { name: 'intent', label: 'Investment Intent', placeholder: 'e.g. franchise, equity, partnership…' },
  ];

  return (
    <form onSubmit={submit} className="xb-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      {fields.map(f => (
        <div key={f.name} className="form-group">
          <label className="form-label">{f.label}</label>
          <input name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder} className="form-input" required={f.name === 'name' || f.name === 'email'} />
        </div>
      ))}
      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
        <label className="form-label">Message</label>
        <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your investment goals and what you are looking for…" className="form-input" />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Explore Opportunities</button>
      </div>
    </form>
  );
}

export default function ForInvestors() {
  const { hero, section } = useContent('for-investors');
  const offerings = section('offerings', OFFERINGS).map(item => ({
    tag: item.tag,
    title: item.title,
    desc: item.description || item.desc,
    img: item.imageUrl || item.img,
  }));
  const whyItems = section('why-us', WHY).map(item => ({
    num: item.badge || item.num,
    title: item.title,
    sub: item.subtitle || item.sub,
  }));
  const heroImg = hero?.backgroundImage || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1600&q=80';
  const sliderRef = useRef(null);
  const scrollSlider = (dir) => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'var(--cream-light)' }}>
      <Helmet>
        <title>For Investors — Franchise Investment Opportunities India | XPAND Bharat</title>
        <meta name="description" content="XPAND Bharat helps serious investors find structured franchise investment opportunities in India. Franchise advisory, investor alignment, and execution support across F&B, retail, lifestyle, and emerging sectors." />
        <meta name="keywords" content="franchise investment India, franchise investment opportunities India, best franchise advisory India, investor alignment franchise, food franchise India, retail franchise India, connect with franchise investors" />
      </Helmet>
      {/* HERO */}
      <div className="page-hero-section" style={{ background: 'var(--navy)', backgroundImage: `url("${heroImg}")`, backgroundSize: 'cover', backgroundPosition: 'center top', minHeight: '500px', display: 'flex', alignItems: 'flex-end', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(7,15,35,0.86) 0%, rgba(13,27,62,0.72) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(240,121,32,0.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Investor Intelligence</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '24px', maxWidth: '720px' }}>
            Why Investors Work With<br />
            <span style={{ color: 'var(--orange)' }}>XPAND Bharat</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '18px', lineHeight: 1.7, maxWidth: '560px', marginBottom: '16px', fontStyle: 'italic' }}>
            'Because serious money deserves serious structure.'
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '16px', lineHeight: 1.7, maxWidth: '560px', marginBottom: '40px' }}>
            India's franchise sector is growing fast. Most platforms throw opportunities at investors and hope something sticks. XPAND Bharat does the opposite — we curate, structure, and align franchise businesses with investors who are commercially serious about long-term growth across India.
          </p>
          <Link to="/growth-opportunities" className="btn-primary">Explore Opportunities</Link>
        </div>
      </div>

      {/* STAT CARDS */}
      <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '0 40px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
          {STATS.map((s, i) => (
            <FadeSection key={s.stat} delay={i * 80} style={{ padding: '48px 40px', borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 700, color: 'var(--orange)', lineHeight: 1, marginBottom: '12px' }}>{s.stat}</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </FadeSection>
          ))}
        </div>
      </div>

      {/* BUILT FOR INVESTORS — extended intro */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '80px', alignItems: 'center' }}>
          <FadeSection>
            <div className="section-label">Built For Serious Investors</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '20px' }}>
              Built For Investors Who Think Beyond Traditional Investments
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '0' }}>
              Franchising is no longer just expansion. It is a structured growth strategy.
            </p>
          </FadeSection>
          <FadeSection delay={150}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.9, marginBottom: '0' }}>
              XPAND Bharat helps investors participate in commercially scalable franchise businesses through investor-ready opportunities, franchise advisory, expansion planning, and execution-led business systems. Headquartered in Gurugram and backed by 25+ years of collective experience, we focus on franchise opportunities designed for long-term commercial scalability across India.
            </p>
          </FadeSection>
        </div>
      </div>

      {/* OFFERINGS — Premium card slider */}
      <div style={{ background: 'var(--navy)', padding: '100px 0' }}>
        {/* Section header */}
        <FadeSection style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', marginBottom: '56px' }}>
          <div className="section-label">What We Offer</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.15, margin: 0 }}>
              Six ways we support investors.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-end' }}>
              {/* Arrow buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {[{ dir: -1, label: '←' }, { dir: 1, label: '→' }].map(({ dir, label }) => (
                  <button
                    key={label}
                    onClick={() => scrollSlider(dir)}
                    aria-label={dir === -1 ? 'Previous' : 'Next'}
                    style={{
                      width: '44px', height: '44px', borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.15)', background: 'transparent',
                      color: '#fff', fontSize: '16px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--orange)'; e.currentTarget.style.borderColor = 'var(--orange)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; }}
                  >{label}</button>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '15px', lineHeight: 1.7, maxWidth: '380px', margin: 0, textAlign: 'right' }}>
                Every offering is designed around one goal — helping serious investors find, assess, and act on the right opportunity.
              </p>
            </div>
          </div>
        </FadeSection>

        {/* Scrollable cards */}
        <div ref={sliderRef} style={{
          display: 'flex', gap: '20px',
          overflowX: 'auto', scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
          padding: '0 40px 8px',
        }}>
          {offerings.map((item) => (
            <div key={item.title} style={{
              width: '360px', minWidth: '360px', height: '480px',
              flexShrink: 0, borderRadius: '20px',
              background: 'var(--cream-light)',
              overflow: 'hidden', scrollSnapAlign: 'start',
              display: 'flex', flexDirection: 'column',
              transition: 'transform 0.3s ease',
              cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Card top — content */}
              <div style={{ padding: '28px 28px 20px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: 'var(--orange)', textTransform: 'uppercase' }}>
                    {item.tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(18px, 1.6vw, 22px)', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3, marginBottom: '14px' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--gray)', fontSize: '13.5px', lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
              </div>

              {/* Card bottom — image */}
              <div style={{ height: '190px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <img src={item.img} alt={item.tag} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--cream-light) 0%, transparent 35%)' }} />
              </div>
            </div>
          ))}
          {/* Trailing spacer */}
          <div style={{ width: '20px', flexShrink: 0 }} />
        </div>

        <style>{`.fi-slider::-webkit-scrollbar{display:none}`}</style>
      </div>

      {/* WHY */}
      <div style={{ background: 'var(--navy)', padding: '100px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Playfair Display', serif", fontSize: '320px', fontWeight: 700, color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>05</div>

        <div className="xb-grid-2col" style={{ maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '100px', alignItems: 'start', position: 'relative', zIndex: 1 }}>

          {/* Left */}
          <FadeSection>
            <div className="section-label">Why Us</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3.5vw, 50px)', fontWeight: 700, color: '#fff', marginBottom: '24px', lineHeight: 1.1 }}>
              Why investors work with<br />
              <span style={{ color: 'var(--orange)' }}>XPAND Bharat.</span>
            </h2>
            <div style={{ width: '48px', height: '2px', background: 'var(--orange)', margin: '28px 0' }} />
            <p style={{ color: 'rgba(255,255,255,0.52)', fontSize: '16px', lineHeight: 1.85, marginBottom: '48px', maxWidth: '380px' }}>
              India's franchise economy is being built right now. The question is — are you positioned inside it?
            </p>
            <Link to="/contact" className="btn-primary">Start a Conversation</Link>
          </FadeSection>

          {/* Right — numbered list */}
          <FadeSection delay={150}>
            {whyItems.map((item, i) => (
              <div key={item.num} style={{
                display: 'flex', gap: '28px', alignItems: 'flex-start',
                padding: '28px 0',
                borderBottom: i < whyItems.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', fontWeight: 700, color: 'var(--orange)', lineHeight: 0.9, flexShrink: 0, width: '56px', opacity: 0.9 }}>
                  {item.num}
                </div>
                <div style={{ paddingTop: '6px' }}>
                  <h4 style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '14px', lineHeight: 1.75, margin: 0 }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </FadeSection>
        </div>
      </div>

      {/* FORM */}
      <div style={{ padding: '100px 40px', background: 'var(--cream-light)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <FadeSection style={{ marginBottom: '56px', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Let's explore together</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
              Let's explore the right opportunity.
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7 }}>
              Tell us about your investment interests, preferred sectors, and business goals. Our team will reach out within 24 hours.
            </p>
          </FadeSection>
          <div className="xb-form-wrap" style={{ background: 'var(--white)', borderRadius: '16px', padding: '56px', border: '1px solid var(--border)' }}>
            <InvestorForm />
          </div>
        </div>
      </div>
    </div>
  );
}
