import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#f07920] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return admin ? children : <Navigate to="/admin/login" replace />;
}
