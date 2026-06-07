import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import type { Product } from '../types';

interface Props {
  product: Product;
  onAddToCart?: (productId: string) => void;
  variant?: 'default' | 'compact';
}

const fallbackImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';

const ProductCard = ({ product, onAddToCart, variant = 'default' }: Props) => {
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <article className="card card-interactive flex flex-col h-full relative group" style={{ padding: 0 }}>
      <div className="relative overflow-hidden bg-surface-container" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.images?.[0] ?? fallbackImage}
          alt={product.name}
          loading="lazy"
          style={{ objectFit: 'cover', width: '100%', height: '100%', transition: 'transform 0.3s ease' }}
          className="group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="badge badge-error" style={{ position: 'absolute', top: '8px', left: '8px' }}>
            {discount}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-col gap-sm p-4 flex-1">
        {variant === 'default' && (
          <div className="flex justify-between items-start gap-sm">
            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
              <h3 className="text-body font-semibold text-primary" style={{ margin: 0, fontSize: '1rem', lineHeight: '1.4' }}>{product.name}</h3>
            </Link>

            <div className="flex items-center gap-xs">
              <div className="flex" style={{ color: '#f59e0b' }}>
                <Star size={14} fill="currentColor" />
              </div>
              <span className="text-muted text-sm font-medium" style={{ fontSize: '0.875rem' }}>{product.rating?.toFixed(1) || '0.0'}</span>
            </div>
          </div>
        )}

        {variant === 'compact' && (
          <div className="flex flex-col gap-2 flex-1">
            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
              <h3 className="text-body font-medium text-primary m-0 text-sm leading-snug">{product.name}</h3>
            </Link>
            <div className="flex items-end justify-between gap-2 mt-auto">
              <div className="flex flex-col min-w-0">
                <span className="text-display font-bold text-primary text-base">
                  ${(product.salePrice ?? product.price).toFixed(2)}
                </span>
                {product.salePrice && (
                  <span className="text-muted line-through text-xs">${product.price.toFixed(2)}</span>
                )}
              </div>
              {onAddToCart && (
                <button
                  type="button"
                  onClick={() => onAddToCart(product._id)}
                  className="btn btn-primary shrink-0"
                  style={{
                    width: '36px',
                    height: '36px',
                    padding: 0,
                    borderRadius: '50%',
                    minWidth: '36px',
                  }}
                  aria-label="Add to cart"
                >
                  <Plus size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {variant === 'default' && (
          <div className="flex justify-between items-end pt-4 mt-auto">
            <div className="flex flex-col">
              {product.salePrice && (
                <span className="text-muted" style={{ textDecoration: 'line-through', fontSize: '0.875rem' }}>${product.price.toFixed(2)}</span>
              )}
              <span className="text-display font-bold text-primary" style={{ fontSize: '1.25rem' }}>
                ${(product.salePrice ?? product.price).toFixed(2)}
              </span>
            </div>

            {onAddToCart && (
              <button
                type="button"
                onClick={() => onAddToCart(product._id)}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
              >
                <ShoppingCart size={16} />
                Add
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
