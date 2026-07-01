'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="glass-card p-6"
    >
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900/80 text-sky-300 shadow-lg shadow-sky-500/10">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </motion.div>
  );
}
