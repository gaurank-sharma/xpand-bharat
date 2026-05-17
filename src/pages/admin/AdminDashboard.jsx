import { useEffect, useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { MessageSquare, Briefcase, Building2, Image, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, color, sub, href }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => href && navigate(href)}
      className={`bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-5 flex items-start gap-4 transition-all
        ${href ? 'cursor-pointer hover:border-[#2eaff0]/40 hover:bg-[#2eaff0]/5' : 'hover:border-[#2a2a2a]'}`}
    >
      <div className={`p-2.5 rounded-lg ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-0.5">{label}</p>
        <p className="text-white text-2xl font-semibold">{value ?? '—'}</p>
        {sub && <p className="text-[#2eaff0] text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

const statusColor = {
  new: 'bg-[#2eaff0]/10 text-[#2eaff0]',
  read: 'bg-gray-500/10 text-gray-400',
  replied: 'bg-green-500/10 text-green-400',
  resolved: 'bg-purple-500/10 text-purple-400',
  spam: 'bg-red-500/10 text-red-400',
};

export default function AdminDashboard() {
  const { authFetch, API } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/stats`).then((r) => r.json()),
      authFetch('/contacts?limit=6&page=1'),
    ])
      .then(([s, c]) => {
        if (s.success) setStats(s.data);
        if (c.success) setContacts(c.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#2eaff0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { icon: MessageSquare, label: 'Total Contacts', value: stats?.totalContacts, color: 'bg-[#2eaff0]/20', sub: `${stats?.newContacts || 0} new`, href: '/admin/contacts' },
    { icon: Briefcase,     label: 'Active Jobs',    value: stats?.activeCareers,  color: 'bg-purple-500/20', href: '/admin/careers' },
    { icon: Building2,     label: 'Clients',        value: stats?.activeClients,  color: 'bg-green-500/20',  href: '/admin/clients' },
    { icon: Image,         label: 'Gallery Images', value: stats?.galleryImages,  color: 'bg-orange-500/20', href: '/admin/gallery' },
    { icon: Users,         label: 'Team Members',   value: stats?.teamMembers,    color: 'bg-pink-500/20',   href: '/admin/members' },
    { icon: TrendingUp,    label: 'New Inquiries',  value: stats?.newContacts,    color: 'bg-yellow-500/20', sub: 'Need attention', href: '/admin/contacts' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-white text-xl font-semibold">Welcome back 👋</h2>
        <p className="text-gray-500 text-sm mt-0.5">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {statCards.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Recent Contacts */}
      <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e1e1e] flex items-center justify-between">
          <h3 className="text-white font-medium">Recent Contact Submissions</h3>
          <a href="/admin/contacts" className="text-[#2eaff0] text-xs hover:underline">View all</a>
        </div>
        {contacts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">No contact submissions yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e]">
                  {['Name', 'Email', 'Company', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left text-gray-500 text-xs px-5 py-3 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className="border-b border-[#1a1a1a] hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-5 py-3 text-gray-400">{c.email}</td>
                    <td className="px-5 py-3 text-gray-400">{c.company || '—'}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${statusColor[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
