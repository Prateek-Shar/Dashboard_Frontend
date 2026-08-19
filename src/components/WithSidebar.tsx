import { Outlet } from "react-router-dom";
import Sidebar from "./Navigation_com/sidebar";
import Min_sidebar from "./Navigation_com/min_sidebar";


const With_Sidebar = () => {

    return (

        <div className="w-full">
            <div className="xl:flex ml:hidden mm:hidden min-w-0">
                <Sidebar />

                <div className="flex-1 min-w-0">
                    <Outlet />
                </div>
            </div>

            <div className="xl:hidden mm:flex ml:flex min-w-0">
                <Min_sidebar />

                <div className="flex-1 min-w-0">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}



export default With_Sidebar;