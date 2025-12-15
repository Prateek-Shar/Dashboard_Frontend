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

    
    <div className="w-full flex flex-col">

        <div className="w-[90%] ml-2">
            <p className="font-Poppins text-[20px] p-1">Customer Overview</p>
        </div>

        {Loader? (
            <div className="w-[15%] flex ml-2">
                <div className="w-[80%] flex items-center">
                    <p className="font-Poppins text-[14px] pl-1">Welcome Back , {userDetails?.Username}</p>
                </div>

                <div className="w-[10%] flex justify-center items-center">
                    <img src={Hello} className="pl-1"/>
                </div>
            </div>
        ) : (

            <div className="w-[35%] mt-2 ml-3">
                <Skeleton paragraph={{rows : 0}} active />
            </div>
        )}
        
        <div className="w-full">
            <hr className="w-full border-t-0 border-b-2 border-[#ebedf0]" />
        </div>
        
    </div>
    
    )
}


export default Customer_head;