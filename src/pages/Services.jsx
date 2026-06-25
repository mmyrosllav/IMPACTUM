import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { usePageTitle } from '../hooks/usePageTitle';

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? '';
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? '';

const Services = () => {
  const { t } = useTranslation();
  usePageTitle(t('services.title'));
  const [activeTab, setActiveTab] = useState('All');
  const [selectedService, setSelectedService] = useState(null);

  const [orderService, setOrderService] = useState(null);
  const [orderPhone, setOrderPhone]     = useState('');
  const [orderNote, setOrderNote]       = useState('');
  const [orderSubmitting, setOrderSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const categories = ['All', 'Consulting', 'Monitoring', 'Turnkey'];

  const servicesData = [
    { id: 1, category: 'Consulting', name: t('services.consultation.name'), price: '2,000 - 4,000 ₴', shortDesc: t('services.consultation.shortDesc'), fullDesc: t('services.consultation.fullDesc') },
    { id: 2, category: 'Consulting', name: t('services.editing.name'), price: '4,000 - 7,000 ₴', shortDesc: t('services.editing.shortDesc'), fullDesc: t('services.editing.fullDesc') },
    { id: 3, category: 'Monitoring', name: t('services.smeMonitoring.name'), price: '15,000 ₴', shortDesc: t('services.smeMonitoring.shortDesc'), fullDesc: t('services.smeMonitoring.fullDesc') },
    { id: 4, category: 'Turnkey', name: t('services.standard.name'), price: '15,000 - 25,000 ₴', shortDesc: t('services.standard.shortDesc'), fullDesc: t('services.standard.fullDesc') },
    { id: 5, category: 'Turnkey', name: t('services.vip.name'), price: '30,000 - 60,000 ₴', shortDesc: t('services.vip.shortDesc'), fullDesc: t('services.vip.fullDesc') },
    { id: 6, category: 'Monitoring', name: t('services.ngoMonitoring.name'), price: '8,000 ₴', shortDesc: t('services.ngoMonitoring.shortDesc'), fullDesc: t('services.ngoMonitoring.fullDesc') },
  ];

  const filteredServices = activeTab === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === activeTab);

  const openOrder = (service) => {
    if (!user) {
      toast.error(t('servicesExtra.loginRequired'));
      navigate('/login');
      return;
    }
    setSelectedService(null);
    setOrderPhone('');
    setOrderNote('');
    setOrderService(service);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!orderPhone.trim()) return toast.error(t('servicesExtra.phoneRequired'));

    setOrderSubmitting(true);

    const { error } = await supabase.from('orders').insert({
      user_id:      user.id,
      service_name: orderService.name,
      phone:        orderPhone.trim(),
      note:         orderNote.trim() || null,
    });

    if (error) {
      toast.error(t('servicesExtra.orderError'));
      setOrderSubmitting(false);
      return;
    }

    if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
      try {
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
          name:    user.name,
          phone:   orderPhone.trim(),
          message: `Замовлення послуги: "${orderService.name}" (${orderService.price}).\n` +
                   `Email: ${user.email}\n` +
                   `Побажання: ${orderNote.trim() || '—'}`,
        }, EJS_KEY);
      } catch (err) {
        console.error('[Order] EmailJS error:', err);
      }
    }

    setOrderSubmitting(false);
    setOrderService(null);
    toast.success(t('servicesExtra.orderSaved'));
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <section className="page-header" style={{ borderBottom: 'none', paddingBottom: '20px' }}>
          <h1>{t('services.title')}</h1>
          <p className="page-subtitle">{t('services.subtitle')}</p>
        </section>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={activeTab === cat ? 'btn' : 'btn btn-outline'}
              style={{ padding: '10px 30px', fontSize: '0.85rem', letterSpacing: '1px' }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid-3">
          <AnimatePresence mode='popLayout'>
            {filteredServices.map((service) => (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card"
                >
                  <span style={{
                    fontSize: '0.65rem',
                    color: 'var(--primary-accent)',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    background: 'rgba(255, 215, 0, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    letterSpacing: '1px'
                  }}>
                    {service.category}
                  </span>
                  <h3 style={{ marginTop: '15px', fontSize: '1.4rem' }}>{service.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '12px', flex: 1, cursor: 'pointer', width: '100%' }} onClick={() => setSelectedService(service)}>
                    {service.shortDesc}
                  </p>
                  <div className="price" style={{ margin: '20px 0', fontSize: '1.6rem' }}>{service.price}</div>
                  <div style={{ display: 'flex', gap: '10px', width: '100%', marginTop: 'auto' }}>
                    <button
                      className="btn"
                      style={{ flex: 1, padding: '13px 8px', whiteSpace: 'nowrap', fontSize: '0.78rem', letterSpacing: '0.2px' }}
                      onClick={() => setSelectedService(service)}
                    >
                      {t('servicesExtra.details')}
                    </button>
                    <button
                      className="btn"
                      style={{ flex: 1, padding: '13px 8px', whiteSpace: 'nowrap', fontSize: '0.78rem', letterSpacing: '0.2px', background: 'rgba(255, 215, 0, 0.2)' }}
                      onClick={() => openOrder(service)}
                    >
                      {t('servicesExtra.order')}
                    </button>
                  </div>
                </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {selectedService && (
          <div
            className="service-modal-overlay"
            onClick={() => setSelectedService(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(4px)',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <div
              className="service-modal"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(20, 21, 28, 0.95)',
                border: '1.5px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '50px',
                maxWidth: '700px',
                width: '90%',
                backdropFilter: 'blur(20px)',
                animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                maxHeight: '80vh',
                overflow: 'auto',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div>
                  <span style={{
                    fontSize: '0.65rem',
                    color: 'var(--primary-accent)',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    background: 'rgba(255, 215, 0, 0.1)',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    letterSpacing: '1px',
                    display: 'inline-block',
                  }}>
                    {selectedService.category}
                  </span>
                  <h2 style={{ margin: '15px 0 0 0', fontSize: '2rem' }}>{selectedService.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '20px', marginBottom: '30px' }}>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1.05rem' }}>
                  {selectedService.fullDesc}
                </p>
              </div>

              <div style={{ background: 'rgba(255, 215, 0, 0.05)', padding: '20px', borderRadius: '12px', marginBottom: '30px', borderLeft: '4px solid var(--primary-accent)' }}>
                <p style={{ margin: '0 0 10px 0', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('servicesExtra.price')}</p>
                <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-accent)' }}>{selectedService.price}</p>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  className="btn"
                  style={{ flex: 1 }}
                  onClick={() => openOrder(selectedService)}
                >
                  {t('servicesExtra.orderNow')}
                </button>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                  onClick={() => setSelectedService(null)}
                >
                  {t('servicesExtra.close')}
                </button>
              </div>
            </div>
          </div>
        )}

        {orderService && (
          <div
            onClick={() => !orderSubmitting && setOrderService(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)', animation: 'fadeIn 0.3s ease', padding: '20px' }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ background: 'rgba(20,21,28,0.97)', border: '1.5px solid var(--glass-border)', borderRadius: '20px', padding: '40px', maxWidth: '520px', width: '100%', backdropFilter: 'blur(20px)', animation: 'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)', maxHeight: '88vh', overflow: 'auto' }}
            >
              <span style={{ fontSize: '0.65rem', color: 'var(--primary-accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
                {t('servicesExtra.orderModalTitle')}
              </span>
              <h2 style={{ fontSize: '1.5rem', margin: '8px 0 4px' }}>{orderService.name}</h2>
              <p className="price" style={{ fontSize: '1.3rem', marginBottom: '24px' }}>{orderService.price}</p>

              <form onSubmit={submitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    {t('servicesExtra.orderPhone')} *
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+380…"
                    value={orderPhone}
                    onChange={(e) => setOrderPhone(e.target.value)}
                    required
                    disabled={orderSubmitting}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    {t('servicesExtra.orderNote')}
                  </label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder={t('servicesExtra.orderNotePh')}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    disabled={orderSubmitting}
                    style={{ resize: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="submit" className="btn" style={{ flex: 1, opacity: orderSubmitting ? 0.6 : 1 }} disabled={orderSubmitting}>
                    {orderSubmitting ? '...' : t('servicesExtra.orderConfirm')}
                  </button>
                  <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setOrderService(null)} disabled={orderSubmitting}>
                    {t('servicesExtra.orderCancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </PageTransition>
  );
};

export default Services;