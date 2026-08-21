import Hello from "/images/Hello.png";
import { useUser } from "../../context/login_context";
import { Skeleton } from 'antd';
import { useEffect } from "react";



const Customer_head = () => {

    // const [userDetails , setUserDetails] = useState<string>()

    const { userDetails , Loader , LoadUserApi} = useUser();

    useEffect(() => {
        LoadUserApi()
    } , [])
    
    return (

    
    <div className="w-full flex items-center">
        <div className="flex items-center">
            {Loader ? (
                <div className="flex flex-col ml-2 mt-4 xl:ml-10 mm:ml-3">
                    <div className="flex items-center">
                        <p className="font-Alan xl:text-3xl mm:text-[16px]">
                            Hello, {userDetails?.First_name}
                        </p>

                        <img src={Hello} className="pl-1 xl:w-[6%] mm:w-[10%]" />
                    </div>

                    <div className="flex">
                        <p className="font-Poppins text-[#9197b3] xl:pl-[6px] mm:pl-[1px] mt-2 xl:text-[16px] mm:text-[12px]">Understand Your Customers, Grow Your Business</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center">
                    <Skeleton paragraph={{ rows: 0 }} active />
                </div>
            )}
        </div>
    </div>
    
    )
}


export default Customer_head;