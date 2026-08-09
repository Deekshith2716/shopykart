import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="container">Loading...</p>;
  if (error) return <p className="container error-text">{error}</p>;

  return (
    <div className="container">
      <h1>SHOP</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        Browse the full catalog.
      </p>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: '12px 14px',
          width: '100%',
          maxWidth: '340px',
          border: '2px solid var(--border)',
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      />

      {filtered.length === 0 ? (
        <p style={{ marginTop: '24px' }}>No products found.</p>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;