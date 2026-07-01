'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, LayoutGrid, TerminalSquare, UserCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { CommandBar } from './CommandBar';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutGrid },
  { label: 'Portfolio', href: '/portfolio', icon: BarChart3 },
  { label: 'Workspace', href: '/workspace', icon: TerminalSquare },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e2e1]">
      <header className="sticky top-0 z-50 border-b border-[#262626] bg-[#0e0e0e]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#2b2b2b] bg-[#171717] text-[#4edea3]">
              <TerminalSquare className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4edea3]">StockSense AI</p>
              <p className="text-xs text-[#9aa0a6]">Market intelligence</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] transition ${
                    active ? 'text-[#4edea3]' : 'text-[#7b7f83] hover:text-[#e5e2e1]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-[#2b2b2b] p-2 text-[#adadad] transition hover:bg-[#171717] hover:text-white" aria-label="Account profile">
              <UserCircle2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="pb-24">{children}</main>

      <CommandBar label="AI copilot" placeholder="Ask for a market readout or next move..." />

      <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-[#262626] bg-[#0e0e0e]/95 px-4 py-3 md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.2em] ${active ? 'text-[#4edea3]' : 'text-[#7b7f83]'}`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
