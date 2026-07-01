import { NextResponse } from "next/server";
import { fetchStockNewsBySymbolWithCache } from "@/lib/server/stock-data";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ symbol: string }> }
) {
  try {
    const { symbol: rawSymbol } = await params;
    const symbol = rawSymbol?.toUpperCase();
    if (!symbol) {
      return NextResponse.json({ error: "Symbol is required." }, { status: 400 });
    }

    const news = await fetchStockNewsBySymbolWithCache(symbol);
    return NextResponse.json({ news });
  } catch (error: unknown) {
    console.error("GET /api/stocks/[symbol]/news error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to fetch news." }, { status: 500 });
  }
}
