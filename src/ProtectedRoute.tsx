import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getUserInfo`, {
          method : "GET",
          credentials: "include",
        });

        if (res.ok) {
          setIsAuthenticated(true);
          console.log("Cookie Avaialble")
        } else {
          setIsAuthenticated(false);
          console.log("Cookie Not Avaialble")
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth()

  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
