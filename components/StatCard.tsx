'use client';

import { InsightCard, type InsightCardProps } from './InsightCard';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
}

export function StatCard({ label, value, change }: StatCardProps) {
  const props: InsightCardProps = {
    company: 'Market Signal',
    metricLabel: label,
    metricValue: value,
    summary: change ?? 'Live model output updated in real time.',
    insights: [
      'Signal derived from price action, volume, and sentiment inputs.',
      'Confidence band remains within institutional risk thresholds.',
      'Review full desk briefing for macro overlay context.',
    ],
  };

  return <InsightCard {...props} />;
}
