import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logout } from '../store/authSlice';
import { supabase } from '../lib/supabase';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Supabase очищає сесію
    dispatch(logout());            // Redux очищає UI-стан
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const handleContactClick = () => {
    closeMenu();
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <header>
      <Link to="/" className="logo-wrapper" onClick={closeMenu}>
        <div className="css-logo">
          <div className="logo-top">IMPACTUM</div>
          <div className="logo-btm">AGENCY</div>
          <div className="logo-slash"></div>
        </div>
      </Link>

      <div className="burger" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', cursor: 'pointer', zIndex: '1001' }}>
        <div style={{ width: '25px', height: '2px', background: '#fff', margin: '5px 0', transition: '0.3s', transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }}></div>
        <div style={{ width: '25px', height: '2px', background: '#fff', margin: '5px 0', opacity: isMenuOpen ? 0 : 1 }}></div>
        <div style={{ width: '25px', height: '2px', background: '#fff', margin: '5px 0', transition: '0.3s', transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }}></div>
      </div>

      <nav className={isMenuOpen ? 'nav-active' : ''}>
        <ul>
          <li><Link to="/about" onClick={closeMenu}>{t('nav.about')}</Link></li>
          <li><Link to="/services" onClick={closeMenu}>{t('nav.services')}</Link></li>
          <li><Link to="/survey" onClick={closeMenu}>{t('nav.survey')}</Link></li>
          <li><Link to="/workshop" onClick={closeMenu}>{t('nav.workshop')}</Link></li>
          <li><Link to="/games" onClick={closeMenu}>{t('nav.games')}</Link></li>
          <li><Link to="/news" onClick={closeMenu}>{t('nav.news')}</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={closeMenu}>{t('nav.dashboard')}</Link></li>
              <li><Link to="/settings" onClick={closeMenu}>{t('nav.settings')}</Link></li>
              <li><button onClick={handleLogout} className="nav-btn" style={{ background: '#ef4444', border: 'none', cursor: 'pointer' }}>{t('nav.logout')}</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeMenu}>{t('nav.login')}</Link></li>
              <li><button onClick={handleContactClick} className="nav-btn" style={{ border: 'none', cursor: 'pointer' }}>Contact</button></li>
            </>
          )}
          <li>
            <button
              onClick={() => handleLanguageChange(i18n.language === 'en' ? 'uk' : 'en')}
              className="lang-btn"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFC700 100%)',
                border: '2px solid #FFD700',
                padding: '8px 16px',
                borderRadius: '50px',
                cursor: 'pointer',
                color: '#000',
                fontSize: '0.82rem',
                transition: 'opacity 0.2s ease',
                fontWeight: '700',
                letterSpacing: '1px',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              {i18n.language === 'en' ? '🇺🇦 УК' : '🇬🇧 EN'}
            </button>
          </li>
        </ul>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .burger { display: block !important; }
          nav {
            position: fixed; right: -100%; top: 0; height: 100vh; width: 70%;
            background: #0a0b10; border-left: 1px solid var(--glass-border);
            transition: 0.5s; padding: 100px 40px;
          }
          nav.nav-active { right: 0; }
          nav ul { flex-direction: column; align-items: flex-start; gap: 30px; }
        }
      `}</style>
    </header>
  );
};

export default Header;
