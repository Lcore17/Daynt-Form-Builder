'use client';

import { ArrowRight, BarChart3, Lock, Zap, Globe, Download, Sparkles, CheckCircle2, Mail } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: 'Real-time Preview',
      description: 'See your form changes instantly as you build with live preview'
    },
    {
      icon: BarChart3,
      title: 'Form Analytics',
      description: 'Track submissions and analyze responses with built-in analytics'
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'JWT authentication and secure data handling for your forms'
    },
    {
      icon: Globe,
      title: 'Public & Private Forms',
      description: 'Control access with public sharing links or private forms'
    },
    {
      icon: Download,
      title: 'Export Responses',
      description: 'Download submissions as CSV or JSON for easy analysis'
    },
    {
      icon: Sparkles,
      title: 'Beautiful UI',
      description: 'Modern dark mode support with smooth animations'
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Daynt Forms
              </span>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <Link 
                href="/login"
                className="hidden sm:block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-6 sm:mb-8 animate-slideIn">
          <Sparkles className="w-4 h-4" />
          Build Beautiful Forms in Minutes
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-fadeIn px-4">
          Create Dynamic Forms
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            With Live Preview
          </span>
        </h1>
        
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-4 animate-slideUp">
          Build, share, and analyze forms with real-time preview. Export responses as CSV or JSON. 
          Perfect for surveys, feedback, registrations, and more.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 animate-slideUp">
          <Link
            href="/register"
            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            Start Building Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/login"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-400 dark:hover:border-blue-600 transition-all"
          >
            View Demo
          </Link>
        </div>

        {/* Demo Credentials Info */}
        <div className="mx-4 sm:mx-auto max-w-md bg-gradient-to-r from-blue-500/10 to-blue-600/10 dark:from-blue-500/20 dark:to-blue-600/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-6 text-left animate-slideUp">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Try Demo Account
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use these credentials to explore the platform
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <code className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">demo@formapp.dev</code>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <code className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">password123</code>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Everything You Need
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 px-4">
            Powerful features to create and manage your forms
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-4">
            Ready to Build Your First Form?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join now and start creating beautiful, responsive forms in minutes. No credit card required.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center text-gray-600 dark:text-gray-400">
          <p className="text-sm sm:text-base font-semibold">© 2025 Daynt Forms. Built with <span className="text-blue-600 dark:text-blue-400">Next.js</span>, <span className="text-blue-600 dark:text-blue-400">NestJS</span>, and <span className="text-blue-600 dark:text-blue-400">Prisma</span>.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs sm:text-sm">
            <a href="https://github.com/Lcore17" target="_blank" rel="noopener" className="hover:underline text-blue-600 dark:text-blue-400">GitHub</a>
            <a href="mailto:nikhiltandel280-2@gmail.com" className="hover:underline text-blue-600 dark:text-blue-400">Contact</a>
            <a href="/privacy" className="hover:underline text-blue-600 dark:text-blue-400">Privacy Policy</a>
            <a href="/terms" className="hover:underline text-blue-600 dark:text-blue-400">Terms</a>
          </div>
          <p className="text-xs sm:text-sm mt-4">Powered by ✨ Modern Web Technologies</p>
        </div>
      </footer>
    </main>
  );
}
