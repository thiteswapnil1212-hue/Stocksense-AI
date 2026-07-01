import OpenAI from "openai";
import { StockQuote, StockCandle } from "../types";

function getOpenAiClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  return new OpenAI({ apiKey });
}

function getRecentTrendSummary(candles: StockCandle[]): string {
  if (!candles.length) {
    return "No historical candle data is available.";
  }

  const sample = candles.slice(-5).map((candle) => `${new Date(candle.timestamp).toISOString().slice(0, 10)} close ${candle.close ?? 0}`);
  return `Recent closing prices: ${sample.join(" | ")}`;
}

export async function analyzeStock(
  symbol: string,
  quote: StockQuote,
  candles: StockCandle[],
  focus?: string,
  horizon = "3 months"
): Promise<string> {
  const client = getOpenAiClient();
  const recentTrend = getRecentTrendSummary(candles);

  const messages = [
    {
      role: "system",
      content:
        "You are StockSense AI, a data-driven research assistant. Provide objective, concise intelligence for a professional investor, using only the evidence available in the input data.",
    },
    {
      role: "user",
      content: `Analyze ${symbol} for a ${horizon} outlook. Use the quote metrics and recent trend data below. If available, include a risk/reward assessment, valuation signal, and a clear recommendation tone. Do not invent company fundamentals beyond the supplied values.

Symbol: ${symbol}
Company: ${quote.longName ?? quote.shortName ?? symbol}
Current price: ${quote.regularMarketPrice ?? "N/A"}
Previous close: ${quote.previousClose ?? "N/A"}
Day range: ${quote.dayLow ?? "N/A"} - ${quote.dayHigh ?? "N/A"}
52-week range: ${quote.fiftyTwoWeekLow ?? "N/A"} - ${quote.fiftyTwoWeekHigh ?? "N/A"}
Market cap: ${quote.marketCap ?? "N/A"}
P/E: ${quote.trailingPE ?? "N/A"}
Dividend yield: ${quote.dividendYield ?? "N/A"}
Volume: ${quote.regularMarketVolume ?? "N/A"}
${recentTrend}

${focus ? `Focus: ${focus}
` : ""}`,
    },
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages as any,
    temperature: 0.2,
    max_tokens: 500,
  });

  const completionText = Array.isArray(response.choices)
    ? response.choices.map((choice: any) => choice.message?.content || "").join("\n")
    : "";

  return completionText.trim();
}
