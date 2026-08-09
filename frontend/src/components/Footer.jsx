import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.column}>
          <p style={styles.logo}>SHOPYKART</p>
          <p style={styles.text}>
            123 Market Street<br />
            Rajahmundry, Andhra Pradesh 533101<br />
            India
          </p>
        </div>

        <div style={styles.column}>
          <p style={styles.heading}>Shop</p>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/collections" style={styles.link}>Collections</Link>
          <Link to="/cart" style={styles.link}>Cart</Link>
        </div>

        <div style={styles.column}>
          <p style={styles.heading}>Company</p>
          <Link to="/about" style={styles.link}>About</Link>
          <Link to="/contact" style={styles.link}>Contact</Link>
        </div>

        <div style={styles.column}>
          <p style={styles.heading}>Contact</p>
          <p style={styles.text}>support@shopykart.com</p>
          <p style={styles.text}>+91 98765 43210</p>
        </div>
      </div>

      <div style={styles.bottom}>
        <p style={{ margin: 0, fontSize: '13px' }}>© {new Date().getFullYear()} ShopyKart. All rights reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: '2px solid var(--border)',
    marginTop: '60px',
    padding: '48px 32px 0',
  },
  inner: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingBottom: '32px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: '180px',
  },
  logo: {
    fontWeight: 800,
    fontSize: '18px',
    letterSpacing: '-0.5px',
    marginBottom: '8px',
  },
  heading: {
    fontWeight: 700,
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  text: {
    fontSize: '14px',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    margin: 0,
  },
  link: {
    fontSize: '14px',
    color: 'var(--text-muted)',
  },
  bottom: {
    borderTop: '1px solid var(--text-muted)',
    padding: '20px 0',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
};

export default Footer;