import { useState, useRef } from 'react';
import { API } from '../hooks/useContent';

/* ── Options ───────────────────────────────────────────────── */
const PRIMARY = [
  {
    value: 'Business Owner',
    desc: "You have an operational business and you're exploring franchise expansion or funding.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" /><path d="M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />
      </svg>
    ),
  },
  {
    value: 'Investor',
    desc: "You have capital available and you're evaluating franchise businesses as an investment.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

const BUSINESS_GOALS = [
  { v: 'Franchise your business', d: 'Turn your single-unit or multi-unit business into a structured franchise model' },
  { v: 'Expand across cities', d: 'Already franchising; looking to scale to more markets with qualified investors' },
  { v: 'Raise funding / find investors', d: 'Looking for serious capital partners for expansion' },
  { v: 'Franchise advisory', d: 'Need expert guidance on structuring expansion the right way' },
  { v: 'Franchise rollout strategy', d: 'Ready to execute; need a rollout plan and operational systems' },
];

const INVESTOR_GOALS = [
  { v: 'Franchise investment opportunities', d: 'Looking to invest in a structured, established franchise' },
  { v: 'Passive income franchise', d: 'Prefer a managed model where operators run the business' },
  { v: 'Multi-location franchise', d: 'Building a portfolio of franchise units across cities' },
  { v: 'Retail franchise', d: 'Specifically interested in retail / consumer goods categories' },
  { v: 'Food & beverage franchise', d: 'Looking at F&B, QSR, café, or restaurant franchise models' },
  { v: 'Expansion-ready businesses', d: 'High-growth brands that need capital to scale' },
  { v: 'Scalable business investments', d: 'Open to sectors; want the best-returning franchise model' },
];

const SECTORS = ['Food & Beverage (cafés, QSRs, cloud kitchens, restaurants)', 'Electronics & Consumer Retail', 'Salon, Wellness & Lifestyle', 'Fashion & Apparel', 'Retail & Consumer Businesses', 'Emerging / Open to recommendations'];
const GEOGRAPHIES = ['Tier-1 cities (Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Pune)', 'Tier-2 cities (Jaipur, Lucknow, Chandigarh, Surat, Nagpur etc.)', 'Tier-3 & emerging markets', 'Pan-India — open to all markets', 'Specific city (specify in message field)'];
const BUDGETS = ['₹25 lakh – ₹50 lakh', '₹50 lakh – ₹1 crore', '₹1 crore – ₹2 crore', '₹2 crore – ₹5 crore', '₹5 crore and above', 'Not decided yet'];
const TIMELINES = ['Actively looking — ready within 3 months', 'Planning for 3–6 months from now', 'Exploring for 6–12 months from now', 'Research stage — no fixed timeline'];

/* ── Reusable radio-card group ─────────────────────────────── */
function RadioGroup({ label, options, value, onChange }) {
  return (
    <div className="lf-field">
      <label className="lf-label">{label} <span className="lf-req">*</span></label>
      <div className="lf-radios">
        {options.map(opt => {
          const v = typeof opt === 'string' ? opt : opt.v;
          const d = typeof opt === 'string' ? null : opt.d;
          const active = value === v;
          return (
            <button type="button" key={v} onClick={() => onChange(v)} className={`lf-radio${active ? ' lf-radio--on' : ''}`}>
              <span className="lf-dot" />
              <span className="lf-radio-text">
                <span className="lf-radio-title">{v}</span>
                {d && <span className="lf-radio-desc">{d}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function LeadForm({ role: fixedRole = '', source = 'website', submitLabel = 'Get My Report', brochureUrl = '' }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    role: fixedRole, primaryGoal: '',
    sector: '', geography: '', budget: '', timeline: '',
    name: '', company: '', mobile: '', email: '', message: '',
    consentReport: false, consentContact: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const goals = form.role === 'Investor' ? INVESTOR_GOALS : BUSINESS_GOALS;
  const subLabel = form.role === 'Investor' ? 'What type of opportunity are you exploring?' : 'What are you looking for?';

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const validMobile = form.mobile.replace(/\D/g, '').length >= 10;

  const step1Ok = !!form.role && !!form.primaryGoal;
  const step2Ok = form.sector && form.geography && form.budget && form.timeline;
  const step3Ok = form.name.trim() && validMobile && validEmail && form.consentReport;

  const wrapRef = useRef(null);
  const scrollToForm = () => {
    const el = wrapRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100; // clear navbar
    window.scrollTo({ top, behavior: 'smooth' });
  };
  const next = () => { setError(''); setStep(s => Math.min(3, s + 1)); requestAnimationFrame(scrollToForm); };
  const back = () => { setError(''); setStep(s => Math.max(1, s - 1)); requestAnimationFrame(scrollToForm); };

  const submit = async (e) => {
    e.preventDefault();
    if (!step3Ok) { setError('Please fill all required fields.'); return; }
    setSubmitting(true); setError('');
    try {
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source }),
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message || 'Submission failed');
      setSubmitted(true);
      // Gated brochure: trigger the PDF download on successful submit
      if (brochureUrl) {
        const a = document.createElement('a');
        a.href = brochureUrl;
        a.download = 'XPAND-Bharat-Presentation.pdf';
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) return (
    <div className="lf-wrap">
      <div style={{ textAlign: 'center', padding: '60px 24px' }}>
        <div style={{ width: '64px', height: '64px', background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '28px', color: '#fff' }}>✓</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: '28px', color: 'var(--navy)', marginBottom: '14px' }}>{brochureUrl ? 'Your brochure is downloading…' : 'Your report is on the way.'}</h3>
        <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7, maxWidth: '440px', margin: '0 auto' }}>
          Thank you, {form.name.split(' ')[0]}. {brochureUrl ? 'The XPAND Bharat presentation is downloading now. ' : ''}We'll review your details and get back to you within 48 hours. A confirmation has been sent to your email.
        </p>
        {brochureUrl && (
          <a href={brochureUrl} download="XPAND-Bharat-Presentation.pdf" target="_blank" rel="noreferrer" style={{ display: 'inline-block', marginTop: '22px', color: 'var(--orange)', fontWeight: 700, fontSize: '14px', textDecoration: 'underline' }}>
            Download didn't start? Click here ↓
          </a>
        )}
      </div>
      <FormStyles />
    </div>
  );

  return (
    <div className="lf-wrap">
      {/* anchor */}
      <span ref={wrapRef} style={{ position: 'absolute', marginTop: '-20px' }} aria-hidden="true" />
      {/* Progress */}
      <div className="lf-progress">
        {[1, 2, 3].map(n => (
          <div key={n} className={`lf-prog-step${step >= n ? ' lf-prog-step--on' : ''}`}>
            <span className="lf-prog-num">{n}</span>
            <span className="lf-prog-bar" />
          </div>
        ))}
      </div>
      <p className="lf-screen-tag">Screen {step} of 3</p>

      <form onSubmit={submit}>
        {/* ── SCREEN 1 ── */}
        {step === 1 && (
          <div className="lf-screen">
            {!fixedRole && (
              <div className="lf-field">
                <label className="lf-label">You are a —</label>
                <div className="lf-toggle">
                  {PRIMARY.map(p => {
                    const active = form.role === p.value;
                    return (
                      <button type="button" key={p.value} onClick={() => setForm(f => ({ ...f, role: p.value, primaryGoal: '' }))} className={`lf-toggle-card${active ? ' lf-toggle-card--on' : ''}`}>
                        <span className="lf-toggle-icon">{p.icon}</span>
                        <span className="lf-toggle-label">{p.value}</span>
                        <span className="lf-toggle-desc">{p.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {form.role && (
              <RadioGroup label={subLabel} options={goals} value={form.primaryGoal} onChange={v => set('primaryGoal', v)} />
            )}

            <div className="lf-actions">
              <button type="button" className="lf-btn lf-btn--primary" disabled={!step1Ok} onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── SCREEN 2 ── */}
        {step === 2 && (
          <div className="lf-screen">
            <div className="lf-head">
              <h3 className="lf-title">Tell us about your expansion context.</h3>
              <p className="lf-sub">This shapes which opportunities and insights we include in your report.</p>
            </div>
            <RadioGroup label="Preferred Industry / Sector" options={SECTORS} value={form.sector} onChange={v => set('sector', v)} />
            <RadioGroup label="Preferred Geography" options={GEOGRAPHIES} value={form.geography} onChange={v => set('geography', v)} />
            <RadioGroup label="Investment / Expansion Budget" options={BUDGETS} value={form.budget} onChange={v => set('budget', v)} />
            <RadioGroup label="Timeline" options={TIMELINES} value={form.timeline} onChange={v => set('timeline', v)} />
            <div className="lf-actions lf-actions--split">
              <button type="button" className="lf-btn lf-btn--ghost" onClick={back}>← Back</button>
              <button type="button" className="lf-btn lf-btn--primary" disabled={!step2Ok} onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* ── SCREEN 3 ── */}
        {step === 3 && (
          <div className="lf-screen">
            <div className="lf-head">
              <h3 className="lf-title">Where should we send your report?</h3>
              <p className="lf-sub">Delivered within 48 hours. No spam. No cold calls without your permission.</p>
            </div>
            <div className="lf-grid2">
              <div className="lf-field">
                <label className="lf-label">Full Name <span className="lf-req">*</span></label>
                <input className="lf-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" required />
              </div>
              <div className="lf-field">
                <label className="lf-label">Company / Brand Name <span className="lf-opt">(optional)</span></label>
                <input className="lf-input" value={form.company} onChange={e => set('company', e.target.value)} placeholder="Your business name (if applicable)" />
              </div>
              <div className="lf-field">
                <label className="lf-label">Mobile Number <span className="lf-req">*</span></label>
                <input className="lf-input" value={form.mobile} onChange={e => set('mobile', e.target.value)} placeholder="10-digit number" inputMode="numeric" required />
              </div>
              <div className="lf-field">
                <label className="lf-label">Email Address <span className="lf-req">*</span></label>
                <input className="lf-input" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Your business email" required />
              </div>
            </div>
            <div className="lf-field">
              <label className="lf-label">Message / Specific Requirement <span className="lf-opt">(optional)</span></label>
              <textarea className="lf-input" value={form.message} onChange={e => set('message', e.target.value)} placeholder="Anything specific you'd like us to include in your report?" rows={3} />
            </div>

            <label className="lf-check">
              <input type="checkbox" checked={form.consentReport} onChange={e => set('consentReport', e.target.checked)} />
              <span>I agree to receive my personalised report and relevant expansion insights from XPAND Bharat. I understand I can unsubscribe at any time. <span className="lf-req">*</span></span>
            </label>
            <label className="lf-check">
              <input type="checkbox" checked={form.consentContact} onChange={e => set('consentContact', e.target.checked)} />
              <span>I am happy for an XPAND advisor to contact me to discuss my expansion goals. <span className="lf-opt">(Optional — we will not call without this.)</span></span>
            </label>

            {error && <div className="lf-error">{error}</div>}

            <div className="lf-actions lf-actions--split">
              <button type="button" className="lf-btn lf-btn--ghost" onClick={back}>← Back</button>
              <button type="submit" className="lf-btn lf-btn--primary" disabled={!step3Ok || submitting}>{submitting ? 'Sending…' : submitLabel}</button>
            </div>
          </div>
        )}
      </form>
      <FormStyles />
    </div>
  );
}

function FormStyles() {
  return (
    <style>{`
      .lf-wrap { font-family: 'Inter', sans-serif; }
      .lf-progress { display: flex; gap: 8px; margin-bottom: 8px; }
      .lf-prog-step { display: flex; align-items: center; gap: 8px; flex: 1; }
      .lf-prog-num {
        width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
        display: flex; align-items: center; justify-content: center;
        font-size: 12px; font-weight: 700;
        background: var(--orange-pale); color: var(--gray);
        transition: all 0.3s;
      }
      .lf-prog-step--on .lf-prog-num { background: var(--orange); color: #fff; }
      .lf-prog-bar { flex: 1; height: 3px; border-radius: 2px; background: var(--border); transition: background 0.3s; }
      .lf-prog-step--on .lf-prog-bar { background: var(--orange); }
      .lf-prog-step:last-child .lf-prog-bar { display: none; }
      .lf-screen-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin: 0 0 28px; }

      .lf-head { margin-bottom: 28px; }
      .lf-title { font-family: 'Fraunces', serif; font-size: clamp(22px, 2.4vw, 30px); font-weight: 700; color: var(--navy); margin: 0 0 8px; line-height: 1.2; }
      .lf-sub { color: var(--gray); font-size: 14.5px; line-height: 1.6; margin: 0; }

      .lf-field { margin-bottom: 24px; }
      .lf-label { display: block; font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 12px; }
      .lf-req { color: var(--orange); }
      .lf-opt { color: #aaa; font-weight: 400; font-size: 12px; }

      /* Toggle cards (role) */
      .lf-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .lf-toggle-card {
        text-align: left; cursor: pointer;
        background: var(--white); border: 1.5px solid var(--border); border-radius: 14px;
        padding: 22px 22px; display: flex; flex-direction: column; gap: 8px;
        transition: border-color 0.2s, background 0.2s, transform 0.15s;
      }
      .lf-toggle-card:hover { border-color: rgba(240,121,32,0.4); transform: translateY(-2px); }
      .lf-toggle-card--on { border-color: var(--orange); background: var(--orange-pale); }
      .lf-toggle-icon {
        width: 44px; height: 44px; border-radius: 11px; display: flex; align-items: center; justify-content: center;
        background: rgba(240,121,32,0.1); color: var(--orange); margin-bottom: 4px;
      }
      .lf-toggle-label { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 700; color: var(--navy); }
      .lf-toggle-desc { font-size: 13px; color: var(--gray); line-height: 1.55; }

      /* Radio cards */
      .lf-radios { display: flex; flex-direction: column; gap: 10px; }
      .lf-radio {
        text-align: left; cursor: pointer; width: 100%;
        background: var(--white); border: 1.5px solid var(--border); border-radius: 12px;
        padding: 15px 18px; display: flex; align-items: flex-start; gap: 14px;
        transition: border-color 0.2s, background 0.2s;
      }
      .lf-radio:hover { border-color: rgba(240,121,32,0.4); }
      .lf-radio--on { border-color: var(--orange); background: var(--orange-pale); }
      .lf-dot {
        width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0; margin-top: 2px;
        border: 2px solid var(--border); transition: all 0.2s; position: relative;
      }
      .lf-radio--on .lf-dot { border-color: var(--orange); }
      .lf-radio--on .lf-dot::after { content: ''; position: absolute; inset: 3px; border-radius: 50%; background: var(--orange); }
      .lf-radio-text { display: flex; flex-direction: column; gap: 3px; }
      .lf-radio-title { font-size: 14.5px; font-weight: 600; color: var(--navy); }
      .lf-radio-desc { font-size: 13px; color: var(--gray); line-height: 1.5; }

      /* Inputs */
      .lf-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .lf-input {
        width: 100%; background: var(--cream-light); border: 1px solid var(--border);
        border-radius: 10px; padding: 13px 15px; font-size: 14.5px; color: var(--navy);
        font-family: 'Inter', sans-serif; transition: border-color 0.2s, background 0.2s;
        resize: vertical;
      }
      .lf-input:focus { outline: none; border-color: var(--orange); background: #fff; }
      .lf-input::placeholder { color: #aab; }

      /* Checkboxes */
      .lf-check { display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; cursor: pointer; font-size: 13px; color: var(--gray); line-height: 1.6; }
      .lf-check input { margin-top: 3px; width: 16px; height: 16px; accent-color: var(--orange); flex-shrink: 0; cursor: pointer; }

      .lf-error { background: rgba(220,53,69,0.08); border: 1px solid rgba(220,53,69,0.25); border-radius: 8px; padding: 12px 16px; color: #c0392b; font-size: 14px; margin: 6px 0 16px; }

      /* Actions */
      .lf-actions { margin-top: 32px; }
      .lf-actions--split { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
      .lf-btn {
        font-family: 'Inter', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.02em;
        padding: 15px 30px; border-radius: 11px; cursor: pointer; border: none; transition: all 0.2s;
      }
      .lf-btn--primary { background: var(--orange); color: #fff; flex: 1; max-width: 100%; }
      .lf-actions:not(.lf-actions--split) .lf-btn--primary { width: 100%; }
      .lf-btn--primary:hover:not(:disabled) { background: #e06b12; transform: translateY(-2px); }
      .lf-btn--primary:disabled { background: #e7c9af; color: #fff; cursor: not-allowed; }
      .lf-btn--ghost { background: transparent; color: var(--gray); border: 1px solid var(--border); }
      .lf-btn--ghost:hover { border-color: var(--navy); color: var(--navy); }

      @media (max-width: 620px) {
        .lf-toggle { grid-template-columns: 1fr; }
        .lf-grid2 { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
