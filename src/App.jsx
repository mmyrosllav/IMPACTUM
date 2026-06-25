import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from './lib/supabase';
import { setUser, mapSupabaseUser } from './store/authSlice';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Services = lazy(() => import('./pages/Services'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const GamesHub = lazy(() => import('./pages/GamesHub'));
const News = lazy(() => import('./pages/News'));
const GrantSurvey = lazy(() => import('./pages/GrantSurvey'));
const Workshop = lazy(() => import('./pages/Workshop'));
const GrantDetail = lazy(() => import('./pages/GrantDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Spinner = () => (
  <div style={{
    minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,215,0,0.2)', borderTop: '3px solid #FFD700', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(mapSupabaseUser(session?.user ?? null)));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(mapSupabaseUser(session?.user ?? null)));
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

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
    <ErrorBoundary>
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
          <Suspense fallback={<Spinner />}>
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
                path="/forgot-password"
                element={!user ? <ForgotPassword /> : <Navigate to="/dashboard" replace />}
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
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
