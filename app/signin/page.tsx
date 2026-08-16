'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Chrome, Github } from 'lucide-react';
import { FormInput } from '../../components/FormInput';
import { Loader } from '../../components/Loader';
import { VideoBackground } from '../../components/VideoBackground';

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Replace this with the real authentication request.
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push('/');
    } catch {
      setErrors({
        email: 'Sign in failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert('Google Sign In - implement with OAuth');
  };

  const handleGithubSignIn = () => {
    alert('GitHub Sign In - implement with OAuth');
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09090b]">
      <VideoBackground overlay="auth" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.08),transparent_35%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-black/40 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8">
            {/* Logo */}
            <div className="mb-7 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                <span className="text-xl font-bold tracking-tight text-cyan-300">
                  SS
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-zinc-400">
                Sign in to your StockSense workspace
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
              <FormInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                icon={<Mail className="h-5 w-5" />}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                error={errors.email}
              />

              <FormInput
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="h-5 w-5" />}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                error={errors.password}
              />

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between gap-4">
                <label className="group flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-white/10 bg-white/5 text-cyan-400 accent-cyan-400 focus:ring-cyan-400/20"
                  />

                  <span className="text-sm text-zinc-400 transition-colors group-hover:text-zinc-300">
                    Remember me
                  </span>
                </label>

                <a
                  href="#"
                  className="text-sm text-zinc-400 transition-colors hover:text-cyan-400"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In */}
              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-black shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <Loader size="sm" className="w-14" />
                    <span className="text-xs uppercase tracking-[0.18em]">
                      Signing in
                    </span>
                  </span>
                ) : (
                  'Launch AI Workspace'
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/[0.08]" />
              <span className="text-[11px] uppercase tracking-wider text-zinc-500">
                or continue with
              </span>
              <div className="h-px flex-1 bg-white/[0.08]" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={handleGoogleSignIn}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white"
              >
                <Chrome className="h-4 w-4" />
                Google
              </motion.button>

              <motion.button
                type="button"
                onClick={handleGithubSignIn}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </motion.button>
            </div>

            {/* Sign Up */}
            <p className="mt-7 text-center text-sm text-zinc-500">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
              >
                Sign up
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-[11px] tracking-wide text-zinc-600">
            Powered by Multi-Agent Financial Intelligence
          </p>
        </motion.div>
      </div>
    </main>
  );
}