import { Menu } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminHeader({ onMenuClick, title }) {
  const { admin } = useAdminAuth();

  return (
    <header className="h-16 bg-[#ffffff] border-b border-[#e6e8ec] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-[#0b1430] p-1">
          <Menu size={22} />
        </button>
        <h1 className="text-[#0b1430] font-semibold text-lg">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Backend Connected" />
        <span className="text-gray-500 text-xs hidden sm:block">Live</span>
        <div className="w-8 h-8 bg-[#f07920]/20 rounded-full flex items-center justify-center ml-2">
          <span className="text-[#f07920] text-xs font-bold">{admin?.name?.[0]?.toUpperCase() || 'A'}</span>
        </div>
      </div>
    </header>
  );
}
