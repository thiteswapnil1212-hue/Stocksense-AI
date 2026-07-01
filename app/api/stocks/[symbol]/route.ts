import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchStockQuoteWithCache, fetchStockCandlesWithCache } from "@/lib/server/stock-data";

const SymbolParams = z.object({ symbol: z.string().min(1) });
const StockQuery = z.object({ range: z.string().optional().default("1mo"), interval: z.string().optional().default("1d") });

export async function GET(req: NextRequest, { params }: { params: Promise<{ symbol: string }> }) {
  try {
    const parseResult = SymbolParams.safeParse(await params);
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid stock symbol." }, { status: 400 });
    }

    const url = new URL(req.url);
    const queryResult = StockQuery.parse({
      range: url.searchParams.get("range") ?? undefined,
      interval: url.searchParams.get("interval") ?? undefined,
    });

    const symbol = parseResult.data.symbol.toUpperCase();

    const [quote, candles] = await Promise.all([
      fetchStockQuoteWithCache(symbol),
      fetchStockCandlesWithCache(symbol),
    ]);

    return NextResponse.json({ symbol, quote, candles, query: queryResult });
  } catch (error: unknown) {
    console.error("GET /api/stocks/[symbol] error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to fetch stock data." }, { status: 500 });
  }
}
