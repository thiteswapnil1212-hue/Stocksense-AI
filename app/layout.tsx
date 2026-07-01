import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StockSense AI',
  description: 'Premium AI fintech market intelligence platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1] antialiased">{children}</body>
    </html>
  );
}
