import activity from "../../images/activity.png"
import customer from "../../images/customers2.png"
import man from "../../images/man.png";
import down_arr from "../../images/down_arr.png";
import up_arr from "../../images/up_arr.png";
import income from "../../images/income.png"
import settings from "../../images/settings.png";
import box from "../../images/box-open.png";
import overview from "../../images/overview.png";
import { useNavigate } from "react-router-dom";
import { Skeleton } from 'antd';
import { useRef , useState , useEffect} from "react";

interface UserData {
  Username : string;
  Profession: string;
  UID: number;
}


const Sidebar = () => {

    const [Loader, setLoader] = useState(false);
    const [userDetails, setUserDetails] = useState<UserData | null>(null);

    const navigate = useNavigate()

    const handleClickToCustomers = () => {
        navigate("/customer")
    }

    const handleClickToProducts = () => {
        navigate("/products")
    }

    const handleClicktoIncome = () => {
        navigate("/Income")
    }

    const handleClickToOverview = () => {
        navigate("/overview")
    }

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

    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const res = await fetch("https://dashboard-backend-1-0w4b.onrender.com/getUserInfo", {
            credentials: "include",
            method : "GET"
          });
          const data = await res.json();
    
          if (res.ok) {
            setUserDetails(data.login_det); // set { Username, Profession, UID }
          } else {
            console.warn("Not authenticated:", data.error);
          }
        
        setLoader(true);
    
        } catch (error) {
          console.error("Failed to load user", error);
        }
      };
    
      setTimeout(() => {
        fetchUser();
      } , 1000)
      
    }, []);


    const settingOptions = useRef<HTMLDivElement>(null)
    const closeDrawerBt = useRef<HTMLDivElement>(null);
    const openDrawerBt = useRef<HTMLDivElement>(null);
    const BasicInfo = useRef<HTMLDivElement>(null);

    const handleClickToSettingsOptions = () => {
        if(settingOptions.current) {
            settingOptions.current.style.display = "flex";
        }

        if(openDrawerBt.current) {
            openDrawerBt.current.style.display = "none";
        }

        if(closeDrawerBt.current) {
            closeDrawerBt.current.style.display = "flex";
        }

        if(BasicInfo.current) {
            BasicInfo.current.style.marginTop = "320px";
        }
    }

    const closeDefaultOptions = () => {
        if(settingOptions.current) {
            settingOptions.current.style.display = "none";
        }

        if(closeDrawerBt.current) {
            closeDrawerBt.current.style.display = "none";
        }

        if(openDrawerBt.current) {
            openDrawerBt.current.style.display = "flex";
        }

        if(BasicInfo.current) {
            BasicInfo.current.style.marginTop = "409px"
        }
    }



    return (
        <div className="w-[16%] bg-[#D6D9DB] border-2 border-l-0  border-t-0 border-[#ebedf0]">

            <div className="w-full flex flex-col justify-center items-center">
                
                <div className='w-full flex justify-center mt-2'>
                    <div className='w-[12%] flex items-center'>
                        <img src={activity} />
                    </div>

                    <div className='w-[75%] flex pl-2 items-center'>
                        <p className='font-Poppins text-2xl pl-2'>Dashboard</p>
                    </div>
                </div>

                <div className="w-[95%] mt-2">
                    <hr className="border-2 border-t-0 border-[#ced4da]" ></hr>
                </div>


                <div className="w-full flex flex-col">
                    <div className="w-[90%] flex mt-10 ml-3 hover:cursor-pointer hover:bg-[#f4f4f5] rounded-[5px]" onClick={handleClickToOverview}>
                        <div className="w-[20%]">
                            <img src={overview} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Overview</p>
                        </div>
                    </div>

                    <div className="w-[90%] flex mt-2 ml-3 hover:bg-[#f4f4f5] rounded-[5px] hover:cursor-pointer" onClick={handleClickToProducts}>
                        <div className="w-[20%]">
                            <img src={box} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Product</p>
                        </div>
                    </div>

                    <div className="w-[90%] mt-2 ml-3 flex hover:bg-[#f4f4f5] rounded-[5px] hover:cursor-pointer" onClick={handleClickToCustomers}>
                        <div className="w-[20%]">
                            <img src={customer} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Customers</p>
                        </div>
                    </div>   

                    <div className="w-[90%] mt-2 ml-3 flex hover:bg-[#f4f4f5] rounded-[5px] hover:cursor-pointer" onClick={handleClicktoIncome}>
                        <div className="w-[17%]">
                            <img src={income} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-4">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Income</p>
                        </div>
                    </div> 


                    <div className="w-full mt-2 flex ml-3">
                        <div className="w-[16%] flex items-center">
                            <img src={settings} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">
                            <p className="font-Poppins text-[16px] text-[#9197b3] pl-[4px]">Settings</p>
                        </div>

                        <div className="w-[10%] flex items-center justify-center" ref={openDrawerBt}>
                            <img src={down_arr}  onClick={() => { handleClickToSettingsOptions() }} className="object-contain w-[60%] m-2 hover:cursor-pointer active:cursor-pointer" />
                        </div> 

                        <div className="w-[10%] hidden items-center justify-center" ref={closeDrawerBt}>
                            <img src={up_arr}  onClick={closeDefaultOptions}  className="object-contain w-[60%] m-2 hover:cursor-pointer active:cursor-pointer" />
                        </div>  

                    </div> 

                    <div className="w-[68%] hidden flex-col ml-15 mt-3" ref={settingOptions}>
                        <p className="pt-2 pb-2 pl-[7px] font-Poppins text-[15px] text-red-600 hover:bg-[#f4f4f5] rounded-[5px] hover:cursor-pointer" onClick={handleClickToSignOut}>Logout</p>
                        <p className="pt-2 pb-2 pl-[7px] font-Poppins text-[15px] text-[#9197b3] hover:bg-[#f4f4f5] rounded-[5px] hover:cursor-pointer">Preferences</p>
                    </div>
                </div>
            


                <div className="w-[80%] flex justify-center items-center mt-[409px]" ref={BasicInfo}>
                    {Loader ? (
                            <div className="w-full flex mt-21 mb-8">

                                <div className="w-[25%] flex justify-center items-center">
                                    <div className="w-full flex justify-center items-center">
                                        <img src={man} className="w-[80%]"/>
                                    </div>
                                </div>

                                <div className="w-[65%] flex flex-col">
                                    <div className="w-full pt-1 pb-1 pl-5">
                                        <h1 className="font-Poppins">{userDetails?.Username}</h1>
                                    </div>

                                    <div className="w-full pt-1 pb-1 pl-5">
                                        <p className="font-Poppins text-[#989898] text-[13px]">{userDetails?.Profession}</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            
                            <div className="w-full mt-[60px] mb-9">
                                <Skeleton paragraph={{rows : 2}} active />
                            </div>
                            
                        )
                    }
                </div>

            </div>

        </div>
    )
}

export default Sidebar