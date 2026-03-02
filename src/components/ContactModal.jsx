import React from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Our manager will contact you soon.');
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ display: 'flex' }} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>✕</span>
        <h3>Contact Us</h3>
        <p style={{ marginBottom: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>
          Leave your details and we will call you back.
        </p>
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-input" placeholder="Name" required />
          <input type="tel" className="form-input" placeholder="Phone number" required />
          <textarea 
            className="form-input" 
            placeholder="Your message" 
            rows="4" 
            style={{ resize: 'none' }}
          ></textarea>
          <button type="submit" className="btn" style={{ width: '100%' }}>Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;