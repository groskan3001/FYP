import { useQuery } from '@tanstack/react-query';
import { BarChart3, PackageCheck, ShoppingCart, Users } from 'lucide-react';
import adminApi from '../api/client';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import type { DashboardOverview, Order } from '../types';

const DashboardPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: async () => {
      const { data: response } = await adminApi.get<DashboardOverview>('/admin/overview');
      return response;
    },
  });

  if (isLoading || !data) {
    return (
      <div className="page-center">
        <div className="spinner" />
        <p className="text-muted text-sm mt-4">Loading insights…</p>
      </div>
    );
  }

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <section className="dashboard flex flex-col gap-xl" style={{ gap: '2rem' }}>
      <div className="stat-grid">
        <StatCard label="Revenue" value={formatter.format(data.revenue)} delta="+12%" icon={<BarChart3 size={24} />} />
        <StatCard label="Orders" value={`${data.ordersCount}`} delta={`-${data.pendingOrders} pending`} icon={<ShoppingCart size={24} />} />
        <StatCard label="Customers" value={`${data.usersCount}`} icon={<Users size={24} />} />
        <StatCard label="Products" value={`${data.productsCount}`} icon={<PackageCheck size={24} />} />
      </div>
      
      <div className="card">
        <div className="section-heading mb-6" style={{ marginBottom: '1.5rem' }}>
          <div>
            <p className="eyebrow">Operations</p>
            <h3 className="text-display font-bold" style={{ fontFamily: 'var(--font-display)' }}>Recent orders</h3>
          </div>
        </div>
        
        <div className="data-table orders-table">
          <div className="table-head">
            <span>Order ID</span>
            <span>Customer</span>
            <span>Total</span>
            <span>Status</span>
            <span>Payment</span>
          </div>
          {data.recentOrders.length === 0 ? (
            <div className="p-8 text-center text-muted text-body" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-outline)' }}>
              No recent orders found.
            </div>
          ) : (
            data.recentOrders.map((order: Order) => (
              <div key={order._id} className="table-row">
                <span className="font-semibold text-primary" style={{ fontWeight: 600 }}>#{order._id.slice(-8).toUpperCase()}</span>
                <span>{typeof order.user === 'string' ? order.user : order.user.name}</span>
                <span className="font-bold text-primary">{formatter.format(order.total)}</span>
                <StatusBadge status={order.status} />
                <StatusBadge status={order.paymentStatus} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
