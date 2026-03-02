import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
  return (
    <PageTransition>
      <div className="container" style={{ 
        height: '80vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center' 
      }}>
        {/* Великий стилізований текст 404 */}
        <h1 style={{ 
          fontSize: '10rem', 
          fontWeight: '900', 
          marginBottom: '0', 
          lineHeight: '1',
          background: 'linear-gradient(135deg, var(--primary-accent) 0%, var(--secondary-accent) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          opacity: 0.8
        }}>
          404
        </h1>
        
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Page Not Found</h2>
        
        <p style={{ 
          maxWidth: '500px', 
          margin: '0 auto 40px', 
          color: 'var(--text-muted)',
          fontSize: '1.1rem' 
        }}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link to="/" className="btn">
          Return to Homepage
        </Link>

        {/* Декоративний елемент (орб), щоб заповнити простір */}
        <div className="orb" style={{ 
          width: '300px', 
          height: '300px', 
          background: 'var(--primary-accent)', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          zIndex: '-1',
          opacity: 0.1
        }}></div>
      </div>
    </PageTransition>
  );
};

export default NotFound;