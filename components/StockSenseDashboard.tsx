'use client';

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bot,
  Command,
  Cpu,
  LayoutGrid,
  Monitor,
  PieChart,
  Search,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  TrendingUp,
} from 'lucide-react';
import { StockSearchPanel } from './StockSearchPanel';

const marketRows = [
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: '412.52',
    change: '+1.24%',
    positive: true,
    points: '0 35 20 28 40 32 60 15 80 18 100 5',
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '189.43',
    change: '-0.82%',
    positive: false,
    points: '0 10 20 15 40 12 60 28 80 25 100 38',
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: '145.67',
    change: '+2.15%',
    positive: true,
    points: '0 38 25 30 50 20 75 25 100 5',
  },
  {
    symbol: 'NVDA',
    name: 'Nvidia Corp.',
    price: '875.28',
    change: '+4.52%',
    positive: true,
    points: '0 35 20 32 40 20 60 18 80 10 100 2',
  },
];

const feedItems = [
  {
    label: 'AI SUMMARY',
    time: '2m ago',
    title: 'ECB signals potential mid-year pivot on rates as inflation cools faster than forecast.',
    body: 'Signal impact: high. European equity markets react with a +0.4% baseline and the model points to EUR/USD volatility.',
  },
  {
    label: 'AI SUMMARY',
    time: '15m ago',
    title: 'Nvidia H200 shipping estimates improved by 12% across tier-1 cloud providers.',
    body: 'Sector confirmation remains strong, and the predictive model raises the 12-month target by 3.5%.',
  },
  {
    label: 'AI SUMMARY',
    time: '42m ago',
    title: 'Macro scan: Emerging markets liquidity shows contraction for a third consecutive session.',
    body: 'Risk posture shifts defensive as capital moves toward treasury futures and yen-denominated assets.',
  },
];

const workspaceCards = [
  {
    title: 'AI Sentiment Index',
    value: '78%',
    tone: 'text-[#4edea3]',
    detail: 'Bullish strength',
    icon: Sparkles,
  },
  {
    title: 'Risk Alerts',
    value: '3 active',
    tone: 'text-[#ffb4ab]',
    detail: 'Volatility spikes',
    icon: AlertTriangle,
  },
  {
    title: 'Signal Confidence',
    value: '92%',
    tone: 'text-[#00f0ff]',
    detail: 'Model accuracy',
    icon: Cpu,
  },
];

const mobileNav = [
  { icon: LayoutGrid, active: true },
  { icon: Search },
  { icon: Monitor },
  { icon: PieChart },
];

function Sparkline({ points, positive }: { points: string; positive: boolean }) {
  return (
    <svg className="h-8 w-16" viewBox="0 0 100 40" aria-hidden="true">
      <path
        className="sparkline-svg"
        d={points}
        fill="none"
        stroke={positive ? '#4edea3' : '#ffb4ab'}
        strokeWidth="2"
      />
    </svg>
  );
}

export function StockSenseDashboard() {
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
            {['Dashboard', 'Markets', 'Portfolio', 'Analytics'].map((item, index) => (
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
            <button className="rounded-full border border-[#2b2b2b] p-2 text-[#adadad] transition hover:bg-[#171717] hover:text-white">
              <Search className="h-4 w-4" />
            </button>
            <button className="rounded-full border border-[#2b2b2b] p-2 text-[#adadad] transition hover:bg-[#171717] hover:text-white">
              <Bot className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="glass-panel rounded-[24px] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between border-b border-[#2b2b2b] pb-3">
                <div className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-[#4edea3]" />
                  <h2 className="text-lg font-semibold text-white">Live Market Pulse</h2>
                </div>
                <span className="rounded-full border border-[#2b2b2b] bg-[#171717] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">
                  Real-time feed
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#2b2b2b] text-[#8f9397]">
                      <th className="pb-3 font-medium">Ticker</th>
                      <th className="pb-3 font-medium">Price</th>
                      <th className="pb-3 font-medium">Change</th>
                      <th className="pb-3 text-right font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketRows.map((item) => (
                      <tr key={item.symbol} className="border-b border-[#2b2b2b]/60 last:border-b-0">
                        <td className="py-3 pr-3">
                          <div className="flex flex-col">
                            <span className="font-semibold text-white">{item.symbol}</span>
                            <span className="text-[11px] text-[#7b7f83]">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-[#f3f0ee]">{item.price}</td>
                        <td className={`py-3 pr-3 ${item.positive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'}`}>{item.change}</td>
                        <td className="py-3 text-right">
                          <Sparkline points={item.points} positive={item.positive} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {workspaceCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.title} className="glass-panel rounded-[22px] p-4">
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl border border-[#2b2b2b] bg-[#171717] p-2 text-[#00f0ff]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={`text-sm font-semibold ${card.tone}`}>{card.value}</span>
                    </div>
                    <p className="mt-4 text-sm font-semibold text-white">{card.title}</p>
                    <p className="mt-1 text-sm text-[#8f9397]">{card.detail}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel flex h-full flex-col rounded-[24px] p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2 border-b border-[#2b2b2b] pb-3">
              <Sparkles className="h-5 w-5 text-[#00f0ff]" />
              <h3 className="text-lg font-semibold text-white">Intelligence Feed</h3>
            </div>
            <div className="space-y-4 overflow-y-auto pr-1">
              {feedItems.map((item) => (
                <article key={item.title} className="rounded-[18px] border border-[#2b2b2b] bg-[#131313]/70 p-4 transition hover:border-[#4edea3]/40 hover:bg-[#171717]">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#4edea3]">{item.label}</span>
                    <span className="text-[11px] text-[#7b7f83]">{item.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold leading-6 text-[#f3f0ee]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#8f9397]">{item.body}</p>
                </article>
              ))}

              <div className="rounded-[18px] border border-dashed border-[#2b2b2b] bg-[#121212] p-4">
                <div className="mb-3 h-24 rounded-[14px] bg-[radial-gradient(circle_at_top_left,_rgba(0,240,255,0.28),_transparent_50%),linear-gradient(135deg,_rgba(28,28,28,0.95),_rgba(9,9,9,1))]" />
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">
                  Visual intelligence engine: scan complete
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[24px] border border-[#262626] bg-[radial-gradient(circle_at_top_left,_rgba(0,240,255,0.1),_transparent_40%),linear-gradient(135deg,_rgba(20,20,20,0.95),_rgba(10,10,10,1))] p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4edea3]">AI workspace</p>
              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">From signal discovery to action in one place.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#8f9397] sm:text-base">
                Explore live market data, compare sentiment, and surface high-conviction insights without leaving the workspace.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-[#2b2b2b] bg-[#111111] px-4 py-2 text-sm text-[#d9d9d9]">
              <ShieldCheck className="h-4 w-4 text-[#4edea3]" />
              Secure research workflow
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[20px] border border-[#2b2b2b] bg-[#0e0e0e]/70 p-4">
              <div className="flex items-center gap-2 text-[#4edea3]">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-semibold">Momentum scan</span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">+2.41%</p>
              <p className="mt-2 text-sm text-[#8f9397]">Momentum remains strong across growth leaders and semiconductors.</p>
            </div>
            <div className="rounded-[20px] border border-[#2b2b2b] bg-[#0e0e0e]/70 p-4">
              <div className="flex items-center gap-2 text-[#00f0ff]">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm font-semibold">Risk posture</span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">Balanced</p>
              <p className="mt-2 text-sm text-[#8f9397]">Macro and sector risks are controlled with hedged positioning.</p>
            </div>
            <div className="rounded-[20px] border border-[#2b2b2b] bg-[#0e0e0e]/70 p-4">
              <div className="flex items-center gap-2 text-[#ffb4ab]">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-semibold">Watchlist alerts</span>
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">7 queued</p>
              <p className="mt-2 text-sm text-[#8f9397]">Signals are ready for a review before the next market open.</p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <StockSearchPanel />
        </section>
      </main>

      <div className="fixed bottom-6 left-1/2 z-50 flex w-[min(92vw,640px)] -translate-x-1/2 items-center gap-3 rounded-full border border-[#2b2b2b] bg-[#1c1c1c]/90 px-3 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-[#4edea3]">
          <Command className="h-4 w-4" />
        </div>
        <input
          className="flex-1 bg-transparent text-sm text-[#f3f0ee] outline-none placeholder:text-[#7b7f83]"
          placeholder="Ask AI Terminal..."
          aria-label="Ask AI Terminal"
        />
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00f0ff] text-[#00363a] transition hover:scale-105">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <nav className="fixed bottom-0 left-0 z-40 flex w-full items-center justify-around border-t border-[#262626] bg-[#0e0e0e]/95 px-4 py-3 md:hidden">
        {mobileNav.map(({ icon: Icon, active }) => (
          <button key={Icon.displayName ?? 'nav'} className={`rounded-full p-2 ${active ? 'text-[#4edea3]' : 'text-[#7b7f83]'}`}>
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </nav>
    </div>
  );
}
