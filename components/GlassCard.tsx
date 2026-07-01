'use client';

import type { HTMLAttributes, ReactNode } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlassCard({ children, className = '', ...props }: GlassCardProps) {
  return (
    <div
      className={`glass-card rounded-3xl border border-white/10 bg-white/[0.04] shadow-premium ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
