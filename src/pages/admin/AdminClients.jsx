import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Pencil, Trash2, X, Upload, Building2 } from 'lucide-react';

const EMPTY = { name: '', website: '', industry: '', description: '', isFeatured: false, isActive: true, order: 0 };

export default function AdminClients() {
  const { authFetch, token } = useAdminAuth();
  const API = 'https://web-mob-hut-backend.vercel.app/api';
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/clients`);
      const d = await res.json();
      if (d.success) setClients(d.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setLogoFile(null); setLogoPreview(''); setModal(true); };
  const openEdit = (c) => { setEditing(c); setForm({ ...c }); setLogoPreview(c.logo); setLogoFile(null); setModal(true); };

  const handleLogo = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setLogoFile(f);
    setLogoPreview(URL.createObjectURL(f));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editing && !logoFile) { showToast('Please upload a client logo'); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (logoFile) fd.append('logo', logoFile);
      const url = editing ? `/clients/${editing._id}` : '/clients';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(`${API}${url}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      showToast(editing ? 'Client updated!' : 'Client added!');
      setModal(false);
      load();
    } catch (e) { showToast(e.message); } finally { setSaving(false); }
  };

  const deleteClient = async (id) => {
    if (!confirm('Delete this client?')) return;
    try { await authFetch(`/clients/${id}`, { method: 'DELETE' }); showToast('Client deleted'); load(); }
    catch (e) { showToast(e.message); }
  };

  return (
    <div className="space-y-4">
      {toast && <div className="fixed bottom-6 right-6 bg-[#2eaff0] text-black px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">{toast}</div>}

      <div className="flex justify-end">
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#2eaff0] hover:bg-[#1a9fd8] text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
          <Plus size={16} /> Add Client
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" /></div>
      ) : clients.length === 0 ? (
        <div className="text-center py-16 bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl">
          <Building2 size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-500 text-sm">No clients added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {clients.map((c) => (
            <div key={c._id} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-4 hover:border-[#2a2a2a] transition-colors group">
              <div className="aspect-video bg-[#1a1a1a] rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                {c.logo ? (
                  <img src={c.logo} alt={c.name} className="max-h-full max-w-full object-contain p-2" />
                ) : (
                  <Building2 size={24} className="text-gray-600" />
                )}
              </div>
              <p className="text-white text-sm font-medium text-center mb-1 truncate">{c.name}</p>
              {c.industry && <p className="text-gray-500 text-xs text-center mb-3">{c.industry}</p>}
              <div className="flex gap-1.5 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(c)} className="p-1.5 bg-[#1a1a1a] text-gray-300 hover:text-[#2eaff0] border border-[#2a2a2a] rounded-lg transition-colors">
                  <Pencil size={13} />
                </button>
                <button onClick={() => deleteClient(c._id)} className="p-1.5 bg-red-500/5 text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                  {c.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
              <h3 className="text-white font-semibold">{editing ? 'Edit Client' : 'Add Client'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Logo Upload */}
              <div>
                <label className="block text-gray-400 text-xs mb-2">Client Logo {!editing && '*'}</label>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer transition-colors ${logoPreview ? 'border-[#2eaff0]/30' : 'border-[#2a2a2a] hover:border-[#2eaff0]/30'}`}>
                  {logoPreview ? (
                    <img src={logoPreview} alt="logo" className="max-h-20 max-w-full object-contain" />
                  ) : (
                    <><Upload size={20} className="text-gray-500 mb-2" /><p className="text-gray-500 text-xs">Click to upload logo</p></>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
                </label>
                {logoPreview && <button type="button" onClick={() => { setLogoFile(null); setLogoPreview(editing?.logo || ''); }} className="text-xs text-gray-500 hover:text-gray-300 mt-1">Reset</button>}
              </div>

              {[
                { label: 'Company Name *', key: 'name', required: true },
                { label: 'Industry', key: 'industry' },
                { label: 'Website', key: 'website', type: 'url', placeholder: 'https://' },
              ].map(({ label, key, required, type = 'text', placeholder }) => (
                <div key={key}>
                  <label className="block text-gray-400 text-xs mb-1">{label}</label>
                  <input type={type} required={required} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0]" />
                </div>
              ))}

              <div>
                <label className="block text-gray-400 text-xs mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0] resize-none" />
              </div>

              <div className="flex gap-4">
                {[{ label: 'Active', key: 'isActive' }, { label: 'Featured', key: 'isFeatured' }].map(({ label, key }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.checked })} className="accent-[#2eaff0]" />
                    <span className="text-gray-400 text-sm">{label}</span>
                  </label>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-[#2a2a2a] text-gray-400 rounded-lg text-sm hover:border-[#3a3a3a] transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#2eaff0] hover:bg-[#1a9fd8] text-black font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60">
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
