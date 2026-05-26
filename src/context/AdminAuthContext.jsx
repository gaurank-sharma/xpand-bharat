import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('xb_admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => { if (d.success) setAdmin(d.admin); else logout(); })
        .catch(logout)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Login failed');
    localStorage.setItem('xb_admin_token', data.token);
    setToken(data.token);
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('xb_admin_token');
    setToken(null);
    setAdmin(null);
  };

  const authFetch = async (url, options = {}) => {
    const res = await fetch(`${API}${url}`, {
      ...options,
      headers: { Authorization: `Bearer ${token}`, ...options.headers },
    });
    const data = await res.json();
    if (res.status === 401) {
      logout();
      window.location.href = '/admin/login';
      throw new Error('Session expired. Please login again.');
    }
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  };

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, login, logout, authFetch, API }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
