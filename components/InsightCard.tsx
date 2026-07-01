'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, ChevronDown, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';

export interface InsightCardProps {
  company: string;
  metricLabel: string;
  metricValue: string;
  summary: string;
  insights: string[];
  icon?: ReactNode;
}

export function InsightCard({
  company,
  metricLabel,
  metricValue,
  summary,
  insights,
  icon,
}: InsightCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="insight-card group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/25 via-indigo-600/20 to-purple-700/25 p-4 shadow-lg shadow-black/30 backdrop-blur-xl sm:rounded-3xl sm:p-6"
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-cyan-300 shadow-inner sm:h-10 sm:w-10">
          {icon ?? <Building2 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />}
        </div>
        <p className="truncate text-xs font-medium uppercase tracking-[0.2em] text-slate-200 sm:text-sm">
          {company}
        </p>
      </div>

      <div className="mt-4 sm:mt-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-400 sm:text-xs">
          {metricLabel}
        </p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-white sm:mt-2 sm:text-3xl lg:text-4xl">
          {metricValue}
        </p>
      </div>

      <p className="mt-3 text-xs leading-6 text-slate-300 sm:mt-4 sm:text-sm sm:leading-7">{summary}</p>

      <button
        type="button"
        aria-expanded={expanded ? 'true' : 'false'}
        onClick={() => setExpanded((open) => !open)}
        className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-100 transition hover:border-cyan-400/50 hover:bg-white/10 active:scale-[0.98] sm:mt-5 sm:text-sm"
      >
        <Sparkles className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
        {expanded ? 'Hide insights' : 'More info'}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="insights"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="mt-4 space-y-3 border-t border-white/10 pt-4" role="list">
              {insights.map((line) => (
                <li key={line} className="flex gap-2.5 text-xs leading-6 text-slate-300 sm:text-sm sm:leading-7">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.article>
  );
}

export function InsightCardGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">{children}</div>
  );
}
