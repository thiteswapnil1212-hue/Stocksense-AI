import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchSearchSuggestionsWithCache } from "@/lib/server/stock-data";

const SearchQuery = z.object({ q: z.string().min(1) });

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const query = SearchQuery.parse({ q: url.searchParams.get("q") ?? "" });
    const suggestions = await fetchSearchSuggestionsWithCache(query.q);
    return NextResponse.json({ suggestions });
  } catch (error: unknown) {
    console.error("GET /api/search error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to fetch search results." }, { status: 500 });
  }
}
