import PageTransition from '../components/PageTransition';

const About = () => {
  return (
    <PageTransition>
      <div className="container" style={{ paddingTop: '120px' }}>
        <section className="page-header">
          <h1>Who We Are</h1>
          <p className="page-subtitle">A team that turns your ambitions into winning projects.</p>
        </section>

        <div className="grid-2" style={{ margin: '60px 0' }}>
          <div>
            <h2>Our Mission</h2>
            <p>We analyze the business model, find weak points and strengthen them to make your application look convincing to the donor.</p>
          </div>
          <div className="card" style={{ textAlign: 'center', borderColor: 'var(--primary-accent)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '4rem', fontWeight: '800', color: 'var(--primary-accent)' }}>94%</span>
              <p>Success Rate</p>
            </div>
          </div>
        </div>

        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Management</h2>
        <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto 80px' }}>
          <div className="team-member">
            <div className="avatar">
              <img src="/myroslav.jpg" alt="Myroslav Nemytiy" />
            </div>
            <h3>Myroslav Nemytiy</h3>
            <p style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>CEO & Founder</p>
          </div>
          <div className="team-member">
            <div className="avatar">
              <img src="/kateryna.jpg" alt="Kateryna Havrysh" />
            </div>
            <h3>Kateryna Havrysh</h3>
            <p style={{ color: 'var(--secondary-accent)', fontWeight: 'bold' }}>Co-Founder & GW Head</p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;