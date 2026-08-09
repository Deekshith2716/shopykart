import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="container">Loading...</p>;

  if (orders.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <h2>NO ORDERS YET</h2>
        <Link to="/" className="btn btn-outline" style={{ display: 'inline-block', marginTop: '16px' }}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>MY ORDERS</h1>
      <div className="card" style={{ marginTop: '20px', overflow: 'hidden' }}>
        <table>
          <thead>
            <tr><th>Order ID</th><th>Date</th><th>Total</th><th>Status</th></tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>₹{order.totalPrice}</td>
                <td><span className="status">{order.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;