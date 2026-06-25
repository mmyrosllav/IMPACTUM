import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase';

const OrderDetailsModal = ({ order, onClose, onUpdated }) => {
  const [phone, setPhone] = useState(order?.phone ?? '');
  const [note, setNote]   = useState(order?.note ?? '');
  const [saving, setSaving] = useState(false);

  if (!order) return null;

  const name = order.service_name;
  const isPending = order.status === 'Pending';

  const getInstructions = (n) => {
    if (n?.includes('Consulting') || n?.includes('Консультація'))
      return 'Підготуйте чорновик вашого проєкту та список питань для дзвінка. Ми зв\'яжемося з вами протягом 24 годин для узгодження зустрічі.';
    if (n?.includes('Monitoring') || n?.includes('Моніторинг'))
      return 'Ви отримаєте перший PDF-звіт у понеділок вранці. Перевірте email — там буде анкета про ваш бізнес-профіль.';
    if (n?.includes('Turnkey') || n?.includes('Підготовка'))
      return 'Наш провідний спеціаліст зателефонує вам для детального інтерв\'ю. Підготуйте фінансові документи та бізнес-план.';
    return 'Наш менеджер розглядає ваш запит. Очікуйте дзвінка найближчим часом.';
  };

  const handleSave = async () => {
    if (!phone.trim()) return toast.error('Вкажіть номер телефону для зв\'язку');
    setSaving(true);
    const { error } = await supabase
      .from('orders')
      .update({ phone: phone.trim(), note: note.trim() || null })
      .eq('id', order.id);
    setSaving(false);

    if (error) {
      toast.error('Не вдалося зберегти зміни');
    } else {
      toast.success('Замовлення доповнено! Менеджер зв\'яжеться з вами.');
      onUpdated?.();
      onClose();
    }
  };

  return (
    <div
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)', padding: '20px' }}
      onClick={() => !saving && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ background: 'rgba(20,21,28,0.97)', border: '1.5px solid var(--glass-border)', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '100%', backdropFilter: 'blur(20px)', maxHeight: '88vh', overflow: 'auto' }}
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
        </div>

        {isPending ? (
          <div style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: '12px', padding: '22px', marginBottom: '24px' }}>
            <h4 style={{ marginBottom: '6px', fontSize: '1rem', color: 'var(--primary-accent)' }}>Продовжити замовлення</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: '1.5' }}>
              Вкажіть телефон і опишіть ваш проєкт — це допоможе менеджеру підготуватись до дзвінка.
            </p>

            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Номер телефону *</label>
            <input
              type="tel"
              className="form-input"
              placeholder="+380…"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={saving}
              style={{ marginBottom: '14px' }}
            />

            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Ваші побажання</label>
            <textarea
              className="form-input"
              rows="3"
              placeholder="Опишіть ваш проєкт або побажання…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={saving}
              style={{ resize: 'none', marginBottom: '18px' }}
            />

            <button className="btn" style={{ width: '100%', opacity: saving ? 0.6 : 1 }} onClick={handleSave} disabled={saving}>
              {saving ? '...' : 'Зберегти зміни'}
            </button>
          </div>
        ) : (
          <>
            {order.phone && (
              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Телефон</p>
                <p style={{ fontWeight: '600' }}>{order.phone}</p>
              </div>
            )}
            {order.note && (
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>Ваші побажання</p>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#fff' }}>{order.note}</p>
              </div>
            )}
          </>
        )}

        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '20px', marginBottom: '28px' }}>
          <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--primary-accent)' }}>Наступні кроки:</h4>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: '#fff' }}>
            {getInstructions(name)}
          </p>
        </div>

        <button className="btn btn-outline" style={{ width: '100%' }} onClick={onClose} disabled={saving}>Закрити</button>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
