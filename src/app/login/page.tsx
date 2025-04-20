'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/supabase';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.signIn(email, password);
      toast.success('Logged in successfully');
      router.push('/');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);

    try {
      // Use the mock login for demo purposes
      authService.mockLogin(true);
      toast.success('Logged in with demo account');
      router.push('/');
    } catch (error) {
      console.error('Demo login error:', error);
      toast.error('Failed to login with demo account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="flex items-center justify-center mb-4">
            <div className="bg-[var(--color-primary)] w-10 h-10 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">N2</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-[var(--color-text-secondary)]">Enter your details to access your account</p>
        </div>

        <div className="bg-[var(--color-bg-card)] p-6 rounded-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-[#222] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-[#222] border border-[#333] rounded-md text-white focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)]"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--color-primary)] bg-[#222] border-[#333] rounded focus:ring-[var(--color-primary)]"
                />
                <label htmlFor="remember" className="ml-2 block text-sm">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="text-[var(--color-primary)] hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full border-[#333] text-white hover:bg-[#333]"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Demo Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[var(--color-primary)] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
