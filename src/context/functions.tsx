import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface FuncContext {
  getApi1: () => void;
  getApi2: () => void;
  setLoaderForApi1: () => void;
  setLoaderForApi2: () => void;
  totalCustomerCount?: number;
  totalActiveCount?: number;
  inStockCount?: number;
  outOfStockCount?: number;
  productLength?: number;
}

const FunctionContext = createContext<FuncContext | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [totalCustomerCount, setTotalCustomer] = useState(0);
  const [totalActiveCount, setTotalActive] = useState(0);

  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);
  
  const [productLength, setProductLength] = useState(0);



  const getApi1 = async () => {
    try {
      const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_customer_stats`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.log("Something broke while fetching customer stats");
        return;
      }

      const data = await res.json();
      setTotalCustomer(data.totalCustomers);
      setTotalActive(data.active_member);

    } catch (error) {
      console.log("Error fetching customer stats:", error);
    }
  };


  const getApi2 = async () => {
    try {
      const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/product_stats`, {
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

  const setLoaderForApi1 = () => {
    getApi1();
  };

  const setLoaderForApi2 = () => {
    getApi2();
  };

  useEffect(() => {
    setLoaderForApi1()
    setLoaderForApi2()
  }, [totalActiveCount, totalCustomerCount]);

  return (
    <FunctionContext.Provider
      value={{
        getApi1,
        getApi2,
        setLoaderForApi1,
        setLoaderForApi2,
        totalActiveCount,
        totalCustomerCount,
        inStockCount,
        outOfStockCount,
        productLength,
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
