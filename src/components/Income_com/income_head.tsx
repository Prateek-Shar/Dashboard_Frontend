import Hello from "/images/Hello.png"
import { useEffect , useState } from "react";
import { Skeleton } from 'antd';


interface UserData {
  First_name : string;
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

        {/* Right Section */}
        <div className="flex items-start">
        {Loader ? (
            <div className="flex flex-col justify-center items-start">
                <div className="flex mt-5 xl:ml-10 mm:ml-5">
                    <p className="font-Alan xl:text-3xl mm:text-[16px] flex shrink-0">Hello , {userDetails?.First_name}</p>
                    <img src={Hello} className="ml-2 object-contain xl:w-[5%] mm:w-[8%]"/>
                </div>

                <div className="flex xl:ml-10 xl:mt-2 mm:ml-5">
                    <p className="font-Poppins text-[#9197b3] xl:text-[16px] mm:text-[12px]">Your income at a glance, your growth over time.</p>
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