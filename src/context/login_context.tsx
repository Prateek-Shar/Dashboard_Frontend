// UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface UserData {
  Username : string;
  Profession: string;
  UID: number;
}

interface UserContextType {
  userDetails: UserData | null;
  setUserDetails: React.Dispatch<React.SetStateAction<UserData | null>>;
  Loader:boolean;
  LoadUserApi: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<UserData | null>(null);
  const [Loader, setLoader] = useState(false);
  

  const LoadUserApi = async () => {

  try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getUserInfo`, {
        credentials: "include",
        method : "GET"
      });

      const data = await res.json();

      if (res.ok) {
        setUserDetails(data.login_det); // set { Username, Profession, UID }
      } else {
        console.warn("Not authenticated:", data.error);
      }

    setLoader(true)
    
    } catch (error) {
      console.error("Failed to load user", error);
    }
    
  }

  // useEffect(() => {
  //   LoadUserApi();
  // } , [])
 


  return (
    <UserContext.Provider value={{ userDetails , setUserDetails , Loader , LoadUserApi }}>
      {children}
    </UserContext.Provider>
  );  
  
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};
