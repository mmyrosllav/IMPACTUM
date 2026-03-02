import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="card" style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="skeleton" style={{ width: '60px', height: '15px', marginBottom: '15px' }}></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text" style={{ width: '80%' }}></div>
      <div className="skeleton skeleton-price"></div>
      <div className="skeleton skeleton-btn"></div>
    </div>
  );
};

export default SkeletonCard;