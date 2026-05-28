import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';
import Header from './Header';
import Footer from './Footer';

// ─── EmailJS config (заповніть після реєстрації на emailjs.com) ─
const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? '';
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? '';

const GRANTS = [
  { id: 'horizon-europe',     name: 'Horizon Europe',     deadline: '15 Sep 2026', amount: '€1M – €5M',    tag: 'R&D',         color: '#FFD700' },
  { id: 'usaid-ukraine',      name: 'USAID Ukraine Fund', deadline: '30 Jun 2026', amount: '≤ €150k',       tag: 'Social',      color: '#fff'    },
  { id: 'ebrd-green',         name: 'EBRD Green Economy', deadline: '01 Aug 2026', amount: '€50k – €500k',  tag: 'Environment', color: '#4ade80' },
  { id: 'british-council',    name: 'British Council',    deadline: '20 Jul 2026', amount: '£5k – £50k',    tag: 'Culture',     color: '#60a5fa' },
  { id: 'eu4business',        name: 'EU4Business',        deadline: '31 Oct 2026', amount: '€10k – €200k',  tag: 'SME',         color: '#FFD700' },
  { id: 'ukraine-innovation', name: 'Ukraine Innovation', deadline: '15 Aug 2026', amount: '₴500k – ₴3M',  tag: 'Startup',     color: '#f472b6' },
  { id: 'life-programme',     name: 'LIFE Programme',     deadline: '18 Sep 2026', amount: '€300k – €2M',   tag: 'Climate',     color: '#4ade80' },
  { id: 'gef-small-grants',   name: 'GEF Small Grants',   deadline: '01 Sep 2026', amount: '≤ $50k',        tag: 'Eco',         color: '#4ade80' },
  { id: 'creative-europe',    name: 'Creative Europe',    deadline: '10 Oct 2026', amount: '€50k – €2M',    tag: 'Arts',        color: '#a78bfa' },
  { id: 'eit-urban-mobility', name: 'EIT Urban Mobility', deadline: '05 Aug 2026', amount: '€200k – €1M',   tag: 'Cities',      color: '#60a5fa' },
];

const LOOP = [...GRANTS, ...GRANTS];
const LOOP_REV = [...GRANTS].reverse().concat([...GRANTS].reverse());

const GrantCard = ({ grant }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={`/grants/${grant.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: '240px',
        maxWidth: '240px',
        background: hovered ? `${grant.color}12` : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hovered ? grant.color : grant.color + '35'}`,
        borderRadius: '14px',
        padding: '18px 20px',
        marginRight: '14px',
        flexShrink: 0,
        textDecoration: 'none',
        display: 'block',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 24px ${grant.color}25` : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          fontSize: '0.6rem', fontWeight: '800', textTransform: 'uppercase',
          letterSpacing: '1.5px', color: grant.color,
          background: `${grant.color}18`, padding: '3px 9px', borderRadius: '20px',
        }}>{grant.tag}</span>
        <span style={{
          fontSize: '0.6rem', color: '#4ade80', background: 'rgba(74,222,128,0.1)',
          padding: '3px 8px', borderRadius: '20px', fontWeight: '700',
        }}>● OPEN</span>
      </div>
      <p style={{
        fontSize: '0.9rem', fontWeight: '700', color: '#fff', marginBottom: '8px',
        fontFamily: 'var(--font-main)', lineHeight: '1.3',
      }}>{grant.name}</p>
      <p style={{ fontSize: '1rem', fontWeight: '700', color: grant.color, marginBottom: '6px' }}>{grant.amount}</p>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>⏰ {grant.deadline}</p>
      {hovered && (
        <p style={{ fontSize: '0.7rem', color: grant.color, marginTop: '8px', fontWeight: '600' }}>
          Детальніше →
        </p>
      )}
    </Link>
  );
};

/* Each row manages its own pause state */
const TickerRow = ({ items, animName, duration }) => {
  const [paused, setPaused] = useState(false);
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        overflow: 'hidden',
        width: '100%',
        cursor: 'default',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        maskImage:        'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <div style={{
        display: 'flex',
        animation: `${animName} ${duration}s linear infinite`,
        animationPlayState: paused ? 'paused' : 'running',
        width: 'max-content',
      }}>
        {items.map((g, i) => <GrantCard key={i} grant={g} />)}
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  const { t } = useTranslation();
  const nameRef    = useRef();
  const phoneRef   = useRef();
  const messageRef = useRef();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const name    = nameRef.current.value.trim();
    const phone   = phoneRef.current.value.trim();
    const message = messageRef.current.value.trim() || null;

    // 1. Зберігаємо в Supabase БД
    const { error: dbError } = await supabase.from('contacts').insert({ name, phone, message });
    if (dbError) console.error('DB error:', dbError);

    // 2. Надсилаємо email-сповіщення через EmailJS (якщо налаштовано)
    if (EJS_SERVICE && EJS_TEMPLATE && EJS_KEY) {
      try {
        await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, { name, phone, message: message ?? '—' }, EJS_KEY);
      } catch (ejsErr) {
        console.error('EmailJS error:', ejsErr);
      }
    }

    if (dbError) {
      toast.error(t('contact.errorMsg') || 'Помилка. Спробуйте ще раз.');
    } else {
      toast.success(t('contact.successMsg') || 'Дякуємо! Менеджер зв\'яжеться з вами найближчим часом.');
      nameRef.current.value    = '';
      phoneRef.current.value   = '';
      messageRef.current.value = '';
    }

    setSubmitting(false);
  };

  return (
    <>
      <div className="floating-bg">
        <div className="lava-blob blob-1"></div>
        <div className="lava-blob blob-2"></div>
        <div className="lava-blob blob-3"></div>
        <div className="lava-blob blob-4"></div>
      </div>

      <Header />
      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>{children}</main>

      {/* ── Contact + Grants ── */}
      <section id="contact-section" style={{ padding: '100px 0', background: 'rgba(255,215,0,0.02)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 60px' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: '80px',
            alignItems: 'start',
          }}>

            {/* LEFT — form */}
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '10px', textAlign: 'left', lineHeight: '1.3' }}>
                {t('contact.title') || 'Contact Us'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '32px', lineHeight: '1.6' }}>
                {t('contact.subtitle') || 'Leave your details and we will call you back.'}
              </p>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <input  ref={nameRef}    type="text" className="form-input" placeholder={t('contact.name')    || 'Your name'}     required />
                <input  ref={phoneRef}   type="tel"  className="form-input" placeholder={t('contact.phone')   || 'Phone number'}   required />
                <textarea
                  ref={messageRef}
                  className="form-input"
                  placeholder={t('contact.message') || 'Your message'}
                  rows="4"
                  style={{ resize: 'none' }}
                />
                <button
                  type="submit"
                  className="btn"
                  style={{ marginTop: '6px', opacity: submitting ? 0.7 : 1 }}
                  disabled={submitting}
                >
                  {submitting ? '...' : (t('contact.send') || 'Send Request')}
                </button>
              </form>
            </div>

            {/* RIGHT — ticker */}
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'left', lineHeight: '1.3' }}>
                {t('contact.grantsTitle') || 'Live Grant Opportunities'}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '28px' }}>
                {t('contact.grantsPause') || 'Hover to pause'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <TickerRow items={LOOP}     animName="tickerScroll"        duration={38} />
                <TickerRow items={LOOP_REV} animName="tickerScrollReverse" duration={48} />
              </div>
            </div>

          </div>
        </div>

        <style>{`
          @keyframes tickerScroll        { from { transform: translateX(0);    } to { transform: translateX(-50%); } }
          @keyframes tickerScrollReverse { from { transform: translateX(-50%); } to { transform: translateX(0);    } }
          @media (max-width: 900px) {
            #contact-section > div > div { grid-template-columns: 1fr !important; gap: 50px !important; }
          }
        `}</style>
      </section>

      <Footer />
    </>
  );
};

export default Layout;
