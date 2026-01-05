import Hello from "/images/Hello.png"
import { useUser } from "../../context/login_context";
import { Skeleton } from 'antd';
import { useEffect } from "react";



const Product_head = () => {

    const { userDetails , Loader , LoadUserApi  } = useUser();

    useEffect(() => {
        LoadUserApi()
    } , [])

    return (
        <div className="w-full flex justify-between">

            {/* Left Section */}
            <div className="xl:w-[40%] my-[6px] ml-2 ">
                <p className="font-Poppins xl:text-[20px] py-2 px-2 mm:text-[12px]">Products Overview</p>
            </div>


            {/* Right Section */}
            <div className="xl:w-[40%] flex flex-row-reverse mm:w-[40%]">
                {Loader ? (
                    <div className="xl:w-[35%] flex ml-2 mm:w-full mm:ml-0">
                        <div className="w-[80%] flex justify-center items-center">
                            <p className="font-Poppins xl:text-[14px] mm:text-[8px] pl-1">Welcome Back , {userDetails?.Username}</p>
                        </div>

                        <div className="w-[10%] flex justify-center items-center">
                            <img src={Hello} className="pl-1"/>
                        </div>
                    </div>
                ) : (

                    <div className="w-[30%] my-1 flex flex-row-reverse items-center mm:w-full">
                        <Skeleton paragraph={{rows : 0}} className="flex" active  />
                    </div>
                )}
            </div>
            
        </div>

    )
}

export default Product_head;