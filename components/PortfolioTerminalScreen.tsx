'use client';

import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Circle,
  Download,
  SlidersHorizontal,
  LayoutGrid,
  Mic,
  PieChart,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TrendingUp,
  UserCircle2,
} from 'lucide-react';
import { StockSearchPanel } from './StockSearchPanel';

const navItems = ['Dashboard', 'Analytics', 'Terminal'];

const holdings = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: '$875.28',
    change: '+3.82%',
    changeTone: 'text-[#4edea3]',
    weight: '15.4%',
    marketValue: '$1,977,807.30',
    initials: 'N',
    initialsTone: 'bg-[#4edea3]/20 text-[#4edea3]',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: '$171.05',
    change: '-1.14%',
    changeTone: 'text-[#ffb4ab]',
    weight: '8.2%',
    marketValue: '$1,053,118.17',
    initials: 'T',
    initialsTone: 'bg-[#ffb4ab]/20 text-[#ffb4ab]',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: '$180.38',
    change: '+0.45%',
    changeTone: 'text-[#4edea3]',
    weight: '12.1%',
    marketValue: '$1,553,991.45',
    initials: 'A',
    initialsTone: 'bg-white/10 text-[#c7c7c7]',
  },
];

const riskBuckets = [
  { label: 'Tech Growth', value: '42.5%', width: '42.5%', tone: 'bg-[#4edea3]' },
  { label: 'Energy', value: '18.2%', width: '18.2%', tone: 'bg-[#e5e2e1]' },
  { label: 'Cash/Equiv', value: '24.1%', width: '24.1%', tone: 'bg-[#849495]' },
];

export function PortfolioTerminalScreen() {
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
              <p className="text-xs text-[#9aa0a6]">Institutional portfolio terminal</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-medium uppercase tracking-[0.2em] transition ${
                  index === 0 ? 'text-[#4edea3]' : 'text-[#7b7f83] hover:text-[#e5e2e1]'
                }`}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-[#2b2b2b] p-2 text-[#adadad] transition hover:bg-[#171717] hover:text-white" aria-label="Account profile">
              <UserCircle2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto mb-24 max-w-7xl px-4 pb-8 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <section className="mb-6 grid gap-6 lg:grid-cols-12">
          <div className="glass-surface relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-[20px] p-6 lg:col-span-7">
            <div className="absolute right-4 top-4">
              <div className="flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#171717]/80 px-3 py-1">
                <Circle className="h-3.5 w-3.5 fill-[#4edea3] text-[#4edea3] pulse-green" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#4edea3]">Live Market Feed</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Net Liquidation Value</p>
              <div className="flex flex-wrap items-baseline gap-4">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
                  $12,842,904.52
                </h1>
                <span className="inline-flex items-center gap-1 text-lg font-semibold text-[#4edea3]">
                  <TrendingUp className="h-5 w-5" />
                  +2.41%
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-8">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Daily P&amp;L</span>
                <span className="mt-1 text-sm font-semibold text-[#4edea3]">+$301,522.18</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Buying Power</span>
                <span className="mt-1 text-sm font-semibold text-white">$3,104,229.00</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Margin Req</span>
                <span className="mt-1 text-sm font-semibold text-white">12.5%</span>
              </div>
            </div>
          </div>

          <div className="glass-surface flex flex-col gap-4 rounded-[20px] border border-[#00f0ff]/20 p-6 lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#00f0ff]" />
                <h2 className="text-lg font-semibold text-white">Portfolio Skew AI</h2>
              </div>
              <span className="rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#00f0ff]">
                Real-time advisory
              </span>
            </div>

            <p className="text-sm leading-7 text-[#cfcfcf]">
              AI detects high concentration risk in{' '}
              <span className="font-semibold text-[#4edea3]">Technology (42%)</span>. Your portfolio skews toward high-beta growth assets. Suggested hedge: increase exposure to defensive industrials or SPY puts.
            </p>

            <div className="mt-auto flex flex-col gap-3 sm:flex-row">
              <button type="button" className="flex-1 rounded-full border border-[#00f0ff]/50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#00f0ff] transition hover:bg-[#00f0ff]/10 active:scale-95">
                Execute hedge
              </button>
              <button type="button" className="rounded-full border border-[#2b2b2b] px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#8f9397] transition hover:text-white active:scale-95">
                Dismiss
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-6 lg:grid-cols-12">
          <div className="glass-surface rounded-[20px] p-6 lg:col-span-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-white">Performance Benchmark</h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#00f0ff]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#849495]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">S&amp;P 500</span>
                </div>
              </div>
            </div>

            <div className="h-64 rounded-[16px] border border-[#2b2b2b] bg-[#121212]/70 p-3">
              <svg className="h-full w-full" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-label="Portfolio performance chart">
                <defs>
                  <linearGradient id="portfolio-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 80 L100 75 L200 85 L300 60 L400 65 L500 40 L600 45 L700 20 L800 25 L900 10 L1000 15 L1000 100 L0 100 Z" fill="url(#portfolio-fill)" />
                <path d="M0 80 L100 75 L200 85 L300 60 L400 65 L500 40 L600 45 L700 20 L800 25 L900 10 L1000 15" fill="none" stroke="#00f0ff" strokeWidth="2" />
                <path d="M0 85 L100 80 L200 82 L300 75 L400 78 L500 65 L600 68 L700 55 L800 58 L900 50 L1000 52" fill="none" stroke="#849495" strokeDasharray="4 4" strokeWidth="1.5" />
              </svg>
              <div className="mt-4 flex justify-between border-t border-[#2b2b2b] pt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">
                <span>Jan</span>
                <span>Mar</span>
                <span>May</span>
                <span>Jul</span>
                <span>Sep</span>
                <span>Nov</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4">
            <div className="glass-surface rounded-[20px] p-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Risk Exposure</p>
              <div className="space-y-4">
                {riskBuckets.map((bucket) => (
                  <div key={bucket.label}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm text-white">{bucket.label}</span>
                      <span className="text-sm text-[#8f9397]">{bucket.value}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-[#2b2b2b]">
                      <div className={`h-full ${bucket.tone}`} style={{ width: bucket.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-surface rounded-[20px] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Sharpe Ratio</p>
              <p className="mt-3 text-4xl font-semibold text-[#00f0ff]">2.84</p>
              <p className="mt-2 text-sm leading-7 text-[#cfcfcf]">Systematic alpha generation +12%</p>
            </div>
          </div>
        </section>

        <section className="glass-surface overflow-hidden rounded-[20px] border border-[#262626]">
          <div className="flex flex-col gap-3 border-b border-[#2b2b2b] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#4edea3]" />
              <h3 className="text-lg font-semibold text-white">Asset Holdings</h3>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" className="rounded-full border border-[#2b2b2b] p-2 text-[#8f9397] transition hover:bg-[#171717] hover:text-white" aria-label="Filter holdings">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button type="button" className="rounded-full border border-[#2b2b2b] p-2 text-[#8f9397] transition hover:bg-[#171717] hover:text-white" aria-label="Download holdings">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#2b2b2b] bg-[#121212]/90 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Change</th>
                  <th className="px-6 py-4">Weighting</th>
                  <th className="px-6 py-4">Market Value</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr key={holding.symbol} className="border-b border-[#2b2b2b]/70 last:border-b-0 hover:bg-[#171717]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${holding.initialsTone}`}>
                          {holding.initials}
                        </div>
                        <div>
                          <div className="font-semibold uppercase text-white">{holding.symbol}</div>
                          <div className="text-xs text-[#8f9397]">{holding.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{holding.price}</td>
                    <td className={`px-6 py-4 font-semibold ${holding.changeTone}`}>{holding.change}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white">{holding.weight}</span>
                        <div className="h-1.5 min-w-[70px] flex-1 overflow-hidden rounded-full bg-[#2b2b2b]">
                          <div className="h-full w-[50%] bg-[#00f0ff]" style={{ width: holding.weight }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{holding.marketValue}</td>
                    <td className="px-6 py-4 text-right">
                      <button type="button" className="text-sm font-semibold uppercase tracking-[0.2em] text-[#8f9397] transition hover:text-[#00f0ff]">
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-[20px] border border-[#262626] bg-[#111111]/80 p-4 sm:p-6">
          <StockSearchPanel />
        </section>
      </main>

      <div className="fixed bottom-6 left-1/2 z-50 flex w-[min(92vw,720px)] -translate-x-1/2 items-center gap-3 rounded-full border border-[#00f0ff]/20 bg-[#0e0e0e]/90 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-[#171717] px-3 py-2">
          <Sparkles className="h-4 w-4 text-[#00f0ff]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Terminal AI</span>
        </div>
        <input
          className="flex-1 bg-transparent text-sm text-[#f3f0ee] outline-none placeholder:text-[#7b7f83]"
          placeholder="Ask AI to rebalance or analyze exposure..."
          aria-label="Ask AI to rebalance or analyze exposure"
        />
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-full border border-[#2b2b2b] p-2 text-[#8f9397] transition hover:text-white" aria-label="Voice input">
            <Mic className="h-4 w-4" />
          </button>
          <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00f0ff] text-[#00363a] transition hover:brightness-110 active:scale-95">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-[#262626] bg-[#0e0e0e]/95 px-4 py-3 md:hidden">
        {[
          { icon: LayoutGrid, label: 'Home', active: true },
          { icon: Search, label: 'Search' },
          { icon: PieChart, label: 'Assets' },
          { icon: BarChart3, label: 'Stats' },
        ].map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            type="button"
            className={`flex flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.2em] ${active ? 'text-[#4edea3]' : 'text-[#7b7f83]'}`}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
