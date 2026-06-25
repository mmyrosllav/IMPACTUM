import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import PageTransition from '../components/PageTransition';
import { usePageTitle } from '../hooks/usePageTitle';

const questions = [
  {
    id: 'orgType',
    key: 'survey.q1',
    options: [
      { value: 'business', labelKey: 'survey.q1a1' },
      { value: 'ngo', labelKey: 'survey.q1a2' },
      { value: 'startup', labelKey: 'survey.q1a3' },
      { value: 'individual', labelKey: 'survey.q1a4' },
    ],
  },
  {
    id: 'sector',
    key: 'survey.q2',
    options: [
      { value: 'tech', labelKey: 'survey.q2a1' },
      { value: 'social', labelKey: 'survey.q2a2' },
      { value: 'environment', labelKey: 'survey.q2a3' },
      { value: 'education', labelKey: 'survey.q2a4' },
    ],
  },
  {
    id: 'region',
    key: 'survey.q3',
    options: [
      { value: 'ukraine', labelKey: 'survey.q3a1' },
      { value: 'eu', labelKey: 'survey.q3a2' },
      { value: 'international', labelKey: 'survey.q3a3' },
      { value: 'any', labelKey: 'survey.q3a4' },
    ],
  },
  {
    id: 'budget',
    key: 'survey.q4',
    options: [
      { value: 'small', labelKey: 'survey.q4a1' },
      { value: 'medium', labelKey: 'survey.q4a2' },
      { value: 'large', labelKey: 'survey.q4a3' },
      { value: 'xlarge', labelKey: 'survey.q4a4' },
    ],
  },
  {
    id: 'goal',
    key: 'survey.q5',
    options: [
      { value: 'innovation', labelKey: 'survey.q5a1' },
      { value: 'impact', labelKey: 'survey.q5a2' },
      { value: 'jobs', labelKey: 'survey.q5a3' },
      { value: 'export', labelKey: 'survey.q5a4' },
    ],
  },
];

const getResults = (answers, t) => {
  const results = [];

  if (answers.orgType === 'business' && answers.budget === 'large') {
    results.push({
      name: 'Horizon Europe',
      match: 96,
      desc: t('survey.result1desc'),
      tags: ['€1M–€5M', 'EU', 'Innovation'],
    });
  }
  if (answers.orgType === 'ngo' || answers.sector === 'social') {
    results.push({
      name: 'USAID Grants',
      match: 91,
      desc: t('survey.result2desc'),
      tags: ['€10k–€150k', 'International', 'Social Impact'],
    });
  }
  if (answers.orgType === 'startup' || answers.budget === 'small') {
    results.push({
      name: 'Ukraine Innovation Fund',
      match: 88,
      desc: t('survey.result3desc'),
      tags: ['₴500k–₴3M', 'Ukraine', 'Startups'],
    });
  }
  if (answers.region === 'ukraine') {
    results.push({
      name: 'ДержПідприємство',
      match: 85,
      desc: t('survey.result4desc'),
      tags: ['₴200k–₴1M', 'Ukraine', 'Local Business'],
    });
  }
  if (answers.sector === 'environment') {
    results.push({
      name: 'LIFE Programme',
      match: 89,
      desc: t('survey.result5desc'),
      tags: ['€300k–€2M', 'EU', 'Environment'],
    });
  }

  const defaults = [
    {
      name: 'EBRD Grant Programme',
      match: 82,
      desc: t('survey.result6desc'),
      tags: ['€50k–€500k', 'Europe', 'Business'],
    },
    {
      name: 'EU4Business',
      match: 79,
      desc: t('survey.result7desc'),
      tags: ['€10k–€200k', 'EU', 'SME'],
    },
    {
      name: 'British Council Grants',
      match: 77,
      desc: t('survey.result8desc'),
      tags: ['£5k–£50k', 'International', 'Culture & Education'],
    },
  ];

  const combined = [...results, ...defaults];
  const unique = combined.filter((v, i, a) => a.findIndex(t => t.name === v.name) === i);
  return unique.slice(0, 4).sort((a, b) => b.match - a.match);
};

const GrantSurvey = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.survey'));
  const { user } = useSelector((state) => state.auth);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const current = questions[step];
  const progress = ((step) / questions.length) * 100;

  const saveResponse = async (finalAnswers) => {
    const { error } = await supabase.from('survey_responses').insert({
      user_id: user?.id ?? null,
      answers: finalAnswers,
    });

    if (error) console.error('[Survey] save failed:', error.message);
  };

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setDone(true);
      saveResponse(newAnswers);
    }
  };

  const results = done ? getResults(answers, t) : [];

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '800px' }}>
        {!done ? (
          <>
            <section className="page-header" style={{ marginBottom: '40px' }}>
              <h1>{t('survey.title')}</h1>
              <p className="page-subtitle">{t('survey.subtitle')}</p>
            </section>

            <div style={{ marginBottom: '40px', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {t('survey.step')} {step + 1} / {questions.length}
                </span>
                <span style={{ color: 'var(--primary-accent)', fontSize: '0.9rem', fontWeight: '700' }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #FFD700, #FFC700)',
                  borderRadius: '2px',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <h2 style={{ marginBottom: '35px', textAlign: 'center', fontSize: '1.8rem' }}>
                  {t(current.key)}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      style={{
                        background: 'rgba(255, 215, 0, 0.06)',
                        border: '1.5px solid rgba(255, 215, 0, 0.25)',
                        borderRadius: '16px',
                        padding: '24px 20px',
                        color: '#fff',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'var(--font-main)',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 215, 0, 0.15)';
                        e.currentTarget.style.borderColor = '#FFD700';
                        e.currentTarget.style.color = '#FFD700';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 215, 0, 0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.25)';
                        e.currentTarget.style.color = '#fff';
                      }}
                    >
                      {t(opt.labelKey)}
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  marginTop: '30px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-main)',
                }}
              >
                ← {t('survey.back')}
              </button>
            )}
          </>
        ) : (

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <section className="page-header" style={{ marginBottom: '50px' }}>
              <h1>{t('survey.resultsTitle')}</h1>
              <p className="page-subtitle">{t('survey.resultsSubtitle')}</p>
            </section>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
              {results.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card"
                  style={{ flexDirection: 'row', alignItems: 'center', gap: '25px', padding: '30px', textAlign: 'left' }}
                >
                  <div style={{
                    minWidth: '70px', height: '70px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD700, #FFC700)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column',
                  }}>
                    <span style={{ color: '#000', fontWeight: '900', fontSize: '1.1rem', lineHeight: 1 }}>{r.match}%</span>
                    <span style={{ color: '#000', fontSize: '0.6rem', fontWeight: '700', textTransform: 'uppercase' }}>match</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#fff' }}>{r.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>{r.desc}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {r.tags.map(tag => (
                        <span key={tag} style={{
                          background: 'rgba(255, 215, 0, 0.1)',
                          border: '1px solid rgba(255, 215, 0, 0.3)',
                          padding: '3px 10px', borderRadius: '20px',
                          fontSize: '0.75rem', color: '#FFD700', fontWeight: '600',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '50px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn">{t('survey.orderService')}</Link>
              <button
                className="btn btn-outline"
                onClick={() => { setStep(0); setAnswers({}); setDone(false); }}
              >
                {t('survey.retake')}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default GrantSurvey;
