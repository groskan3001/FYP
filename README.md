# FYP E-commerce Monorepo

A full-stack e-commerce project built as a monorepo with three independent apps:

- `backend` — Express + MongoDB API server
- `frontend` — shopper-facing React + Vite storefront
- `admin` — admin dashboard React + Vite app for order/product/user management

## Project description

This repository contains a complete commerce platform with separate storefront and admin dashboard clients backed by a shared Express/MongoDB backend.

The frontend offers customer-facing shopping experiences, while the admin portal provides secure operational controls. The backend exposes REST API endpoints for products, cart, orders, authentication, and admin management.

## Key features

### Shopper frontend

- Responsive landing page and product catalog
- Product detail page with pricing and add-to-cart flow
- Authenticated cart and checkout workflow
- User login / registration
- Profile and order history pages
- Search/filter-enabled product listing
- Persistent JWT cookie authentication via API

### Admin dashboard

- Secure admin login
- Dashboard overview and stats
- Orders management
- Product inventory CRUD
- User management and role controls
- Protected routes for admin pages

### Backend API

- Express.js API server
- MongoDB database via Mongoose
- JWT authentication and cookie support
- Product, order, cart, and admin routes
- CORS configured for shopper/admin client origins
- Seed script to populate sample data

## Repository structure

```
FYP/
├── admin/         # Admin dashboard React app
├── backend/       # Express API server
├── frontend/      # Shopper storefront React app
└── ENVs.txt       # Example environment variables for each app
```

## Setup and run

### Prerequisites

- Node.js 18+ (or compatible runtime)
- npm
- MongoDB access (local or Atlas)

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Then edit `backend/.env` with values for:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_URL`
- `ADMIN_URL`

Start the API server:

```bash
npm run dev
```

### Frontend shopper app

```bash
cd frontend
npm install
cp .env.example .env
```

Then edit `frontend/.env` with:

- `VITE_API_URL=http://localhost:5000/api`

Start the shopper app:

```bash
npm run dev
```

### Admin dashboard

```bash
cd admin
npm install
cp .env.example .env
```

Then edit `admin/.env` with:

- `VITE_API_URL=http://localhost:5000/api`

Start the dashboard app:

```bash
npm run dev
```

## Environment variables

### Backend

- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — API port (default: `5000`)
- `CLIENT_URL` — storefront origin
- `ADMIN_URL` — admin app origin

### Frontend / Admin

- `VITE_API_URL` — backend API base URL

## API and route sitemap

### Shopper frontend routes

- `/` — landing page
- `/shop` — catalog
- `/products/:id` — product detail
- `/auth` — login/register
- `/about` — about page
- `/cart` — shopping cart
- `/checkout` — order checkout
- `/orders` — customer orders
- `/profile` — user profile

### Admin dashboard routes

- `/login` — admin login
- `/dashboard` — admin overview
- `/orders` — admin order list
- `/products` — product management
- `/users` — user management

### Backend API routes

- `/api/auth/*` — authentication endpoints
- `/api/products/*` — product data and CRUD
- `/api/cart/*` — cart operations
- `/api/orders/*` — order creation and history
- `/api/admin/*` — admin-only actions

## Notes

- Each app runs independently and must be started from its own folder.
- The frontend and admin clients rely on the backend API and `VITE_API_URL`.
- Do not commit real secrets to version control; use local `.env` files and `.env.example` as templates.

## Useful commands

```bash
# Start backend
cd backend && npm run dev

# Start storefront
cd frontend && npm run dev

# Start admin dashboard
cd admin && npm run dev
```

## Additional resources

- `frontend/README.md` — shopper application details
- `admin/README.md` — dashboard application details
- `backend/src/seed/seed.js` — sample data seeding script
