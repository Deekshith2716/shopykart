require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'Over-ear wireless headphones with noise cancellation and 30-hour battery life.',
    category: 'Electronics',
    price: 2499,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes with breathable mesh upper and cushioned sole.',
    category: 'Footwear',
    price: 1899,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
  },
  {
    name: 'Backpack',
    description: 'Water-resistant backpack with padded laptop compartment, fits up to 15-inch laptops.',
    category: 'Bags',
    price: 1299,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
  },
  {
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and 7-day battery.',
    category: 'Electronics',
    price: 3499,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  },
  {
    name: 'Cotton T-Shirt',
    description: '100% cotton crew neck t-shirt, available in classic fit.',
    category: 'Clothing',
    price: 499,
    stock: 60,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable drip coffee maker with 12-cup capacity.',
    category: 'Home & Kitchen',
    price: 2199,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500',
  },
  {
    name: 'Desk Lamp',
    description: 'Adjustable LED desk lamp with three brightness levels and USB charging port.',
    category: 'Home & Kitchen',
    price: 899,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
  },
  {
    name: 'Leather Wallet',
    description: 'Genuine leather bifold wallet with RFID blocking technology.',
    category: 'Accessories',
    price: 799,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 12-hour playtime.',
    category: 'Electronics',
    price: 1599,
    stock: 28,
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap, 6mm thickness.',
    category: 'Sports',
    price: 699,
    stock: 45,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedDatabase();