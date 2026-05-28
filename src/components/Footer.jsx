import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div className="grid-3" style={{ marginBottom: '40px', textAlign: 'left', gap: '50px' }}>
          <div>
            <h4 style={{ color: '#FFD700', marginBottom: '15px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav.home')}</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav.services')}</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav.about')}</Link></li>
              <li style={{ marginBottom: '8px' }}><Link to="/survey" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav.survey')}</Link></li>
              <li><Link to="/workshop" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('nav.workshop')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFD700', marginBottom: '15px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}>📧 info@impactum.agency</li>
              <li style={{ marginBottom: '8px' }}>📱 +380 (96) 123-4567</li>
              <li>🌍 Kyiv, Ukraine</li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFD700', marginBottom: '15px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Follow</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LinkedIn</a></li>
              <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Twitter</a></li>
              <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Facebook</a></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255, 215, 0, 0.2)', paddingTop: '30px', textAlign: 'center' }}>
          <p style={{ marginBottom: '10px' }}>© {currentYear} Impactum Agency. All rights reserved.</p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(148, 163, 184, 0.6)' }}>
            Transforming ideas into funded projects with excellence and strategy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
