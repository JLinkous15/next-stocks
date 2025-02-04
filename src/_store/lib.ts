export type TickerType = "CS"
| "ADRC"
| "ADRP"
| "ADRR"
| "UNIT"
| "RIGHT"
| "PFD"
| "FUND"
| "SP"
| "WARRANT"
| "INDEX"
| "ETF"
| "ETN"
| "OS"
| "GDR"
| "OTHER"
| "NYRS"
| "AGEN"
| "EQLK"
| "BOND"
| "ADRW"
| "BASKET"
| "LT"

export type MarketType = "stocks" | "crypto" | "fx" | "otc" | "indices"

export type Order = "asc" | "desc"

export type SortOrder = "ticker"
| "name"
| "market"
| "locale"
| "primary_exchange"
| "type"
| "currency_symbol"
| "currency_name"
| "base_currency_symbol"
| "base_currency_name"
| "composite_figi"
| "share_class_figi"
| "last_updated_utc"
| "delisted_utc"

export type AllTickerParams = {
  ticker: string;
  type: TickerType; //Specify the type of the tickers. Find the types that we support via Polygon.io Ticker Types API: https://polygon.io/docs/stocks/get_v2_reference_news. Defaults to empty string which queries all types.
  market: MarketType; //Filter by market type. By default all markets are included.
  exchange: string; //Specify the primary exchange of the asset in the ISO code format. Find more information about the ISO codes at the ISO org website: https://www.iso20022.org/market-identifier-codes. Defaults to empty string which queries all exchanges.]\
  cik: string; //Specify the CIK of the asset you want to search for. Find more information about CIK codes at their website: https://www.sec.gov/search-filings/cik-lookup. Defaults to empty string which queries all CIKs
  date: string; // Specify a point in time to retrieve tickers available on that date. Defaults to the most recent available date. YYYY-MM-DD
  search: string; //search terms for tickers and company names.
  active: boolean; //specify if the ticker is active.
  order: Order
  limit: number;
  sort: SortOrder;
};

export type AllTickers = {
    count: number;
    next_url: string;
    request_id: string;
    results: [
      {
        active: boolean;
        cik: number;
        composite_figi: string;
        currency_name: string;
        last_updated_utc: Date;
        locale: string;
        market: MarketType;
        name: string;
        primary_exchange: string;
        share_class_figi: string;
        ticker: string;
        type: TickerType;
      }
    ],
    status: string;
  }

  
