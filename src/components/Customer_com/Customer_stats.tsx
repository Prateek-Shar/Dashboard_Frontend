import customers from "/images/customer.png";
import member from "/images/members.png";
import active from "/images/active.png";
import { useAPI } from "../../context/customers_stats_context";
import { useState } from "react";
import { Skeleton } from "antd";

const Stats = () => {


    const { totalActiveCount , totalCustomerCount } = useAPI()

    const [showStats , setShowStats] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)

    setTimeout(() => {
        setShowStats(true)
        setShowSkeleton(false)
    } , 3000)


    return (
        <>
        {showSkeleton && (
            <div className="w-full flex justify-center items-center mt-10 mb-10">
                <div className="w-[85%] flex justify-center items-center">
                    <Skeleton paragraph={{rows:1}} active/>
                </div>
            </div>
        )}

        {showStats && (
            <div className="w-full bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 xl:p-4 mm:p-0 mm:py-2">
                <div className="xl:w-[25%] mm:w-[40%] flex">

                    <div className="w-[35%] bg-[#e9ecef] rounded-4xl flex justify-center items-center ">
                        <img src={customers} className="object-contain w-[60%]"/>
                    </div>

                    <div className="w-[65%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins xl:p-2 xl:text-[16px] mm:text-[5px] mm:p-0 mm:pl-2">Total Customers</p>
                        </div>

                        <div className="w-full xl:mt-0 mm:mt-2">
                            <p className="font-Poppins xl:p-2 text-[#495057] mm:p-0 mm:pl-2 xl:text-[16px] mm:text-[10px]">{totalCustomerCount}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[25%] xl:flex mm:hidden">

                    <div className="w-[35%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={member} className="object-contain w-[50%]" />
                    </div>

                    <div className="w-[65%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins p-2">Members</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins p-2 text-[#495057]">0</p>
                        </div>
                    </div>

                </div>

                <div className="xl:w-[25%] mm:w-[40%] flex">

                    <div className="w-[35%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={active} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins xl:p-2 xl:text-[16px] mm:text-[8px] mm:p-0 mm:pl-2">Active Now</p>
                        </div>

                        <div className="w-full xl:mt-0 mm:mt-2">
                            <p className="font-Poppins xl:p-2 text-[#495057] mm:p-0 mm:pl-2 xl:text-[16px] mm:text-[10px]">{totalActiveCount}</p>
                        </div>
                    </div>

                </div>
            </div>
        )}

        </>
        
    )

}


export default Stats;