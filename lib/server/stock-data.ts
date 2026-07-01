import { getYahooFinance } from "./yahoo-finance-client";
import { cacheValue } from "./redis";
import { SearchSuggestion, StockQuote, StockCandle, StockNewsItem, TrendingSymbol } from "../types";

const DEFAULT_REGION = "US";

function normalizeSymbol(symbol: string): string {
  return symbol.trim().toUpperCase();
}

export async function fetchStockQuote(symbol: string): Promise<StockQuote> {
  const normalizedSymbol = normalizeSymbol(symbol);
  const rawQuote = (await getYahooFinance().quote(normalizedSymbol)) as any;
  if (!rawQuote || !rawQuote.symbol) {
    throw new Error(`Unable to resolve quote for ${normalizedSymbol}`);
  }

  return {
    symbol: normalizedSymbol,
    shortName: rawQuote.shortName,
    longName: rawQuote.longName,
    currency: rawQuote.currency,
    exchangeName: rawQuote.exchangeName,
    marketState: rawQuote.marketState,
    regularMarketPrice: rawQuote.regularMarketPrice,
    regularMarketChange: rawQuote.regularMarketChange,
    regularMarketChangePercent: rawQuote.regularMarketChangePercent,
    previousClose: rawQuote.previousClose,
    open: rawQuote.open,
    dayHigh: rawQuote.dayHigh,
    dayLow: rawQuote.dayLow,
    fiftyTwoWeekHigh: rawQuote.fiftyTwoWeekHigh,
    fiftyTwoWeekLow: rawQuote.fiftyTwoWeekLow,
    marketCap: rawQuote.marketCap,
    trailingPE: rawQuote.trailingPE,
    dividendYield: rawQuote.dividendYield,
    regularMarketVolume: rawQuote.regularMarketVolume,
    averageDailyVolume3Month: rawQuote.averageDailyVolume3Month,
    website: rawQuote.website,
    sector: rawQuote.sector,
    industry: rawQuote.industry,
  };
}

type ChartInterval = "1d" | "1m" | "2m" | "5m" | "15m" | "30m" | "60m" | "90m" | "1h" | "5d" | "1wk" | "3mo";
type ChartRange = "1mo" | "1d" | "5d" | "3mo";

function getChartPeriod(range: ChartRange): { period1: Date; period2: Date } {
  const period2 = new Date();
  const period1 = new Date();

  switch (range) {
    case "1d":
      period1.setDate(period1.getDate() - 1);
      break;
    case "5d":
      period1.setDate(period1.getDate() - 5);
      break;
    case "3mo":
      period1.setMonth(period1.getMonth() - 3);
      break;
    case "1mo":
    default:
      period1.setMonth(period1.getMonth() - 1);
      break;
  }

  return { period1, period2 };
}

export async function fetchStockCandles(
  symbol: string,
  range: ChartRange = "1mo",
  interval: ChartInterval = "1d"
): Promise<StockCandle[]> {
  const normalizedSymbol = normalizeSymbol(symbol);
  const { period1, period2 } = getChartPeriod(range);
  const chartData = await getYahooFinance().chart(normalizedSymbol, { period1, period2, interval });

  const quotes = Array.isArray(chartData?.quotes) ? chartData.quotes : [];
  if (!quotes.length) {
    return [];
  }

  return quotes.map((quote) => ({
    timestamp: quote.date instanceof Date ? quote.date.getTime() : new Date(quote.date).getTime(),
    open: quote.open ?? null,
    high: quote.high ?? null,
    low: quote.low ?? null,
    close: quote.close ?? null,
    volume: quote.volume ?? null,
  }));
}

export async function fetchStockNews(query: string): Promise<StockNewsItem[]> {
  const searchTerm = query.trim().length ? query.trim() : "stock market";
  const searchResult = await getYahooFinance().search(searchTerm, {
    lang: "en-US",
    region: DEFAULT_REGION,
  }) as any;

  const news = Array.isArray(searchResult?.news) ? searchResult.news : [];

  return news.map((item: any, index: number) => ({
    id: item.uuid || item.link || `${searchTerm}-${index}`,
    title: item.title ?? `Untitled story for ${searchTerm}`,
    link: item.link ?? "",
    publisher: item.publisher,
    provider: item.provider || item.providerPublishSource,
    summary: item.summary,
    publishDate: item.providerPublishTime ? new Date(item.providerPublishTime * 1000).toISOString() : item.pubDate,
    thumbnail: item.thumbnail?.resolutions?.[0]?.url ?? item.thumbnail?.url,
  }));
}

export async function fetchTrendingSymbols(): Promise<TrendingSymbol[]> {
  const trending = await getYahooFinance().trendingSymbols(DEFAULT_REGION) as any;
  const quotes = Array.isArray(trending?.quotes) ? trending.quotes : [];

  return quotes.slice(0, 25).map((item: any) => ({
    symbol: item.symbol,
    shortName: item.shortName,
    exchange: item.exchange,
    marketCap: item.marketCap,
  }));
}

export async function fetchStockQuoteWithCache(symbol: string): Promise<StockQuote> {
  return cacheValue(`stock:${symbol.toUpperCase()}:quote`, 60, () => fetchStockQuote(symbol));
}

export async function fetchStockCandlesWithCache(symbol: string): Promise<StockCandle[]> {
  return cacheValue(`stock:${symbol.toUpperCase()}:candles`, 300, () => fetchStockCandles(symbol));
}

export async function fetchTrendingSymbolsWithCache(): Promise<TrendingSymbol[]> {
  return cacheValue("stock:trending:us", 300, fetchTrendingSymbols);
}

export async function fetchStockNewsWithCache(query: string): Promise<StockNewsItem[]> {
  const normalizedQuery = query.trim().toLowerCase() || "stock market";
  return cacheValue(`stock:news:${normalizedQuery}`, 600, () => fetchStockNews(query));
}

export async function fetchSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return [];
  }

  const searchResult = (await getYahooFinance().search(trimmed, {
    lang: "en-US",
    region: DEFAULT_REGION,
  })) as any;

  const quotes = Array.isArray(searchResult?.quotes) ? searchResult.quotes : [];

  return quotes.slice(0, 20).map((item: any) => ({
    symbol: item.symbol,
    name: item.shortname || item.longname || item.shortName || item.longName || item.symbol,
    exchange: item.exchange,
    quoteType: item.quoteType,
  }));
}

export async function fetchSearchSuggestionsWithCache(query: string): Promise<SearchSuggestion[]> {
  const normalizedQuery = query.trim().toLowerCase();
  return cacheValue(`stock:search:${normalizedQuery}`, 120, () => fetchSearchSuggestions(query));
}

export async function fetchStockNewsBySymbol(symbol: string): Promise<StockNewsItem[]> {
  const normalizedSymbol = normalizeSymbol(symbol);
  const searchResult = (await getYahooFinance().search(`${normalizedSymbol} news`, {
    lang: "en-US",
    region: DEFAULT_REGION,
  })) as any;

  const news = Array.isArray(searchResult?.news) ? searchResult.news : [];

  return news.map((item: any, index: number) => ({
    id: item.uuid || item.link || `${normalizedSymbol}-${index}`,
    title: item.title ?? `Latest news for ${normalizedSymbol}`,
    link: item.link ?? "",
    publisher: item.publisher,
    provider: item.provider || item.providerPublishSource,
    summary: item.summary,
    publishDate: item.providerPublishTime ? new Date(item.providerPublishTime * 1000).toISOString() : item.pubDate,
    thumbnail: item.thumbnail?.resolutions?.[0]?.url ?? item.thumbnail?.url,
  }));
}

export async function fetchStockNewsBySymbolWithCache(symbol: string): Promise<StockNewsItem[]> {
  const normalizedSymbol = normalizeSymbol(symbol);
  return cacheValue(`stock:${normalizedSymbol}:news`, 300, () => fetchStockNewsBySymbol(symbol));
}
