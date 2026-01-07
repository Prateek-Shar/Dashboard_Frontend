import { Outlet } from "react-router-dom";


const No_sidebar = () => {

    return (

        <div className="w-full">
            <div className="flex">
                <Outlet />
            </div>
        </div>



    )
}


export default No_sidebar;