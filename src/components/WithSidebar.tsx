import { Outlet } from "react-router-dom";
import Sidebar from "./Navigation_com/sidebar";
import Min_sidebar from "./Navigation_com/min_sidebar";


const With_Sidebar = () => {

    return (

        <div className="w-full">
            <div className="xl:flex ml:hidden mm:hidden">
                <Sidebar />

                <Outlet />
            </div>

            <div className="xl:hidden m:flex">
                <Min_sidebar />

                <Outlet />
            </div>
        </div>

    )
}



export default With_Sidebar;