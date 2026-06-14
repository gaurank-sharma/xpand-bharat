import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { LayoutDashboard, MessageSquare, Briefcase, BookOpen, Settings, FileText, Users, LogOut, X, ChevronRight } from 'lucide-react';

const links = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard',        section: 'dashboard' },
  { to: '/admin/pages',     icon: FileText,        label: 'Pages',            section: 'pages' },
  { to: '/admin/insights',  icon: BookOpen,        label: 'Insights',         section: 'insights' },
  { to: '/admin/leads',     icon: Briefcase,       label: 'Business Queries', section: 'leads' },
  { to: '/admin/contacts',  icon: MessageSquare,   label: 'Contact Queries',  section: 'contacts' },
  { to: '/admin/members',   icon: Users,           label: 'Members',          section: 'members' },
  { to: '/admin/settings',  icon: Settings,        label: 'Site Settings',    section: 'settings' },
];

export default function AdminSidebar({ open, onClose }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const perms = admin?.permissions || [];
  const visibleLinks = links.filter((l) => perms.includes(l.section));

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm" onClick={onClose} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-[#ffffff] border-r border-[#e6e8ec] z-50 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#e6e8ec]">
          <img src="/logo.png" alt="Xpand Bharat" className="h-8 w-auto object-contain" />
          <button onClick={onClose} className="lg:hidden text-gray-600 hover:text-[#0b1430]"><X size={18} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {visibleLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                ${isActive
                  ? 'bg-[#f07920]/10 text-[#f07920] border border-[#f07920]/20'
                  : 'text-gray-600 hover:text-[#0b1430] hover:bg-[#f2f3f6]'}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} className={isActive ? 'text-[#f07920]' : 'text-gray-500 group-hover:text-[#0b1430]'} />
                  <span>{label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto text-[#f07920]" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin + Logout */}
        <div className="px-3 pb-4 border-t border-[#e6e8ec] pt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-[#f07920]/20 rounded-full flex items-center justify-center">
              <span className="text-[#f07920] text-xs font-bold">{admin?.name?.[0]?.toUpperCase() || 'A'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#0b1430] text-xs font-medium truncate">{admin?.name || 'Admin'}</p>
              <p className="text-gray-500 text-[10px]">Administrator</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
