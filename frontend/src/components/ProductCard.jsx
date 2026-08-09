import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="info">
        <p className="category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="price">₹{product.price}</p>
        {product.stock === 0 && <p style={{ fontSize: '12px', color: '#c0392b' }}>Out of stock</p>}
      </div>
    </Link>
  );
};

export default ProductCard;