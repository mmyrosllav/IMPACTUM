import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import PageTransition from '../components/PageTransition';

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [consent, setConsent]   = useState(false);
  const [loading, setLoading]   = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim().length < 2)  return toast.error(t('auth.nameTooShort') || 'Ім\'я занадто коротке');
    if (!formData.email.includes('@'))    return toast.error(t('auth.invalidEmail') || 'Невірний email');
    if (formData.password.length < 6)     return toast.error(t('auth.passwordShort') || 'Пароль мінімум 6 символів');
    if (!consent)                         return toast.error(t('auth.consentRequired'));

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email:    formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name.trim() }, // зберігається в user_metadata
      },
    });

    if (error) {
      toast.error(error.message);
    } else if (data.session) {
      // Email confirmation вимкнено — одразу авторизований
      toast.success(t('auth.registerSuccess') || 'Акаунт створено!');
      navigate('/dashboard');
    } else {
      // Email confirmation увімкнено — просимо перевірити пошту
      setEmailSent(true);
    }

    setLoading(false);
  };

  if (emailSent) {
    return (
      <PageTransition>
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px' }}>
          <div className="container">
            <div className="card" style={{ maxWidth: '450px', margin: '0 auto', padding: '60px', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📬</div>
              <h2 style={{ marginBottom: '12px' }}>{t('auth.checkEmail') || 'Перевірте пошту'}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '30px' }}>
                {t('auth.confirmLink') || `Ми надіслали листа на ${formData.email}. Натисніть посилання для підтвердження.`}
              </p>
              <Link to="/login" className="btn" style={{ display: 'inline-block' }}>
                {t('auth.goToLogin') || 'Перейти до входу'}
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
              <h2 style={{ marginBottom: '10px' }}>{t('auth.getStarted')}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{t('auth.registerDesc') || 'Створіть акаунт для доступу до всіх функцій'}</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>{t('auth.name')}</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Іван Петренко"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>{t('auth.email')}</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>{t('auth.password')}</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '24px', cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={loading}
                  style={{ width: '18px', height: '18px', accentColor: '#FFD700', marginTop: '1px', flexShrink: 0, cursor: 'pointer' }}
                />
                <span>{t('auth.consent')}</span>
              </label>

              <button
                type="submit"
                className="btn"
                style={{ width: '100%', marginBottom: '20px', opacity: (loading || !consent) ? 0.55 : 1 }}
                disabled={loading || !consent}
              >
                {loading ? '...' : t('auth.register')}
              </button>
            </form>

            <p style={{ marginTop: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
              {t('auth.alreadyHaveAccount')}{' '}
              <Link to="/login" style={{ color: 'var(--primary-accent)', textDecoration: 'none', fontWeight: '600' }}>
                {t('auth.loginHere')}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Register;
