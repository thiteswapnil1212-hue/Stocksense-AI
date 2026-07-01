import YahooFinanceImport from "yahoo-finance2";

type YahooFinanceConstructor = typeof YahooFinanceImport;
type YahooFinanceClient = InstanceType<YahooFinanceConstructor>;

let client: YahooFinanceClient | null = null;

function resolveConstructor(): YahooFinanceConstructor {
  const mod = YahooFinanceImport as YahooFinanceConstructor & {
    default?: YahooFinanceConstructor;
  };

  const ctor = mod.default ?? mod;

  if (typeof ctor !== "function") {
    throw new Error("Failed to load YahooFinance constructor from yahoo-finance2.");
  }

  return ctor;
}

export function getYahooFinance(): YahooFinanceClient {
  if (!client) {
    const YahooFinance = resolveConstructor();
    client = new YahooFinance({
      suppressNotices: ["yahooSurvey"],
    });
  }

  return client;
}
