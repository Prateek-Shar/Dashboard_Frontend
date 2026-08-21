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
 
        <div className="flex flex-col ">
            {Loader? (
                <div className="flex flex-col mt-4 xl:ml-10 mm:ml-0">
                    <div className="flex items-center px-4">
                        <p className="font-Alan xl:text-3xl ml:text-[12px] mm:text-[18px]">Hello , {userDetails?.First_name}</p>
                    </div>


                    <div className="flex px-4">
                        <p className="font-Poppins text-[#9197b3] pl-0.5 mt-2 xl:text-[16px] mm:text-[12px]">Track, manage, and grow your product catalog.</p>
                    </div>
                </div>
            ) : (

                <div className="w-full ml-3 mt-5">
                    <Skeleton paragraph={{rows : 0}} active />
                </div>
            )}
        </div>

    </>

    )
}

export default Product_head;