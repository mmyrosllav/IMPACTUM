import React from 'react';

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  // Logic for dynamic instructions based on service type
  const getInstructions = (name) => {
    if (name.includes('Consulting')) return "Please prepare your project draft and a list of questions for our call. We will contact you within 24 hours to schedule a meeting.";
    if (name.includes('Monitoring')) return "You will receive your first PDF report on Monday morning. Check your email for a questionnaire about your business profile.";
    if (name.includes('Turnkey')) return "Our leading specialist will call you for a deep-dive interview. Please have your financial documents and business plan ready.";
    return "Our manager is reviewing your request. Expect a call shortly.";
  };

  return (
    <div className="modal-overlay" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <span className="close-modal" onClick={onClose}>✕</span>
        <div style={{ borderBottom: '1px solid var(--glass-border)', pb: '15px', mb: '20px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--primary-accent)', fontWeight: '800' }}>ORDER DETAILS</span>
            <h2 style={{ fontSize: '1.5rem', mt: '5px' }}>{order.serviceName}</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', mb: '30px' }}>
            <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', mb: '5px' }}>Order ID:</p>
                <p style={{ fontWeight: '600' }}>#{order.id.toString().slice(-8)}</p>
            </div>
            <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', mb: '5px' }}>Date:</p>
                <p style={{ fontWeight: '600' }}>{order.date}</p>
            </div>
            <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', mb: '5px' }}>Current Status:</p>
                <p style={{ color: 'var(--primary-accent)', fontWeight: '800' }}>{order.status.toUpperCase()}</p>
            </div>
        </div>

        <div className="card" style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '20px' }}>
            <h4 style={{ mb: '10px', fontSize: '0.9rem' }}>Next Steps:</h4>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#fff' }}>
                {getInstructions(order.serviceName)}
            </p>
        </div>

        <button className="btn" style={{ width: '100%', mt: '25px' }} onClick={onClose}>Close Window</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;