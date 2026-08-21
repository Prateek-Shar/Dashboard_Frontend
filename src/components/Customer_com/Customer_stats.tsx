import customers from "/images/total_customers.png";
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
            <div className="w-full rounded-3xl flex flex-col justify-evenly items-center  xl:p-4 mm:p-0 mm:py-2">

                <div className="w-full bg-[#f3f3f3] h-[1px]" />

                <div className="flex justify-evenly items-center xl:my-3 mm:my-2">

                    <div className="xl:w-[30%] mm:w-[35%] flex items-center justify-evenly">
                        <div className="flex items-center">
                            <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center ">
                                <img src={customers} className="xl:p-2 mm:p-[5px]" />
                            </div>

                            <div className="flex flex-col grow mm:ml-2">
                                <p className="font-Poppins xl:text-[16px] mm:text-[5px]">Total Customers</p>
                                <p className="font-Poppins text-[#495057] xl:text-[16px] mm:text-[8px] mm:mt-1 xl:mt-0">{totalCustomerCount}</p>
                            </div>
                        </div>

                        <div className="w-[2px] xl:h-[50px] mm:h-[30px] bg-[#f0f0f2] shrink-0 mr-3" />
                    </div>

                    <div className="xl:w-[27%] mm:w-[35%] flex justify-evenly items-center">
                        <div className="flex justify-around items-center">
                            <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={member} className="xl:p-3 mm:p-1" />
                            </div>

                            <div className="flex flex-col mm:ml-2 grow">
                                <p className="font-Poppins xl:text-[16px] mm:text-[6px]">Members</p>
                                <p className="font-Poppins text-[#495057] xl:text-[16px] mm:text-[8px] xl:mt-0 mm:mt-1">0</p>
                            </div>
                        </div>

                        <div className="w-[2px] xl:h-[50px] mm:h-[30px] bg-[#f0f0f2] shrink-0 mr-3" />                    
                    </div>

                    <div className="xl:w-[27%] mm:w-[35%] flex items-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={active} className="xl:p-3 mm:p-2"/>
                        </div>

                        <div className="flex flex-col mm:ml-2 grow">
                            <p className="font-Poppins xl:text-[16px] mm:text-[6px]">Active Now</p>
                            <p className="font-Poppins text-[#495057]  mm:mt-1 xl:mt-0 xl:text-[16px] mm:text-[8px]">{totalActiveCount}</p>
                        </div>

                    </div>
                </div>

                <div className="w-full bg-[#f3f3f3] h-[1px]" />

            </div>
        )}

        </>
        
    )

}


export default Stats;