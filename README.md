# ShopyKart

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It supports two types of users — customers who can browse and purchase products, and admins who manage inventory and orders through a dedicated dashboard.

**Live App:** https://shopykart-beta.vercel.app
**Backend API:** https://shopykart.onrender.com

The backend runs on Render's free tier, so the first request after a period of inactivity can take up to 50 seconds while the server spins back up. Subsequent requests are fast.

---

## Overview

ShopyKart handles the full lifecycle of an online purchase: a user creates an account, browses the product catalog, adds items to a cart, checks out with a shipping address, and can later track their order status. Admins have a separate dashboard where they can add, edit, or remove products, and update order statuses as orders move through processing, shipping, and delivery.

Stock levels update automatically when an order is placed, so the catalog always reflects real available inventory.

---

## Core Features

**Authentication & Authorization**
- User registration and login with hashed passwords (bcrypt)
- JWT-based session handling
- Role-based route protection — separate access levels for regular users and admins

**Shopping Experience**
- Product catalog with live search across name and category
- Category-based collections page
- Individual product detail pages with quantity selection
- Persistent cart (stored in localStorage, survives page refresh)
- Checkout flow with shipping address form
- Order confirmation page after purchase
- Order history page for logged-in users

**Admin Dashboard**
- Add, edit, and delete products
- View all customer orders
- Update order status (Processing / Shipped / Delivered / Cancelled)

**UI/UX**
- Custom dark/light theme toggle, persisted across sessions
- Fully responsive layout
- Minimal black-and-white visual design
- 404 page for unmatched routes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router DOM, Axios |
| State Management | React Context API (Auth, Cart, Theme) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose ODM |
| Auth | JSON Web Tokens, bcrypt |
| Deployment | Vercel (frontend), Render (backend) |

---

## Folder Structure

shopykart/
├── backend/
│ ├── config/ # MongoDB connection setup
│ ├── controllers/ # Business logic for auth, products, orders
│ ├── middleware/ # JWT verification, role-based access checks
│ ├── models/ # Mongoose schemas: User, Product, Order
│ ├── routes/ # Express route definitions
│ ├── seed.js # Script to populate sample product data
│ └── server.js # App entry point
│
└── frontend/
├── public/ # Static assets, favicon
└── src/
├── api/ # Axios instance with auth interceptor
├── components/ # Navbar, Footer, ProductCard, route guards
├── context/ # AuthContext, CartContext, ThemeContext
└── pages/ # Home, ProductDetail, Cart, Checkout,
# MyOrders, AdminDashboard, About, Contact, etc.

---

## Running Locally

### Requirements
- Node.js (v18+)
- A MongoDB Atlas cluster (free tier is enough)

### 1. Clone the repo
```bash
git clone https://github.com/Deekshith2716/shopykart.git
cd shopykart
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start the server:
```bash
npm run dev
```

Optional — populate the database with sample products:
```bash
node seed.js
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:
VITE_API_URL=http://localhost:5000/api

Start the dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Reference

**Auth**
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login and receive JWT | Public |

**Products**
| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/products/:id/reviews` | Add product review | User |

**Orders**
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/orders` | Create new order | User |
| GET | `/api/orders/myorders` | Get logged-in user's orders | User |
| GET | `/api/orders/:id` | Get single order | User |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

---

## Notes on Design Decisions

- **Non-SRV MongoDB connection string:** Node's DNS resolver had trouble with the standard `mongodb+srv://` format in local development on Windows, so the app connects using the expanded standard connection string instead.
- **Client-side cart persistence:** The cart lives in localStorage rather than the database, since it doesn't need to sync across devices for this project's scope, and it avoids unnecessary backend calls for every cart update.
- **Stock deduction on order creation:** Inventory decreases at the moment an order is placed rather than at payment confirmation, since the current checkout flow uses cash on delivery only.

---

## Possible Future Improvements

- Payment gateway integration (Razorpay/Stripe) instead of cash on delivery only
- Wishlist functionality (schema support already exists on the User model)
- Product review display on the frontend (backend endpoint already implemented)
- Pagination and server-side filtering for larger product catalogs
- Automated testing

---

## Author

Durvasula Deekshith