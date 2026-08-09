import { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="container">Loading...</p>;

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container">
      <h1>COLLECTIONS</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
        Browse products by category.
      </p>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'btn btn-solid' : 'btn btn-outline'}
            style={{ fontSize: '12px', padding: '8px 16px' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p>No products in this category.</p>
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

export default Collections;