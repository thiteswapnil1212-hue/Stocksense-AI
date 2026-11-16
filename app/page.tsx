'use client';

import { AppShell } from '../components/AppShell';
import { DashboardPreview } from '../components/DashboardPreview';

export default function HomePage() {
  return (
    <AppShell>
      <DashboardPreview />
    </AppShell>
  );
}
