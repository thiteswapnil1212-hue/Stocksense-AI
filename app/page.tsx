'use client';

import {
  ArrowRight,
  BarChart3,
  Cpu,
  Globe,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { FeatureCard } from '../components/FeatureCard';
import { GlassCard } from '../components/GlassCard';
import { InsightCard, InsightCardGrid } from '../components/InsightCard';
import { SectionHeading } from '../components/SectionHeading';
import { StockSearchPanel } from '../components/StockSearchPanel';
import { VideoBackground } from '../components/VideoBackground';
import { ScrollReveal, ScrollRevealItem } from '../components/ScrollReveal';

const features = [
  {
    title: 'Real-time alpha signals',
    description: 'Advanced AI detects momentum shifts, liquidity flows, and high-probability setups before the market moves.',
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: 'Quant-grade sentiment',
    description: 'Combined news, social, and macro sentiment models power every trade recommendation with confidence scoring.',
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: 'Portfolio intelligence',
    description: 'Monitor exposure, risk drift, and performance attribution across global equities, crypto, and derivatives.',
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: 'Institutional research',
    description: 'Deep market narratives, event scans, and analyst-grade briefings delivered in one premium dashboard.',
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: 'Secure access',
    description: 'Enterprise-grade identity controls, audit-ready logs, and encrypted workspaces for every trading team.',
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    title: 'Automated workflows',
    description: 'Trigger alerts, watchlist updates, and portfolio actions with programmable AI rules and event pipelines.',
    icon: <Cpu className="h-6 w-6" />,
  },
];

const insightCards = [
  {
    company: 'Apple Inc.',
    metricLabel: 'Confidence Score',
    metricValue: '92%',
    summary: 'Strong quarterly earnings boost investor confidence.',
    insights: [
      'Services revenue beat consensus by 4.2%, supporting margin stability.',
      'Institutional order flow remains net positive over the last 30 sessions.',
      'AI sentiment model flags reduced headline risk into the next earnings window.',
    ],
    icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    company: 'NVIDIA Corp.',
    metricLabel: 'Signal Accuracy',
    metricValue: '92%',
    summary: 'Model confidence elevated on sustained demand signals.',
    insights: [
      'Data-center demand indicators remain above the 90-day trend baseline.',
      'Options skew implies constructive positioning without overheated speculation.',
      'Cross-asset correlation risk is contained within desk limits.',
    ],
    icon: <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
  {
    company: 'Global Markets',
    metricLabel: 'Average Alpha',
    metricValue: '+1.8%',
    summary: 'Per-trade edge remains positive across major regions.',
    insights: [
      'Asia and US sessions contributed the majority of risk-adjusted returns.',
      'Macro overlay suggests balanced exposure between growth and defensives.',
      'Liquidity conditions support disciplined position sizing.',
    ],
    icon: <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />,
  },
];

const testimonials = [
  {
    quote: 'StockSense AI is the first platform that feels built for institutional traders — the insights are fast, clean, and actionable.',
    author: 'Maya Chen',
    role: 'Head of Research, Orion Capital',
  },
  {
    quote: 'The dashboard gives us confidence in every desk briefing. It’s like Bloomberg intelligence with AI speed.',
    author: 'David Kim',
    role: 'Portfolio Manager, Crescent Funds',
  },
  {
    quote: 'Our watchlist and portfolio analytics have become the center of our trading workflow.',
    author: 'Aisha Patel',
    role: 'Chief Risk Officer, Vanta Asset',
  },
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-bgMain text-white">
      <VideoBackground />

      <div className="relative z-20 mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        <Navbar />

        <section className="pt-16 pb-24">
          <ScrollReveal stagger className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-8">
              <ScrollRevealItem>
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-xl">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
                  Built for institutional AI finance teams
                </div>
              </ScrollRevealItem>

              <div className="space-y-6">
                <ScrollRevealItem>
                  <h1 className="font-display text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-[5.25rem]">
                    AI that <span className="italic">thinks before</span> you trade
                  </h1>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <p className="max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
                    Real-time market intelligence, technical analysis, sentiment tracking, and AI-powered investment insights.
                  </p>
                </ScrollRevealItem>
              </div>

              <ScrollRevealItem>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 hover:shadow-sky-500/30">
                    Launch AI Workspace
                  </button>
                  <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-medium text-white transition hover:bg-white/10">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    Watch demo
                  </button>
                </div>
              </ScrollRevealItem>

              <ScrollRevealItem>
                <InsightCard {...insightCards[0]} />
              </ScrollRevealItem>
            </div>

            <ScrollRevealItem>
            <GlassCard className="overflow-hidden p-0">
              <div className="relative h-[520px] bg-slate-950/85">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-slate-950/30" />
                <div className="absolute right-6 top-6 rounded-full bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                  Live market pulse
                </div>
                <div className="absolute left-6 top-6 flex items-center gap-3 rounded-3xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
                  <Sparkles className="h-5 w-5 text-sky-300" />
                  <span className="text-sm text-slate-300">AI analysis hub</span>
                </div>
                <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/10 bg-black/30 p-6 backdrop-blur-xl shadow-xl shadow-slate-950/20">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Strategy insight</p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">Momentum Flow Engine</h3>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-3xl bg-white/5 px-4 py-3 text-center">
                        <p className="text-sm text-slate-400">Trend score</p>
                        <p className="mt-2 text-lg font-semibold text-white">87</p>
                      </div>
                      <div className="rounded-3xl bg-white/5 px-4 py-3 text-center">
                        <p className="text-sm text-slate-400">Liquidity</p>
                        <p className="mt-2 text-lg font-semibold text-white">High</p>
                      </div>
                      <div className="rounded-3xl bg-white/5 px-4 py-3 text-center">
                        <p className="text-sm text-slate-400">Risk</p>
                        <p className="mt-2 text-lg font-semibold text-white">Moderate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
            </ScrollRevealItem>
          </ScrollReveal>
        </section>

        <ScrollReveal>
          <StockSearchPanel />
        </ScrollReveal>

        <ScrollReveal stagger className="space-y-10 py-16">
          <SectionHeading
            accent="FEATURES"
            title="Everything institutional investors need in one AI platform"
            subtitle="Designed for traders, risk teams, and research desks — all workflow modules built for premium decision-making."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <ScrollRevealItem key={feature.title}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="space-y-10 py-16">
          <div className="max-w-3xl">
            <SectionHeading
              accent="MARKET INTELLIGENCE"
              title="High-conviction market data powered by AI"
              subtitle="Cross-asset signals, macro overlays, and risk analytics combine into a live intelligence feed for every desk."
            />
            <ScrollRevealItem>
              <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base">
                See how sentiment, technical structure, and macro momentum come together into a unified workflow that keeps your team ahead of headline-risk and price rotations.
              </p>
            </ScrollRevealItem>
          </div>

          <InsightCardGrid>
            {insightCards.map((card) => (
              <ScrollRevealItem key={card.company}>
                <InsightCard {...card} />
              </ScrollRevealItem>
            ))}
          </InsightCardGrid>
        </ScrollReveal>

        <ScrollReveal className="py-16">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_0.95fr]">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Watchlist preview</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Active opportunities</h3>
                </div>
                <div className="rounded-full bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                  Live updates
                </div>
              </div>
              <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70">
                <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-4 border-b border-white/10 bg-slate-950/90 px-5 py-4 text-sm uppercase tracking-[0.24em] text-slate-500">
                  <span>Symbol</span>
                  <span>Price</span>
                  <span>Signal</span>
                  <span>Change</span>
                </div>
                <div className="space-y-1 p-4 text-sm text-slate-300">
                  {[
                    { symbol: 'AAPL', price: '$198.34', signal: 'Buy', change: '+1.26%' },
                    { symbol: 'NVDA', price: '$784.21', signal: 'Buy', change: '+2.18%' },
                    { symbol: 'TSLA', price: '$318.10', signal: 'Hold', change: '-0.42%' },
                    { symbol: 'BTC', price: '$68,190', signal: 'Buy', change: '+2.84%' },
                  ].map((item) => (
                    <div key={item.symbol} className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-4 rounded-3xl px-4 py-4 transition hover:bg-white/5">
                      <span className="font-semibold text-white">{item.symbol}</span>
                      <span>{item.price}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.signal === 'Buy' ? 'bg-emerald-500/15 text-emerald-300' : item.signal === 'Hold' ? 'bg-amber-500/15 text-amber-300' : 'bg-slate-500/15 text-slate-300'}`}>
                        {item.signal}
                      </span>
                      <span>{item.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Portfolio analytics</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Risk & performance dashboard</h3>
                </div>
                <div className="rounded-full bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                  Updated now
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Current beta</p>
                  <p className="mt-3 text-3xl font-semibold text-white">0.82</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400">Sharpe ratio</p>
                  <p className="mt-3 text-3xl font-semibold text-white">1.74</p>
                </div>
              </div>
              <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-black/40 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Equity allocation</span>
                  <span>58%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-900">
                  <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-sky-500 to-sky-400" />
                </div>
              </div>
            </GlassCard>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="py-16">
          <SectionHeading
            accent="TESTIMONIALS"
            title="Trusted by top trading teams and boutique funds"
            subtitle="Institutional operators rely on StockSense AI to simplify market complexity and generate confident investment decisions."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <ScrollRevealItem key={testimonial.author}>
                <GlassCard className="p-6">
                  <p className="text-lg leading-8 text-slate-200">“{testimonial.quote}”</p>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </GlassCard>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal stagger className="py-16">
          <SectionHeading
            accent="PRICING"
            title="Premium plans built for modern finance teams"
            subtitle="Choose the tier that matches your workflow, from desk-level analysis to enterprise-grade data intelligence."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              {
                name: 'Growth',
                price: '$199',
                description: 'Team-grade AI signals, watchlists, and portfolio alerts.',
                cta: 'Start Free Trial',
                badge: 'Most popular',
              },
              {
                name: 'Pro',
                price: '$399',
                description: 'Advanced research tools, sentiment modeling, and custom dashboards.',
                cta: 'Book a demo',
                badge: 'Best value',
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'Dedicated implementation, API access, and compliance-ready controls.',
                cta: 'Contact sales',
                badge: 'Recommended',
              },
            ].map((plan) => (
              <ScrollRevealItem key={plan.name}>
              <GlassCard className="p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">{plan.name}</p>
                    <p className="mt-4 text-4xl font-semibold text-white">{plan.price}</p>
                  </div>
                  <span className="rounded-full bg-slate-900/70 px-3 py-2 text-xs uppercase tracking-[0.28em] text-slate-300">
                    {plan.badge}
                  </span>
                </div>
                <p className="mt-6 text-sm leading-7 text-slate-400">{plan.description}</p>
                <button className="mt-8 w-full rounded-full bg-primary px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
                  {plan.cta}
                </button>
              </GlassCard>
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollReveal>

        <footer className="border-t border-white/10 py-10 text-sm text-slate-400">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-base font-semibold text-white">StockSense AI</p>
              <p>AI-first market intelligence for institutional investors.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <a href="#" className="transition hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms
              </a>
              <a href="#" className="transition hover:text-white">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
