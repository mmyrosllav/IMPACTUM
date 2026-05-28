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

const TESTIMONIALS = [
  {
    id: 1,
    quote: '"Impactum допоміг нам отримати грант на $50k. Їхня стратегія була бездоганною."',
    name: 'Olexiy K.',      role: 'CEO at TechFab',
    initials: 'OK', accent: '#FFD700',
    dur: '4.6s', delay: '0s',    rotate: '-1.5deg',
    pos: { left: '0%',  top: '36px' },
  },
  {
    id: 2,
    quote: '"Сервіс щотижнього моніторингу — це революція для нашої організації."',
    name: 'Iryna M.',        role: "Founder, NGO 'Future'",
    initials: 'IM', accent: '#4ade80',
    dur: '5.2s', delay: '-2.6s', rotate: '1.2deg',
    pos: { left: '27%', top: '10px' },
  },
  {
    id: 3,
    quote: '"Від першого контакту до успішної заявки — лише 3 тижні. Неймовірний результат!"',
    name: 'Vasyl B.',        role: 'Director, EcoStart NGO',
    initials: 'VB', accent: '#60a5fa',
    dur: '4.9s', delay: '-1.4s', rotate: '0.8deg',
    pos: { left: '57%', top: '28px' },
  },
  {
    id: 4,
    quote: '"Команда — справжні профі. Грант €200k отримано з першої спроби."',
    name: 'Kateryna L.',     role: 'Startup Founder',
    initials: 'KL', accent: '#f472b6',
    dur: '5.8s', delay: '-3.2s', rotate: '-0.6deg',
    pos: { left: '12%', top: '272px' },
  },
  {
    id: 5,
    quote: '"Дуже вдячна за аналіз заявки. Виявили проблемні місця, яких ми не бачили."',
    name: 'Olena V.',        role: 'Project Manager, GreenCity',
    initials: 'OV', accent: '#a78bfa',
    dur: '4.3s', delay: '-1.1s', rotate: '1.4deg',
    pos: { left: '43%', top: '255px' },
  },
  {
    id: 6,
    quote: '"Завдяки трекеру дедлайнів жодного разу не запізнились. 10/10!"',
    name: 'Roman S.',        role: 'CFO, SocialWave',
    initials: 'RS', accent: '#fb923c',
    dur: '5.5s', delay: '-4.2s', rotate: '-1deg',
    pos: { left: '71%', top: '265px' },
  },
  {
    id: 7,
    quote: '"За 6 місяців залучили $180k з 3 різних фондів. Рекомендую всім НГО!"',
    name: 'Dmytro P.',       role: 'Executive Director, UA Future',
    initials: 'DP', accent: '#FFD700',
    dur: '4.1s', delay: '-2.05s', rotate: '0.5deg',
    pos: { left: '27%', top: '494px' },
  },
];

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

      {/* ── Testimonials cloud ── */}
      <section style={{ background: 'rgba(255,255,255,0.015)', padding: '80px 0 140px', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1300px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '70px' }}>{t('home.clientSuccess')}</h2>

          <div className="t-cloud">
            {TESTIMONIALS.map(card => (
              <div
                key={card.id}
                className="t-wrap"
                style={{
                  '--dur':   card.dur,
                  '--delay': card.delay,
                  '--rot':   card.rotate,
                }}
              >
                <div
                  className="t-card"
                  style={{ borderColor: card.accent + '38' }}
                >
                  <div
                    className="t-accent-line"
                    style={{ background: card.accent }}
                  />
                  <p className="t-quote">{card.quote}</p>
                  <div className="t-author">
                    <div
                      className="t-avatar"
                      style={{
                        background: card.accent + '1a',
                        border: `1.5px solid ${card.accent}55`,
                        color: card.accent,
                      }}
                    >
                      {card.initials}
                    </div>
                    <div>
                      <div className="t-name">{card.name}</div>
                      <div className="t-role">{card.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          /* ── 3-колонковий grid з вертикальним розкидом ── */
          .t-cloud {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 22px 28px;
            align-items: start;
            padding: 10px 0 60px;
          }

          /* Кожна картка плаває зі своєю фазою і швидкістю */
          .t-wrap {
            width: 100%;
            animation: tFloat var(--dur, 5s) ease-in-out var(--delay, 0s) infinite;
            will-change: transform;
          }

          /* Вертикальний розкид через margin-top */
          .t-wrap:nth-child(1) { margin-top: 20px; }
          .t-wrap:nth-child(2) { margin-top: 0px;  }
          .t-wrap:nth-child(3) { margin-top: 58px; }
          .t-wrap:nth-child(4) { margin-top: 14px; }
          .t-wrap:nth-child(5) { margin-top: 50px; }
          .t-wrap:nth-child(6) { margin-top: 0px;  }
          .t-wrap:nth-child(7) { margin-top: 38px; grid-column: 2; }

          @keyframes tFloat {
            0%   { transform: rotate(var(--rot, 0deg)) translateY(0px);   }
            33%  { transform: rotate(var(--rot, 0deg)) translateY(-18px); }
            66%  { transform: rotate(var(--rot, 0deg)) translateY(6px);   }
            100% { transform: rotate(var(--rot, 0deg)) translateY(0px);   }
          }

          /* ── Card face ── */
          .t-card {
            background: rgba(14, 15, 24, 0.82);
            border: 1.5px solid;
            border-radius: 20px;
            padding: 22px 22px 20px;
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            box-shadow: 0 8px 36px rgba(0,0,0,0.4);
            transition: box-shadow 0.35s, transform 0.35s;
            position: relative;
            overflow: hidden;
            cursor: default;
          }

          .t-card:hover {
            box-shadow: 0 20px 56px rgba(0,0,0,0.55), 0 0 28px rgba(255,215,0,0.1);
            transform: scale(1.04);
          }

          /* Кольорова смужка зверху */
          .t-accent-line {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 3px;
            border-radius: 20px 20px 0 0;
            opacity: 0.7;
          }

          .t-quote {
            font-style: italic;
            font-size: 0.83rem;
            color: #d4d4d4;
            line-height: 1.68;
            margin-bottom: 18px;
            padding-top: 6px;
          }

          .t-author { display: flex; align-items: center; gap: 10px; }

          .t-avatar {
            width: 36px; height: 36px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            font-size: 0.6rem; font-weight: 800;
            flex-shrink: 0; letter-spacing: 0.5px;
          }

          .t-name { font-weight: 700; font-size: 0.84rem; color: #fff; }
          .t-role { font-size: 0.71rem; color: var(--text-muted); margin-top: 2px; }

          /* ── Tablet: 2-col шахово ── */
          @media (max-width: 900px) {
            .t-cloud {
              grid-template-columns: repeat(2, 1fr);
              gap: 18px 22px;
            }
            .t-wrap:nth-child(1) { margin-top: 0; }
            .t-wrap:nth-child(2) { margin-top: 50px; }
            .t-wrap:nth-child(3) { margin-top: 0; }
            .t-wrap:nth-child(4) { margin-top: 44px; }
            .t-wrap:nth-child(5) { margin-top: 0; }
            .t-wrap:nth-child(6) { margin-top: 40px; }
            .t-wrap:nth-child(7) { grid-column: 1; margin-top: 0; }
          }

          /* ── Mobile: 1-col ── */
          @media (max-width: 520px) {
            .t-cloud { grid-template-columns: 1fr; gap: 14px; padding-bottom: 20px; }
            .t-wrap:nth-child(n) { margin-top: 0 !important; grid-column: auto; }
            .t-wrap:nth-child(even) { margin-left: 16px; }
          }
        `}</style>
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
