import { useEffect , useState , useRef } from "react"
import { Skeleton } from "antd";
import man from "/images/man.png";

interface UserData {
    First_name : string,
    Last_name : string,
    Username : string;
}

const Profile = () => {

    const [Loader, setLoader] = useState(false);
    const [userDetails, setUserDetails] = useState<UserData | null>(null);
    const BasicInfo = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUser = async () => {
          try {
              const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getUserInfo`, {
              credentials: "include",
              method : "GET"
          });
  
          if(!res.ok) {
              console.error("Not Authenticated")
              return;
          }
  
          const data = await res.json();
          setUserDetails(data.login_det); 
  
          setLoader(true);
          return;
      
          } catch (error) {
            console.error("Failed to load user", error);
          }
        };
      
        setTimeout(fetchUser , 1000)
    }, []);

    return (
        <>
            <div className="w-[95%] flex justify-center items-center bg-[#f2f2f2] rounded-2xl mt-3" ref={BasicInfo}>
                {Loader ? (
                    <div className="w-full flex flex-col items-center py-8">

                        <div className="w-[20%] flex justify-center items-center bg-white rounded-full">
                            <img src={man} className="p-1"/>
                        </div>  

                        <div className="w-full flex flex-col items-center justify-center">
                            <div className="flex mt-2">
                                <h1 className="font-Poet text-[20px]">{userDetails?.First_name} {userDetails?.Last_name}</h1>
                            </div>

                            <div className="flex mt-1">
                                <p className="font-Poppins text-[#989898] text-[13px]">{userDetails?.Username}</p>
                            </div>
                        </div>

                    </div>
                    ) : (
                        
                    <div className="w-full my-5 ml-5 flex items-center"> 
                        <Skeleton paragraph={{rows : 1}} className="" active />
                    </div>
                        
                    )
                }
            </div>
        </>
    )
}


export default Profile