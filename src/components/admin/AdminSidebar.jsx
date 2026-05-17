import { NavLink, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutDashboard, MessageSquare, Briefcase, Users, Image, Building2,
  LogOut, X, ChevronRight,
} from 'lucide-react';

const links = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
  { to: '/admin/careers', icon: Briefcase, label: 'Careers' },
  { to: '/admin/clients', icon: Building2, label: 'Clients' },
  { to: '/admin/gallery', icon: Image, label: 'Gallery' },
  { to: '/admin/members', icon: Users, label: 'Team Members' },
];

export default function AdminSidebar({ open, onClose }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#080808] border-r border-[#1e1e1e] z-50 flex flex-col transition-transform duration-300
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1e1e1e]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#2eaff0] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xs">WMH</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">WebMobHut</p>
              <p className="text-[#2eaff0] text-[10px] uppercase tracking-widest">Admin Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-white">
            <X size={18} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {links.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group
                ${isActive
                  ? 'bg-[#2eaff0]/10 text-[#2eaff0] border border-[#2eaff0]/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={17} className={isActive ? 'text-[#2eaff0]' : 'text-gray-500 group-hover:text-white'} />
                  <span>{label}</span>
                  {isActive && <ChevronRight size={14} className="ml-auto text-[#2eaff0]" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin Info + Logout */}
        <div className="px-3 pb-4 border-t border-[#1e1e1e] pt-4">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-[#2eaff0]/20 rounded-full flex items-center justify-center">
              <span className="text-[#2eaff0] text-xs font-bold">
                {admin?.name?.[0]?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{admin?.name || 'Admin'}</p>
              <p className="text-gray-500 text-[10px] capitalize">{admin?.role || 'admin'}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
