import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (formData.name.length < 2) {
      return toast.error('Name is too short');
    }
    if (!formData.email.includes('@')) {
      return toast.error('Invalid email address');
    }
    if (formData.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }

    dispatch(registerUser({ name: formData.name, email: formData.email }));
    toast.success('Registration successful!');
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <section className="page-header" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Full Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="email" 
                className="form-input" 
                placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="password" 
                className="form-input" 
                placeholder="Password (min 6 chars)" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button type="submit" className="btn" style={{ width: '100%', marginTop: '10px' }}>
                Register
              </button>
            </form>
            <p style={{ marginTop: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--primary-accent)' }}>Login</Link>
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Register;