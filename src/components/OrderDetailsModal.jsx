const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const name = order.service_name;

  const getInstructions = (n) => {
    if (n?.includes('Consulting') || n?.includes('Консультація'))
      return 'Підготуйте чорновик вашого проєкту та список питань для дзвінка. Ми зв\'яжемося з вами протягом 24 годин для узгодження зустрічі.';
    if (n?.includes('Monitoring') || n?.includes('Моніторинг'))
      return 'Ви отримаєте перший PDF-звіт у понеділок вранці. Перевірте email — там буде анкета про ваш бізнес-профіль.';
    if (n?.includes('Turnkey') || n?.includes('Підготовка'))
      return 'Наш провідний спеціаліст зателефонує вам для детального інтерв\'ю. Підготуйте фінансові документи та бізнес-план.';
    return 'Наш менеджер розглядає ваш запит. Очікуйте дзвінка найближчим часом.';
  };

  return (
    <div
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'rgba(20,21,28,0.97)', border: '1.5px solid var(--glass-border)', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '90%', backdropFilter: 'blur(20px)' }}
      >
        <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px', marginBottom: '24px' }}>
          <span style={{ fontSize: '0.65rem', color: 'var(--primary-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
            Деталі замовлення
          </span>
          <h2 style={{ fontSize: '1.5rem', marginTop: '8px', marginBottom: 0 }}>{name}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>ID замовлення</p>
            <p style={{ fontWeight: '600', fontFamily: 'monospace', fontSize: '0.9rem' }}>#{order.id.slice(-8).toUpperCase()}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Дата</p>
            <p style={{ fontWeight: '600' }}>{new Date(order.created_at).toLocaleDateString('uk-UA')}</p>
          </div>
          <div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Статус</p>
            <p style={{ color: 'var(--primary-accent)', fontWeight: '800' }}>{order.status.toUpperCase()}</p>
          </div>
          {order.phone && (
            <div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Телефон</p>
              <p style={{ fontWeight: '600' }}>{order.phone}</p>
            </div>
          )}
        </div>

        {order.note && (
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Ваші побажання</p>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#fff' }}>{order.note}</p>
          </div>
        )}

        <div style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
          <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--primary-accent)' }}>Наступні кроки:</h4>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#fff' }}>
            {getInstructions(name)}
          </p>
        </div>

        <button className="btn" style={{ width: '100%' }} onClick={onClose}>Закрити</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
