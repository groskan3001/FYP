import { Link } from 'react-router-dom';
import { ArrowRight, Star, Package, Zap } from 'lucide-react';

const pills = [
  { icon: <Package size={14} />, text: 'Free Returns' },
  { icon: <Star size={14} fill="currentColor" />, text: '4.9 Rated' },
  { icon: <Zap size={14} />, text: 'Express Delivery' },
];

const Hero = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, var(--color-surface-container-low) 0%, var(--color-surface) 60%)',
        padding: 'clamp(3rem, 6vw, 5rem) 0',
      }}
    >
      <div className="container">
        <div
          className="grid items-center gap-xl"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}
        >
          {/* Left Content */}
          <div className="flex flex-col items-start gap-lg">
            {/* Pill badges */}
            <div className="flex flex-wrap gap-sm">
              {pills.map((pill) => (
                <span
                  key={pill.text}
                  className="flex items-center gap-xs"
                  style={{
                    background: 'var(--color-surface-container-lowest)',
                    border: '1.5px solid var(--color-outline-variant)',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.3rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-on-surface-variant)',
                  }}
                >
                  <span style={{ color: 'var(--color-primary)' }}>{pill.icon}</span>
                  {pill.text}
                </span>
              ))}
            </div>

            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.75rem, 6vw, 4.5rem)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: 'var(--color-on-surface)',
                  margin: 0,
                }}
              >
                Shop the <br />
                <span style={{ color: 'var(--color-primary)' }}>Future</span>{' '}
                of Retail
              </h1>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.125rem',
                color: 'var(--color-on-surface-variant)',
                maxWidth: '480px',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              Curated collections across Electronics, Home, Fashion & more — with fast delivery and hassle-free returns.
            </p>

            <div className="flex flex-wrap gap-md">
              <Link to="/shop" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 1.75rem' }}>
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline" style={{ fontSize: '1rem', padding: '0.75rem 1.75rem' }}>
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div
              className="flex gap-xl pt-6 w-full"
              style={{ borderTop: '1px solid var(--color-outline-variant)' }}
            >
              {[
                { val: '10K+', label: 'Products' },
                { val: '50+', label: 'Brands' },
                { val: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.75rem',
                      color: 'var(--color-on-surface)',
                      lineHeight: 1,
                    }}
                  >
                    {stat.val}
                  </span>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--color-on-surface-variant)',
                      marginTop: '4px',
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div style={{ position: 'relative' }}>
            {/* Decorative accent */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                width: '180px',
                height: '180px',
                background: 'var(--color-primary-fixed)',
                borderRadius: '50%',
                zIndex: 0,
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
              alt="Premium Collection"
              style={{
                width: '100%',
                borderRadius: 'var(--radius-xl)',
                objectFit: 'cover',
                aspectRatio: '4/5',
                boxShadow: 'var(--shadow-elevated)',
                position: 'relative',
                zIndex: 1,
              }}
            />
            {/* Floating badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '-20px',
                background: 'white',
                borderRadius: 'var(--radius-lg)',
                padding: '0.75rem 1.25rem',
                boxShadow: 'var(--shadow-elevated)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                zIndex: 2,
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-on-surface)', lineHeight: 1 }}>
                New Drops
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-on-surface-variant)', fontWeight: 500 }}>
                Every Monday
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
