import Hello from "/images/Hello.png"
import { useEffect , useState } from "react";
import { Skeleton } from 'antd';


interface UserData {
  Username : string;
  Profession: string;
  UID: number;
}


const Income_head = () => {

    const [Loader, setLoader] = useState(false);
    const [userDetails, setUserDetails] = useState<UserData>();

    const fetchUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getUserInfo`, {
            credentials: "include",
            method : "GET"
            });
            const data = await res.json();
    
            if (res.ok) {
                setUserDetails(data.login_det); 
            } else {
                console.warn("Not authenticated:", data.error);
            }
        
            setLoader(true);
    
        } catch (error) {
            console.error("Failed to load user", error);
        }
    };


    useEffect(() => {
        fetchUser();
    }, []);

    return (   
            

    <div className="w-full flex justify-between ">

        {/* Left Section */}
        <div className="xl:w-[30%] ml-2 my-[6px] mm:w-[40%]">
            <p className="font-Poppins xl:text-[20px] mm:text-[13px] py-2">Income Overview</p>
        </div>

        {/* Right Section */}
        <div className="xl:w-[40%] flex-row-reverse flex items-center mm:w-[40%]">
        {Loader ? (
            <div className="xl:w-[35%] flex ml-2 mm:w-full">
                <div className="w-[80%] flex justify-center items-center">
                    <p className="font-Poppins xl:text-[14px] mm:text-[8px] pl-1">Welcome Back , {userDetails?.Username}</p>
                </div>

                <div className="w-[10%] flex justify-center items-center ">
                    <img src={Hello} className="pl-1"/>
                </div>
            </div>
        ) : (

            <div className="w-[40%] ml-3 mt-1 flex flex-row-reverse items-center">
                <Skeleton paragraph={{rows : 0}} active  />
            </div>
        )}
        </div>
        
    </div>

    )
}

export default Income_head;