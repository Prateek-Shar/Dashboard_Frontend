import activity from "/images/activity.png"
import customer from "/images/new_customers.png"
import down_arr from "/images/down_arr.png";
import up_arr from "/images/up_arr.png";
import income from "/images/income.png"
import settings from "/images/settings.png";
import box from "/images/product.png";
import task from "/images/task_project.png"
import overview from "/images/overview.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



const Sidebar = () => {

    const [openDrawerBt , setOpenDrawerBt] = useState(true)
    const [closeDrawerBt , setCloseDrawerBt] = useState(false)
    const [settingsOptions , setSettingsOptions] = useState(false)


    const navigate = useNavigate()

    const handleClickToCustomers = () => {
        navigate("/customer")
    }

    const handleClickToProducts = () => {
        navigate("/products")
    }

    const handleClicktoIncome = () => {
        navigate("/income")
    }

    const handleClickToOverview = () => {
        navigate("/overview")
    }

    const handleClicktoTask = () => {
        navigate("/task&projects")
    }

    const handleClickToSignOut = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/logout`, {
                method: "GET",
                credentials: "include"
            });

            if (res.ok) {
                navigate("/");
                return;
            }
            
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };



    const handleClickToSettingsOptions = () => {

        setSettingsOptions(true)
        setCloseDrawerBt(true)
        setOpenDrawerBt(false)

        // if(BasicInfo.current) {
        //     BasicInfo.current.style.marginTop = "331px";
        // }
    }

    const closeDefaultOptions = () => {
       
        setSettingsOptions(false);
        setCloseDrawerBt(false)
        setOpenDrawerBt(true)


        // if(BasicInfo.current) {
        //     BasicInfo.current.style.marginTop = "420px"
        // }
    }

    // bg-[#EEF4FF]

    return (
        <div className="w-64 shrink-0 min-h-screen bg-white border-2 border-l-0 border-t-0 border-[#ebedf0] flex flex-col justify-between">

            <div className="w-full flex flex-col justify-center items-center">
                
                <div className='w-full flex items-center ml-8 mt-5'>
                    <div className='w-[15%] flex items-center'>
                        <img src={activity} />
                    </div>

                    <div className='flex pl-2 items-center'>
                        <p className='font-Poet text-[20px] pl-2'>Insight Board</p>
                    </div>
                </div>

                {/* <div className="w-full mt-2">
                    <hr className="border-2 border-t-0 border-[#ebedf0]" ></hr>
                </div> */}


                <div className="w-full flex flex-col">
                    <div className="w-[90%] flex mt-10 ml-3 hover:cursor-pointer hover:bg-white rounded-[5px]" onClick={handleClickToOverview}>
                        <div className="w-[20%]">
                            <img src={overview} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">    
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Overview</p>
                        </div>
                    </div>

                    <div className="w-[90%] flex mt-2 ml-3 hover:bg-white rounded-[5px] hover:cursor-pointer" onClick={handleClickToProducts}>
                        <div className="w-[20%]">
                            <img src={box} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Products</p>
                        </div>
                    </div>

                    <div className="w-[90%] mt-2 ml-3 flex hover:bg-white rounded-[5px] hover:cursor-pointer" onClick={handleClickToCustomers}>
                        <div className="w-[20%]">
                            <img src={customer} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Customers</p>
                        </div>
                    </div>   

                    <div className="w-[90%] mt-2 ml-3 flex hover:bg-white rounded-[5px] hover:cursor-pointer" onClick={handleClicktoIncome}>
                        <div className="w-[17%]">
                            <img src={income} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-4">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Income</p>
                        </div>
                    </div> 

                    <div className="w-[90%] mt-2 ml-3 flex hover:bg-white rounded-[5px] hover:cursor-pointer" onClick={handleClicktoTask}>
                        <div className="w-[17%]">
                            <img src={task} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-4">
                            <p className="font-Poppins text-[16px] text-[#9197b3]">Task</p>
                        </div>
                    </div> 

                    <div className="w-full mt-2 flex ml-3">
                        <div className="w-[16%] flex items-center">
                            <img src={settings} className="object-contain w-[60%] m-2" />
                        </div>

                        <div className="w-[60%] flex items-center ml-2">
                            <p className="font-Poppins text-[16px] text-[#9197b3] pl-[4px]">Settings</p>
                        </div>

                        {openDrawerBt && (
                            <div className="w-[10%] flex items-center justify-center">
                                <img src={down_arr}  onClick={() => { handleClickToSettingsOptions() }} className="object-contain w-[60%] m-2 hover:cursor-pointer active:cursor-pointer" />
                            </div> 
                        )}

                        {closeDrawerBt && (
                            <div className="w-[10%] flex items-center justify-center">
                                <img src={up_arr}  onClick={closeDefaultOptions}  className="object-contain w-[60%] m-2 hover:cursor-pointer active:cursor-pointer" />
                            </div>  
                        )}

                    </div> 
                    
                    
                    {settingsOptions && (
                        <div className="w-[68%] flex-col ml-15 mt-3">
                            <p className="pt-2 pb-2 pl-[7px] font-Poppins text-[15px] text-red-600 hover:bg-white rounded-[5px] hover:cursor-pointer" onClick={handleClickToSignOut}>Logout</p>
                            <p className="pt-2 pb-2 pl-[7px] font-Poppins text-[15px] text-[#9197b3] hover:bg-white rounded-[5px] hover:cursor-pointer">Preferences</p>
                        </div>
                    )}
                </div>
        

            </div>

        </div>
    )
}

export default Sidebar