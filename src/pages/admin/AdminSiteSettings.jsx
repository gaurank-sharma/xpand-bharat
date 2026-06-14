import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Save, Upload } from 'lucide-react';

const TABS = ['General', 'Contact', 'Social', 'Footer'];

const Field = ({ label, value, onChange, placeholder, type = 'text', hint }) => (
  <div>
    <label className="block text-gray-600 text-xs mb-1 font-medium">{label}</label>
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] placeholder-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f07920] transition-colors"
    />
    {hint && <p className="text-gray-600 text-[10px] mt-1">{hint}</p>}
  </div>
);

const TextArea = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label className="block text-gray-600 text-xs mb-1 font-medium">{label}</label>
    <textarea
      value={value} onChange={e => onChange(e.target.value)} rows={rows}
      placeholder={placeholder}
      className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] placeholder-gray-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#f07920] resize-none transition-colors"
    />
  </div>
);

export default function AdminSiteSettings() {
  const { authFetch, token, API } = useAdminAuth();
  const [tab, setTab] = useState('General');
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [toast, setToast] = useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setSocial = (key, val) => setForm(f => ({ ...f, socialLinks: { ...f.socialLinks, [key]: val } }));

  useEffect(() => {
    fetch(`${API}/settings`)
      .then(r => r.json())
      .then(d => { if (d.success) setForm(d.data); });
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      await authFetch('/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (logoFile) {
        const fd = new FormData();
        fd.append('logo', logoFile);
        await fetch(`${API}/settings/logo`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
      }
      showToast('Settings saved!');
    } catch (err) { showToast(err.message); } finally { setSaving(false); }
  };

  if (!form) return <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-[#f07920] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6 max-w-2xl">
      {toast && <div className="fixed bottom-6 right-6 bg-[#f07920] text-white px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">{toast}</div>}

      {/* Tabs */}
      <div className="flex gap-1 bg-[#ffffff] border border-[#e6e8ec] rounded-xl p-1">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm rounded-lg font-medium transition-all
              ${tab === t ? 'bg-[#f07920] text-white' : 'text-gray-600 hover:text-[#0b1430]'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-[#ffffff] border border-[#e6e8ec] rounded-xl p-6 space-y-5">

        {tab === 'General' && (
          <>
            <Field label="Company Name"   value={form.companyName}  onChange={v => set('companyName', v)}  placeholder="Xpand Bharat" />
            <Field label="Tagline"        value={form.tagline}      onChange={v => set('tagline', v)}      placeholder="Less noise. More execution." />
            {/* Logo upload */}
            <div>
              <label className="block text-gray-600 text-xs mb-2 font-medium">Logo</label>
              <label className={`flex items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-colors h-24 ${logoPreview || form.logoUrl ? 'border-[#f07920]/30' : 'border-[#d4d7dd] hover:border-[#f07920]/30'}`}>
                {logoPreview
                  ? <img src={logoPreview} alt="logo" className="max-h-full max-w-full object-contain p-2" />
                  : form.logoUrl
                    ? <img src={form.logoUrl} alt="logo" className="max-h-full max-w-full object-contain p-2" />
                    : <><Upload size={18} className="text-gray-500 mr-2" /><span className="text-gray-500 text-xs">Click to upload logo</span></>}
                <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) { setLogoFile(f); setLogoPreview(URL.createObjectURL(f)); } }} />
              </label>
            </div>
          </>
        )}

        {tab === 'Contact' && (
          <>
            <Field label="Email Address"  value={form.email}    onChange={v => set('email', v)}    placeholder="contact@xpandbharat.com" />
            <Field label="Phone Number"   value={form.phone}    onChange={v => set('phone', v)}    placeholder="+91 XXXXX XXXXX" />
            <Field label="WhatsApp"       value={form.whatsapp} onChange={v => set('whatsapp', v)} placeholder="+91 XXXXX XXXXX" />
            <Field label="Office Address" value={form.address}  onChange={v => set('address', v)}  placeholder="Gurgaon, Haryana, India" />
          </>
        )}

        {tab === 'Social' && (
          <>
            <Field label="LinkedIn URL"   value={form.socialLinks?.linkedin  || ''} onChange={v => setSocial('linkedin', v)}  placeholder="https://linkedin.com/company/xpandbharat" />
            <Field label="Instagram URL"  value={form.socialLinks?.instagram || ''} onChange={v => setSocial('instagram', v)} placeholder="https://instagram.com/xpandbharat" />
            <Field label="Facebook URL"   value={form.socialLinks?.facebook  || ''} onChange={v => setSocial('facebook', v)}  placeholder="https://facebook.com/xpandbharat" />
            <Field label="Twitter / X URL" value={form.socialLinks?.twitter  || ''} onChange={v => setSocial('twitter', v)}   placeholder="https://twitter.com/xpandbharat" hint="Leave blank to hide an icon in the footer." />
          </>
        )}

        {tab === 'Footer' && (
          <>
            <TextArea label="Footer Description" value={form.footerDescription || ''} onChange={v => set('footerDescription', v)} rows={4} placeholder="Short company description shown in the footer brand column." />
            <Field    label="Footer CTA Heading" value={form.footerHeading || ''} onChange={v => set('footerHeading', v)} placeholder="Ready to move" />
            <Field    label="Footer CTA Tagline" value={form.footerTagline}  onChange={v => set('footerTagline', v)}  placeholder="Less noise. More execution." />
            <Field    label="Copyright Text"  value={form.copyrightText}  onChange={v => set('copyrightText', v)}  placeholder="XPANDBHARAT. All rights reserved." />
          </>
        )}
      </div>

      <button onClick={save} disabled={saving}
        className="flex items-center gap-2 bg-[#f07920] hover:bg-[#d96b1a] text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors disabled:opacity-60">
        <Save size={16} />
        {saving ? 'Saving…' : 'Save Settings'}
      </button>
    </div>
  );
}
