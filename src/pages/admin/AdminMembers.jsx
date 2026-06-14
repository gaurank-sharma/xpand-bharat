import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Pencil, Trash2, X, Shield, ShieldCheck } from 'lucide-react';

const SECTION_LABELS = {
  dashboard: 'Dashboard',
  pages: 'Pages',
  insights: 'Insights',
  leads: 'Business Queries',
  contacts: 'Contact Queries',
  members: 'Members & Access',
  settings: 'Site Settings',
};

const blank = { email: '', password: '', name: '', role: 'member', permissions: ['dashboard'] };

export default function AdminMembers() {
  const { authFetch, admin } = useAdminAuth();
  const [members, setMembers] = useState([]);
  const [sections, setSections] = useState(Object.keys(SECTION_LABELS));
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | {…member} | 'new'
  const [form, setForm] = useState(blank);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 2500); };

  const load = async () => {
    setLoading(true);
    try {
      const d = await authFetch('/auth/members');
      setMembers(d.data || []);
      if (d.sections) setSections(d.sections);
    } catch (e) { showToast(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const openNew = () => { setForm(blank); setEditing('new'); setError(''); };
  const openEdit = (m) => {
    setForm({ email: m.email, password: '', name: m.name || '', role: m.role, permissions: m.permissions || [] });
    setEditing(m); setError('');
  };
  const close = () => { setEditing(null); setError(''); };

  const togglePerm = (s) => setForm((f) => ({
    ...f,
    permissions: f.permissions.includes(s) ? f.permissions.filter((p) => p !== s) : [...f.permissions, s],
  }));

  const save = async () => {
    setError('');
    if (editing === 'new' && (!form.email || !form.password)) { setError('Email and password are required.'); return; }
    setSaving(true);
    try {
      if (editing === 'new') {
        await authFetch('/auth/members', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        showToast('Member created');
      } else {
        const payload = { name: form.name, role: form.role, permissions: form.permissions };
        if (form.password) payload.password = form.password;
        await authFetch(`/auth/members/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        showToast('Member updated');
      }
      close(); load();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  const remove = async (m) => {
    if (!confirm(`Remove ${m.name || m.email}? They will lose admin access.`)) return;
    try { await authFetch(`/auth/members/${m.id}`, { method: 'DELETE' }); showToast('Member removed'); load(); }
    catch (e) { showToast(e.message); }
  };

  const inputCls = 'w-full bg-[#0b1430] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#f07920]/60';
  const labelCls = 'block text-xs font-medium text-gray-400 mb-1.5';

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-white text-lg font-semibold">Members & Access</h2>
          <p className="text-gray-500 text-sm">Create admin accounts and control which sections they can access.</p>
        </div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#f07920] hover:bg-[#d96b1a] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors">
          <Plus size={16} /> Add Member
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading members…</p>
      ) : (
        <div className="grid gap-3">
          {members.map((m) => (
            <div key={m.id} className="bg-[#0d1730] border border-white/10 rounded-xl p-4 flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-[#f07920]/15 flex items-center justify-center shrink-0">
                  <span className="text-[#f07920] text-sm font-bold">{(m.name || m.email)[0].toUpperCase()}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-white text-sm font-semibold truncate">{m.name || '—'}</p>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded ${m.role === 'superadmin' ? 'bg-[#f07920]/15 text-[#f07920]' : 'bg-white/5 text-gray-400'}`}>
                      {m.role === 'superadmin' ? <ShieldCheck size={11} /> : <Shield size={11} />}{m.role}
                    </span>
                    {m.id === admin?.id && <span className="text-[10px] text-gray-500">(you)</span>}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 truncate">{m.email}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(m.role === 'superadmin' ? ['Full access'] : (m.permissions.length ? m.permissions.map((p) => SECTION_LABELS[p] || p) : ['No access'])).map((p) => (
                      <span key={p} className="text-[10px] text-gray-300 bg-white/5 border border-white/10 rounded px-2 py-0.5">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => openEdit(m)} className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5" title="Edit"><Pencil size={15} /></button>
                {m.id !== admin?.id && (
                  <button onClick={() => remove(m)} className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/5" title="Remove"><Trash2 size={15} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={close}>
          <div className="bg-[#0d1730] border border-white/10 rounded-2xl w-full max-w-lg my-8 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">{editing === 'new' ? 'Add Member' : `Edit ${editing.name || editing.email}`}</h3>
              <button onClick={close} className="text-gray-400 hover:text-white"><X size={18} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={labelCls}>Name</label>
                <input className={inputCls} placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Email {editing !== 'new' && <span className="text-gray-600">(cannot be changed)</span>}</label>
                <input className={inputCls} placeholder="email@xpandbharat.com" value={form.email} disabled={editing !== 'new'} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>{editing === 'new' ? 'Password' : 'New password (leave blank to keep current)'}</label>
                <input className={inputCls} type="text" placeholder={editing === 'new' ? 'Set a password' : '••••••••'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <div>
                <label className={labelCls}>Role</label>
                <select className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} disabled={editing !== 'new' && editing.id === admin?.id}>
                  <option value="member">Member (limited access)</option>
                  <option value="superadmin">Superadmin (full access)</option>
                </select>
              </div>
              {form.role !== 'superadmin' && (
                <div>
                  <label className={labelCls}>Section access</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sections.map((s) => (
                      <label key={s} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm ${form.permissions.includes(s) ? 'border-[#f07920]/50 bg-[#f07920]/10 text-white' : 'border-white/10 text-gray-400 hover:border-white/20'}`}>
                        <input type="checkbox" className="accent-[#f07920]" checked={form.permissions.includes(s)} onChange={() => togglePerm(s)} />
                        {SECTION_LABELS[s] || s}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {error && <p className="text-red-400 text-xs">{error}</p>}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={close} className="px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white">Cancel</button>
              <button onClick={save} disabled={saving} className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#f07920] hover:bg-[#d96b1a] text-white disabled:opacity-60">
                {saving ? 'Saving…' : editing === 'new' ? 'Create Member' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-[110] bg-[#0d1730] border border-white/15 text-white text-sm px-4 py-3 rounded-lg shadow-xl">{toast}</div>
      )}
    </div>
  );
}
