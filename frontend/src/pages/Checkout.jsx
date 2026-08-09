import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);

    const orderItems = cartItems.map((item) => ({
      product: item._id,
      name: item.name,
      qty: item.qty,
      price: item.price,
    }));

    try {
      const { data } = await api.post('/orders', {
        orderItems,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod: 'Cash on Delivery',
        totalPrice,
      });
      clearCart();
      navigate(`/order-success/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '640px' }}>
      <h1>CHECKOUT</h1>
      <div className="card" style={{ padding: '32px', marginTop: '20px' }}>
        <form onSubmit={handlePlaceOrder}>
          <input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required style={styles.input} />
          <input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required style={styles.input} />
          <input placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={styles.input} />
          <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required style={styles.input} />

          <div style={{ border: '2px solid var(--border)', padding: '16px', marginBottom: '16px' }}>
            <p style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '13px', margin: '0 0 10px' }}>Order Summary</p>
            {cartItems.map((item) => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', padding: '4px 0' }}>
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, borderTop: '2px solid var(--border)', marginTop: '8px', paddingTop: '8px' }}>
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={placing} className="btn btn-solid" style={{ width: '100%' }}>
            {placing ? 'Placing order...' : 'Place Order (Cash on Delivery)'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  input: { width: '100%', padding: '12px 14px', marginBottom: '16px', border: '2px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '14px' },
};

export default Checkout;