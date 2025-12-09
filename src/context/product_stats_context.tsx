import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface FuncContext {
  setLoaderForApi: () => void;
  inStockCount?: number;
  outOfStockCount?: number;
  productLength?: number;
}

const FunctionContext = createContext<FuncContext | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {

  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  
  const [productLength, setProductLength] = useState(0);

  const getApi = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/product_stats`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Something broke while fetching product stats");
        return;
      }

      const data = await res.json();
      setInStockCount(data.product_stats1);
      setOutOfStockCount(data.product_stats6);
      setProductLength(data.product_stats3);
    } catch (error) {
      console.log("Error fetching product stats:", error);
    }
  };

  const setLoaderForApi = () => {
    getApi();
  };

  useEffect(() => {
    setLoaderForApi()
  }, [inStockCount, outOfStockCount , productLength]);

  return (
    <FunctionContext.Provider
      value={{
        inStockCount,
        outOfStockCount,
        productLength,
        setLoaderForApi
      }}
    >
      {children}
    </FunctionContext.Provider>
  );
};


export const useAPI = (): FuncContext => {
  const context = useContext(FunctionContext);

  if (!context) {
    throw new Error("useAPI must be used within StatsProvider");
  }

  return context;
};
