'use client';

import { motion } from 'framer-motion';
import { Search, Bell, UserCircle, Sparkles, TrendingUp, FileText, Settings, Grid } from 'lucide-react';

const navItems = ['Dashboard', 'Market Overview', 'Watchlist', 'Portfolio', 'AI Analyst', 'Research Reports', 'Settings'];
const marketCards = [
  { label: 'NIFTY 50', value: '21,608.12', change: '+0.97%', spark: [20, 22, 19, 21, 24, 23, 25] },
  { label: 'S&P 500', value: '5,234.88', change: '+0.46%', spark: [22, 21, 24, 26, 27, 28, 29] },
  { label: 'NASDAQ', value: '16,112.74', change: '+1.12%', spark: [28, 27, 29, 30, 32, 33, 34] },
  { label: 'BTC', value: '68,190', change: '+2.84%', spark: [42, 41, 43, 45, 44, 47, 50] },
];

const panelMetrics = [
  { label: 'Recommendation', value: 'Strong Buy' },
  { label: 'Confidence', value: '92%' },
  { label: 'Risk', value: 'Moderate' },
  { label: 'Sentiment', value: 'Bullish' },
];

const positions = [
  { symbol: 'AAPL', signal: 'Buy', confidence: '95%', status: 'Active' },
  { symbol: 'NVDA', signal: 'Buy', confidence: '91%', status: 'Active' },
  { symbol: 'TSLA', signal: 'Hold', confidence: '76%', status: 'Monitoring' },
  { symbol: 'RELIANCE', signal: 'Buy', confidence: '88%', status: 'Active' },
];

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100;
      const y = 100 - ((value - min) / (max - min || 1)) * 100;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg viewBox="0 0 100 100" className="h-10 w-full overflow-visible">
      <polyline
        fill="none"
        stroke="#4f7cff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function TradingChart() {
  return (
    <svg viewBox="0 0 720 320" className="h-full w-full">
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#4f7cff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
      <path
        d="M0,220 C100,180 170,150 240,170 C310,190 340,120 420,135 C500,150 560,110 640,90 C700,80 720,75 720,75"
        fill="none"
        stroke="#00e5ff"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M0,220 C100,180 170,150 240,170 C310,190 340,120 420,135 C500,150 560,110 640,90 C700,80 720,75 720,75 L720,320 L0,320 Z"
        fill="url(#chartGradient)"
        opacity="0.92"
      />
      <g opacity="0.7">
        {[50, 100, 150, 200, 250, 300].map((y) => (
          <line key={y} x1="0" y1={y} x2="720" y2={y} stroke="rgba(148,163,184,0.12)" strokeWidth="1" />
        ))}
      </g>
      <circle cx="420" cy="135" r="5.5" fill="#00e5ff" />
      <circle cx="720" cy="75" r="5.5" fill="#4f7cff" />
    </svg>
  );
}

export function DashboardPreview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="relative z-10 mx-auto mt-12 flex w-[min(1200px,100%)] flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.23)] backdrop-blur-2xl md:p-8"
    >
      <div className="grid gap-6 xl:grid-cols-[280px_minmax(420px,1fr)_320px] xl:items-start">
        <aside className="space-y-6 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20">
          <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/8 bg-white/5 px-4 py-4">
            <div className="flex items-center gap-3 text-slate-100">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900">
                <Grid className="h-5 w-5 text-sky-300" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">StockSense</p>
                <p className="text-sm font-semibold text-white">Premium AI hub</p>
              </div>
            </div>
            <button className="rounded-2xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-sky-300">Live</button>
          </div>
          <div className="space-y-2 text-sm text-slate-400">
            {navItems.map((item) => (
              <button key={item} className="flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left transition hover:bg-white/5 hover:text-white">
                {item === 'AI Analyst' ? <Sparkles className="h-4 w-4 text-sky-300" /> : item === 'Research Reports' ? <FileText className="h-4 w-4 text-slate-300" /> : item === 'Settings' ? <Settings className="h-4 w-4 text-slate-300" /> : <TrendingUp className="h-4 w-4 text-slate-300" />}
                <span>{item}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6 rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-5 shadow-2xl shadow-slate-950/10 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Welcome Back</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">Here's your market intelligence dashboard.</h3>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-slate-900/80 px-4 py-3 text-slate-300">
              <Bell className="h-4 w-4 text-sky-300" />
              <span>2 alerts ready for review</span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {marketCards.map((market) => (
              <div key={market.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm backdrop-blur-xl">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-300">{market.label}</p>
                  <span className="rounded-2xl bg-slate-900 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">Live</span>
                </div>
                <div className="mt-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-2xl font-semibold text-white">{market.value}</p>
                    <p className="mt-1 text-sm text-sky-300">{market.change}</p>
                  </div>
                  <div className="h-10 w-24">
                    <Sparkline values={market.spark} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Intraday trend</p>
                  <h4 className="mt-3 text-xl font-semibold text-white">Institutional flow</h4>
                </div>
                <div className="rounded-3xl bg-slate-900 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-400">Today</div>
              </div>
              <div className="relative h-[320px] overflow-hidden rounded-3xl bg-slate-900/80 p-5">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-transparent" />
                <TradingChart />
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20">
                <h5 className="text-sm uppercase tracking-[0.26em] text-slate-400">AI analysis</h5>
                <div className="mt-5 grid gap-4">
                  {panelMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-3xl bg-white/5 p-4">
                      <p className="text-sm text-slate-400">{metric.label}</p>
                      <p className="mt-2 text-xl font-semibold text-white">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Portfolio</p>
                    <p className="mt-2 text-2xl font-semibold text-white">$1,486,200</p>
                  </div>
                  <div className="rounded-3xl bg-sky-500/15 px-3 py-2 text-sm font-semibold text-sky-300">+2.6%</div>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-400">
                  <div className="flex items-center justify-between gap-2">
                    <span>Total value</span>
                    <span className="text-white">$1.49M</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Daily P/L</span>
                    <span className="text-emerald-300">+$16,400</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Allocation</span>
                    <span className="text-white">Equities 64%</span>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 rounded-3xl bg-slate-900/60 p-4 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Equities</span>
                    <span>64%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crypto</span>
                    <span>18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cash</span>
                    <span>18%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Recent analysis</p>
                <h4 className="mt-2 text-xl font-semibold text-white">Signals & confidence</h4>
              </div>
              <button className="rounded-3xl border border-white/10 bg-slate-900 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800">Export</button>
            </div>
            <div className="space-y-3 overflow-hidden rounded-3xl bg-slate-900/70 text-sm text-slate-300">
              <div className="grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-4 border-b border-white/10 px-4 py-3 text-slate-400">
                <span>Symbol</span>
                <span>Signal</span>
                <span>Confidence</span>
                <span>Status</span>
              </div>
              {positions.map((position) => (
                <div key={position.symbol} className="grid grid-cols-[1fr_1fr_1fr_0.9fr] gap-4 px-4 py-4 transition hover:bg-white/5">
                  <span className="font-semibold text-white">{position.symbol}</span>
                  <span>{position.signal}</span>
                  <span>{position.confidence}</span>
                  <span className="text-sky-300">{position.status}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl shadow-slate-950/20">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-slate-400">Snapshot</p>
              <p className="mt-2 text-lg font-semibold text-white">Analytics at a glance</p>
            </div>
            <button className="rounded-3xl bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Today</button>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-slate-400">Portfolio Exposure</p>
              <p className="mt-3 text-2xl font-semibold text-white">64% Equities</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-slate-400">AI Confidence</p>
              <p className="mt-3 text-2xl font-semibold text-white">92%</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-4">
              <p className="text-sm text-slate-400">Sentiment</p>
              <p className="mt-3 text-2xl font-semibold text-white">Bullish</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
