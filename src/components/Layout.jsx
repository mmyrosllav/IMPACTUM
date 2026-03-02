import { useState } from 'react';
import Header from './Header';
import ContactModal from './ContactModal';

const Layout = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      {/* Background elements from CSS */}
      <div className="floating-bg">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>
      <div className="ambient-light"></div>
      
      {/* Navigation Header */}
      <Header onContactClick={openModal} />
      
      {/* Main Page Content */}
      <main>{children}</main>
      
      {/* Global Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Common Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2025 Impactum Agency. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;