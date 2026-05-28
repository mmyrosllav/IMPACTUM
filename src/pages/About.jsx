import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';

const About = () => {
  const { t } = useTranslation();
  const [selectedMember, setSelectedMember] = useState(null);

  const team = [
    {
      id: 'myroslav',
      name: t('about.myroslav.name'),
      role: t('about.myroslav.role'),
      image: '/myroslav.jpg',
      bio: t('about.myroslav.bio'),
    },
    {
      id: 'kateryna',
      name: t('about.kateryna.name'),
      role: t('about.kateryna.role'),
      image: '/kateryna.jpg',
      bio: t('about.kateryna.bio'),
    },
  ];

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px' }}>
        <section className="page-header">
          <h1>{t('about.title')}</h1>
          <p className="page-subtitle">{t('about.subtitle')}</p>
        </section>

        <div className="grid-2" style={{ margin: '60px 0' }}>
          <div>
            <h2>{t('about.mission')}</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginTop: '20px' }}>
              {t('about.missionDesc')}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="card" style={{
              textAlign: 'center',
              borderColor: 'var(--primary-accent)',
              width: '220px',
              height: '220px',
              justifyContent: 'center',
              padding: '0',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--primary-accent)', lineHeight: 1 }}>94%</span>
              <p style={{ color: '#fff', marginTop: '12px', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>{t('home.successRate')}</p>
            </div>
          </div>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>{t('about.management')}</h2>
        <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto 80px' }}>
          {team.map((member) => (
            <div
              key={member.id}
              className="team-member"
              onClick={() => setSelectedMember(member)}
              style={{ cursor: 'pointer' }}
            >
              <div className="avatar-circle" style={{ position: 'relative', marginBottom: '20px' }}>
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    filter: 'grayscale(100%)',
                    transition: 'all 0.4s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.filter = 'grayscale(0%)';
                    e.target.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.filter = 'grayscale(100%)';
                    e.target.style.transform = 'scale(1)';
                  }}
                />
              </div>
              <h3 style={{ color: '#ffffff' }}>{member.name}</h3>
              <p style={{ color: '#ffffff', fontWeight: '600', marginTop: '8px', opacity: 0.75 }}>{member.role}</p>
            </div>
          ))}
        </div>

        {selectedMember && (
          <div
            className="bio-modal-overlay"
            onClick={() => setSelectedMember(null)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              backdropFilter: 'blur(4px)',
              animation: 'fadeIn 0.25s ease',
            }}
          >
            <div
              className="bio-modal"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(20, 21, 28, 0.95)',
                border: '1.5px solid var(--glass-border)',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '500px',
                width: '90%',
                backdropFilter: 'blur(20px)',
                animation: 'slideUp 0.25s ease',
              }}
            >
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                style={{ width: '150px', height: '150px', borderRadius: '50%', margin: '0 auto 20px', display: 'block' }}
              />
              <h3 style={{ textAlign: 'center', marginBottom: '8px', color: '#fff' }}>{selectedMember.name}</h3>
              <p style={{ color: 'var(--primary-accent)', textAlign: 'center', fontWeight: '600', marginBottom: '20px' }}>
                {selectedMember.role}
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '25px' }}>
                {selectedMember.bio}
              </p>
              <button onClick={() => setSelectedMember(null)} className="btn" style={{ width: '100%' }}>
                {t('common.close') || 'Close'}
              </button>
            </div>
          </div>
        )}

        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    </PageTransition>
  );
};

export default About;
