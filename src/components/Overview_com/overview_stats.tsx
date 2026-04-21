import total_sales from "/images/total_sales.png";
import new_customer from "/images/new_customers.png";
import in_stock from "/images/in_stock.png";
import revenue from "/images/revenue.png";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";
import axios from "axios";



const Overview_Stats = () => {

    const [totalSales , setTotalSales] = useState<number>(0)
    const [StockCount , setStockCount] = useState<number>(0);
    const [TotalCustomerCount , setTotalCustomerCount] = useState<number>(0);
    const [newCustomerCount , setNewCustomerCount] = useState<number>(0)    

    const [showSkeletonNewCustomer , setShowSkeletonNewCustomer] = useState<boolean>(true);

    const [showStats , setShowStats] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)



    const getOverviewStats = async() => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_overview_stats` , {
                method : "GET",
                withCredentials : true,
            })


            setTotalSales(res.data.Total_Income || 0)
            setStockCount(res.data.StockCount || 0)
            setTotalCustomerCount(res.data.Total_Customer || 0)
            setNewCustomerCount(res.data.NewCustomerCount || 0)
        }

        catch(error) {
            console.log("Error fetching data : " , error)
        }
    }


    useEffect(() => {
        getOverviewStats();
    } , [])


    useEffect(() => {
        console.info(newCustomerCount);

        if(newCustomerCount >= 0) {
            setShowSkeletonNewCustomer(false);
        }
    } , [newCustomerCount])


    setTimeout(() => {
        setShowStats(true)
        setShowSkeleton(false)
    } , 3000)

    return (
        <>
        {showSkeleton && (
            <div className="w-full flex justify-center items-center mt-10 mb-10">
                <div className="w-[95%] flex justify-center items-center">
                    <Skeleton paragraph={{rows:1}} active/>
                </div>
            </div>
        )}

        {showStats && (
            <div className="w-full bg-white rounded-3xl flex justify-evenly items-center my-4 xl:py-4 ml:py-2 mm:py-2">
                <div className="w-[20%] flex">

                    <div className="w-[30%]  bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={total_sales} className="object-contain w-[50%]"/>       
                    </div>

                    <div className="w-[70%] ml:w-[90%] flex flex-col mm:w-[90%]">
                        <div className="w-full">
                            <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[4px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[4px]">Total Income</p>
                        </div>

                        <div className="w-full ml:mt-1">
                            <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] xl: text-2xl ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">₹ {totalSales}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={new_customer} className="object-contain w-[50%]" />
                    </div>

                    <div className="w-[70%] flex flex-col">
                        <div className="w-full">
                            <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[4px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[3px]">Total Customers</p>
                        </div>
                        
                        {showSkeletonNewCustomer && (
                            <div className="w-full ml-2 flex justify-center">
                                <Skeleton paragraph={{rows : 0}} active />
                            </div>
                        )}

                        {newCustomerCount == 0 && (
                            <div className="w-full flex">
                                <div className="w-[28%] ml:mt-1">
                                    <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">{TotalCustomerCount}</p>
                                </div>
                                
                                <div className="w-[50%]">
                                    <p className="text-[12px] text-red-500 font-Poppins mt-2">+{newCustomerCount} in Last 24 hr</p>
                                </div>
                            </div>
                        )}

                        {newCustomerCount > 0 && (
                            <div className="w-full flex">
                                <div className="w-[28%] ml:mt-1">
                                    <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">{TotalCustomerCount}</p>
                                </div>
                                
                                <div className="w-[50%]">
                                    <p className="text-[12px] text-green-500 font-Poppins mt-2">+{newCustomerCount} in Last 24 hr</p>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={in_stock} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[3px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[3px]">Total Products</p>
                        </div>

                        <div className="w-full ml:mt-1">
                            <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">{StockCount}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={revenue} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full flex">
                            <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[6px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[4px]">Revenue(CM)</p>
                        </div>

                        <div className="w-full ml:mt-1">
                            <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">NA</p>
                        </div>
                    </div>

                </div>

            </div>
        )}

        </>

    )
}



export default Overview_Stats;