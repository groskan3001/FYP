import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const shopLinks = [
    { label: 'Electronics', to: '/shop?category=Electronics' },
    { label: 'Home Appliances', to: '/shop?category=Home' },
    { label: 'Shoes', to: '/shop?category=Shoes' },
    { label: 'Bags', to: '/shop?category=Bags' },
    { label: 'All Products', to: '/shop' },
  ];

  const supportLinks = [
    { label: 'Track Order', to: '/orders' },
    { label: 'My Account', to: '/profile' },
    { label: 'Shipping Info', to: '/shipping' },
    { label: 'Returns', to: '/returns' },
    { label: 'FAQs', to: '/faq' },
  ];

  const companyLinks = [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '/careers' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ];

  return (
    <footer
      style={{
        background: 'var(--color-inverse-surface)',
        color: 'var(--color-inverse-on-surface)',
        paddingTop: 'var(--space-xl)',
        paddingBottom: 'var(--space-lg)',
      }}
    >
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="flex flex-col gap-sm">
            <Link to="/" className="flex items-center gap-sm" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Zap size={18} fill="white" color="white" />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.3rem',
                  color: 'var(--color-inverse-on-surface)',
                  letterSpacing: '-0.02em',
                }}
              >
                NEXUS
              </span>
            </Link>
            <p
              style={{
                color: 'rgba(245, 237, 230, 0.6)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                margin: '4px 0 0',
                maxWidth: '260px',
              }}
            >
              Your one-stop destination for premium products across every category.
            </p>
            <div className="flex gap-sm mt-2">
              {['Twitter', 'Instagram', 'Facebook'].map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(245,237,230,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(245,237,230,0.7)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col">
            <h4 className="footer-column-title">Shop</h4>
            <ul className="footer-link-list">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col">
            <h4 className="footer-column-title">Support</h4>
            <ul className="footer-link-list">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="flex flex-col">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-link-list">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-sm">
            <h4 className="footer-column-title">Stay Updated</h4>
            <p style={{ color: 'rgba(245,237,230,0.65)', fontSize: '0.875rem', margin: 0, lineHeight: 1.6 }}>
              Get the latest drops and exclusive deals straight to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex mt-2">
              <input
                type="email"
                placeholder="your@email.com"
                required
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-full) 0 0 var(--radius-full)',
                  border: 'none',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'white',
                  fontSize: '0.875rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.65rem 1rem',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0 var(--radius-full) var(--radius-full) 0',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  transition: 'background 0.2s',
                }}
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom flex justify-between items-center flex-wrap gap-md">
          <p style={{ color: 'rgba(245,237,230,0.45)', fontSize: '0.8125rem', margin: 0 }}>
            © {currentYear} NEXUS. All rights reserved.
          </p>
          <div className="flex gap-md flex-wrap" style={{ color: 'rgba(245,237,230,0.55)' }}>
            {['Visa', 'Mastercard', 'PayPal', 'JazzCash'].map((pm) => (
              <span key={pm} style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.04em' }}>
                {pm}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
