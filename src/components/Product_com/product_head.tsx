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
        <>
            <div className="w-[90%] ml-2">
                <p className="font-Poppins text-2xl p-1">Products Overview</p>
            </div>

            {Loader ? (
                <div className="w-[15%] flex ml-2">
                    <div className="w-[80%] flex items-center">
                        <p className="font-Poppins text-[16px] pl-1">Welcome Back , {userDetails?.Username}</p>
                    </div>

                    <div className="w-[10%] flex justify-center items-center">
                        <img src={Hello} className="pl-1"/>
                    </div>
                </div>
            ) : (

                <div className="w-[35%] mt-1 ml-3">
                    <Skeleton paragraph={{rows : 0}} active />
                </div>
            )}
            
            <div className="w-full mt-2">
                <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#ced4da]" />
            </div>
        </>

    )
}

export default Product_head;