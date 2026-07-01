'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { ResponsiveContainer, Area, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Search, ExternalLink, TrendingUp, Activity, CalendarDays } from 'lucide-react';
import { Loader, StockDataSkeleton, NewsListSkeleton, SnapshotSkeleton } from './Loader';

interface SearchSuggestion {
  symbol: string;
  name: string;
  exchange?: string;
}

interface StockQuote {
  symbol: string;
  shortName?: string;
  longName?: string;
  currency?: string;
  exchangeName?: string;
  marketState?: string;
  regularMarketPrice?: number;
  regularMarketChange?: number;
  regularMarketChangePercent?: number;
  previousClose?: number;
  open?: number;
  dayHigh?: number;
  dayLow?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  marketCap?: number;
  trailingPE?: number;
  dividendYield?: number;
  regularMarketVolume?: number;
  averageDailyVolume3Month?: number;
  sector?: string;
  industry?: string;
}

interface StockCandle {
  timestamp: number;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
}

interface StockNewsItem {
  id: string;
  title: string;
  link: string;
  publisher?: string;
  provider?: string;
  summary?: string;
  publishDate?: string;
  thumbnail?: string;
}

const formatMarketCap = (value?: number) => {
  if (!value) return 'N/A';
  if (value > 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value > 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value > 1e6) return `${(value / 1e6).toFixed(2)}M`;
  return value.toLocaleString();
};

const formatPercent = (value?: number) => {
  if (value == null) return 'N/A';
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

const formatDividendYield = (value?: number) => {
  if (value == null) return 'N/A';
  const pct = value < 1 ? value * 100 : value;
  return `${pct.toFixed(2)}%`;
};

const priceTrendColor = (value?: number) => {
  if (value == null) return 'text-slate-300';
  return value >= 0 ? 'text-emerald-300' : 'text-rose-300';
};

function debounce<Value>(fn: (value: Value) => void, delay: number) {
  let timeout: number | null = null;
  return (value: Value) => {
    if (timeout !== null) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(() => fn(value), delay);
  };
}

export function StockSearchPanel() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const [quote, setQuote] = useState<StockQuote | null>(null);
  const [candles, setCandles] = useState<StockCandle[]>([]);
  const [news, setNews] = useState<StockNewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionBoxRef = useRef<HTMLDivElement | null>(null);

  const loadSuggestions = useCallback(
    debounce(async (value: string) => {
      if (!value.trim()) {
        setSuggestions([]);
        setSearching(false);
        return;
      }

      setSearching(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(value.trim())}`);
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload?.error || 'Search failed');
        }

        setSuggestions(payload.suggestions ?? []);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unable to fetch suggestions');
      } finally {
        setSearching(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    loadSuggestions(query);
  }, [query, loadSuggestions]);

  useEffect(() => {
    if (!selectedSymbol) return;

    const loadStock = async () => {
      setLoading(true);
      setError(null);

      try {
        const [stockRes, newsRes] = await Promise.all([
          fetch(`/api/stocks/${encodeURIComponent(selectedSymbol)}`),
          fetch(`/api/stocks/${encodeURIComponent(selectedSymbol)}/news`),
        ]);

        const stockPayload = await stockRes.json();
        const newsPayload = await newsRes.json();

        if (!stockRes.ok) {
          throw new Error(stockPayload?.error || 'Unable to load stock data');
        }

        if (!newsRes.ok) {
          throw new Error(newsPayload?.error || 'Unable to load news');
        }

        setQuote(stockPayload.quote ?? null);
        setCandles(stockPayload.candles ?? []);
        setNews(newsPayload.news ?? []);
        setSelectedIndex(-1);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Unable to load stock details');
        setQuote(null);
        setCandles([]);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    loadStock();
  }, [selectedSymbol]);

  const handleSelect = (suggestion: SearchSuggestion) => {
    setSelectedSymbol(suggestion.symbol);
    setQuery(`${suggestion.symbol} - ${suggestion.name}`);
    setSuggestions([]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }

    if (event.key === 'Enter') {
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        event.preventDefault();
        handleSelect(suggestions[selectedIndex]);
      }
    }

    if (event.key === 'Escape') {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  const chartData = useMemo(
    () =>
      candles.map((candle) => ({
        date: new Date(candle.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        close: candle.close ?? 0,
      })),
    [candles]
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.95fr]">
        <div className="space-y-6">
          <div className="glass-card p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Search stocks</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Find ticker data instantly.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Start typing a company or symbol, pick the suggestion, and review price charts, key metrics, and latest headlines.
                </p>
              </div>
            </div>

            <div className="relative mt-8">
              <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-3 shadow-xl shadow-slate-950/20 focus-within:border-sky-400">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setSelectedSymbol(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by symbol, company name, or ETF"
                  className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-slate-500"
                  aria-label="Stock search"
                />
              </div>

              {suggestions.length > 0 && (
                <div
                  ref={suggestionBoxRef}
                  className="glass-card absolute left-0 right-0 z-20 mt-2 max-h-80 overflow-hidden overflow-y-auto rounded-3xl border border-slate-700 bg-slate-950/90 shadow-2xl shadow-slate-950/30"
                >
                  {suggestions.map((item, index) => (
                    <button
                      key={`${item.symbol}-${index}`}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className={`flex w-full items-center justify-between gap-3 border-b border-slate-900 px-4 py-4 text-left transition hover:bg-white/5 ${
                        index === selectedIndex ? 'bg-slate-900/80' : ''
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-white">{item.symbol}</p>
                        <p className="mt-1 text-sm text-slate-400">{item.name}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{item.exchange ?? 'N/A'}</p>
                    </button>
                  ))}
                </div>
              )}

              {searching && !suggestions.length && (
                <div className="mt-3 flex items-center gap-3 px-1">
                  <Loader size="sm" />
                  <span className="text-xs uppercase tracking-[0.24em] text-slate-500">Searching symbols</span>
                </div>
              )}
            </div>
          </div>

          {error ? (
            <div className="glass-card rounded-3xl border border-rose-500/20 bg-rose-500/10 p-6 text-rose-100">
              <p className="text-sm font-semibold">{error}</p>
              <p className="mt-2 text-sm text-slate-300">Try a different ticker or refresh the page.</p>
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[0.7fr_0.3fr]">
            <div className="glass-card p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Selected company</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">
                    {quote?.longName || quote?.shortName || 'Search a symbol to start'}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">{quote?.symbol ?? ''}</p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
                  <CalendarDays className="h-4 w-4 text-slate-300" />
                  Market data updated dynamically
                </div>
              </div>

              <div className="mt-8 min-h-[320px]">
                {loading ? (
                  <StockDataSkeleton />
                ) : quote ? (
                  <div className="space-y-8">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Price</p>
                        <p className="mt-3 text-3xl font-semibold text-white">{quote.regularMarketPrice?.toLocaleString('en-US', { style: 'currency', currency: quote.currency ?? 'USD' }) ?? 'N/A'}</p>
                        <p className={`mt-2 text-sm ${priceTrendColor(quote.regularMarketChangePercent)}`}>{formatPercent(quote.regularMarketChangePercent)}</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Market cap</p>
                        <p className="mt-3 text-xl font-semibold text-white">{formatMarketCap(quote.marketCap)}</p>
                        <p className="mt-2 text-sm text-slate-400">{quote.exchangeName ?? 'Exchange'}</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Valuation</p>
                        <p className="mt-3 text-xl font-semibold text-white">{quote.trailingPE?.toFixed(2) ?? 'N/A'}</p>
                        <p className="mt-2 text-sm text-slate-400">P/E ratio</p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Day range</p>
                        <p className="mt-3 text-sm text-white">{quote.dayLow ?? 'N/A'} - {quote.dayHigh ?? 'N/A'}</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">52w range</p>
                        <p className="mt-3 text-sm text-white">{quote.fiftyTwoWeekLow ?? 'N/A'} - {quote.fiftyTwoWeekHigh ?? 'N/A'}</p>
                      </div>
                      <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Volume</p>
                        <p className="mt-3 text-sm text-white">{quote.regularMarketVolume?.toLocaleString() ?? 'N/A'}</p>
                      </div>
                    </div>

                    <div className="h-[360px] rounded-[2rem] border border-white/10 bg-slate-950/85 p-5">
                      {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.08} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
                            <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} width={56} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#020617', borderColor: 'rgba(148,163,184,0.12)' }}
                              labelStyle={{ color: '#ffffff' }}
                              formatter={((value: unknown) => {
                                if (typeof value === 'number') {
                                  return `$${value.toFixed(2)}`;
                                }
                                return value ?? 'N/A';
                              }) as any}
                            />
                            <Area type="monotone" dataKey="close" stroke="#38bdf8" fillOpacity={1} fill="url(#priceGradient)" strokeWidth={3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      ) : (
                        <div className="flex h-full items-center justify-center text-slate-500">Price history not available.</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full min-h-[320px] items-center justify-center text-slate-400">Search to view stock intelligence.</div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <TrendingUp className="h-5 w-5 text-sky-300" />
                  <p className="text-sm uppercase tracking-[0.28em]">Stock snapshot</p>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {loading ? (
                    <div className="col-span-2">
                      <SnapshotSkeleton />
                    </div>
                  ) : (
                    <>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <p className="text-sm text-slate-400">Previous close</p>
                    <p className="mt-2 text-lg font-semibold text-white">{quote?.previousClose?.toLocaleString('en-US', { style: 'currency', currency: quote?.currency ?? 'USD' }) ?? 'N/A'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <p className="text-sm text-slate-400">Dividend yield</p>
                    <p className="mt-2 text-lg font-semibold text-white">{formatDividendYield(quote?.dividendYield)}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <p className="text-sm text-slate-400">Sector</p>
                    <p className="mt-2 text-lg font-semibold text-white">{quote?.sector ?? 'N/A'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                    <p className="text-sm text-slate-400">Industry</p>
                    <p className="mt-2 text-lg font-semibold text-white">{quote?.industry ?? 'N/A'}</p>
                  </div>
                    </>
                  )}
                </div>
              </div>

              <div className="glass-card p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Latest headlines</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">News for {quote?.symbol ?? 'your stock'}</h3>
                  </div>
                  <ExternalLink className="h-5 w-5 text-slate-300" />
                </div>
                <div className="mt-6 space-y-4">
                  {loading ? (
                    <NewsListSkeleton />
                  ) : news.length ? (
                    news.slice(0, 5).map((item) => (
                      <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-3xl border border-white/10 bg-slate-950/55 p-4 transition hover:border-sky-400/30 hover:bg-slate-950/80"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-semibold text-white">{item.title}</p>
                          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">
                            {item.publisher ?? item.provider ?? 'News'}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-400">{item.summary ?? 'Read the latest market commentary and updates.'}</p>
                      </a>
                    ))
                  ) : (
                    <div className="text-slate-500">No recent headlines found for this symbol.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Why StockSense</p>
                <h3 className="mt-3 text-2xl font-semibold text-white">Instant symbol search with smart autocomplete</h3>
              </div>
              <Activity className="h-6 w-6 text-sky-300" />
            </div>
            <div className="mt-6 grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Debounced search</p>
                <p className="mt-2 text-lg font-semibold text-white">300ms input delay</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Keyboard support</p>
                <p className="mt-2 text-lg font-semibold text-white">Arrows + enter navigation</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                <p className="text-sm text-slate-400">Glassmorphic UI</p>
                <p className="mt-2 text-lg font-semibold text-white">Responsive, premium styling</p>
              </div>
            </div>
          </div>

          <div className="glass-card overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 sm:p-8">
            <div className="flex flex-col gap-4">
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Getting started</p>
              <p className="text-lg leading-7 text-slate-300">
                Type “app” to see examples like AAPL – Apple Inc. then press enter or click the suggestion to load full ticker analysis.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Example symbol</p>
                  <p className="mt-3 text-lg font-semibold text-white">AAPL</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Quick tip</p>
                  <p className="mt-3 text-lg font-semibold text-white">Use company names or tickers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
