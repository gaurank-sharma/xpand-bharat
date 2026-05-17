import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  Plus, Pencil, Trash2, X, ToggleLeft, ToggleRight,
  Briefcase, MapPin, Clock, Users, FileText, Mail, Phone, ChevronDown, ChevronUp,
} from 'lucide-react';

const TYPES = ['full-time', 'part-time', 'contract', 'internship', 'freelance'];
const EMPTY = {
  title: '', department: '', location: '', type: 'full-time',
  experience: '', salary: '', description: '', requirements: '',
  responsibilities: '', benefits: '', applicationEmail: 'careers@webmobhut.com',
  isActive: true, isFeatured: false,
};

const TypeBadge = ({ type }) => {
  const colors = {
    'full-time': 'bg-green-500/10 text-green-400',
    'part-time': 'bg-blue-500/10 text-blue-400',
    contract: 'bg-orange-500/10 text-orange-400',
    internship: 'bg-purple-500/10 text-purple-400',
    freelance: 'bg-pink-500/10 text-pink-400',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${colors[type] || ''}`}>{type}</span>;
};

export default function AdminCareers() {
  const { authFetch, token } = useAdminAuth();
  const API = 'https://web-mob-hut-backend.vercel.app/api';
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  // Applications panel state
  const [expandedJob, setExpandedJob] = useState(null); // job._id
  const [applications, setApplications] = useState({}); // { jobId: [] }
  const [appLoading, setAppLoading] = useState(null); // jobId currently loading

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/careers`);
      const d = await res.json();
      if (d.success) setCareers(d.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const toggleApplications = async (job) => {
    if (expandedJob === job._id) { setExpandedJob(null); return; }
    setExpandedJob(job._id);
    if (applications[job._id]) return; // already loaded
    setAppLoading(job._id);
    try {
      const d = await authFetch(`/contacts?jobId=${job._id}&limit=100`);
      setApplications((prev) => ({ ...prev, [job._id]: d.data || [] }));
    } catch {
      setApplications((prev) => ({ ...prev, [job._id]: [] }));
    } finally { setAppLoading(null); }
  };

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = (c) => {
    setEditing(c);
    setForm({
      ...c,
      requirements: Array.isArray(c.requirements) ? c.requirements.join('\n') : c.requirements || '',
      responsibilities: Array.isArray(c.responsibilities) ? c.responsibilities.join('\n') : c.responsibilities || '',
      benefits: Array.isArray(c.benefits) ? c.benefits.join('\n') : c.benefits || '',
    });
    setModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        requirements: JSON.stringify(form.requirements.split('\n').filter(Boolean)),
        responsibilities: JSON.stringify(form.responsibilities.split('\n').filter(Boolean)),
        benefits: JSON.stringify(form.benefits.split('\n').filter(Boolean)),
      };
      const url = editing ? `/careers/${editing._id}` : '/careers';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(`${API}${url}`, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (!d.success) throw new Error(d.message);
      showToast(editing ? 'Job updated!' : 'Job posted!');
      setModal(false);
      load();
    } catch (e) { showToast(e.message); } finally { setSaving(false); }
  };

  const toggle = async (id) => {
    try { await authFetch(`/careers/${id}/toggle`, { method: 'PATCH' }); load(); } catch (e) { showToast(e.message); }
  };

  const deleteCareer = async (id) => {
    if (!confirm('Delete this job listing?')) return;
    try { await authFetch(`/careers/${id}`, { method: 'DELETE' }); showToast('Job deleted'); load(); }
    catch (e) { showToast(e.message); }
  };

  return (
    <div className="space-y-4">
      {toast && <div className="fixed bottom-6 right-6 bg-[#2eaff0] text-black px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">{toast}</div>}

      <div className="flex justify-end">
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#2eaff0] hover:bg-[#1a9fd8] text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors">
          <Plus size={16} /> Post a Job
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" /></div>
      ) : careers.length === 0 ? (
        <div className="text-center py-16 bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl">
          <Briefcase size={32} className="mx-auto text-gray-600 mb-2" />
          <p className="text-gray-500 text-sm">No job listings yet. Post your first job!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {careers.map((c) => {
            const isExpanded = expandedJob === c._id;
            const apps = applications[c._id] || [];
            const isLoadingApps = appLoading === c._id;

            return (
              <div key={c._id} className={`bg-[#0f0f0f] border rounded-xl overflow-hidden transition-all ${c.isActive ? 'border-[#1e1e1e]' : 'border-[#1e1e1e] opacity-60'}`}>
                {/* Job row */}
                <div className="p-4 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm">{c.title}</h3>
                      <TypeBadge type={c.type} />
                      {c.isFeatured && <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full">Featured</span>}
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-500'}`}>
                        {c.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-gray-500 text-xs">
                      <span className="flex items-center gap-1"><Briefcase size={11} />{c.department}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} />{c.location}</span>
                      {c.experience && <span className="flex items-center gap-1"><Clock size={11} />{c.experience}</span>}
                      {c.salary && <span className="text-[#2eaff0]">{c.salary}</span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Applications toggle */}
                    <button
                      onClick={() => toggleApplications(c)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                        ${isExpanded
                          ? 'bg-[#2eaff0]/10 border-[#2eaff0]/30 text-[#2eaff0]'
                          : 'bg-[#1a1a1a] border-[#2a2a2a] text-gray-400 hover:border-[#2eaff0]/30 hover:text-[#2eaff0]'
                        }`}
                    >
                      <Users size={12} />
                      Applications
                      {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                    <button onClick={() => toggle(c._id)} className="text-gray-500 hover:text-[#2eaff0] transition-colors" title={c.isActive ? 'Deactivate' : 'Activate'}>
                      {c.isActive ? <ToggleRight size={20} className="text-[#2eaff0]" /> : <ToggleLeft size={20} />}
                    </button>
                    <button onClick={() => openEdit(c)} className="p-1.5 bg-[#1a1a1a] text-gray-300 hover:text-[#2eaff0] border border-[#2a2a2a] rounded-lg transition-colors">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => deleteCareer(c._id)} className="p-1.5 bg-red-500/5 text-red-400 border border-red-500/20 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Applications panel */}
                {isExpanded && (
                  <div className="border-t border-[#1e1e1e] bg-[#0a0a0a]">
                    {isLoadingApps ? (
                      <div className="flex justify-center py-8">
                        <div className="w-5 h-5 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : apps.length === 0 ? (
                      <div className="flex flex-col items-center py-8 text-center">
                        <Users size={24} className="text-neutral-700 mb-2" />
                        <p className="text-gray-500 text-sm">No applications yet for this role.</p>
                      </div>
                    ) : (
                      <div className="p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-3">
                          {apps.length} Application{apps.length !== 1 ? 's' : ''}
                        </p>
                        <div className="space-y-2">
                          {apps.map((app) => (
                            <div key={app._id} className="bg-[#111] border border-[#1e1e1e] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-sm font-semibold">{app.name}</p>
                                <div className="flex flex-wrap gap-3 mt-1 text-gray-500 text-xs">
                                  <span className="flex items-center gap-1"><Mail size={10} />{app.email}</span>
                                  {app.phone && <span className="flex items-center gap-1"><Phone size={10} />{app.phone}</span>}
                                  <span className="text-gray-600">
                                    {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                  </span>
                                </div>
                                {app.message && app.message !== `Applied for: ${c.title}` && (
                                  <p className="text-gray-500 text-xs mt-1.5 line-clamp-2 italic">"{app.message}"</p>
                                )}
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {app.cvUrl && (
                                  <a
                                    href={app.cvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2eaff0]/10 border border-[#2eaff0]/20 text-[#2eaff0] text-xs font-medium rounded-lg hover:bg-[#2eaff0]/20 transition-colors"
                                  >
                                    <FileText size={12} /> Download CV
                                  </a>
                                )}
                                <a
                                  href={`mailto:${app.email}`}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] border border-[#2a2a2a] text-gray-300 text-xs rounded-lg hover:text-[#2eaff0] hover:border-[#2eaff0]/30 transition-colors"
                                >
                                  <Mail size={12} /> Reply
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
              <h3 className="text-white font-semibold">{editing ? 'Edit Job' : 'Post New Job'}</h3>
              <button onClick={() => setModal(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Job Title *', key: 'title', required: true, span: 2 },
                  { label: 'Department *', key: 'department', required: true },
                  { label: 'Location *', key: 'location', required: true },
                  { label: 'Experience', key: 'experience', placeholder: 'e.g. 2-3 years' },
                  { label: 'Salary Range', key: 'salary', placeholder: 'e.g. ₹30,000 - ₹50,000' },
                  { label: 'Application Email', key: 'applicationEmail', type: 'email' },
                ].map(({ label, key, required, type = 'text', placeholder, span }) => (
                  <div key={key} className={span === 2 ? 'col-span-2' : ''}>
                    <label className="block text-gray-400 text-xs mb-1">{label}</label>
                    <input type={type} required={required} placeholder={placeholder} value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0]" />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-400 text-xs mb-1">Job Type *</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0]">
                    {TYPES.map((t) => <option key={t} value={t} className="capitalize">{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-1">Job Description *</label>
                <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4}
                  className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0] resize-none" />
              </div>

              {[
                { label: 'Requirements (one per line)', key: 'requirements' },
                { label: 'Responsibilities (one per line)', key: 'responsibilities' },
                { label: 'Benefits (one per line)', key: 'benefits' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-gray-400 text-xs mb-1">{label}</label>
                  <textarea value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} rows={3} placeholder="Enter each item on a new line"
                    className="w-full bg-[#1a1a1a] border border-[#2a2a2a] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2eaff0] resize-none placeholder-gray-600" />
                </div>
              ))}

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
                  {saving ? 'Saving...' : editing ? 'Save Changes' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
