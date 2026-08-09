import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '80px', margin: 0 }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-solid" style={{ display: 'inline-block' }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;