import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { setUser, mapSupabaseUser } from './store/authSlice';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import GamesHub from './pages/GamesHub';
import News from './pages/News';
import GrantSurvey from './pages/GrantSurvey';
import Workshop from './pages/Workshop';
import GrantDetail from './pages/GrantDetail';

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Слухаємо зміни auth-стану від Supabase (вхід, вихід, refresh токена)
  useEffect(() => {
    // Перевіряємо поточну сесію при старті
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(mapSupabaseUser(session?.user ?? null)));
    });

    // Підписуємось на зміни
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(mapSupabaseUser(session?.user ?? null)));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  // Показуємо порожній екран поки перевіряємо сесію
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#0a0b10',
      }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,215,0,0.2)', borderTop: '3px solid #FFD700', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
          },
        }}
      />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/news" element={<News />} />
          <Route path="/survey" element={<GrantSurvey />} />
          <Route path="/workshop" element={<Workshop />} />
          <Route path="/grants/:id" element={<GrantDetail />} />

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" replace />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
