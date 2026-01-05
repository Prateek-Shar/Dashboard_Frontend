import Hello from "/images/Hello.png";
import { useUser } from "../../context/login_context";
import { Skeleton } from 'antd';
import { useEffect } from "react";



const Customer_head = () => {

    const { userDetails , Loader , LoadUserApi} = useUser();

    useEffect(() => {
        LoadUserApi()
    } , [])
    
    return (

    
    <div className="w-full flex justify-between">

        <div className="w-[40%] ml-2 my-[6px]">
            <p className="font-Poppins xl:text-[20px] mm:text-[12px] py-2">Customer Overview</p>
        </div>

        <div className="w-[40%] flex flex-row-reverse items-center">
        {Loader ? (
            <div className="xl:w-[35%] mm:w-full flex ml-2">
                <div className="w-[80%] flex justify-center items-center">
                    <p className="font-Poppins xl:text-[14px] mm:text-[8px] xl:pl-1">Welcome Back , {userDetails?.Username}</p>
                </div>

                <div className="w-[10%] flex justify-center items-center">
                    <img src={Hello} className="pl-1"/>
                </div>
            </div>
        ) : (

            <div className="w-[90%] flex flex-row-reverse items-center">
                <div className="w-[40%]">
                    <Skeleton paragraph={{rows : 0}}  active  />
                </div>
            </div>
        )}
        </div>
        
    </div>
    
    )
}


export default Customer_head;