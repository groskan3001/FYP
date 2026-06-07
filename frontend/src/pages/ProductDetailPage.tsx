import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import api from '../api/client';
import type { Product } from '../types';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data: product } = await api.get<Product>(`/products/${id}`);
      return product;
    },
    enabled: Boolean(id),
  });

  const { data: suggestedProducts } = useQuery({
    queryKey: ['products', 'suggested', data?.category],
    queryFn: async () => {
      const { data: products } = await api.get<Product[]>('/products', {
        params: { category: data?.category, limit: 4 },
      });
      return products.filter((p) => p._id !== id);
    },
    enabled: Boolean(data?.category),
  });

  const { mutateAsync: addToCart, isPending } = useMutation({
    mutationFn: async (qty: number) => {
      if (!id) throw new Error('Missing product id');
      return api.post('/cart', { productId: id, quantity: qty });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  });

  if (isLoading || !data) {
    return (
      <main className="container py-12 flex justify-center items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner" style={{ width: '3rem', height: '3rem', border: '4px solid var(--color-surface-container)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/auth', { state: { from: `/products/${id}` } });
      return;
    }
    await addToCart(quantity);
  };

  const handleQuantityChange = (delta: number) => {
    const newQty = Math.max(1, Math.min(data.stock, quantity + delta));
    setQuantity(newQty);
  };

  const gallery = data.images?.length ? data.images : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'];
  const discount = data.salePrice ? Math.round(((data.price - data.salePrice) / data.price) * 100) : 0;
  const rating = data.rating ?? 4.5;
  const numReviews = data.numReviews ?? 0;

  return (
    <main className="container py-8 md:py-12">
      <div className="grid gap-xl" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
        {/* Image Gallery */}
        <div className="flex flex-col gap-sm">
          <div className="relative rounded-xl overflow-hidden bg-surface-container" style={{ borderRadius: 'var(--radius-lg)', aspectRatio: '1/1' }}>
            <img src={gallery[selectedImage]} alt={data.name} className="w-full h-full object-cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {discount > 0 && <span className="absolute top-4 left-4 badge badge-error" style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '1rem', padding: '0.5rem 1rem' }}>-{discount}%</span>}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-sm overflow-x-auto py-2">
              {gallery.map((image, idx) => (
                <button
                  key={image}
                  type="button"
                  className={`rounded-md overflow-hidden border-2 ${selectedImage === idx ? 'border-primary' : 'border-transparent'}`}
                  style={{ width: '80px', height: '80px', flexShrink: 0, padding: 0, cursor: 'pointer', transition: 'border-color 0.2s ease', borderColor: selectedImage === idx ? 'var(--color-primary)' : 'transparent' }}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img src={image} alt={`${data.name} ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-lg">
          <div>
            <div className="text-muted text-sm font-medium mb-2 uppercase tracking-wide" style={{ fontSize: '0.875rem', letterSpacing: '0.05em' }}>
              {data.category && <span>{data.category}</span>}
            </div>
            <h1 className="text-display font-bold text-primary mb-2" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>{data.name}</h1>
            <div className="flex items-center gap-sm">
              <div className="flex text-secondary" style={{ color: '#f59e0b' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                    stroke={i < Math.floor(rating) ? 'currentColor' : 'var(--color-outline-variant)'}
                  />
                ))}
              </div>
              <span className="text-muted font-medium text-sm">
                {rating.toFixed(1)} ({numReviews} reviews)
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <div className="flex items-end gap-sm">
              <span className="text-display font-bold text-primary" style={{ fontSize: '2rem' }}>${data.salePrice ?? data.price}</span>
              {data.salePrice && <span className="text-muted text-lg line-through" style={{ textDecoration: 'line-through', fontSize: '1.125rem', marginBottom: '0.25rem' }}>${data.price}</span>}
            </div>
            <div className="font-medium text-sm" style={{ fontSize: '0.875rem' }}>
              {data.stock > 0 ? (
                <span className="text-secondary">✓ In Stock ({data.stock} available)</span>
              ) : (
                <span className="text-error" style={{ color: 'var(--color-error)' }}>Out of Stock</span>
              )}
            </div>
          </div>

          <p className="text-body text-muted" style={{ fontSize: '1rem', lineHeight: '1.6' }}>{data.description}</p>

          {/* Quantity & Actions */}
          <div className="flex flex-wrap items-center gap-md pt-4" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
            <div className="flex items-center border rounded-md bg-surface-container" style={{ border: '1px solid var(--color-outline-variant)', borderRadius: 'var(--radius)' }}>
              <button
                type="button"
                className="btn-icon p-2 hover:bg-surface-container-low"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                style={{ padding: '0.5rem' }}
              >
                <Minus size={18} />
              </button>
              <input
                type="number"
                min="1"
                max={data.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(data.stock, parseInt(e.target.value) || 1)))}
                className="w-16 text-center bg-transparent border-none font-medium"
                style={{ width: '40px', textAlign: 'center', background: 'transparent', border: 'none', fontWeight: '500' }}
              />
              <button
                type="button"
                className="btn-icon p-2 hover:bg-surface-container-low"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= data.stock}
                aria-label="Increase quantity"
                style={{ padding: '0.5rem' }}
              >
                <Plus size={18} />
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary flex-1"
              style={{ minWidth: '200px' }}
              onClick={handleAddToCart}
              disabled={isPending || data.stock === 0}
            >
              <ShoppingCart size={20} />
              {isPending ? 'Adding...' : 'Add to Cart'}
            </button>

            <div className="flex gap-sm">
              <button type="button" className="btn btn-outline btn-icon" aria-label="Add to wishlist" style={{ padding: '0.75rem', borderRadius: 'var(--radius)' }}>
                <Heart size={20} />
              </button>
              <button type="button" className="btn btn-outline btn-icon" aria-label="Share product" style={{ padding: '0.75rem', borderRadius: 'var(--radius)' }}>
                <Share2 size={20} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-md py-6 mt-2" style={{ borderTop: '1px solid var(--color-outline-variant)', borderBottom: '1px solid var(--color-outline-variant)' }}>
            {[
              { icon: <Truck size={22} />, title: 'Free Shipping', sub: 'On orders over Rs.2,000' },
              { icon: <Shield size={22} />, title: '2 Year Warranty', sub: 'Protection included' },
              { icon: <RefreshCw size={22} />, title: '30-Day Returns', sub: 'Hassle-free returns' },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-md">
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-primary-fixed)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <strong style={{ fontWeight: 700, color: 'var(--color-on-surface)', fontSize: '0.9375rem', display: 'block' }}>{item.title}</strong>
                  <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-on-surface-variant)' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details — full width below gallery + info */}
      <div className="product-details-panel">
        <h3>Product Details</h3>
        <ul className="product-details-list">
          <li>
            <strong className="text-primary font-medium">SKU</strong>
            <span>{data._id.slice(-8).toUpperCase()}</span>
          </li>
          <li>
            <strong className="text-primary font-medium">Category</strong>
            <span>{data.category}</span>
          </li>
          {data.tags && data.tags.length > 0 && (
            <li>
              <strong className="text-primary font-medium">Tags</strong>
              <span>{data.tags.join(', ')}</span>
            </li>
          )}
          <li>
            <strong className="text-primary font-medium">Availability</strong>
            <span>{data.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
          </li>
        </ul>
      </div>

      {/* Suggested Products */}
      {suggestedProducts && suggestedProducts.length > 0 && (
        <section className="mt-16 pt-16" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
          <h2 className="text-display font-bold text-primary mb-8" style={{ fontSize: '2rem' }}>You May Also Like</h2>
          <div className="grid gap-lg" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
            {suggestedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProductDetailPage;
