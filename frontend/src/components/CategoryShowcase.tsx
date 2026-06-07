import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import type { Product } from '../types';
import ProductCard from './ProductCard';

interface Props {
  category: string;
  title: string;
  link: string;
}

const CategoryShowcase = ({ category, title, link }: Props) => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', category, 'showcase'],
    queryFn: async () => {
      const { data } = await api.get<{ products: Product[] }>('/products', {
        params: { category, limit: 4 },
      });
      return data.products;
    },
  });

  if (!isLoading && (!products || products.length === 0)) return null;

  return (
    <section className="section-block bg-background">
      <div className="container">
        {/* Header */}
        <div
          className="flex justify-between items-center"
          style={{
            paddingBottom: '1rem',
            marginBottom: '1.5rem',
            borderBottom: '2px solid var(--color-outline-variant)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
              color: 'var(--color-on-surface)',
              margin: 0,
            }}
          >
            {title}
          </h3>
          <Link
            to={link}
            style={{
              color: 'var(--color-primary)',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}
          >
            View All →
          </Link>
        </div>

        {/* Products */}
        {isLoading ? (
          <div className="flex justify-center" style={{ padding: '2rem 0' }}>
            <div
              style={{
                width: '2rem',
                height: '2rem',
                border: '3px solid var(--color-outline-variant)',
                borderTopColor: 'var(--color-primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div
            className="grid gap-md"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
          >
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                variant="compact"
                onAddToCart={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryShowcase;
