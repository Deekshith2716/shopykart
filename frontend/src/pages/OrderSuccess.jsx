import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1>ORDER PLACED</h1>
      {order && (
        <div className="card" style={{ maxWidth: '420px', margin: '24px auto', padding: '24px', textAlign: 'left' }}>
          <div style={styles.row}><span>Order ID</span><span>{order._id}</span></div>
          <div style={styles.row}><span>Total</span><span style={{ fontWeight: 800 }}>₹{order.totalPrice}</span></div>
          <div style={{ ...styles.row, borderBottom: 'none' }}>
            <span>Status</span>
            <span className="status">{order.status}</span>
          </div>
        </div>
      )}
      <Link to="/" className="btn btn-solid" style={{ display: 'inline-block', marginTop: '16px' }}>
        Continue Shopping
      </Link>
    </div>
  );
};

const styles = {
  row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--text-muted)', fontSize: '14px' },
};

export default OrderSuccess;