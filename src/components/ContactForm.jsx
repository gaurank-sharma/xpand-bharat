import { useState } from 'react';
import { API } from '../hooks/useContent';

const FIELDS = [
  { name: 'name',    label: 'Name',    placeholder: 'Enter Name',    type: 'text',  required: true },
  { name: 'email',   label: 'Email',   placeholder: 'Enter E-mail',  type: 'email', required: true },
  { name: 'mobile',  label: 'Mobile',  placeholder: 'Enter Mobile',  type: 'tel' },
  { name: 'company', label: 'Company', placeholder: 'Enter Company', type: 'text' },
  { name: 'address', label: 'Address', placeholder: 'Enter Address', type: 'text', full: true },
];

const inputStyle = {
  width: '100%', padding: '13px 16px', border: '1px solid var(--border)', borderRadius: '10px',
  fontSize: '15px', fontFamily: "'Inter', sans-serif", color: 'var(--navy)',
  background: 'var(--cream-light)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s',
};
const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--navy)', marginBottom: '7px' };

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', company: '', address: '', details: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const focus = (e) => { e.target.style.borderColor = 'var(--orange)'; };
  const blur = (e) => { e.target.style.borderColor = 'var(--border)'; };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim()) { setError('Name and email are required.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email address.'); return; }
    setStatus('sending');
    try {
      const message = [form.details.trim(), form.address.trim() && `Address: ${form.address.trim()}`].filter(Boolean).join('\n\n');
      const res = await fetch(`${API}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          mobile: form.mobile.trim(),
          company: form.company.trim(),
          message,
          source: 'contact',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || 'Something went wrong.');
      setStatus('done');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStatus('idle');
    }
  };

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '28px 0' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--orange-pale)', color: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 18px' }}>✓</div>
        <h3 style={{ fontFamily: "'Fraunces', serif", color: 'var(--navy)', margin: '0 0 8px' }}>Thank you, {form.name.split(' ')[0]}.</h3>
        <p style={{ color: 'var(--gray)', fontSize: '15px', margin: 0 }}>We&apos;ve received your message — our team will reach out shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
        {FIELDS.map((f) => (
          <div key={f.name} style={{ gridColumn: f.full ? '1 / -1' : 'auto' }}>
            <label style={labelStyle}>{f.label}{f.required && <span style={{ color: 'var(--orange)' }}> *</span>}</label>
            <input type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={set(f.name)} onFocus={focus} onBlur={blur} style={inputStyle} />
          </div>
        ))}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Details</label>
          <textarea rows={5} placeholder="Enter Details" value={form.details} onChange={set('details')} onFocus={focus} onBlur={blur} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
      </div>
      {error && <p style={{ color: '#c0392b', fontSize: '13px', margin: '14px 0 0' }}>{error}</p>}
      <button type="submit" className="btn-primary" disabled={status === 'sending'} style={{ marginTop: '24px', width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
