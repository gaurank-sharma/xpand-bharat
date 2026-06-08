export default function Terms() {
  return (
    <div style={{ background: 'var(--cream-light)', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: 'var(--navy)', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Legal</div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>Terms & Conditions</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Last updated: May 2025</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 40px' }}>
        {[
          {
            title: '1. Acceptance of Terms',
            body: 'By accessing and using the XPANDBHARAT website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform or services.',
          },
          {
            title: '2. Nature of Services',
            body: 'XPANDBHARAT is a business expansion and investor-alignment platform. We facilitate introductions and conversations between brands, investors, and business opportunities. We do not guarantee the success of any business engagement, investment, or expansion effort facilitated through our platform.',
          },
          {
            title: '3. User Responsibilities',
            body: 'Users of our platform are responsible for ensuring the accuracy of information provided, conducting their own due diligence before entering any business arrangement, complying with all applicable laws and regulations, and maintaining the confidentiality of any information shared in confidence.',
          },
          {
            title: '4. Intellectual Property',
            body: 'All content on the XPANDBHARAT website, including text, graphics, logos, and design elements, is the property of XPANDBHARAT and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without prior written consent.',
          },
          {
            title: '5. No Investment Advice',
            body: 'Nothing on the XPANDBHARAT platform constitutes financial, investment, legal, or business advice. All information is provided for general informational purposes only. You should seek independent professional advice before making any business or investment decisions.',
          },
          {
            title: '6. Limitation of Liability',
            body: 'XPANDBHARAT shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our platform or services, including but not limited to loss of profits, business, or data. Our total liability shall not exceed the fees paid by you for our services.',
          },
          {
            title: '7. Third-Party Links',
            body: 'Our website may contain links to third-party websites. XPANDBHARAT does not endorse or assume responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any site you visit.',
          },
          {
            title: '8. Modifications',
            body: 'XPANDBHARAT reserves the right to modify these Terms and Conditions at any time. Continued use of our platform following any changes constitutes acceptance of the revised terms. We will endeavour to notify users of material changes where practicable.',
          },
          {
            title: '9. Governing Law',
            body: 'These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of courts in Gurgaon, Haryana, India.',
          },
          {
            title: '10. Contact',
            body: 'For questions regarding these Terms and Conditions, please contact us at info@xpandbharat.com.',
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
