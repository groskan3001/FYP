import { Link } from 'react-router-dom';
import { Cpu, Home, Footprints, ShoppingBag } from 'lucide-react';

const categories = [
  {
    id: 'electronics',
    title: 'Electronics',
    subtitle: 'Latest Tech',
    icon: <Cpu size={32} />,
    link: '/shop?category=Electronics',
    gradient: 'linear-gradient(135deg, #fff3ee 0%, #ffe8df 100%)',
    iconBg: 'var(--color-primary)',
  },
  {
    id: 'home',
    title: 'Home Appliances',
    subtitle: 'Modern Living',
    icon: <Home size={32} />,
    link: '/shop?category=Home',
    gradient: 'linear-gradient(135deg, #e0f5f3 0%, #c8eeeb 100%)',
    iconBg: 'var(--color-tertiary)',
  },
  {
    id: 'shoes',
    title: 'Shoes',
    subtitle: 'Step Up',
    icon: <Footprints size={32} />,
    link: '/shop?category=Shoes',
    gradient: 'linear-gradient(135deg, #fdf0da 0%, #fae3b8 100%)',
    iconBg: 'var(--color-secondary)',
  },
  {
    id: 'bags',
    title: 'Bags',
    subtitle: 'Carry Style',
    icon: <ShoppingBag size={32} />,
    link: '/shop?category=Bags',
    gradient: 'linear-gradient(135deg, #f5f1ec 0%, #ece6de 100%)',
    iconBg: '#6b5e52',
  },
];

const Categories = () => {
  return (
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
              Browse
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
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
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
            All products →
          </Link>
        </div>

        <div
          className="grid gap-md"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              style={{
                textDecoration: 'none',
                background: cat.gradient,
                borderRadius: 'var(--radius-xl)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                border: '1px solid var(--color-outline-variant)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  background: cat.iconBg,
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                {cat.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.125rem',
                    color: 'var(--color-on-surface)',
                    margin: '0 0 4px',
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem',
                    color: 'var(--color-on-surface-variant)',
                    margin: 0,
                  }}
                >
                  {cat.subtitle}
                </p>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: cat.iconBg,
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Shop now →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
