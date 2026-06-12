import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import PageTransition from '../components/PageTransition';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message === 'Invalid login credentials'
        ? (t('auth.invalidCredentials') || 'Невірний email або пароль')
        : error.message
      );
    } else {
      toast.success(t('auth.welcomeBack') || 'З поверненням!');
      navigate('/dashboard');
    }

    setLoading(false);
  };

  return (
    <PageTransition>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: '450px', margin: '0 auto', padding: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '10px' }}>{t('auth.welcomeBack')}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{t('auth.loginDesc') || 'Увійдіть до свого акаунту'}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                  {t('auth.password')}
                </label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div style={{ textAlign: 'right', marginBottom: '24px' }}>
                <Link to="/forgot-password" style={{ color: 'var(--text-muted)', fontSize: '0.82rem', textDecoration: 'none' }}>
                  {t('auth.forgotPassword')}
                </Link>
              </div>

              <button
                type="submit"
                className="btn"
                style={{ width: '100%', marginBottom: '20px', opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              >
                {loading ? '...' : t('auth.login')}
              </button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
              {t('auth.dontHaveAccount')}{' '}
              <Link to="/register" style={{ color: 'var(--primary-accent)', textDecoration: 'none', fontWeight: '600' }}>
                {t('auth.registerHere')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Login;
