import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Lock, Truck, CreditCard, MapPin, Package } from 'lucide-react';
import api from '../api/client';
import type { Address, CartResponse, Order } from '../types';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const form = useForm<Address>({
    defaultValues: { country: 'United States' },
  });

  const { data: cartData } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await api.get<CartResponse>('/cart');
      return data;
    },
  });

  const orderMutation = useMutation({
    mutationFn: (payload: { shippingAddress: Address }) => api.post<Order>('/orders', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      navigate('/orders');
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    await orderMutation.mutateAsync({ shippingAddress: values });
  });

  const { errors } = form.formState;

  return (
    <main className="container py-8 md:py-12">
      <div className="flex flex-col gap-lg max-w-6xl mx-auto">
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-display font-bold text-primary flex items-center justify-center gap-sm text-3xl md:text-4xl">
            <Lock size={28} />
            Secure Checkout
          </h1>
          <p className="text-body text-muted mt-2 max-w-xl mx-auto">
            Complete your order with confidence. All transactions are encrypted and secure.
          </p>
        </div>

        <div className="checkout-layout grid gap-8 lg:gap-10 items-start lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left Column - Forms */}
          <div className="flex flex-col gap-lg">
            <section className="checkout-panel">
              <div className="checkout-panel-header">
                <MapPin size={24} className="text-primary shrink-0" />
                <div>
                  <h2 className="text-body font-bold text-primary m-0 text-xl md:text-2xl">Shipping Address</h2>
                  <p className="text-sm text-muted m-0 mt-1">Where should we deliver your order?</p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="flex flex-col gap-4 md:gap-5">
                <div className="flex flex-col gap-xs">
                  <label htmlFor="line1" className="text-sm font-medium">
                    Address Line 1 <span className="text-error">*</span>
                  </label>
                  <input
                    id="line1"
                    type="text"
                    placeholder="Street address, P.O. box"
                    {...form.register('line1', { required: 'Address is required' })}
                    className={`input ${errors.line1 ? 'border-error' : ''}`}
                  />
                  {errors.line1 && <span className="text-xs text-error">{errors.line1.message}</span>}
                </div>

                <div className="flex flex-col gap-xs">
                  <label htmlFor="line2" className="text-sm font-medium">Address Line 2</label>
                  <input
                    id="line2"
                    type="text"
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    {...form.register('line2')}
                    className="input"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-xs">
                    <label htmlFor="city" className="text-sm font-medium">
                      City <span className="text-error">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      {...form.register('city', { required: 'City is required' })}
                      className={`input ${errors.city ? 'border-error' : ''}`}
                    />
                    {errors.city && <span className="text-xs text-error">{errors.city.message}</span>}
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="state" className="text-sm font-medium">
                      State <span className="text-error">*</span>
                    </label>
                    <input
                      id="state"
                      type="text"
                      placeholder="State / Province"
                      {...form.register('state', { required: 'State is required' })}
                      className={`input ${errors.state ? 'border-error' : ''}`}
                    />
                    {errors.state && <span className="text-xs text-error">{errors.state.message}</span>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-xs">
                    <label htmlFor="postalCode" className="text-sm font-medium">
                      Postal Code <span className="text-error">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="ZIP / Postal code"
                      {...form.register('postalCode', { required: 'Postal code is required' })}
                      className={`input ${errors.postalCode ? 'border-error' : ''}`}
                    />
                    {errors.postalCode && <span className="text-xs text-error">{errors.postalCode.message}</span>}
                  </div>

                  <div className="flex flex-col gap-xs">
                    <label htmlFor="country" className="text-sm font-medium">
                      Country <span className="text-error">*</span>
                    </label>
                    <input
                      id="country"
                      type="text"
                      placeholder="Country"
                      {...form.register('country', { required: 'Country is required' })}
                      className={`input ${errors.country ? 'border-error' : ''}`}
                    />
                    {errors.country && <span className="text-xs text-error">{errors.country.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-4 w-full flex justify-center items-center gap-sm text-base py-3"
                  disabled={orderMutation.isPending}
                >
                  <CreditCard size={20} />
                  {orderMutation.isPending ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </section>

            <section className="checkout-trust-grid">
              {[
                { icon: <Truck size={22} />, title: 'Fast Delivery', sub: '2-5 business days' },
                { icon: <Lock size={22} />, title: 'Secure Payment', sub: '256-bit SSL encryption' },
                { icon: <Package size={22} />, title: 'Free Returns', sub: '30-day return policy' },
              ].map((item) => (
                <div key={item.title} className="checkout-trust-item">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-primary-fixed)',
                      color: 'var(--color-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-primary">{item.title}</strong>
                    <p className="text-muted text-xs m-0 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <aside className="sticky top-24 lg:top-28">
            <div className="checkout-panel checkout-summary">
              <h2 className="text-body font-bold text-primary mb-6 pb-4 text-xl md:text-2xl m-0" style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
                Order Summary
              </h2>

              {cartData && cartData.items.length > 0 ? (
                <div className="checkout-summary-body flex flex-col">
                  <div className="flex flex-col gap-4 mb-6 max-h-96 overflow-y-auto pr-1">
                    {cartData.items.map((item) => (
                      <div key={item.product._id} className="flex gap-4 items-center">
                        <img
                          src={item.product.images?.[0] || 'https://via.placeholder.com/80'}
                          alt={item.product.name}
                          className="rounded-md object-cover shrink-0"
                          style={{ width: '64px', height: '64px' }}
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <h4 className="font-semibold text-primary m-0 text-sm truncate">{item.product.name}</h4>
                          <p className="text-muted text-xs m-0 mt-0.5">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-bold text-primary text-sm shrink-0">
                          ${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 border-t pt-4 mt-auto">
                    <div className="flex justify-between text-body text-muted text-sm">
                      <span>Subtotal ({cartData.items.length} items)</span>
                      <span className="font-medium">${cartData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-body text-muted text-sm">
                      <span>Shipping</span>
                      <span className="font-medium">${cartData.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-primary mt-2 pt-3 border-t text-lg">
                      <span>Total</span>
                      <span>${cartData.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mt-6 p-4 bg-surface-container-low rounded-lg text-xs text-muted">
                    <Lock size={16} className="mt-0.5 shrink-0" />
                    <p className="m-0 leading-relaxed">All payments are encrypted and processed securely. Your information is protected.</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Package size={48} className="text-muted mb-4" />
                  <p className="text-body text-muted mb-6">Your cart is empty</p>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => navigate('/shop')}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
