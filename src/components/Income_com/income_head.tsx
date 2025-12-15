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
            

    <div className="w-full flex flex-col">

        <div className="w-[90%] ml-2">
            <p className="font-Poppins text-2xl p-1">Income Overview</p>
        </div>

        {Loader ? (
            <div className="w-[15%] flex ml-2">
                <div className="w-[80%] flex items-center">
                    <p className="font-Poppins text-[16px]  pl-1">Welcome Back , {userDetails?.Username}</p>
                </div>

                <div className="w-[10%] flex justify-center items-center">
                    <img src={Hello} className="pl-1"/>
                </div>
            </div>
        ) : (

            <div className="w-[35%] ml-3 mt-1">
                <Skeleton paragraph={{rows : 0}} active />
            </div>
        )}
        
        <div className="w-full mt-2">
            <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#ced4da]" />
        </div>
        
    </div>

    )
}

export default Income_head;