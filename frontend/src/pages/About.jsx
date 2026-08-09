const About = () => {
  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h1>ABOUT</h1>
      <p style={styles.text}>
        ShopyKart is a full-stack e-commerce platform built to demonstrate a complete
        online shopping experience — from browsing products to checkout and order tracking.
      </p>
      <p style={styles.text}>
        The platform supports role-based access, allowing customers to shop seamlessly
        while giving administrators full control over inventory and order management
        through a dedicated dashboard.
      </p>
      <p style={styles.text}>
        Built with the MERN stack (MongoDB, Express, React, Node.js), ShopyKart focuses
        on clean architecture, secure authentication, and a straightforward user experience.
      </p>
    </div>
  );
};

const styles = {
  text: { lineHeight: 1.7, marginBottom: '20px', color: 'var(--text-muted)', fontSize: '15px' },
};

export default About;