'use client';

import { AppShell } from '../components/AppShell';
import { StockSenseDashboard } from '../components/StockSenseDashboard';

export default function HomePage() {
  return (
    <AppShell>
      <StockSenseDashboard />
    </AppShell>
  );
}
