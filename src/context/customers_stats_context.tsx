import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface FuncContext {
  setLoaderForApi: () => void;
  totalCustomerCount?: number;
  totalActiveCount?: number;
}

const FunctionContext = createContext<FuncContext | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [totalCustomerCount, setTotalCustomer] = useState(0);
  const [totalActiveCount, setTotalActive] = useState(0);


  const getApi = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_customer_stats`, {
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


  const setLoaderForApi = () => {
    getApi();
  };


  useEffect(() => {
    setLoaderForApi()
  }, [totalActiveCount, totalCustomerCount]);

  return (
    <FunctionContext.Provider
      value={{
        setLoaderForApi,
        totalActiveCount,
        totalCustomerCount,
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
