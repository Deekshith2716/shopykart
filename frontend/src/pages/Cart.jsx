import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>YOUR CART IS EMPTY</h2>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '16px' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>CART</h1>
      <div className="card" style={{ marginTop: '20px' }}>
        {cartItems.map((item, idx) => (
          <div
            key={item._id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '20px',
              borderBottom: idx === cartItems.length - 1 ? 'none' : '2px solid var(--border)',
            }}
          >
            <img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', filter: 'grayscale(100%)' }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, margin: '0 0 4px' }}>{item.name}</p>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '14px' }}>₹{item.price} each</p>
            </div>
            <select
              value={item.qty}
              onChange={(e) => updateQty(item._id, Number(e.target.value))}
              style={{ padding: '8px 10px', border: '2px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
            >
              {[...Array(10).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>{x + 1}</option>
              ))}
            </select>
            <p style={{ fontWeight: 800, minWidth: '80px', textAlign: 'right' }}>₹{item.price * item.qty}</p>
            <button onClick={() => removeFromCart(item._id)} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: '12px' }}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
        <h2 style={{ margin: 0 }}>Total: ₹{totalPrice}</h2>
        <button onClick={handleCheckout} className="btn btn-solid">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;