import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import PageTransition from '../components/PageTransition';
import { usePageTitle } from '../hooks/usePageTitle';
import OrderDetailsModal from '../components/OrderDetailsModal';

const Dashboard = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.dashboard'));
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders]           = useState([]);
  const [loading, setLoading]         = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async (userId) => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error(t('dashboard.fetchError'));
      setOrders([]);
    } else {
      setOrders(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchOrders(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm(t('dashboard.deleteConfirm'))) return;

    const { error } = await supabase.from('orders').delete().eq('id', id);
    if (error) {
      toast.error(t('dashboard.deleteError'));
    } else {
      setOrders(prev => prev.filter(o => o.id !== id));
      toast.success(t('dashboard.deleteSuccess'));
    }
  };

  const getStatusStyle = (status) => {
    if (status === 'Completed') return { color: '#10b981', background: 'rgba(16,185,129,0.1)' };
    if (status === 'Active')    return { color: '#60a5fa', background: 'rgba(96,165,250,0.1)' };
    return { color: '#FFD700', background: 'rgba(255,215,0,0.1)' };
  };

  const getStatusLabel = (status) => {
    if (status === 'Completed') return t('dashboard.statusCompleted');
    if (status === 'Active')    return t('dashboard.statusActive');
    return t('dashboard.statusPending');
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1>{t('dashboard.greeting', { name: user?.name })}</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '6px' }}>{user?.email}</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div className="card" style={{ padding: '15px 30px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800' }}>{orders.length}</span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{t('dashboard.orders')}</p>
            </div>
            <div className="card" style={{ padding: '15px 30px', textAlign: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#4ade80' }}>
                {orders.filter(o => o.status === 'Completed').length}
              </span>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>{t('dashboard.completed')}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ margin: 0 }}>{t('dashboard.myOrders')}</h3>
            <Link to="/services" className="btn" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
              {t('dashboard.newOrder')}
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              <div style={{ width: '32px', height: '32px', border: '3px solid rgba(255,215,0,0.2)', borderTop: '3px solid #FFD700', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              {t('dashboard.loading')}
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '16px' }}>📋</p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{t('dashboard.noOrders')}</p>
              <Link to="/services" className="btn">{t('dashboard.viewServices')}</Link>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <th style={{ padding: '12px 15px' }}>{t('dashboard.service')}</th>
                    <th style={{ padding: '12px 15px' }}>{t('dashboard.date')}</th>
                    <th style={{ padding: '12px 15px' }}>{t('dashboard.status')}</th>
                    <th style={{ padding: '12px 15px', textAlign: 'right' }}>{t('dashboard.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: '0.2s' }}
                      className="table-row-hover"
                    >
                      <td style={{ padding: '16px 15px', fontWeight: '600' }}>{order.service_name}</td>
                      <td style={{ padding: '16px 15px', color: 'var(--text-muted)' }}>
                        {new Date(order.created_at).toLocaleDateString('uk-UA')}
                      </td>
                      <td style={{ padding: '16px 15px' }}>
                        <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '700', ...getStatusStyle(order.status) }}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 15px', textAlign: 'right' }}>
                        <button
                          onClick={(e) => handleDelete(e, order.id)}
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', padding: '4px 8px', borderRadius: '6px', transition: '0.2s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          {t('dashboard.delete')}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdated={() => fetchOrders(user.id)}
      />

      <style>{`
        .table-row-hover:hover { background: rgba(255,255,255,0.03); }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </PageTransition>
  );
};

export default Dashboard;
