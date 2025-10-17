'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Lock, Mail, AlertCircle, Sparkles, LogIn } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const useDemoCredentials = () => {
    setEmail('demo@formapp.dev');
    setPassword('password123');
    toast.success('Demo credentials loaded!');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      toast.success('Welcome back! 🎉');
      window.location.href = '/dashboard';
    } catch (e: any) {
      toast.error(e.message);
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Demo Credentials Banner */}
        <div className="mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 sm:p-5 shadow-lg animate-slideIn">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base sm:text-lg mb-1">Try Demo Account</h3>
              <p className="text-xs sm:text-sm text-blue-50 mb-3">
                Click below to auto-fill demo credentials
              </p>
              <div className="bg-white/20 backdrop-blur rounded-lg p-2.5 sm:p-3 text-xs sm:text-sm font-mono mb-3 space-y-1">
                <div className="flex items-center gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>demo@formapp.dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span>password123</span>
                </div>
              </div>
              <button
                onClick={useDemoCredentials}
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-2 sm:py-2.5 px-4 rounded-lg transition-all transform hover:scale-105 text-sm sm:text-base"
                type="button"
              >
                Load Demo Credentials
              </button>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 animate-fadeIn">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
              <LogIn className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Sign in to access your forms
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-5 sm:mt-6 text-center">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by Daynt Forms ✨</p>
        </div>
      </div>
    </main>
  );
}
