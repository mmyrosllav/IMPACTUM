import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import PageTransition from '../components/PageTransition';

const News = () => {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const [threads, setThreads] = useState([
    {
      id: 1,
      author: 'Impactum Team',
      avatar: '👨‍💼',
      title: 'Horizon Europe 2025 Calls Announced',
      content: 'The European Commission has opened new funding opportunities for research and innovation. Key focus areas include climate change, digital transformation, and social innovation.',
      date: 'Apr 20, 2026',
      likes: 24,
      replies: 8,
      tags: ['grants', 'horizon-europe', 'eu'],
    },
    {
      id: 2,
      author: 'Global Fund News',
      avatar: '🌍',
      title: 'COVID-19 Response Fund Opens New Cycle',
      content: 'The Global Fund announces a new funding cycle focused on strengthening health systems in low and middle-income countries.',
      date: 'Apr 19, 2026',
      likes: 18,
      replies: 5,
      tags: ['grants', 'global-fund', 'health'],
    },
    {
      id: 3,
      author: 'USAID Updates',
      avatar: '🏛️',
      title: 'Democracy Initiative Grant Expansion',
      content: 'USAID expands its democracy and governance initiatives with increased funding for civil society organizations.',
      date: 'Apr 18, 2026',
      likes: 31,
      replies: 12,
      tags: ['grants', 'usaid', 'democracy'],
    },
  ]);

  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '' });
  const [selectedTab, setSelectedTab] = useState('grants');

  const handleSubmitThread = (e) => {
    e.preventDefault();
    if (!newThread.title.trim() || !newThread.content.trim()) {
      return;
    }

    const thread = {
      id: threads.length + 1,
      author: user?.name || 'Anonymous',
      avatar: '💬',
      title: newThread.title,
      content: newThread.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
      replies: 0,
      tags: ['community'],
    };

    setThreads([thread, ...threads]);
    setNewThread({ title: '', content: '' });
    setShowNewThread(false);
  };

  const filteredThreads = selectedTab === 'grants'
    ? threads.filter(t => t.tags.some(tag => ['grants', 'horizon-europe', 'global-fund', 'usaid'].includes(tag)))
    : threads;

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <section className="page-header" style={{ borderBottom: 'none', paddingBottom: '20px' }}>
          <h1>{t('news.title')}</h1>
          <p className="page-subtitle">{t('news.subtitle')}</p>
        </section>

        {/* Write Thread Button */}
        {user && (
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <button
              onClick={() => setShowNewThread(!showNewThread)}
              className="btn"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                padding: '12px 30px',
              }}
            >
              📝 {t('news.writeThread')}
            </button>
          </div>
        )}

        {/* New Thread Form */}
        {showNewThread && (
          <div
            className="card"
            style={{
              marginBottom: '40px',
              borderColor: 'var(--primary-accent)',
              borderWidth: '2px',
            }}
          >
            <h3 style={{ marginBottom: '20px' }}>Start a New Thread</h3>
            <form onSubmit={handleSubmitThread}>
              <input
                type="text"
                placeholder="Thread Title"
                value={newThread.title}
                onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                className="form-input"
                style={{ marginBottom: '15px' }}
                required
              />
              <textarea
                placeholder="Share your thoughts, questions, or grant news..."
                value={newThread.content}
                onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                className="form-input"
                rows="5"
                style={{ marginBottom: '15px', resize: 'vertical' }}
                required
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn">
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewThread(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setSelectedTab('grants')}
            className={selectedTab === 'grants' ? 'btn' : 'btn btn-outline'}
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            {t('news.grants')}
          </button>
          <button
            onClick={() => setSelectedTab('all')}
            className={selectedTab === 'all' ? 'btn' : 'btn btn-outline'}
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            {t('news.discussions')}
          </button>
        </div>

        {/* Threads List */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {filteredThreads.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: 'var(--text-muted)' }}>No threads yet. Be the first to share!</p>
            </div>
          ) : (
            filteredThreads.map((thread) => (
              <div
                key={thread.id}
                className="card"
                style={{
                  marginBottom: '20px',
                  borderLeft: '4px solid var(--primary-accent)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(8px)';
                  e.currentTarget.style.borderLeftColor = 'var(--secondary-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderLeftColor = 'var(--primary-accent)';
                }}
              >
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ fontSize: '2.5rem' }}>{thread.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <strong>{thread.author}</strong>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        {thread.date}
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem' }}>
                      {thread.title}
                    </h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '15px' }}>
                      {thread.content}
                    </p>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {thread.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              background: 'rgba(59, 130, 246, 0.1)',
                              color: 'var(--primary-accent)',
                              padding: '4px 10px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              textTransform: 'uppercase',
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        <span>❤️ {thread.likes}</span>
                        <span>💬 {thread.replies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default News;
