import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const TOOLS = [
  { id: 'search', icon: '🔍', key: 'workshop.toolSearch' },
  { id: 'writer', icon: '✍️', key: 'workshop.toolWriter' },
  { id: 'analyzer', icon: '📊', key: 'workshop.toolAnalyzer' },
  { id: 'tracker', icon: '📋', key: 'workshop.toolTracker' },
  { id: 'consultant', icon: '💬', key: 'workshop.toolConsultant' },
];

const AI_RESPONSES = {
  search: [
    "🔍 Знайдено 14 активних грантів за вашим запитом...",
    "✅ Horizon Europe — дедлайн 15 вересня 2026, бюджет €1-3M",
    "✅ USAID Ukraine Grants — відкрита заявка, до €150k",
    "✅ EBRD Ukraine Fund — бюджет €50k-€500k, до 30 жовтня",
    "📌 Рекомендуємо почати з USAID — найвищий відсоток успіху для вашого профілю.",
  ],
  writer: [
    "✍️ Аналізую ваш запит...",
    "📝 Генерую структуру заявки: Executive Summary → Problem Statement → Objectives → Budget...",
    "✅ Чорновик готовий! Заявка містить 1200 слів, відповідає вимогам EU Horizon форматування.",
    "💡 Порада: посильте секцію 'Impact Measurement' — донори звертають на неї особливу увагу.",
  ],
  analyzer: [
    "📊 Завантажую документ...",
    "🔎 Аналізую відповідність вимогам фонду...",
    "⚠️ Виявлено 3 ризикові зони: бюджетне обґрунтування (стор. 4), KPI (стор. 7), партнерська угода (стор. 12)",
    "✅ Сильні сторони: чітка логічна структура, конкретні цілі, релевантна команда.",
    "📈 Загальний рейтинг заявки: 78/100. Рекомендовані правки підвищать до 91+.",
  ],
  tracker: [
    "📋 Завантажую ваші активні проєкти...",
    "• Horizon Europe — в роботі (60% готовності) — дедлайн 15.09.2026",
    "• USAID Grant — очікує документів від партнера",
    "• Ukraine Innovation Fund — подано ✅ — результати 01.07.2026",
    "⏰ Наступний дедлайн через 23 дні. Встановити нагадування?",
  ],
  consultant: [
    "💬 Вітаю! Я AI-консультант Impactum.",
    "Я можу допомогти з: вибором грантів, підготовкою заявок, аналізом ризиків та стратегічним плануванням.",
    "Задайте своє питання — і я надам відповідь, засновану на базі 500+ успішних заявок.",
  ],
};

const ChatPanel = ({ toolId, toolName, toolIcon, t }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const messagesRef = useRef();

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const startDemo = () => {
    setStarted(true);
    setLoading(true);
    const responses = AI_RESPONSES[toolId] || [];
    responses.forEach((msg, i) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: msg }]);
        if (i === responses.length - 1) setLoading(false);
      }, (i + 1) * 900);
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'ai',
        text: t('workshop.aiReply') + ` "${userMsg}" — ` + t('workshop.aiReplySuffix'),
      }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '500px' }}>
      {/* Chat header */}
      <div style={{
        padding: '20px 25px',
        borderBottom: '1px solid rgba(255,215,0,0.15)',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{ fontSize: '1.5rem' }}>{toolIcon}</span>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>{toolName}</h3>
          <span style={{ fontSize: '0.75rem', color: '#FFD700' }}>● {t('workshop.online')}</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {!started && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '0.95rem' }}>
              {t('workshop.startPrompt')}
            </p>
            <button className="btn" onClick={startDemo}>{t('workshop.startDemo')}</button>
          </div>
        )}
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,199,0,0.15))'
                : 'rgba(255,255,255,0.06)',
              border: msg.role === 'user'
                ? '1px solid rgba(255,215,0,0.4)'
                : '1px solid rgba(255,255,255,0.1)',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              padding: '12px 16px',
              color: msg.role === 'user' ? '#FFD700' : '#fff',
              fontSize: '0.9rem',
              lineHeight: '1.6',
            }}
          >
            {msg.text}
          </motion.div>
        ))}
        {loading && (
          <div style={{
            alignSelf: 'flex-start', background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px 16px 16px 4px',
            padding: '12px 20px', display: 'flex', gap: '6px', alignItems: 'center',
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: '7px', height: '7px', borderRadius: '50%', background: '#FFD700',
                animation: `bounce 1s infinite ${i * 0.15}s`,
              }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,215,0,0.12)', display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="form-input"
          placeholder={t('workshop.inputPlaceholder')}
          style={{ flex: 1, padding: '12px 16px', fontSize: '0.9rem' }}
        />
        <button
          onClick={handleSend}
          className="btn"
          style={{ padding: '12px 20px', fontSize: '0.9rem' }}
        >
          →
        </button>
      </div>
    </div>
  );
};

const Workshop = () => {
  const { t } = useTranslation();
  const [activeTool, setActiveTool] = useState('consultant');

  const currentTool = TOOLS.find(tool => tool.id === activeTool);

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <section className="page-header">
          <h1>{t('workshop.title')}</h1>
          <p className="page-subtitle">{t('workshop.subtitle')}</p>
        </section>

        <div className="workshop-layout" style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr',
          gap: '0',
          width: '100%',
          maxWidth: '1100px',
          background: 'rgba(255,215,0,0.03)',
          border: '1.5px solid rgba(255,215,0,0.2)',
          borderRadius: '24px',
          overflow: 'hidden',
          height: '620px',
        }}>
          {/* Sidebar */}
          <div className="workshop-sidebar" style={{
            borderRight: '1px solid rgba(255,215,0,0.15)',
            padding: '24px 0',
            background: 'rgba(0,0,0,0.3)',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,215,0,0.1)' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
                {t('workshop.tools')}
              </p>
            </div>
            <div className="workshop-tools" style={{ padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
              {TOOLS.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`workshop-tool-btn${activeTool === tool.id ? ' active' : ''}`}
                  style={{
                    width: '100%',
                    padding: '14px 22px',
                    background: activeTool === tool.id ? 'rgba(255,215,0,0.12)' : 'none',
                    border: 'none',
                    borderLeft: activeTool === tool.id ? '3px solid #FFD700' : '3px solid transparent',
                    color: activeTool === tool.id ? '#FFD700' : 'var(--text-muted)',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-main)',
                    fontWeight: activeTool === tool.id ? '700' : '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTool !== tool.id) e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    if (activeTool !== tool.id) e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{tool.icon}</span>
                  {t(tool.key)}
                </button>
              ))}
            </div>

            <div className="workshop-beta" style={{ margin: '20px 20px 0', padding: '16px', background: 'rgba(255,215,0,0.06)', borderRadius: '12px', border: '1px solid rgba(255,215,0,0.15)' }}>
              <p style={{ fontSize: '0.75rem', color: '#FFD700', fontWeight: '700', marginBottom: '6px' }}>
                {t('workshop.betaLabel')}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                {t('workshop.betaDesc')}
              </p>
            </div>
          </div>

          {/* Main chat panel */}
          <div className="workshop-chat" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              >
                <ChatPanel
                  toolId={activeTool}
                  toolName={t(currentTool.key)}
                  toolIcon={currentTool.icon}
                  t={t}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </PageTransition>
  );
};

export default Workshop;
