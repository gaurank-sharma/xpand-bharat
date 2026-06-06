import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Search, Trash2, Eye, X, Mail, Phone, Building2, FileText } from 'lucide-react';

const STATUS_OPTS = ['all', 'new', 'read', 'replied', 'resolved', 'spam'];
const statusColor = {
  new: 'bg-[#f07920]/10 text-[#f07920] border-[#f07920]/20',
  read: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  replied: 'bg-green-500/10 text-green-400 border-green-500/20',
  resolved: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  spam: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function AdminContacts() {
  const { authFetch } = useAdminAuth();
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      if (search) params.set('search', search);
      const d = await authFetch(`/contacts?${params}`);
      setContacts(d.data);
      setStats(d.stats || {});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filter, search]);

  const updateStatus = async (id, status) => {
    try {
      await authFetch(`/contacts/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      showToast('Status updated');
      if (selected?._id === id) setSelected({ ...selected, status });
      load();
    } catch (e) { showToast(e.message); }
  };

  const deleteContact = async (id) => {
    if (!confirm('Delete this contact?')) return;
    try {
      await authFetch(`/contacts/${id}`, { method: 'DELETE' });
      showToast('Contact deleted');
      setSelected(null);
      load();
    } catch (e) { showToast(e.message); }
  };

  return (
    <div className="space-y-4">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#f07920] text-black px-4 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">
          {toast}
        </div>
      )}

      {/* Stat pills */}
      <div className="flex flex-wrap gap-2">
        {STATUS_OPTS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all
              ${filter === s ? 'bg-[#f07920] text-black border-[#f07920]' : 'bg-[#111] text-gray-400 border-[#222] hover:border-[#f07920]/40'}`}
          >
            {s} {s !== 'all' && stats[s] !== undefined ? `(${stats[s]})` : ''}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search by name, email or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#0f0f0f] border border-[#1e1e1e] text-white placeholder-gray-600 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#f07920] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><div className="w-7 h-7 border-2 border-[#f07920] border-t-transparent rounded-full animate-spin" /></div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">No contacts found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e]">
                  {['Name', 'Email', 'Mobile', 'Requirement', 'Status', 'Date', ''].map((h) => (
                    <th key={h} className="text-left text-gray-500 text-xs px-5 py-3 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className="border-b border-[#161616] hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{c.name}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{c.email}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{c.mobile || '—'}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs max-w-[140px] truncate">{c.requirement || '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize border ${statusColor[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelected(c)} className="p-1.5 text-gray-500 hover:text-[#f07920] transition-colors" title="View">
                          <Eye size={14} />
                        </button>
                        <button onClick={() => deleteContact(c._id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
              <h3 className="text-white font-semibold">Contact Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Name</p>
                  <p className="text-white text-sm font-medium">{selected.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Status</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize border ${statusColor[selected.status]}`}>{selected.status}</span>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><Mail size={10} /> Email</p>
                  <p className="text-white text-sm">{selected.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><Phone size={10} /> Mobile</p>
                  <p className="text-white text-sm">{selected.mobile || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1 flex items-center gap-1"><Building2 size={10} /> Company</p>
                  <p className="text-white text-sm">{selected.company || '—'}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Date</p>
                  <p className="text-white text-sm">{new Date(selected.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              {selected.requirement && (
                <div>
                  <p className="text-gray-500 text-xs mb-1">Business Requirement</p>
                  <p className="text-white text-sm">{selected.requirement}</p>
                </div>
              )}
              {selected.markets && (
                <div>
                  <p className="text-gray-500 text-xs mb-1">Preferred Markets</p>
                  <p className="text-white text-sm">{selected.markets}</p>
                </div>
              )}
              <div>
                <p className="text-gray-500 text-xs mb-1">Message</p>
                <p className="text-gray-300 text-sm leading-relaxed bg-[#1a1a1a] rounded-lg p-3">{selected.message}</p>
              </div>
              {selected.cvUrl && (
                <div>
                  <p className="text-gray-500 text-xs mb-2">CV / Resume</p>
                  <a
                    href={selected.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#f07920]/10 border border-[#f07920]/20 text-[#f07920] text-xs font-medium rounded-lg hover:bg-[#f07920]/20 transition-colors"
                  >
                    <FileText size={13} /> Download CV
                  </a>
                </div>
              )}
              {/* Status Actions */}
              <div>
                <p className="text-gray-500 text-xs mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {['read', 'replied', 'resolved', 'spam'].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected._id, s)}
                      disabled={selected.status === s}
                      className={`px-3 py-1.5 rounded-lg text-xs capitalize border transition-all disabled:opacity-40
                        ${statusColor[s] || 'border-[#2a2a2a] text-gray-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-4 flex gap-2">
              <a
                href={`mailto:${selected.email}`}
                className="flex-1 bg-[#f07920] hover:bg-[#1a9fd8] text-black font-semibold py-2.5 rounded-lg text-sm text-center transition-colors"
              >
                Reply via Email
              </a>
              <button
                onClick={() => { deleteContact(selected._id); setSelected(null); }}
                className="px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
