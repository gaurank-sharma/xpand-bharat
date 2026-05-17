import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Pencil, Trash2, X, Upload, Users } from 'lucide-react';

const EMPTY = { name: '', role: '', department: '', bio: '', email: '', phone: '', linkedin: '', instagram: '', twitter: '', isActive: true, isFeatured: false, order: 0 };

export default function AdminMembers() {
  const { authFetch, token } = useAdminAuth();
  const API = 'https://web-mob-hut-backend.vercel.app/api';
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const load = async () => {
    setLoading(true);
    try { const d = await authFetch('/members'); setMembers(d.data); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setPhotoFile(null); setPhotoPreview(''); setModal(true); };
  const openEdit = (m) => { setEditing(m); setForm({ ...m }); setPhotoPreview(m.photo); setPhotoFile(null); setModal(true); };

  const handlePhoto = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setPhotoFile(f);
    setPhotoPreview(URL.createObjectURL(f));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (photoFile) fd.append('photo', photoFile);
      const url = editing ? `/members/${editing._id}` : '/members';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(`${API}${url}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      showToast(editing ? 'Member updated!' : 'Member added!');
      setModal(false);
      load();
    } catch (e) { showToast(e.message); } finally { setSaving(false); }
  };

  const deleteMember = async (id) => {
    if (!confirm('Delete this member?')) return;
    try { await authFetch(`/members/${id}`, { method: 'DELETE' }); showToast('Member deleted'); load(); }
    catch (e) { showToast(e.message); }
  };

  return (
    <div className="space-y-4">
      {toast && <div className="fixed bottom-6 right-6 bg-[#2eaff0] text-black px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">{toast}</div>}

      <div className="flex justify-end">
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#2eaff0] hover:bg-[#1a9fd8] text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" /></div>
      ) : members.length === 0 ? (
        <div className="text-center py-16 bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl">
          <Users size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-500 text-sm">No team members yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {members.map((m) => (
            <div key={m._id} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-4 hover:border-[#2a2a2a] transition-colors">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#1a1a1a] border-2 border-[#2eaff0]/20 mb-3">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2eaff0] font-bold text-xl">
                      {m.name[0]}
                    </div>
                  )}
                </div>
                <h3 className="text-white font-semibold text-sm">{m.name}</h3>
                <p className="text-[#2eaff0] text-xs">{m.role}</p>
                {m.department && <p className="text-gray-500 text-xs mt-0.5">{m.department}</p>}
              </div>
              {m.bio && <p className="text-gray-400 text-xs text-center mb-3 line-clamp-2">{m.bio}</p>}
              <div className="flex justify-center gap-2">
                <button onClick={() => openEdit(m)} className="flex items-center gap-1 px-3 py-1.5 bg-[#1a1a1a] text-gray-300 hover:text-[#2eaff0] border border-[#2a2a2a] rounded-lg text-xs transition-colors">
                  <Pencil size={12} /> Edit
                </button>
                <button onClick={() => deleteMember(m._id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-500/5 text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-lg text-xs transition-colors">
                  <Trash2 size={12} /> Delete
                </button>
              </div>
              <div className="flex justify-center mt-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${m.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                  {m.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
              <h3 className="text-white font-semibold">{editing ? 'Edit Member' : 'Add New Member'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Photo */}
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-[#1a1a1a] border-2 border-[#2eaff0]/20">
                  {photoPreview ? (
                    <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600"><Upload size={20} /></div>
                  )}
                </div>
                <label className="text-[#2eaff0] text-xs cursor-pointer hover:underline">
                  {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Full Name *', key: 'name', required: true },
                  { label: 'Role / Position *', key: 'role', required: true },
                  { label: 'Department', key: 'department' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone', key: 'phone' },
                  { label: 'Order', key: 'order', type: 'number' },
                ].map(({ label, key, required, type = 'text' }) => (
                  <div key={key}>
                    <label className="block text-gray-400 text-xs mb-1">{label}</label>
                    <input
                      type={type}
                      required={required}
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0]"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0] resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {['linkedin', 'instagram', 'twitter'].map((k) => (
                  <div key={k}>
                    <label className="block text-gray-400 text-xs mb-1 capitalize">{k}</label>
                    <input
                      value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      placeholder={`${k} URL`}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2eaff0]"
                    />
                  </div>
                ))}
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
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
