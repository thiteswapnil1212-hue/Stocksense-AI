import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StockSense AI',
  description: 'Premium AI fintech market intelligence platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bgMain text-white antialiased">{children}</body>
    </html>
  );
}
