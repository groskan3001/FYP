import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type AuthMode = 'login' | 'register';

const AuthForm = ({ mode, setMode }: { mode: AuthMode; setMode: React.Dispatch<React.SetStateAction<AuthMode>> }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onSubmit',
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (mode === 'login') {
        await login({ email: values.email, password: values.password });
      } else {
        if (!values.name) {
          form.setError('name', { message: 'Name is required' });
          return;
        }
        await registerUser({ name: values.name, email: values.email, password: values.password });
      }

      const redirect = (location.state as { from?: Location })?.from?.pathname ?? '/';
      navigate(redirect, { replace: true });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Authentication failed. Please check your credentials.';
      form.setError('root', { message });
    }
  });

  return (
    <div className="card auth-card w-full max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-display font-bold text-primary mb-2" style={{ fontSize: '2rem' }}>
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-body text-muted">
          {mode === 'login'
            ? 'Sign in to continue where you left off and pick up your saved carts.'
            : 'Join NEXUS to access concierge support, curated drops, and tracked deliveries.'}
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-md">
        {mode === 'register' && (
          <div className="flex flex-col gap-xs">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              id="name"
              type="text"
              className={`input ${form.formState.errors.name ? 'border-error' : ''}`}
              placeholder="Jane Doe"
              {...form.register('name')}
              style={form.formState.errors.name ? { borderColor: 'var(--color-error)' } : {}}
            />
            {form.formState.errors.name && <span className="text-xs text-error" style={{ color: 'var(--color-error)' }}>{form.formState.errors.name.message}</span>}
          </div>
        )}
        <div className="flex flex-col gap-xs">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            type="email"
            className={`input ${form.formState.errors.email ? 'border-error' : ''}`}
            placeholder="name@example.com"
            {...form.register('email')}
            style={form.formState.errors.email ? { borderColor: 'var(--color-error)' } : {}}
          />
          {form.formState.errors.email && <span className="text-xs text-error" style={{ color: 'var(--color-error)' }}>{form.formState.errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-xs">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            id="password"
            type="password"
            className={`input ${form.formState.errors.password ? 'border-error' : ''}`}
            placeholder="••••••••"
            {...form.register('password')}
            style={form.formState.errors.password ? { borderColor: 'var(--color-error)' } : {}}
          />
          {form.formState.errors.password && <span className="text-xs text-error" style={{ color: 'var(--color-error)' }}>{form.formState.errors.password.message}</span>}
        </div>
        {form.formState.errors.root && (
          <div className="auth-error" role="alert">
            {form.formState.errors.root.message}
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-2" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </form>
      <div className="mt-6 text-center border-t pt-6" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
        <button
          type="button"
          className="btn btn-ghost text-sm"
          onClick={() => setMode((current) => (current === 'login' ? 'register' : 'login'))}
        >
          {mode === 'login' ? 'Need an account? Sign up' : 'Already a member? Sign in'}
        </button>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>('login');

  return (
    <main className="container flex items-center justify-center min-h-[70vh] py-8 md:py-12">
      <div className="auth-layout grid gap-8 lg:gap-12 items-center w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="auth-copy flex flex-col gap-md hidden md:flex">
          <p className="text-sm font-bold tracking-widest uppercase text-secondary m-0">Members</p>
          <h1 className="text-display font-bold text-primary m-0 text-3xl lg:text-4xl leading-tight">Checkout twice as fast and keep every order in sync.</h1>
          <p className="text-body text-muted text-lg m-0 leading-relaxed">
            Accounts unlock saved addresses, synchronized carts, and transparent tracking. Admins gain access to fulfillment metrics and
            live customer intel.
          </p>
        </div>
        <div>
          <AuthForm key={mode} mode={mode} setMode={setMode} />
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
