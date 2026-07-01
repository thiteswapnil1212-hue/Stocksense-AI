export interface StockQuote {
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
  website?: string;
  sector?: string;
  industry?: string;
}

export interface StockCandle {
  timestamp: number;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
}

export interface StockAnalysisRequest {
  focus?: string;
  horizon?: string;
}

export interface StockAnalysisResponse {
  symbol: string;
  analysis: string;
  generatedAt: string;
  horizon: string;
  focus: string | null;
}

export interface StockNewsItem {
  id: string;
  title: string;
  link: string;
  publisher?: string;
  provider?: string;
  summary?: string;
  publishDate?: string;
  thumbnail?: string;
}

export interface TrendingSymbol {
  symbol: string;
  shortName?: string;
  exchange?: string;
  marketCap?: number;
}

export interface SearchSuggestion {
  symbol: string;
  name: string;
  exchange?: string;
  quoteType?: string;
}

export interface WatchlistItem {
  symbol: string;
  name: string;
  lastPrice: number;
  change: number;
  changePercent: number;
}

export interface PortfolioPosition {
  symbol: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  marketValue: number;
  gainLoss: number;
  gainLossPercent: number;
}
