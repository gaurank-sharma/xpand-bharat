import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Plus, Pencil, Trash2, X, Upload, Eye, EyeOff } from 'lucide-react';

const TAGS = ['Franchise Growth', 'Business Expansion', 'Investor Perspectives', 'Market Trends', 'Execution & Governance'];

const EMPTY = {
  tag: TAGS[0], title: '', excerpt: '', content: '',
  readTime: '5 min read', displayDate: '', status: 'draft', order: 0,
};

const statusBadge = {
  published: 'bg-green-500/10 text-green-400 border-green-500/20',
  draft:     'bg-gray-500/10 text-gray-600 border-gray-500/20',
};

export default function AdminInsights() {
  const { authFetch, token, API } = useAdminAuth();
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const d = await authFetch('/insights/all');
      if (d.success) setInsights(d.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...EMPTY, displayDate: new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' }) });
    setImgFile(null); setImgPreview(''); setModal(true);
  };

  const openEdit = (ins) => {
    setEditing(ins);
    setForm({
      tag: ins.tag, title: ins.title, excerpt: ins.excerpt,
      content: ins.content || '', readTime: ins.readTime,
      displayDate: ins.displayDate, status: ins.status, order: ins.order,
    });
    setImgPreview(ins.img); setImgFile(null); setModal(true);
  };

  const handleImg = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImgFile(f);
    setImgPreview(URL.createObjectURL(f));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imgFile) fd.append('image', imgFile);

      const url = editing ? `/insights/${editing._id}` : '/insights';
      const method = editing ? 'PUT' : 'POST';

      const res = await fetch(`${API}${url}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      showToast(editing ? 'Insight updated!' : 'Insight created!');
      setModal(false);
      load();
    } catch (err) { showToast(err.message); } finally { setSaving(false); }
  };

  const toggleStatus = async (ins) => {
    const next = ins.status === 'published' ? 'draft' : 'published';
    try {
      const fd = new FormData();
      fd.append('status', next);
      await fetch(`${API}/insights/${ins._id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      showToast(`Marked as ${next}`);
      load();
    } catch (err) { showToast(err.message); }
  };

  const deleteInsight = async (id) => {
    if (!confirm('Delete this insight?')) return;
    try { await authFetch(`/insights/${id}`, { method: 'DELETE' }); showToast('Deleted'); load(); }
    catch (err) { showToast(err.message); }
  };

  return (
    <div className="space-y-4">
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#f07920] text-white px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">{toast}</div>
      )}

      <div className="flex justify-end">
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#f07920] hover:bg-[#d96b1a] text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
          <Plus size={16} /> New Insight
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-[#f07920] border-t-transparent rounded-full animate-spin" /></div>
      ) : insights.length === 0 ? (
        <div className="text-center py-16 bg-[#ffffff] border border-[#e6e8ec] rounded-xl text-gray-500 text-sm">No insights yet. Create your first one.</div>
      ) : (
        <div className="bg-[#ffffff] border border-[#e6e8ec] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e6e8ec]">
                  {['Image', 'Title', 'Tag', 'Date', 'Status', ''].map((h) => (
                    <th key={h} className="text-left text-gray-500 text-xs px-5 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {insights.map((ins) => (
                  <tr key={ins._id} className="border-b border-[#eef0f3] hover:bg-[#f8f9fb] transition-colors">
                    <td className="px-5 py-3">
                      {ins.img
                        ? <img src={ins.img} alt="" className="w-14 h-10 object-cover rounded-lg" />
                        : <div className="w-14 h-10 bg-[#ffffff] rounded-lg" />}
                    </td>
                    <td className="px-5 py-3 text-[#0b1430] font-medium max-w-[220px]">
                      <p className="truncate">{ins.title}</p>
                      <p className="text-gray-500 text-xs truncate mt-0.5">{ins.readTime}</p>
                    </td>
                    <td className="px-5 py-3 text-gray-600 text-xs whitespace-nowrap">{ins.tag}</td>
                    <td className="px-5 py-3 text-gray-600 text-xs whitespace-nowrap">{ins.displayDate}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${statusBadge[ins.status]}`}>{ins.status}</span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleStatus(ins)} title={ins.status === 'published' ? 'Unpublish' : 'Publish'} className={`p-1.5 transition-colors ${ins.status === 'published' ? 'text-green-400 hover:text-gray-600' : 'text-gray-500 hover:text-green-400'}`}>
                          {ins.status === 'published' ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => openEdit(ins)} className="p-1.5 text-gray-500 hover:text-[#f07920] transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => deleteInsight(ins._id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#ffffff] border border-[#e6e8ec] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#e6e8ec]">
              <h3 className="text-[#0b1430] font-semibold">{editing ? 'Edit Insight' : 'New Insight'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-500 hover:text-[#0b1430]"><X size={18} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Cover image */}
              <div>
                <label className="block text-gray-600 text-xs mb-2">Cover Image</label>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl cursor-pointer transition-colors h-36 ${imgPreview ? 'border-[#f07920]/30 p-0 overflow-hidden' : 'border-[#d4d7dd] hover:border-[#f07920]/30'}`}>
                  {imgPreview
                    ? <img src={imgPreview} alt="cover" className="w-full h-full object-cover" />
                    : <><Upload size={20} className="text-gray-500 mb-2" /><p className="text-gray-500 text-xs">Click to upload cover image</p></>}
                  <input type="file" accept="image/*" className="hidden" onChange={handleImg} />
                </label>
              </div>

              {/* Tag */}
              <div>
                <label className="block text-gray-600 text-xs mb-1">Category / Tag *</label>
                <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}
                  className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]">
                  {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-gray-600 text-xs mb-1">Title *</label>
                <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Article title…"
                  className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]" />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-gray-600 text-xs mb-1">Excerpt *</label>
                <textarea required rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Short description shown on the card…"
                  className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920] resize-none" />
              </div>

              {/* Read time + Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-xs mb-1">Read Time</label>
                  <input value={form.readTime} onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]" />
                </div>
                <div>
                  <label className="block text-gray-600 text-xs mb-1">Display Date</label>
                  <input value={form.displayDate} onChange={(e) => setForm({ ...form, displayDate: e.target.value })}
                    placeholder="May 2025"
                    className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]" />
                </div>
              </div>

              {/* Status + Order */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 text-xs mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 text-xs mb-1">Order (higher = first)</label>
                  <input type="number" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="w-full bg-[#ffffff] border border-[#d4d7dd] text-[#0b1430] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#f07920]" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 border border-[#d4d7dd] text-gray-600 rounded-lg text-sm hover:border-[#c8ccd3] transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#f07920] hover:bg-[#d96b1a] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60">
                  {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Insight'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
