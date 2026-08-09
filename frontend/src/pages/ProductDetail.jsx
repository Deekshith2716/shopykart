import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (loading) return <p className="container">Loading...</p>;
  if (!product) return <p className="container">Product not found.</p>;

  return (
    <div className="container">
      <div style={styles.wrapper}>
        <div className="card" style={styles.imageBox}>
          <img src={product.imageUrl} alt={product.name} style={styles.image} />
        </div>
        <div style={styles.info}>
          <p style={styles.category}>{product.category}</p>
          <h1 style={{ fontSize: '34px', margin: '4px 0 16px' }}>{product.name}</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '20px' }}>
            {product.description}
          </p>
          <p style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>₹{product.price}</p>
          <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '20px' }}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>

          {product.stock > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '13px', marginRight: '10px' }}>QTY</label>
              <select
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={{ padding: '8px 12px', border: '2px solid var(--border)', background: 'var(--bg)', color: 'var(--text)' }}
              >
                {[...Array(Math.min(product.stock, 10)).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>{x + 1}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="btn btn-solid"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: { display: 'flex', gap: '48px', flexWrap: 'wrap' },
  imageBox: { flex: '1 1 350px', maxWidth: '420px' },
  image: { width: '100%', height: '380px', objectFit: 'cover', filter: 'grayscale(100%)', display: 'block' },
  info: { flex: '1 1 300px' },
  category: { fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 },
};

export default ProductDetail;