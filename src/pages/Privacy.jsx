export default function Privacy() {
  return (
    <div style={{ background: 'var(--cream-light)', minHeight: '100vh', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ background: 'var(--navy)', padding: '160px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="section-label">Legal</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '16px' }}>Privacy Policy</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Last updated: May 2025</p>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 40px' }}>
        {[
          {
            title: '1. Information We Collect',
            body: 'XPANDBHARAT collects information you provide directly to us when you fill out forms on our website, including your name, company name, mobile number, email address, and business requirements. We may also collect information about how you interact with our website through cookies and similar technologies.',
          },
          {
            title: '2. How We Use Your Information',
            body: 'We use the information we collect to respond to your enquiries and business requirements, connect you with relevant opportunities or partners, improve our services and website experience, send you relevant business insights and communications (with your consent), and comply with legal obligations.',
          },
          {
            title: '3. Information Sharing',
            body: 'XPANDBHARAT does not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except where necessary to provide our services (such as connecting brands with investors), comply with legal requirements, or protect our rights and the safety of others.',
          },
          {
            title: '4. Data Security',
            body: 'We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.',
          },
          {
            title: '5. Cookies',
            body: 'Our website uses cookies to enhance your browsing experience and understand how visitors use our platform. You can choose to disable cookies through your browser settings, although this may affect the functionality of our website.',
          },
          {
            title: '6. Your Rights',
            body: 'You have the right to access, correct, or delete your personal information held by us. You may also object to the processing of your data or request that we restrict how we use it. To exercise any of these rights, please contact us at info@xpandbharat.com.',
          },
          {
            title: '7. Changes to This Policy',
            body: 'XPANDBHARAT reserves the right to update this Privacy Policy at any time. We will notify you of any significant changes by posting the new policy on this page with an updated date. Your continued use of our website after changes constitutes your acceptance of the revised policy.',
          },
          {
            title: '8. Contact',
            body: 'If you have any questions about this Privacy Policy or how we handle your information, please contact us at info@xpandbharat.com or write to us at our registered office in Gurgaon, Haryana, India.',
          },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>{section.title}</h2>
            <p style={{ color: 'var(--gray)', fontSize: '16px', lineHeight: 1.8 }}>{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
