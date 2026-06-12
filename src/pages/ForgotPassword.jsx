import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import PageTransition from '../components/PageTransition';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  if (sent) {
    return (
      <PageTransition>
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
          <div className="container">
            <div className="card" style={{ maxWidth: '450px', margin: '0 auto', padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📬</div>
              <h2 style={{ marginBottom: '12px' }}>{t('auth.checkEmail')}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '30px' }}>
                {t('auth.resetLinkSent', { email })}
              </p>
              <Link to="/login" className="btn" style={{ display: 'inline-block' }}>
                {t('auth.goToLogin')}
              </Link>
            </div>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: '450px', margin: '0 auto', padding: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ marginBottom: '10px' }}>{t('auth.forgotTitle')}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{t('auth.forgotDesc')}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '30px' }}>
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

              <button
                type="submit"
                className="btn"
                style={{ width: '100%', marginBottom: '20px', opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              >
                {loading ? '...' : t('auth.sendResetLink')}
              </button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
              <Link to="/login" style={{ color: 'var(--primary-accent)', textDecoration: 'none', fontWeight: '600' }}>
                ← {t('auth.backToLogin')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default ForgotPassword;
