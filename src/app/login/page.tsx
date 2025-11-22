'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: 'success' | 'error'; message: string }>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'Failed to login.');
      }

      setStatus({
        type: 'success',
        message: 'Login successful! Redirecting...',
      });

      // Redirect based on redirect param or user role
      setTimeout(() => {
        router.refresh(); // Refresh to update Header component
        if (redirectTo) {
          router.push(redirectTo);
        } else if (data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
      }, 1000);
    } catch (error: any) {
      setStatus({
        type: 'error',
        message: error?.message || 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f7fb] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#0e134d]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Or{' '}
            <Link href="/register" className="font-medium text-[#ea8c06] hover:text-[#d17b05]">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6 bg-white rounded-2xl shadow-md p-8" onSubmit={handleSubmit}>
          {status && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-green-200 bg-green-50 text-green-700'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#ea8c06] focus:border-transparent bg-slate-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-lg bg-[#ea8c06] hover:bg-[#d17b05] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 text-sm shadow-sm transition-colors"
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/" className="text-sm text-slate-600 hover:text-[#ea8c06]">
              ← Back to home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f3f7fb] flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-slate-600">Loading...</div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

