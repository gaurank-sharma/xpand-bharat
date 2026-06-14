import Seo from '../components/Seo';

export default function Disclaimer() {
  return (
    <div style={{ background: 'var(--cream-light)', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Seo path="/disclaimer" title={"Disclaimer | XPAND Bharat"} description={"Important disclaimers regarding information and services provided by XPAND Bharat."} />
      <div style={{ background: 'var(--navy)', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Legal</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>Disclaimer</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Last updated: May 2025</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 40px' }}>
        {[
          {
            title: 'General Disclaimer',
            body: 'The information provided on the XPANDBHARAT website is for general informational purposes only. While we endeavour to keep the information accurate and current, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information contained on this website.',
          },
          {
            title: 'No Business Guarantee',
            body: 'XPANDBHARAT facilitates introductions and conversations between brands, investors, and business opportunities. We do not guarantee the success, viability, or returns of any business opportunity, investment, or expansion effort. All business decisions should be made after independent due diligence and professional advice.',
          },
          {
            title: 'Not Financial or Investment Advice',
            body: 'Nothing on this website constitutes financial, investment, legal, tax, or business advice. The content is provided purely for informational and educational purposes. You should consult qualified professionals before making any financial or business decisions.',
          },
          {
            title: 'Opportunity Listings',
            body: 'Business opportunities featured or discussed on this platform are presented for informational purposes. XPANDBHARAT does not independently verify all information provided by brands or opportunity owners. Investors and partners should conduct thorough due diligence before entering any arrangement.',
          },
          {
            title: 'Third-Party Content',
            body: 'This website may contain links to third-party websites or reference third-party information. XPANDBHARAT does not endorse, sponsor, or verify third-party content. We are not responsible for the accuracy or reliability of any information obtained from third-party sources.',
          },
          {
            title: 'Forward-Looking Statements',
            body: 'Any statements about market trends, business growth potential, or expansion opportunities are forward-looking in nature and involve uncertainty. Actual results may differ materially from those discussed. Past performance is not indicative of future results.',
          },
          {
            title: 'Limitation of Liability',
            body: 'To the fullest extent permitted by law, XPANDBHARAT shall not be liable for any loss or damage arising from your use of this website or reliance on its content, including direct, indirect, incidental, consequential, or punitive damages.',
          },
          {
            title: 'Changes to This Disclaimer',
            body: 'XPANDBHARAT reserves the right to update this Disclaimer at any time without prior notice. Continued use of our website following any changes constitutes your acceptance of the updated Disclaimer.',
          },
          {
            title: 'Contact Us',
            body: 'If you have any questions regarding this Disclaimer or any content on our website, please contact us at contact@xpandbharat.com.',
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: '22px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>{section.title}</h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
