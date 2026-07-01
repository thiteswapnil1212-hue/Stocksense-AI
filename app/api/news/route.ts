import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchStockNewsWithCache } from "@/lib/server/stock-data";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = z.object({ q: z.string().optional().default("stock market") });
    const queryParams = query.parse({ q: url.searchParams.get("q") ?? undefined });

    const news = await fetchStockNewsWithCache(queryParams.q);
    return NextResponse.json({ news });
  } catch (error: unknown) {
    console.error("GET /api/news error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to fetch news." }, { status: 500 });
  }
}
