'use client';

import { BrainCircuit, CheckCircle2, History, Lock, RefreshCw, Send, Share2, Sparkles, TerminalSquare } from 'lucide-react';

const sessions = [
  { title: 'NVIDIA VS AMD ALPHA', time: '2m ago', active: true },
  { title: 'CRYPTO LIQUIDITY ANALYSIS', time: '1h ago', active: false },
  { title: 'FED MINUTES IMPACT', time: 'Yesterday', active: false },
];

const marketVitals = [
  { label: 'S&P 500', value: '+0.42%', positive: true },
  { label: 'NASDAQ', value: '+1.18%', positive: true },
  { label: 'VIX', value: '-2.05%', positive: false },
];

function SidebarItem({ title, time, active }: { title: string; time: string; active: boolean }) {
  return (
    <div className={`cursor-pointer rounded-[12px] border p-3 transition ${active ? 'border-[#4edea3]/40 bg-[#1b1f23]' : 'border-transparent bg-transparent hover:bg-[#1a1d21]'}`}>
      <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${active ? 'text-[#4edea3]' : 'text-[#e5e2e1]'}`}>{title}</p>
      <p className="mt-1 text-xs text-[#8f9397]">{time}</p>
    </div>
  );
}

function MetricRow({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-[14px] border border-[#2b2b2b] bg-[#171a1e] p-3 text-sm">
      <span className="text-[#e5e2e1]">{label}</span>
      <span className={positive ? 'text-[#4edea3]' : 'text-[#ffb4ab]'}>{value}</span>
    </div>
  );
}

export function WorkspaceScreen() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-[#0f1113] text-[#e5e2e1]">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-72 flex-col border-r border-[#262626] bg-[#121417] p-4 lg:flex">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Sessions</h2>
              <button className="rounded-full border border-[#2b2b2b] p-1.5 text-[#8f9397] transition hover:text-white" aria-label="Create new session">
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              {sessions.map((session) => (
                <SidebarItem key={session.title} title={session.title} time={session.time} active={session.active} />
              ))}
            </div>
          </div>

          <div className="mt-auto rounded-[16px] border border-[#2b2b2b] bg-[#171a1e] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#4edea3]">
              <BrainCircuit className="h-4 w-4" />
              <span className="text-sm font-semibold">Neural Mesh Status</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#2b2b2b]">
              <div className="h-full w-[80%] bg-[#4edea3]" />
            </div>
            <p className="mt-2 text-xs leading-6 text-[#8f9397]">Optimal throughput via 12.4k nodes</p>
          </div>
        </aside>

        <section className="relative flex flex-1 flex-col bg-[#0f1113]">
          <div className="z-10 flex items-center justify-between border-b border-[#262626] bg-[#121417]/95 px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[#4edea3] animate-pulse" />
              <div>
                <h1 className="text-lg font-semibold text-white">GPU Sector Divergence Report</h1>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8f9397]">High Priority</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-full border border-[#2b2b2b] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8f9397] transition hover:text-white" type="button">
                <Share2 className="h-4 w-4" />
                Export
              </button>
              <button className="flex items-center gap-2 rounded-full bg-[#4edea3] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#003824] transition hover:brightness-110" type="button">
                <RefreshCw className="h-4 w-4" />
                Re-calculate
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="ml-auto max-w-2xl">
              <div className="rounded-[16px] rounded-tr-none border border-[#2b2b2b] bg-[#171a1e] p-4">
                <p className="text-sm leading-7 text-[#e5e2e1] italic">“Compare NVIDIA (NVDA) vs AMD technical strength and identify immediate divergence risk for the next trading window.”</p>
              </div>
              <p className="mt-2 text-right text-[11px] uppercase tracking-[0.25em] text-[#8f9397]">Sent at 10:42:01 AM</p>
            </div>

            <div className="mr-auto mt-6 max-w-4xl">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00f0ff]/15 text-[#00f0ff]">
                  <BrainCircuit className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#4edea3]">StockSense Agent // ALPHA-7</span>
              </div>

              <div className="glass-surface rounded-[20px] p-5 sm:p-6">
                <p className="text-base leading-8 text-[#e5e2e1]">
                  Analysis complete. I have processed order flow, RSI divergence, and call-put ratios for both entities. NVDA maintains dominant institutional accumulation, whereas AMD is exhibiting early-stage exhaustion patterns on the 4H timeframe.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[16px] border border-[#2b2b2b] bg-[#0f1113] p-4">
                    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Strength Scores (0-100)</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm text-[#e5e2e1]">
                          <span>NVIDIA (NVDA)</span>
                          <span className="text-[#4edea3]">88.4</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#2b2b2b]">
                          <div className="h-full w-[88.4%] bg-[#4edea3]" />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-sm text-[#e5e2e1]">
                          <span>AMD (AMD)</span>
                          <span className="text-[#ffb4ab]">64.1</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#2b2b2b]">
                          <div className="h-full w-[64.1%] bg-[#ffb4ab]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[16px] border border-[#2b2b2b] bg-[#0f1113] p-4">
                    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Divergence Risk</h3>
                    <div className="flex min-h-[120px] items-center justify-center rounded-[14px] border border-[#2b2b2b] bg-[#111418]">
                      <div className="text-center">
                        <p className="text-4xl font-semibold tracking-tight text-[#4edea3]">7.2<span className="text-sm text-[#8f9397]">/10</span></p>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[#8f9397]">Systemic Correlation Break</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[16px] border border-[#2b2b2b] bg-[#0f1113]">
                  <div className="border-b border-[#2b2b2b] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Volatility Overlay [NVDA:AMD]</div>
                  <div className="flex h-48 items-end gap-1 px-3 pb-3">
                    {[30, 40, 20, 50, 35, 45].map((height, index) => (
                      <div key={`${height}-${index}`} className={`flex-1 rounded-t-[8px] ${index % 2 === 0 ? 'bg-[#4edea3]/30' : 'bg-[#ffb4ab]/25'}`} style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-6 border-t border-[#2b2b2b] pt-4 text-sm text-[#e5e2e1]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#4edea3]" />
                    <span>Alpha Signal Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-[#8f9397]" />
                    <span>Training Data Oct-24</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[16px] border border-[#2b2b2b] bg-[#121417]/80 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <span className="text-[#4edea3]">$</span>
                <span className="text-sm text-[#8f9397]">Awaiting additional parameters for sector-wide deep dive...</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#262626] bg-[#121417]/90 p-4 sm:p-5">
            <div className="glow-green flex items-center gap-3 rounded-[16px] border border-[#2b2b2b] bg-[#171a1e] px-4 py-3 transition focus-within:border-[#4edea3]">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4edea3]">STOCK_SENSE_CLI &gt;</span>
              <input className="flex-1 bg-transparent text-sm text-[#e5e2e1] outline-none placeholder:text-[#7b7f83]" placeholder="Enter command or research query..." aria-label="Workspace command" />
              <button className="rounded-full border border-[#2b2b2b] p-2 text-[#8f9397] transition hover:text-white" aria-label="Send command">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <aside className="hidden w-80 flex-col border-l border-[#262626] bg-[#121417] p-4 xl:flex">
          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Market Vitals</h2>
            <div className="space-y-3">
              {marketVitals.map((item) => (
                <MetricRow key={item.label} label={item.label} value={item.value} positive={item.positive} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8f9397]">Neural Activity</h2>
            <div className="flex min-h-[140px] items-center justify-center rounded-[16px] border border-[#2b2b2b] bg-[#171a1e]">
              <div className="text-center">
                <p className="text-3xl font-semibold text-white">1.2 PFlops</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[#4edea3]">Real-time inference</p>
              </div>
            </div>
          </div>

          <div className="mt-auto rounded-[16px] border border-[#2b2b2b] bg-[#171a1e] p-4">
            <div className="mb-2 flex items-center gap-2 text-[#4edea3]">
              <Lock className="h-4 w-4" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">Secure Execution Environment</span>
            </div>
            <p className="text-xs leading-6 text-[#8f9397]">Terminal ID: 8X-992-ALPHA. All analysis is locally cached and encrypted.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
