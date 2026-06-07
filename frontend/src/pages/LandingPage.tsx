import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Tag } from 'lucide-react';
import api from '../api/client';
import type { Product } from '../types';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeatureHighlights from '../components/FeatureHighlights';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import CategoryShowcase from '../components/CategoryShowcase';
import CountdownTimer from '../components/CountdownTimer';
import offer from '../assets/offer.png';

const LandingPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data: response } = await api.get<{ products: Product[] }>('/products', {
        params: { featured: true, limit: 8 },
      });
      return response.products;
    },
  });

  return (
    <main>
      <Hero />

      {/* Categories */}
      <Categories />

      {/* Why NEXUS */}
      <section className="section-block bg-surface-container-low">
        <div className="container">
          <SectionHeading
            eyebrow="Why shop with NEXUS"
            title="Built for a premium experience"
            description="Four pillars power every order: secure checkout, precision fulfillment, real human support, and hand-picked products."
          />
          <FeatureHighlights />
        </div>
      </section>

      {/* Featured / Hot Deals */}
      <section className="section-block bg-background">
        <div className="container">
          <div className="flex justify-between items-end" style={{ marginBottom: '2rem' }}>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-primary)',
                  margin: '0 0 6px',
                }}
              >
                Hot Right Now
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  color: 'var(--color-on-surface)',
                  margin: 0,
                }}
              >
                Featured Deals
              </h2>
            </div>
            <Link
              to="/shop?featured=true"
              style={{
                color: 'var(--color-primary)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              View All →
            </Link>
          </div>

          {isLoading && (
            <div className="flex justify-center" style={{ padding: '3rem 0' }}>
              <div
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  border: '3px solid var(--color-outline-variant)',
                  borderTopColor: 'var(--color-primary)',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!isLoading && !isError && data && (
            <div
              className="grid gap-md"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
            >
              {data.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  variant="default"
                  onAddToCart={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Showcases */}
      <CategoryShowcase
        category="Electronics"
        title="Latest Electronics"
        link="/shop?category=Electronics"
      />

      <CategoryShowcase
        category="Home"
        title="Home Appliances"
        link="/shop?category=Home"
      />

      <CategoryShowcase
        category="Shoes"
        title="Trending Footwear"
        link="/shop?category=Shoes"
      />

      {/* Flash Sale Banner */}
      <section className="section-block bg-surface-container-low">
        <div className="container">
          <div
            style={{
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 0,
              boxShadow: 'var(--shadow-elevated)',
            }}
          >
            {/* Left: Text + Timer */}
            <div
              style={{
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  padding: '0.35rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  width: 'fit-content',
                }}
              >
                <Tag size={13} />
                Limited Time
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#fff',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Flash Sale — Up to 50% Off
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.05rem', margin: 0, lineHeight: 1.6 }}>
                Limited-time deals on top products. Don't miss out on the biggest savings of the season.
              </p>
              <CountdownTimer targetDate={new Date(Date.now() + 18 * 60 * 60 * 1000 + 24 * 60 * 1000 + 52 * 1000)} />
              <div style={{ marginTop: '0.5rem' }}>
                <Link
                  to="/shop"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#fff',
                    color: 'var(--color-primary)',
                    fontWeight: 700,
                    fontSize: '0.9375rem',
                    padding: '0.75rem 1.75rem',
                    borderRadius: 'var(--radius-full)',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  Shop the Sale
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div style={{ minHeight: '320px', overflow: 'hidden' }}>
              <img
                src={offer}
                alt="Flash Sale Product"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
