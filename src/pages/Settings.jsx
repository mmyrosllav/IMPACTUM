import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { toast } from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleDeleteAccount = () => {
    if (window.confirm('DANGER: This will permanently delete your account data. Proceed?')) {
      dispatch(logout());
      localStorage.clear(); // Complete wipe
      toast.success('Account deleted');
      navigate('/');
    }
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <section className="page-header" style={{ textAlign: 'left', border: 'none' }}>
          <h1>Settings</h1>
          <p className="page-subtitle">Manage your account preferences.</p>
        </section>

        <div className="grid-2" style={{ mt: '40px' }}>
          <div className="card">
            <h3>Account Info</h3>
            <div style={{ mt: '20px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Name:</p>
                <p style={{ mb: '15px' }}>{user?.name}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Email:</p>
                <p>{user?.email}</p>
            </div>
          </div>

          <div className="card" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
            <h3 style={{ color: '#ef4444' }}>Danger Zone</h3>
            <p style={{ fontSize: '0.9rem', mt: '10px' }}>Once you delete your account, there is no going back. Please be certain.</p>
            <button 
                className="btn" 
                style={{ background: '#ef4444', mt: '20px', width: 'fit-content' }}
                onClick={handleDeleteAccount}
            >
                Delete My Account
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;