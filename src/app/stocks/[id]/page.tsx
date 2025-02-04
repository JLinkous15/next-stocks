import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// Types for the stock data
type StockData = {
  ev: string;
  sym: string;
  v: number;
  av: number;
  op: number;
  vw: number;
  o: number;
  c: number; // Closing price
  h: number;
  l: number;
  a: number;
  z: number;
  s: number; // Start time
  e: number; // End time
};

interface Props {params: Promise<{ ticker: string }>}

// Calculate EMA for the provided prices and period
const calculateEMA = (prices: number[], period: number): number[] => {
  const k = 2 / (period + 1);
  const ema: number[] = [];
  let previousEma = prices[0]; // Start with the first price as the initial EMA

  ema.push(previousEma);

  for (let i = 1; i < prices.length; i++) {
    const currentEma = prices[i] * k + previousEma * (1 - k);
    ema.push(currentEma);
    previousEma = currentEma;
  }

  return ema;
};

// Calculate MACD and Signal lines
const calculateMACD = (
  stockData: StockData[],
): { macd: number[]; signal: number[] } => {
  const closingPrices = stockData.map((data) => data.c);

  // Calculate 12-period and 26-period EMAs
  const ema12 = calculateEMA(closingPrices, 12);
  const ema26 = calculateEMA(closingPrices, 26);

  // Calculate MACD line
  const macdLine: number[] = [];
  for (let i = 0; i < closingPrices.length; i++) {
    macdLine.push(ema12[i] - ema26[i]);
  }

  // Calculate Signal line (9-period EMA of the MACD line)
  const signalLine = calculateEMA(macdLine, 9);

  return { macd: macdLine, signal: signalLine };
};

// React component to fetch data and display MACD and Signal lines
const StockMACD: React.FC<Props> = async({params}) => {
  const {ticker} = await params
  // Fetch stock data using TanStack Query (you can replace this URL with your actual data source)
  const { data, error, isLoading } = useQuery<StockData[]>({
    queryKey: ["stockData", ticker],
    queryFn: async () => {
      const response = await fetch("https://api.example.com/stockData"); // Replace with your API URL
      if (!response.ok) throw new Error("Failed to fetch stock data");
      return response.json();
    },
  });

  // If loading, show a loading state
  if (isLoading) return <div>Loading...</div>;

  // If there was an error fetching the data
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  if (data) {
    // Calculate MACD and Signal lines once data is fetched
    const { macd, signal } = calculateMACD(data);

    return (
      <div>
        <h2>MACD and Signal Line</h2>
        <div>
          <h3>MACD Line:</h3>
          <ul>
            {macd.map((value, index) => (
              <li
                key={index}
              >{`Index: ${index}, MACD: ${value.toFixed(4)}`}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Signal Line:</h3>
          <ul>
            {signal.map((value, index) => (
              <li
                key={index}
              >{`Index: ${index}, Signal: ${value.toFixed(4)}`}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
};

export default StockMACD;
