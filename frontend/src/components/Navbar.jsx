import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { userInfo, logout } = useAuth();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">SHOPYKART</Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/collections">Collections</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
        {userInfo ? (
          <>
            <Link to="/myorders">Orders</Link>
            {userInfo.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '6px 14px', fontSize: '12px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;