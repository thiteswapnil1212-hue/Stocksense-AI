import { NextResponse } from "next/server";
import { fetchTrendingSymbolsWithCache } from "@/lib/server/stock-data";

export async function GET() {
  try {
    const trending = await fetchTrendingSymbolsWithCache();
    return NextResponse.json({ trending });
  } catch (error: unknown) {
    console.error("GET /api/trending error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to fetch trending symbols." }, { status: 500 });
  }
}
