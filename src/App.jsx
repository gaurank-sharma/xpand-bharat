import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

import Home from './pages/Home';
import ForBrands from './pages/ForBrands';
import ForInvestors from './pages/ForInvestors';
import GrowthOpportunities from './pages/GrowthOpportunities';
import OurApproach from './pages/OurApproach';
import Industries from './pages/Industries';
import About from './pages/About';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';
import Contact from './pages/Contact';
import Brochure from './pages/Brochure';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';

import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContacts from './pages/admin/AdminContacts';
import AdminInsights from './pages/admin/AdminInsights';
import AdminPages from './pages/admin/AdminPages';
import AdminSiteSettings from './pages/admin/AdminSiteSettings';

function App() {
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem('xb-loaded')
  );

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('xb-loaded', '1');
    setLoading(false);
  }, []);

  return (
    <AdminAuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>

          {/* ── Admin routes (no Navbar/Footer) ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="contacts"  element={<AdminContacts />} />
            <Route path="insights"  element={<AdminInsights />} />
            <Route path="pages"     element={<AdminPages />} />
            <Route path="settings"  element={<AdminSiteSettings />} />
          </Route>

          {/* ── Public routes (with Navbar/Footer) ── */}
          <Route
            path="*"
            element={
              <>
                {loading && <Preloader onComplete={handleComplete} />}
                <div style={{
                  minHeight: '100vh', display: 'flex', flexDirection: 'column',
                  opacity: loading ? 0 : 1,
                  transition: 'opacity 0.4s ease 0.1s',
                }}>
                  <Navbar />
                  <main style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/"                      element={<Home />} />
                      <Route path="/for-brands"            element={<ForBrands />} />
                      <Route path="/for-investors"         element={<ForInvestors />} />
                      <Route path="/growth-opportunities"  element={<GrowthOpportunities />} />
                      <Route path="/our-approach"          element={<OurApproach />} />
                      <Route path="/industries"            element={<Industries />} />
                      <Route path="/about"                 element={<About />} />
                      <Route path="/insights"              element={<Insights />} />
                      <Route path="/insights/:slug"        element={<InsightDetail />} />
                      <Route path="/contact"               element={<Contact />} />
                      <Route path="/get-started"              element={<Brochure />} />
                      <Route path="/privacy"               element={<Privacy />} />
                      <Route path="/terms"                 element={<Terms />} />
                      <Route path="/disclaimer"            element={<Disclaimer />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}

export default App;
