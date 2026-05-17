import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const pageTitles = {
  '/admin/dashboard': 'Dashboard',
  '/admin/contacts': 'Contact Submissions',
  '/admin/careers': 'Career Management',
  '/admin/clients': 'Client Management',
  '/admin/gallery': 'Gallery',
  '/admin/members': 'Team Members',
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Admin';

  return (
    <div className="min-h-screen bg-[#050505] flex">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <AdminHeader title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
