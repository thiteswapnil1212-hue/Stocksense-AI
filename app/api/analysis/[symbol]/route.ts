import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchStockQuoteWithCache, fetchStockCandlesWithCache } from "@/lib/server/stock-data";
import { analyzeStock } from "@/lib/server/openai";

const SymbolParams = z.object({ symbol: z.string().min(1) });
const AnalysisBody = z.object({ focus: z.string().optional(), horizon: z.string().optional().default("3 months") });

export async function POST(req: NextRequest, { params }: { params: Promise<{ symbol: string }> }) {
  try {
    const parseResult = SymbolParams.safeParse(await params);
    if (!parseResult.success) {
      return NextResponse.json({ error: "Invalid stock symbol." }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const input = AnalysisBody.parse(body);
    const symbol = parseResult.data.symbol.toUpperCase();

    const [quote, candles] = await Promise.all([
      fetchStockQuoteWithCache(symbol),
      fetchStockCandlesWithCache(symbol),
    ]);

    const analysis = await analyzeStock(symbol, quote, candles, input.focus, input.horizon);

    return NextResponse.json({ symbol, analysis, horizon: input.horizon, focus: input.focus ?? null, generatedAt: new Date().toISOString() });
  } catch (error: unknown) {
    console.error("POST /api/analysis/[symbol] error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to generate stock analysis." }, { status: 500 });
  }
}
