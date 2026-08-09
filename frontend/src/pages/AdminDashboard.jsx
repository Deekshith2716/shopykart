import { useEffect, useState } from 'react';
import api from '../api/axios';

const AdminDashboard = () => {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', category: '', price: '', stock: '', imageUrl: '' });

  const fetchProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data.products);
  };

  const fetchOrders = async () => {
    const { data } = await api.get('/orders');
    setOrders(data);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchProducts(), fetchOrders()]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const openNewProductForm = () => {
    setEditingProduct(null);
    setForm({ name: '', description: '', category: '', price: '', stock: '', imageUrl: '' });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name, description: product.description, category: product.category,
      price: product.price, stock: product.stock, imageUrl: product.imageUrl,
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Error deleting product');
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      fetchOrders();
    } catch (err) {
      alert('Error updating order status');
    }
  };

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h1>ADMIN</h1>

      <div style={{ display: 'flex', gap: '12px', margin: '20px 0' }}>
        <button onClick={() => setTab('products')} className={tab === 'products' ? 'btn btn-solid' : 'btn btn-outline'}>
          Products
        </button>
        <button onClick={() => setTab('orders')} className={tab === 'orders' ? 'btn btn-solid' : 'btn btn-outline'}>
          Orders
        </button>
      </div>

      {tab === 'products' && (
        <div>
          <button onClick={openNewProductForm} className="btn btn-solid" style={{ marginBottom: '20px' }}>
            + Add Product
          </button>

          {showForm && (
            <form onSubmit={handleSaveProduct} className="card" style={{ padding: '24px', maxWidth: '440px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px' }}>{editingProduct ? 'Edit Product' : 'New Product'}</h2>
              <input name="name" placeholder="Name" value={form.name} onChange={handleFormChange} required style={styles.input} />
              <input name="category" placeholder="Category" value={form.category} onChange={handleFormChange} required style={styles.input} />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleFormChange} required style={{ ...styles.input, minHeight: '70px' }} />
              <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleFormChange} required style={styles.input} />
              <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleFormChange} required style={styles.input} />
              <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleFormChange} required style={styles.input} />
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" className="btn btn-solid">Save</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
              </div>
            </form>
          )}

          <div className="card" style={{ overflow: 'hidden' }}>
            <table>
              <thead>
                <tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>₹{p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      <button onClick={() => openEditForm(p)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px', marginRight: '8px' }}>Edit</button>
                      <button onClick={() => handleDeleteProduct(p._id)} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table>
            <thead>
              <tr><th>Order ID</th><th>Customer</th><th>Total</th><th>Status</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.name || 'Unknown'}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      style={{ padding: '6px 10px', border: '2px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  input: { width: '100%', padding: '10px 12px', marginBottom: '12px', border: '2px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: '14px' },
};

export default AdminDashboard;