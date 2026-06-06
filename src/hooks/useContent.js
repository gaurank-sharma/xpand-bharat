import { useState, useEffect } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Module-level cache shared across every page.
// The whole site is fetched ONCE (GET /api/page) and kept in memory,
// so navigating between pages is instant — no per-page network wait.
const CACHE = {};            // { [page]: { hero, sections } }
let allLoaded = false;       // true once the batch fetch resolved
let allPromise = null;       // in-flight batch fetch (dedupes concurrent calls)
const subscribers = new Set(); // re-render hooks when the batch arrives

function notify() { subscribers.forEach(fn => fn()); }

function prefetchAll() {
  if (allPromise) return allPromise;
  allPromise = fetch(`${API}/page`)
    .then(r => r.json())
    .then(d => {
      if (d.success && d.data) {
        Object.entries(d.data).forEach(([page, payload]) => { CACHE[page] = payload; });
      }
    })
    .catch(() => {})
    .finally(() => { allLoaded = true; notify(); });
  return allPromise;
}

// Kick the batch fetch off as soon as this module loads.
prefetchAll();

export function useContent(page) {
  const [, force] = useState(0);

  useEffect(() => {
    if (allLoaded) return;
    const rerender = () => force(n => n + 1);
    subscribers.add(rerender);
    prefetchAll();
    return () => subscribers.delete(rerender);
  }, [page]);

  const data = CACHE[page] || null;
  const hero = data?.hero ?? null;
  const section = (name, fallback = []) => data?.sections?.[name] ?? fallback;

  return { hero, section, loading: !allLoaded && !data };
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
