import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '20px',
          background: '#0a0b10', color: '#fff', textAlign: 'center', padding: '20px',
        }}>
          <span style={{ fontSize: '3rem' }}>⚠️</span>
          <h2 style={{ color: '#FFD700', margin: 0 }}>Щось пішло не так</h2>
          <p style={{ color: '#b8b8b8', maxWidth: '400px' }}>
            Сталася непередбачена помилка. Спробуйте оновити сторінку.
          </p>
          <button
            className="btn"
            onClick={() => window.location.reload()}
            style={{ marginTop: '10px' }}
          >
            Оновити сторінку
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
