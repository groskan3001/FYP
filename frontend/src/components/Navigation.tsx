import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Zap } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import type { CartResponse } from '../types';

const Navigation = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await api.get<CartResponse>('/cart');
      return data;
    },
    enabled: !!user,
    retry: false,
  });

  const cartItemCount = cart?.items.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/shop', label: 'Shop' },
    { to: '/orders', label: 'Orders' },
    { to: '/about', label: 'About' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="nav-wrapper">
      <div className="announcement-bar">
        ⚡ Free shipping on orders over Rs.2,000 &nbsp;•&nbsp; New arrivals every week
      </div>
      <div className="container nav-bar py-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-sm"
          style={{ textDecoration: 'none' }}
          aria-label="NEXUS home"
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Zap size={20} fill="white" />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.4rem',
              color: 'var(--color-on-surface)',
              letterSpacing: '-0.02em',
            }}
          >
            NEXUS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`nav-links flex items-center gap-lg ${isMobileMenuOpen ? 'mobile-open' : ''}`}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `nav-link font-medium text-body px-4 py-2 rounded-full transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-muted hover:text-primary'
                }`
              }
              style={{ textDecoration: 'none', fontSize: '0.9375rem' }}
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile-only auth */}
          <div className="mobile-user-section" style={{ display: 'none' }}>
            {user ? (
              <>
                <NavLink to="/profile" onClick={closeMobileMenu} className="flex items-center gap-sm text-body" style={{ textDecoration: 'none', fontSize: '1rem' }}>
                  <User size={18} />
                  Profile
                </NavLink>
                <button type="button" onClick={() => { logout(); closeMobileMenu(); }} className="btn btn-outline">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="btn btn-primary" onClick={closeMobileMenu}>
                Sign in
              </Link>
            )}
          </div>
        </nav>

        {/* Actions */}
        <div className="nav-actions flex items-center gap-sm">
          <Link to="/cart" className="btn-icon relative" title="Cart" style={{ textDecoration: 'none' }}>
            <ShoppingCart size={22} />
            {cartItemCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '18px',
                  height: '18px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  borderRadius: '50%',
                  fontSize: '10px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cartItemCount}
              </span>
            )}
          </Link>

          <div className="desktop-user-menu flex items-center gap-sm">
            {user ? (
              <div className="flex items-center gap-sm">
                <Link to="/profile" className="btn-icon" title="Profile">
                  <User size={22} />
                </Link>
                <button type="button" onClick={logout} className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/auth" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Sign in
              </Link>
            )}
          </div>

          <button
            type="button"
            className="mobile-menu-toggle btn-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ display: 'none', zIndex: 300 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
      )}
    </header>
  );
};

export default Navigation;
