'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, UserPlus } from 'lucide-react';
import { AuthCard } from '../../components/AuthCard';
import { AuthField } from '../../components/AuthField';

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-10 text-white sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center">
        <AuthCard
          title="Create your StockSense AI account"
          subtitle="Start building a smarter portfolio with AI insights, sentiment analysis, and real-time market intelligence."
        >
          <form className="space-y-6">
            <div className="space-y-4">
              <AuthField label="Full Name" type="text" name="name" placeholder="Alex Morgan" />
              <AuthField label="Email" type="email" name="email" placeholder="you@stocksense.ai" />
              <AuthField label="Password" type="password" name="password" placeholder="Create a secure password" />
              <AuthField label="Confirm Password" type="password" name="confirmPassword" placeholder="Confirm your password" />
            </div>

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              Create Account
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-4 text-sm text-slate-500">
            <span className="h-px flex-1 bg-white/10" />
            <span>Or continue with</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-medium text-white transition hover:border-sky-500/30 hover:bg-slate-900"
          >
            <Mail className="h-4 w-4 text-sky-300" />
            Continue with Google
          </motion.button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/signin" className="text-sky-300 transition hover:text-sky-200">
              Sign In
            </Link>
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-600">
            <UserPlus className="h-4 w-4 text-sky-400" />
            <span>Quick account setup</span>
          </div>
        </AuthCard>
      </div>
    </main>
  );
}
