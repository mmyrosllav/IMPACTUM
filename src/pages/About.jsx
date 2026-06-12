import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PageTransition from '../components/PageTransition';
import { usePageTitle } from '../hooks/usePageTitle';

// Initials avatar shown when image fails to load
const AvatarFallback = ({ name, size = 200 }) => {
  const initials = name
    ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : '?';
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.3 + 'px',
      fontWeight: '800',
      color: '#000',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
};

const TeamAvatar = ({ src, name, size = 200, style = {} }) => {
  const [failed, setFailed] = useState(false);
  if (failed) return <AvatarFallback name={name} size={size} />;
  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', ...style }}
    />
  );
};

const About = () => {
  const { t } = useTranslation();
  usePageTitle(t('nav.about'));
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
                <TeamAvatar
                  src={member.image}
                  name={member.name}
                  size={200}
                  style={{ objectFit: 'cover', cursor: 'pointer' }}
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
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <TeamAvatar src={selectedMember.image} name={selectedMember.name} size={150} />
              </div>
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
          @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          /* Grayscale hover on team photo */
          .avatar-circle img {
            filter: grayscale(100%);
            transition: filter 0.4s ease, transform 0.4s ease;
          }
          .team-member:hover .avatar-circle img {
            filter: grayscale(0%);
            transform: scale(1.04);
          }
        `}</style>
      </div>
    </PageTransition>
  );
};

export default About;
