import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleDeleteData = async () => {
    if (!window.confirm(t('settings.deleteConfirm'))) return;

    const { error } = await supabase.from('orders').delete().eq('user_id', user.id);

    if (error) {
      toast.error(t('settings.deleteError'));
      return;
    }

    await supabase.auth.signOut();
    dispatch(logout());
    toast.success(t('settings.dataDeleted'));
    navigate('/');
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <section className="page-header" style={{ textAlign: 'left', border: 'none' }}>
          <h1>{t('settings.title')}</h1>
          <p className="page-subtitle">{t('settings.subtitle')}</p>
        </section>

        <div className="grid-2" style={{ marginTop: '40px' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.8rem' }}>👤</span>
              <h3 style={{ margin: 0 }}>{t('settings.accountInfo')}</h3>
            </div>
            <div style={{ marginTop: '25px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Name</p>
              <p style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: '600' }}>{user?.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Email</p>
              <p style={{ fontSize: '1.1rem' }}>{user?.email}</p>
            </div>
          </div>

          <div className="card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)', borderWidth: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.8rem' }}>⚠️</span>
              <h3 style={{ margin: 0, color: '#ef4444' }}>{t('settings.dangerZone')}</h3>
            </div>
            <p style={{ fontSize: '0.9rem', marginTop: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{t('settings.deleteWarning')}</p>
            <button
              className="btn"
              style={{ background: '#ef4444', marginTop: '25px', width: '100%' }}
              onClick={handleDeleteData}
            >
              {t('settings.deleteData')}
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;