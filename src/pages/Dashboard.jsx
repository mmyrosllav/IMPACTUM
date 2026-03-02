import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeOrder } from '../store/orderSlice';
import { updateProfile } from '../store/authSlice';
import { toast } from 'react-hot-toast';
import PageTransition from '../components/PageTransition';
import OrderDetailsModal from '../components/OrderDetailsModal'; // Import new modal

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.orders);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [selectedOrder, setSelectedOrder] = useState(null); // State for details

  const handleUpdateName = () => {
    if (newName.trim().length < 2) return toast.error('Name is too short');
    dispatch(updateProfile({ name: newName }));
    setIsEditing(false);
    toast.success('Profile updated');
  };

  const handleCancel = (e, id) => {
    e.stopPropagation(); // Prevents modal from opening when clicking cancel
    if (window.confirm('Cancel this order?')) {
      dispatch(removeOrder(id));
      toast.success('Order removed');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return { color: '#fbbf24', background: 'rgba(251, 191, 36, 0.1)' };
      case 'Active': return { color: '#3b82f6', background: 'rgba(59, 130, 246, 0.1)' };
      default: return { color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' };
    }
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input className="form-input" style={{ mb: 0 }} value={newName} onChange={(e) => setNewName(e.target.value)} />
                <button className="btn" onClick={handleUpdateName}>Save</button>
              </div>
            ) : (
              <h1>Welcome, {user?.name}! <span onClick={() => setIsEditing(true)} style={{ fontSize: '0.8rem', cursor: 'pointer', color: 'var(--primary-accent)' }}>(edit)</span></h1>
            )}
            <p style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
          </div>
          <div className="card" style={{ padding: '15px 30px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>{items.length} Orders</span>
          </div>
        </div>

        <div className="card">
          <h3>Your Orders (Click for details)</h3>
          {items.length === 0 ? (
            <p style={{ mt: '20px' }}>No orders found.</p>
          ) : (
            <div style={{ overflowX: 'auto', mt: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', fontSize: '0.8rem' }}>
                    <th style={{ padding: '15px' }}>SERVICE</th>
                    <th style={{ padding: '15px' }}>DATE</th>
                    <th style={{ padding: '15px' }}>STATUS</th>
                    <th style={{ padding: '15px', textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((order) => (
                    <tr 
                        key={order.id} 
                        onClick={() => setSelectedOrder(order)} 
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', transition: '0.2s' }}
                        className="table-row-hover"
                    >
                      <td style={{ padding: '15px', fontWeight: '600' }}>{order.serviceName}</td>
                      <td style={{ padding: '15px' }}>{order.date}</td>
                      <td style={{ padding: '15px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', ...getStatusStyle(order.status) }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'right' }}>
                        <button onClick={(e) => handleCancel(e, order.id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />

      <style>{`
        .table-row-hover:hover { background: rgba(255,255,255,0.03); }
      `}</style>
    </PageTransition>
  );
};

export default Dashboard;