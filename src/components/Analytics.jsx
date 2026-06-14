import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 loader + SPA page-view tracking.
 * Activates only when VITE_GA_ID (G-XXXXXXXXXX) is set in the environment
 * (e.g. Vercel project env vars). No-ops otherwise, so it is safe to ship.
 */
const GA_ID = import.meta.env.VITE_GA_ID;

export default function Analytics() {
  const location = useLocation();

  // Inject the gtag.js script once.
  useEffect(() => {
    if (!GA_ID || window.gtag) return;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { send_page_view: false });
  }, []);

  // Send a page_view on every route change.
  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}
