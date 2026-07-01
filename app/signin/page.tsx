'use client';

import { useState } from 'react';
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
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In production, make actual API call here
      router.push('/');
    } catch (error) {
      setErrors({ email: 'Sign in failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth
    alert('Google Sign In - implement with OAuth');
  };

  const handleGithubSignIn = () => {
    // Implement GitHub OAuth
    alert('GitHub Sign In - implement with OAuth');
  };

  return (
    <main className="relative min-h-screen w-full bg-[#050816]">
      <VideoBackground overlay="auth" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-3xl sm:p-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-sky-600 shadow-lg shadow-sky-500/30">
                <span className="text-2xl font-bold text-white">SS</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="text-3xl font-semibold text-white">StockSense AI</h1>
              <p className="mt-2 text-sm text-slate-400">AI-Powered Market Intelligence Platform</p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onSubmit={handleSignIn}
              className="space-y-5"
            >
              {/* Email Input */}
              <FormInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                icon={<Mail className="h-5 w-5" />}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                error={errors.email}
              />

              {/* Password Input */}
              <FormInput
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<Lock className="h-5 w-5" />}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                error={errors.password}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border border-white/10 bg-white/5 checked:bg-sky-500 checked:border-sky-500 focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
                  />
                  <span className="text-sm text-slate-400 group-hover:text-slate-300 transition">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-slate-400 hover:text-sky-400 transition"
                >
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-sky-500/40"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <Loader size="sm" className="w-14" />
                    <span className="text-xs uppercase tracking-[0.2em]">Signing in</span>
                  </span>
                ) : (
                  'Launch AI Workspace'
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="my-6 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500">or continue with</span>
              <div className="h-px flex-1 bg-white/10" />
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              <motion.button
                type="button"
                onClick={handleGoogleSignIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-slate-300 transition hover:bg-white/10 hover:border-white/20"
              >
                <Chrome className="h-5 w-5" />
                <span className="hidden sm:inline">Google</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleGithubSignIn}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 font-medium text-slate-300 transition hover:bg-white/10 hover:border-white/20"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.button>
            </motion.div>

            {/* Sign Up Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-center text-sm text-slate-400"
            >
              Don't have an account?{' '}
              <a href="/signup" className="text-sky-400 hover:text-sky-300 font-medium transition">
                Sign up
              </a>
            </motion.div>
          </div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-6 text-center text-xs text-slate-500"
          >
            Powered by Multi-Agent Financial Intelligence
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}
