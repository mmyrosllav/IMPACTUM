import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Header = ({ onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

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
          <li><Link to="/about" onClick={closeMenu}>About</Link></li>
          <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
          {user ? (
            <>
              <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
              <li><Link to="/settings" onClick={closeMenu} style={{ opacity: 0.8 }}>Settings</Link></li>
              <li><button onClick={handleLogout} className="nav-btn" style={{ background: '#ef4444', border: 'none', cursor: 'pointer' }}>Exit</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
              <li><button onClick={() => { onContactClick(); closeMenu(); }} className="nav-btn" style={{ border: 'none', cursor: 'pointer' }}>Contact</button></li>
            </>
          )}
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