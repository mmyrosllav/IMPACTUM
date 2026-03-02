import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import PageTransition from '../components/PageTransition';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      user: { name: 'Miroslav', email },
      token: 'fake-jwt-token',
    };
    dispatch(setCredentials(userData));
    toast.success('Welcome back!');
    navigate('/dashboard');
  };

  return (
    <PageTransition>
      <section className="page-header" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container">
          <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                className="form-input" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <input 
                type="password" 
                className="form-input" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button type="submit" className="btn" style={{ width: '100%' }}>Sign In</button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Login;