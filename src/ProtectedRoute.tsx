import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import secure from "/images/security.webm"


const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getUserInfo`, {
          method : "get",
          credentials: "include",
        });

        if (!res.ok) {
          setIsAuthenticated(false);
          return;
        } 

        else {
          setIsAuthenticated(true);
          console.log("Cookie Avaialble")
        }
 
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth()

  }, []);

  if (isAuthenticated === null || isAuthenticated === false) {

    return (

        <div className="w-screen h-screen bg-[#eef4ff] flex justify-center items-center flex-col">
            
            <div className="w-[20%] h-[25%] flex justify-center">
                <video src={secure} autoPlay muted loop className="object-contain w-[60%]" />
            </div>

            <div className="w-[30%] flex justify-center">
                <p className="font-Alan p-2 text-2xl">Cookie authentication in progress ...</p>
            </div>

        </div>
    )
  }

  return isAuthenticated ? <Outlet />: <Navigate to="/" replace />;

};

export default ProtectedRoute;
