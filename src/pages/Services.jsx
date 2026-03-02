import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../store/orderSlice';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SkeletonCard from '../components/SkeletonCard';

const Services = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const categories = ['All', 'Consulting', 'Monitoring', 'Turnkey'];

  const servicesData = [
    { id: 1, category: 'Consulting', name: 'Expert Consultation', price: '2,000 - 4,000 ₴', desc: 'Detailed analysis of your project idea and eligibility check.' },
    { id: 2, category: 'Consulting', name: 'Application Editing', price: '4,000 - 7,000 ₴', desc: 'Professional revision of your existing grant proposal.' },
    { id: 3, category: 'Monitoring', name: 'SME Business Monitoring', price: '15,000 ₴', desc: 'Weekly curated list of grants for small and medium enterprises.' },
    { id: 4, category: 'Turnkey', name: 'Standard Package', price: '15,000 - 25,000 ₴', desc: 'End-to-end development of local grant applications.' },
    { id: 5, category: 'Turnkey', name: 'VIP Package', price: '30,000 - 60,000 ₴', desc: 'Complex international grants like Horizon Europe or LIFE.' },
    { id: 6, category: 'Monitoring', name: 'NGO / Micro Monitoring', price: '8,000 ₴', desc: 'Focus on social projects and micro-grants for startups.' },
  ];

  // Simulation of data fetching
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredServices = activeTab === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === activeTab);

  const handleOrder = (serviceName) => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }
    dispatch(addOrder({ serviceName }));
    toast.success(`${serviceName} added to dashboard!`);
  };

  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
        <section className="page-header" style={{ borderBottom: 'none', paddingBottom: '20px' }}>
          <h1>Our Expertise</h1>
          <p className="page-subtitle">Filter by category to find the perfect match for your needs.</p>
        </section>

        {/* Filter Tabs */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '60px',
          flexWrap: 'wrap' 
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={activeTab === cat ? 'btn' : 'btn btn-outline'}
              style={{ padding: '10px 30px', fontSize: '0.85rem', letterSpacing: '1px' }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid-3">
          {isLoading ? (
            // Show 3 Skeletons while loading
            [1, 2, 3].map(n => <SkeletonCard key={n} />)
          ) : (
            <AnimatePresence mode='popLayout'>
              {filteredServices.map((service) => (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card"
                >
                  <span style={{ 
                    fontSize: '0.65rem', 
                    color: 'var(--primary-accent)', 
                    fontWeight: '800', 
                    textTransform: 'uppercase',
                    background: 'rgba(59, 130, 246, 0.1)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    letterSpacing: '1px'
                  }}>
                    {service.category}
                  </span>
                  <h3 style={{ marginTop: '15px', fontSize: '1.4rem' }}>{service.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '12px', minHeight: '60px' }}>
                    {service.desc}
                  </p>
                  <div className="price" style={{ margin: '25px 0', fontSize: '1.6rem' }}>{service.price}</div>
                  <button 
                    className="btn" 
                    style={{ width: '100%' }}
                    onClick={() => handleOrder(service.name)}
                  >
                    Order Now
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;