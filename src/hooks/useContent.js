import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const CACHE = {};

export function useContent(page) {
  const [data, setData] = useState(CACHE[page] || null);
  const [loading, setLoading] = useState(!CACHE[page]);

  useEffect(() => {
    if (CACHE[page]) { setData(CACHE[page]); setLoading(false); return; }
    fetch(`${API}/page/${page}`)
      .then(r => r.json())
      .then(d => { if (d.success) { CACHE[page] = d.data; setData(d.data); } })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page]);

  const hero = data?.hero ?? null;
  const section = (name, fallback = []) => data?.sections?.[name] ?? fallback;

  return { hero, section, loading };
}

export function useSettings() {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    fetch(`${API}/settings`)
      .then(r => r.json())
      .then(d => { if (d.success) setSettings(d.data); })
      .catch(() => {});
  }, []);
  return settings;
}

export { API };
