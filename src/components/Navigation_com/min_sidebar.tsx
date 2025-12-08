import activity from "../../images/activity.png"
import customer from "../../images/customers2.png"
import income from "../../images/income.png";
import man from "../../images/man.png";
import box from "../../images/box-open.png";
import over from "../../images/overview.png"
import logout from "../../images/logout.png";
import { useNavigate } from "react-router-dom";


const Min_sidebar = () => {

    const navigate = useNavigate();
    
    const handleClickToSignOut = async () => {
        try {
            const res = await fetch("https://dashboard-backend-1-0w4b.onrender.com/logout", {
                method: "GET",
                credentials: "include"
            });

            if (res.ok) {
                navigate("/"); // redirect to login page
            } else {
                console.error("Failed to logout");
            }
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="w-[10%] flex flex-col items-center">
            
            <div className="w-full flex justify-center mt-2">
                <div className="w-[70%] flex justify-center items-center">
                    <img src={activity} />
                </div>
            </div>

            <div className="w-full h-[50%] flex flex-col items-center mt-2">
                <div className="w-[70%] flex justify-center items-center mt-8 p-1">
                    <img src={over} />
                </div>

                <div className="w-[70%] flex justify-center items-center mt-5 p-1">
                    <img src={customer} />
                </div>

                <div className="w-[70%]  flex justify-center items-center mt-4 p-1">
                    <img src={income} />
                </div>

                <div className="w-[70%] flex justify-center items-center mt-4 p-1">
                    <img src={box} />
                </div>
            </div>

            <div className="w-full mt-25">
                <img src={logout} className="p-[10px]" alt="Sign Out" onClick={handleClickToSignOut} />
            </div>
    
            <div className="w-[70%] mt-3 mb-6">
                <img src={man} className="object-contain w-[90%]"/>
            </div>  

        </div>
    )
}


export default Min_sidebar