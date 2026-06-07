import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import api from '../api/client';
import type { CartResponse } from '../types';

const CartPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data: response } = await api.get<CartResponse>('/cart');
      return response;
    },
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['cart'] });

  const updateQty = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      api.put(`/cart/${productId}`, { quantity }),
    onSuccess: invalidate,
  });

  const removeItem = useMutation({
    mutationFn: (productId: string) => api.delete(`/cart/${productId}`),
    onSuccess: invalidate,
  });

  const clearCart = useMutation({
    mutationFn: () => api.delete('/cart'),
    onSuccess: invalidate,
  });

  if (isLoading || !data) {
    return (
      <main className="container py-12 flex justify-center items-center" style={{ minHeight: '60vh' }}>
        <div className="spinner" style={{ width: '3rem', height: '3rem', border: '4px solid var(--color-surface-container)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  return (
    <main className="container py-8 md:py-12">
      <div className="grid gap-xl items-start" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <div className="flex flex-col gap-lg">
          <div className="flex justify-between items-end border-b pb-4" style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
            <div>
              <h1 className="text-display font-bold text-primary m-0" style={{ fontSize: '2.5rem' }}>Your cart</h1>
              <p className="text-body text-muted mt-2 m-0">Review items before a fast, secure checkout.</p>
            </div>
            {!!data.items.length && (
              <button
                type="button"
                className="btn btn-ghost text-error"
                style={{ color: 'var(--color-error)' }}
                onClick={() => clearCart.mutate()}
                disabled={clearCart.isPending}
              >
                Clear cart
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-md">
            {data.items.length === 0 && (
              <div className="bg-surface-container rounded-lg p-8 text-center" style={{ borderRadius: 'var(--radius-lg)' }}>
                <p className="text-body text-muted">Your cart is empty.</p>
                <button type="button" className="btn btn-primary mt-4" onClick={() => navigate('/shop')}>Continue Shopping</button>
              </div>
            )}
            
            {data.items.map((item) => (
              <article key={item.product._id} className="flex gap-md bg-surface-container rounded-lg p-4" style={{ borderRadius: 'var(--radius)' }}>
                <img
                  src={item.product.images?.[0] ?? 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'}
                  alt={item.product.name}
                  className="rounded-md object-cover"
                  style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-sm)' }}
                />
                <div className="flex flex-col flex-1 justify-between">
                  <div className="flex justify-between items-start gap-sm">
                    <h3 className="text-body font-semibold text-primary m-0" style={{ fontSize: '1.125rem' }}>{item.product.name}</h3>
                    <span className="text-body font-bold text-primary">${item.product.salePrice ?? item.product.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
                    <div className="flex items-center border rounded-md bg-white" style={{ border: '1px solid var(--color-outline-variant)', borderRadius: 'var(--radius)' }}>
                      <button
                        type="button"
                        className="btn-icon p-1 hover:bg-surface-container-low"
                        onClick={() => updateQty.mutate({ productId: item.product._id, quantity: Math.max(1, item.quantity - 1) })}
                        style={{ padding: '0.25rem' }}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        min={1}
                        max={item.product.stock}
                        value={item.quantity}
                        onChange={(event) => {
                          const value = Math.max(1, Number(event.currentTarget.value) || 1);
                          updateQty.mutate({
                            productId: item.product._id,
                            quantity: Math.min(value, item.product.stock ?? value),
                          });
                        }}
                        className="text-center font-medium border-none bg-transparent"
                        style={{ width: '30px', margin: 0, padding: 0 }}
                      />
                      <button
                        type="button"
                        className="btn-icon p-1 hover:bg-surface-container-low"
                        onClick={() => updateQty.mutate({ productId: item.product._id, quantity: Math.min(item.product.stock, item.quantity + 1) })}
                        style={{ padding: '0.25rem' }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={() => removeItem.mutate(item.product._id)} 
                      className="btn-icon text-muted hover:text-error"
                      style={{ color: 'var(--color-on-surface-variant)' }}
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        
        <aside className="bg-surface-container rounded-lg p-6 sticky top-24" style={{ borderRadius: 'var(--radius-lg)', top: '100px' }}>
          <h2 className="text-body font-bold text-primary mb-6" style={{ fontSize: '1.5rem', margin: 0 }}>Summary</h2>
          <dl className="flex flex-col gap-sm m-0">
            <div className="flex justify-between items-center text-body" style={{ color: 'var(--color-on-surface-variant)' }}>
              <dt>Subtotal</dt>
              <dd className="m-0 font-medium">${data.subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between items-center text-body" style={{ color: 'var(--color-on-surface-variant)' }}>
              <dt>Shipping</dt>
              <dd className="m-0 font-medium">${data.shipping.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between items-center text-body font-bold mt-4 pt-4" style={{ borderTop: '1px solid var(--color-outline-variant)', fontSize: '1.25rem', color: 'var(--color-primary)' }}>
              <dt>Total</dt>
              <dd className="m-0">${data.total.toFixed(2)}</dd>
            </div>
          </dl>
          <button 
            type="button" 
            className="btn btn-primary w-full mt-8" 
            style={{ width: '100%' }}
            disabled={!data.items.length} 
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </main>
  );
};

export default CartPage;
