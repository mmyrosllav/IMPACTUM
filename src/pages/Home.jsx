import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';

// FAQ Sub-component for accordion logic
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card" style={{ marginBottom: '15px', padding: '20px', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{question}</h4>
        <span style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)', transition: '0.3s', color: 'var(--primary-accent)' }}>+</span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ marginTop: '15px', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: 0 }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Home = () => {
  const processSteps = [
    { num: '01', title: 'Analysis', desc: 'We study your business model and find the best grant opportunities.' },
    { num: '02', title: 'Strategy', desc: 'Developing a roadmap and preparing all necessary documentation.' },
    { num: '03', title: 'Submission', desc: 'Finalizing the application and supporting you until the grant is won.' }
  ];

  return (
    <PageTransition>
      {/* Hero Section */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <div className="container">
          <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>
            Grantwriting & Strategy
          </span>
          <h1>Professional Grantwriting <br /><span>for Your Success</span></h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 40px', color: '#ccc' }}>
            Transforming your ideas into funded projects with a 94% technical success rate.
          </p>
          <div>
            <Link to="/services" className="btn">Get Started</Link>
            <Link to="/about" className="btn btn-outline" style={{ marginLeft: '20px' }}>Our Team</Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '0' }}>
        <div className="stats-bar">
          <div className="stat-item"><span className="stat-num">94%</span><span className="stat-label">Success</span></div>
          <div className="stat-item"><span className="stat-num">$3M+</span><span className="stat-label">Attracted</span></div>
          <div className="stat-item"><span className="stat-num">50+</span><span className="stat-label">Projects</span></div>
          <div className="stat-item"><span className="stat-num">24/7</span><span className="stat-label">Support</span></div>
        </div>
      </section>

      {/* WORK PROCESS SECTION */}
      <section>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>Our Process</h2>
          <div className="grid-3">
            {processSteps.map(step => (
              <div key={step.num} className="card" style={{ textAlign: 'center', borderTop: '2px solid var(--primary-accent)' }}>
                <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(59, 130, 246, 0.2)', marginBottom: '10px' }}>{step.num}</div>
                <h3 style={{ marginBottom: '15px' }}>{step.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Client Success</h2>
          <div className="grid-2">
            <div className="card">
              <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>"Impactum Agency helped us secure a $50k grant for our manufacturing plant. Their strategy was flawless."</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-accent)' }}></div>
                <div><h4 style={{ margin: 0 }}>Olexiy K.</h4><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CEO at TechFab</span></div>
              </div>
            </div>
            <div className="card">
              <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>"The weekly monitoring service is a game changer. We no longer miss any opportunities in our niche."</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary-accent)' }}></div>
                <div><h4 style={{ margin: 0 }}>Iryna M.</h4><span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Founder of NGO 'Future'</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>Frequently Asked Questions</h2>
          <FAQItem 
            question="What is your success rate?" 
            answer="94% of our applications pass the technical stage. While no one can guarantee 100% success due to donor decisions, we maximize your chances by following strict compliance rules."
          />
          <FAQItem 
            question="How long does it take to prepare a grant?" 
            answer="Depending on the complexity, it takes from 7 to 30 days. We recommend contacting us at least 3 weeks before the deadline."
          />
          <FAQItem 
            question="Do you work with startups?" 
            answer="Yes, we have special monitoring and consulting packages designed for early-stage startups and micro-entrepreneurs."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ textAlign: 'center', padding: '100px 0' }}>
        <div className="container">
          <div className="card" style={{ padding: '60px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)' }}>
            <h2 style={{ marginBottom: '20px' }}>Ready to get funded?</h2>
            <p style={{ marginBottom: '40px', fontSize: '1.1rem' }}>Join 50+ successful projects and start your journey today.</p>
            <Link to="/register" className="btn">Create Free Account</Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;