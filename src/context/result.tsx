import { createContext, useState,  useContext } from "react";
import { type ReactNode } from "react"

interface AlertContextType {
  showSuccess: () => void;
  showFailure: () => void;
  hideAlerts: () => void;
  successVisible: boolean;
  failureVisible: boolean;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [failureVisible, setFailureVisible] = useState(false);

  const showSuccess = () => {
    console.log("Showing Success Div")
    setSuccessVisible(true);
    setFailureVisible(false);
  };

  const showFailure = () => {
    console.log("Showing Faliure")
    setFailureVisible(true);
    setSuccessVisible(false);
  };

  const hideAlerts = () => {
    setSuccessVisible(false);
    setFailureVisible(false);
  };

  return (
    <AlertContext.Provider
      value={{ showSuccess, showFailure, hideAlerts, successVisible, failureVisible }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
