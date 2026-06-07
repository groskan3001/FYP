import { useQuery } from '@tanstack/react-query';
import { Package, Clock, CheckCircle, XCircle, Truck, Calendar, DollarSign, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import type { Order } from '../types';

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return { icon: CheckCircle, color: 'var(--color-secondary)', bg: 'rgba(0, 108, 73, 0.1)' };
    case 'pending':
      return { icon: Clock, color: '#b45309', bg: 'rgba(180, 83, 9, 0.1)' };
    case 'cancelled':
      return { icon: XCircle, color: 'var(--color-error)', bg: 'rgba(186, 26, 26, 0.1)' };
    case 'shipped':
      return { icon: Truck, color: 'var(--color-primary)', bg: 'rgba(0, 35, 111, 0.1)' };
    default:
      return { icon: Package, color: 'var(--color-on-surface-variant)', bg: 'var(--color-surface-container)' };
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const OrdersPage = () => {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data: response } = await api.get<Order[]>('/orders');
      return response;
    },
  });

  if (isLoading) {
    return (
      <main className="container py-12 flex justify-center items-center" style={{ minHeight: '60vh' }}>
        <div style={{ width: '3rem', height: '3rem', border: '4px solid var(--color-surface-container)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  return (
    <main className="container py-12" style={{ minHeight: '80vh' }}>
      <div className="flex justify-between items-end mb-10 border-b pb-6" style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
        <div>
          <h1 className="text-display font-bold text-primary m-0 flex items-center gap-sm" style={{ fontSize: '2.5rem' }}>
            <ShoppingBag size={32} />
            My Orders
          </h1>
          <p className="text-body text-muted mt-2 m-0">Track your orders and view their delivery status</p>
        </div>
        {data && data.length > 0 && (
          <div className="bg-surface-container rounded-lg px-6 py-4 text-center" style={{ borderRadius: 'var(--radius)' }}>
            <div className="text-display font-bold text-primary" style={{ fontSize: '2rem' }}>{data.length}</div>
            <div className="text-sm text-muted font-medium">Total Orders</div>
          </div>
        )}
      </div>

      {data && data.length > 0 ? (
        <div className="flex flex-col gap-md">
          {data.map((order) => {
            const trackingLabel = order.trackingNumber ?? `TRK-${order._id.slice(-12).toUpperCase()}`;
            const statusConfig = getStatusConfig(order.status);
            const StatusIcon = statusConfig.icon;
            const orderDate = formatDate(order.createdAt);
            const isExpanded = expandedOrders.has(order._id);

            return (
              <article
                key={order._id}
                className="bg-surface-container rounded-lg overflow-hidden"
                style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-outline-variant)', transition: 'box-shadow 0.2s ease' }}
              >
                {/* Order Header */}
                <div className="flex justify-between items-center p-6 border-b" style={{ borderBottom: isExpanded ? '1px solid var(--color-outline-variant)' : 'none' }}>
                  <div className="flex flex-col gap-xs">
                    <div className="flex items-center gap-sm font-semibold text-primary">
                      <Package size={18} />
                      <span>#{trackingLabel}</span>
                    </div>
                    <div className="flex items-center gap-xs text-sm text-muted">
                      <Calendar size={14} />
                      <span>{orderDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-md">
                    <div
                      className="flex items-center gap-xs px-3 py-1 rounded-full font-medium text-sm capitalize"
                      style={{ color: statusConfig.color, backgroundColor: statusConfig.bg, borderRadius: 'var(--radius-full)' }}
                    >
                      <StatusIcon size={16} />
                      <span>{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Order Summary Row */}
                <div className="flex justify-between items-center px-6 py-4">
                  <div className="flex items-center gap-md text-body">
                    <span className="text-muted">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</span>
                    <span className="font-bold text-primary flex items-center gap-xs">
                      <DollarSign size={16} />
                      {order.total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline flex items-center gap-xs"
                    style={{ padding: '0.4rem 1rem' }}
                    onClick={() => toggleOrderExpansion(order._id)}
                  >
                    {isExpanded ? (
                      <><span>Hide Details</span><ChevronUp size={16} /></>
                    ) : (
                      <><span>Track Order</span><ChevronDown size={16} /></>
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="flex flex-col gap-md p-6 border-t bg-white" style={{ borderTop: '1px solid var(--color-outline-variant)', backgroundColor: 'white' }}>
                    <div className="grid gap-xl" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                      {/* Items List */}
                      <div>
                        <h4 className="text-body font-bold text-primary mb-4 m-0">Items ({order.items.length})</h4>
                        <ul className="flex flex-col gap-sm m-0 pl-0" style={{ listStyle: 'none', padding: 0 }}>
                          {order.items.map((item, idx) => (
                            <li key={`${order._id}-${idx}`} className="flex items-center gap-md border-b pb-3" style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                              <div className="rounded-md overflow-hidden bg-surface-container flex-shrink-0" style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)' }}>
                                {item.image ? (
                                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-muted">
                                    <Package size={20} />
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-col flex-1">
                                <span className="font-semibold text-primary text-sm">{item.name}</span>
                                <span className="text-muted text-xs">Qty: {item.quantity}</span>
                              </div>
                              <div className="font-bold text-primary text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Order Summary */}
                      <div>
                        <h4 className="text-body font-bold text-primary mb-4 m-0">Summary</h4>
                        <div className="bg-surface-container rounded-md p-4 flex flex-col gap-sm" style={{ borderRadius: 'var(--radius)' }}>
                          <div className="flex justify-between text-body text-muted">
                            <span>Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-body text-muted">
                            <span>Shipping</span>
                            <span>${order.shippingFee.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-body font-bold text-primary pt-2 mt-2 border-t" style={{ borderTop: '1px solid var(--color-outline-variant)', fontSize: '1.1rem' }}>
                            <span>Total</span>
                            <span className="flex items-center gap-xs">
                              <DollarSign size={18} />
                              {order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Timeline */}
                        {order.statusTimeline && order.statusTimeline.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-body font-bold text-primary mb-4 m-0">Order Timeline</h4>
                            <div className="flex flex-col gap-md">
                              {order.statusTimeline.map((entry, idx) => {
                                const entryConfig = getStatusConfig(entry.status);
                                const EntryIcon = entryConfig.icon;
                                return (
                                  <div key={`${entry.status}-${idx}`} className="flex items-start gap-sm">
                                    <div className="rounded-full p-2 flex-shrink-0 mt-1" style={{ color: entryConfig.color, backgroundColor: entryConfig.bg, borderRadius: '50%' }}>
                                      <EntryIcon size={14} />
                                    </div>
                                    <div>
                                      <span className="font-semibold text-primary text-sm capitalize block">{entry.status}</span>
                                      {entry.note && <span className="text-muted text-xs block">{entry.note}</span>}
                                      <span className="text-muted text-xs">{formatDate(entry.changedAt)}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Package size={64} className="text-muted mb-6" style={{ color: 'var(--color-outline)' }} />
          <h2 className="text-display font-bold text-primary mb-4" style={{ fontSize: '2rem' }}>No Orders Yet</h2>
          <p className="text-body text-muted mb-8 max-w-md">You haven't placed any orders yet. Start shopping to see your orders here.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate('/catalog')}
          >
            Start Shopping
          </button>
        </div>
      )}
    </main>
  );
};

export default OrdersPage;
