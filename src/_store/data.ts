import { useQuery } from "@tanstack/react-query";
import { AllTickerParams } from "./lib";

enum QUERY_KEYS {
  ALL_TICKERS = "ALL_TICKERS",
  USER_METADATA = "USER_METADATA",
  OC_STOCKS = "OC_STOCKS",
  STOCK = "STOCK",
}

export const getAllTickers = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ALL_TICKERS],
    queryFn: () => {
      const apiEndpoint =
        "https://api.polygon.io/v3/reference/tickers";

      const queryStringParams = {};

      const url = new URL(apiEndpoint);

      Object.keys(queryStringParams).forEach(key => {
        queryStringParams[key] &&
          url.searchParams.append(key, queryStringParams[key]);
      });
      const response = fetch(apiEndpoint, {});
    },
  });
};
