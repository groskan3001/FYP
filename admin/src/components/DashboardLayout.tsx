import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, LogOut, Menu, PackageSearch, ShoppingBag, Users, X, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/dashboard', label: 'Overview',  icon: <BarChart3 size={17} /> },
  { to: '/orders',    label: 'Orders',    icon: <PackageSearch size={17} /> },
  { to: '/products',  label: 'Products',  icon: <ShoppingBag size={17} /> },
  { to: '/users',     label: 'Customers', icon: <Users size={17} /> },
];

const labelMap: Record<string, string> = {
  '/dashboard': 'Overview',
  '/orders':    'Orders',
  '/products':  'Products',
  '/users':     'Customers',
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const activeLabel = labelMap[location.pathname] ?? 'Overview';

  return (
    <div className={`admin-shell ${sidebarOpen ? 'open' : ''}`}>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(28,20,16,0.5)', zIndex: 99 }}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">
            <Zap size={18} fill="white" />
          </div>
          <div>
            <div className="brand-name">
              NEXUS
              <span>Admin Panel</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="sidebar-footer">
          <button
            type="button"
            className="btn btn-ghost"
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              color: 'rgba(245,237,230,0.6)',
              borderColor: 'rgba(245,237,230,0.12)',
              borderRadius: 'var(--radius-md)',
            }}
            onClick={logout}
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="admin-content">
        <header className="top-bar">
          <button
            type="button"
            className="btn-icon"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
            style={{ border: 'none', background: 'transparent' }}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="page-title">
            <p className="eyebrow">NEXUS Management</p>
            <h2>{activeLabel}</h2>
          </div>

          <div className="top-actions">
            {user && (
              <>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '0.9rem',
                    flexShrink: 0,
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="profile-pill">
                  <span>{user.name}</span>
                  <small>{user.email}</small>
                </div>
              </>
            )}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={logout}
              style={{ fontSize: '0.8125rem' }}
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </header>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
