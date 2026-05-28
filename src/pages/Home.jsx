import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card" style={{ marginBottom: '15px', padding: '20px', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem', textAlign: 'left' }}>{question}</h4>
        <span style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: '0.3s', color: 'var(--primary-accent)', flexShrink: 0, marginLeft: '20px' }}>+</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', width: '100%' }}
          >
            <p style={{ marginTop: '15px', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 0, textAlign: 'left' }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const processSteps = [
    { num: '01', title: t('home.analysis'), desc: t('home.analysisDesc') },
    { num: '02', title: t('home.strategy'), desc: t('home.strategyDesc') },
    { num: '03', title: t('home.submission'), desc: t('home.submissionDesc') }
  ];

  return (
    <PageTransition>
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>
            {t('home.tagline')}
          </span>
          <h1>{t('home.hero')}</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px', color: '#ccc' }}>
            {t('home.heroDesc')}
          </p>
          <div>
            <Link to="/survey" className="btn">{t('home.getStarted')}</Link>
            <Link to="/about" className="btn btn-outline" style={{ marginLeft: '20px' }}>{t('home.ourTeam')}</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '0' }}>
        <div className="stats-bar">
          <div className="stat-item"><span className="stat-num">94%</span><span className="stat-label">Success</span></div>
          <div className="stat-item"><span className="stat-num">$3M+</span><span className="stat-label">Attracted</span></div>
          <div className="stat-item"><span className="stat-num">50+</span><span className="stat-label">Projects</span></div>
          <div className="stat-item"><span className="stat-num">24/7</span><span className="stat-label">Support</span></div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>{t('home.ourProcess')}</h2>
          <div className="grid-3">
            {processSteps.map(step => (
              <div key={step.num} className="card" style={{ textAlign: 'center', borderTop: '2px solid var(--primary-accent)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(255, 215, 0, 0.2)', marginBottom: '10px' }}>{step.num}</div>
                <h3 style={{ marginBottom: '15px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>{t('home.clientSuccess')}</h2>
          <div className="grid-2">
            <div className="card">
              <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>&quot;{t('home.testimonial1')}&quot;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-accent)' }}></div>
                <div><h4 style={{ margin: 0 }}>Olexiy K.</h4><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CEO at TechFab</span></div>
              </div>
            </div>
            <div className="card">
              <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>&quot;{t('home.testimonial2')}&quot;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-accent)' }}></div>
                <div><h4 style={{ margin: 0 }}>Iryna M.</h4><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Founder of NGO &apos;Future&apos;</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>{t('home.faq')}</h2>
          <FAQItem question={t('home.faq1q')} answer={t('home.faq1a')} />
          <FAQItem question={t('home.faq2q')} answer={t('home.faq2a')} />
          <FAQItem question={t('home.faq3q')} answer={t('home.faq3a')} />
        </div>
      </section>

      <section style={{ textAlign: 'center', padding: '100px 0' }}>
        <div className="container">
          <div className="card" style={{ padding: '60px', background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 199, 0, 0.06) 100%)' }}>
            <h2 style={{ marginBottom: '20px' }}>{t('home.cta')}</h2>
            <p style={{ marginBottom: '40px', fontSize: '1.1rem' }}>{t('home.ctaDesc')}</p>
            <Link to="/register" className="btn">{t('home.createAccount')}</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
