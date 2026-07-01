'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 36, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, delay, ease },
});

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accent?: string;
}

export function SectionHeading({ title, subtitle, accent }: SectionHeadingProps) {
  return (
    <div className="space-y-3 text-center md:text-left">
      {accent ? (
        <motion.p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-400" {...reveal(0)}>
          {accent}
        </motion.p>
      ) : null}
      <motion.h2 className="text-3xl font-semibold text-white md:text-4xl" {...reveal(accent ? 0.08 : 0)}>
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p className="max-w-2xl text-sm leading-7 text-slate-400" {...reveal(accent ? 0.16 : 0.08)}>
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}
