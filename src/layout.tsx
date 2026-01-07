import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Navigation_com/sidebar";
import Min_sidebar from "./components/Navigation_com/min_sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Routes where Sidebar should be shown
  const sidebarRoutes = ["/products", "/addProduct", "/income", "/addIncome", "/customer" , "/addCustomer" , "/overview"];
  const noSidebarRoutes = ["/" , "/check"];

  const showSidebar = sidebarRoutes.includes(path) && !noSidebarRoutes.includes(path);


  return (

    <>

    <div className="w-full">
      <div className="xl:flex ml:hidden mm:hidden">
        {showSidebar && <Sidebar />}
        {children}
      </div>

      <div className="xl:hidden ml:flex mm:flex">
        {showSidebar && <Min_sidebar />}
        {children}
      </div>
    </div>


    </>


  );
};

export default Layout;
