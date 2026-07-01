'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
    >
      <div className="mb-8 space-y-3 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">StockSense AI</p>
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <p className="mx-auto max-w-xs text-sm leading-6 text-slate-300">{subtitle}</p>
      </div>
      {children}
    </motion.div>
  );
}
