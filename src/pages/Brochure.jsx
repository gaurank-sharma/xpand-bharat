import Seo from '../components/Seo';
import LeadForm from '../components/LeadForm';

export default function Brochure() {
  return (
    <div style={{ background: 'var(--cream-light)', minHeight: '100vh', padding: '140px 20px 90px' }}>
      <Seo
        path="/get-started"
        title={"Get the Brochure — XPAND Bharat"}
        description={"Download the XPAND Bharat franchise expansion & investment presentation. Share a few details and the brochure is yours instantly."}
      />

      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        {/* Compact heading */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Get Started</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, color: 'var(--navy)', lineHeight: 1.12, margin: '12px 0 16px' }}>
            Let&apos;s talk about your <span style={{ color: 'var(--orange)' }}>expansion.</span>
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.7, margin: '0 auto', maxWidth: '540px' }}>
            Tell us a little about your business. We&apos;ll reach out to plan your expansion — and your brochure downloads the moment you submit.
          </p>
        </div>

        {/* Form */}
        <div style={{ background: 'var(--white)', borderRadius: '18px', padding: '44px', border: '1px solid var(--border)', boxShadow: '0 24px 70px rgba(0,0,0,0.08)' }}>
          <LeadForm source="strategy-call" submitLabel="Request a Strategy Call" brochureUrl="/XpandBharat%20Presentation.pdf" />
        </div>
      </div>
    </div>
  );
}
