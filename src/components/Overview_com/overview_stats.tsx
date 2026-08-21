import total_sales from "/images/total_sales.png";
import total_customer from "/images/total_customers.png";
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
                withCredentials : true,
            })

            if(res.status !== 200) {
                console.log("Error fetching data : " , res.data.error)
                return;
            }

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
            <div className="ml:w-[90%] mm:w-[90%] xl:w-[85%] flex justify-center items-center mt-10 mb-10">
                <div className="w-[95%] flex justify-center items-center">
                    <Skeleton paragraph={{rows:1}} active/>
                </div>
            </div>
        )}

        {showStats && (
            <div className="w-[85%] rounded-3xl xl:flex mm:hidden flex-col xl:py-4 ml:py-2 mm:py-2">
                
                <div className="w-full bg-[#f3f3f3] h-[1px]" />

                <div className="flex justify-evenly items-center xl:my-2 mm:my-0">
                    <div className="w-[20%] flex">

                        <div className="flex items-center justify-normal">
                            <div className="w-[25%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={total_sales} className="xl:p-4 mm:p-1"/>       
                            </div>

                            <div className="flex-1 flex-col">
                                <div className="flex">
                                    <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[4px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[4px]">Total Income</p>
                                </div>

                                <div className="flex ml:mt-1">
                                    <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] xl: text-2xl ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">₹ {totalSales}</p>
                                </div>
                            </div>
                        </div>

                        <div className="xl:h-20 mm:h-10 flex justify-center items-center">
                            <div className="xl:w-[2px] mm:w-[1px] h-[80%] bg-[#f2f2f2]" />
                        </div>

                    </div>



                    <div className="w-[25%] flex items-center justify-normal">

                        <div className="w-[20%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={total_customer} className="xl:p-4 mm:p-1" />
                        </div>

                        <div className="w-[70%] flex flex-col">
                            <div className="flex">
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
                                    
                                    <div className="w-[50%] xl:flex mm:hidden">
                                        <p className="text-[12px] text-red-500 font-Poppins mt-2">+{newCustomerCount} in Last 24 hr</p>
                                    </div>
                                </div>
                            )}

                            {newCustomerCount > 0 && (
                                <div className="w-full flex">
                                    <div className="w-[28%] ml:mt-1">
                                        <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">{TotalCustomerCount}</p>
                                    </div>
                                    
                                    <div className="w-[50%] xl:flex mm:hidden">
                                        <p className="text-[12px] text-green-500 font-Poppins mt-2">+{newCustomerCount} in Last 24 hr</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="xl:h-20 mm:h-10 flex justify-center items-center">
                            <div className="xl:w-[2px] mm:w-[1px] h-[80%] bg-[#f2f2f2]" />
                        </div>

                    </div>

                    <div className="w-[20%] flex">

                        <div className="flex items-center justify-normal">
                            <div className="w-[25%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={in_stock} className="xl:p-3 mm:p-1"/>
                            </div>

                            <div className="flex flex-col">

                                <div className="flex">
                                    <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[3px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[3px]">Total Products</p>
                                </div>

                                <div className="flex ml:mt-1">
                                    <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">{StockCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="xl:h-20 mm:h-10 flex justify-center items-center">
                            <div className="xl:w-[2px] mm:w-[1px] h-[80%] bg-[#f2f2f2]" />
                        </div>

                    </div>

                    <div className="w-[20%] flex">
                        
                        <div className="flex justify-normal items-center">
                            <div className="w-[28%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={revenue} className="xl:p-4 mm:p-1"/>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex">
                                    <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[6px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[4px]">Revenue(CM)</p>
                                </div>

                                <div className="ml:mt-1">
                                    <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">NA</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full bg-[#f3f3f3] h-[1px]" />

            </div>
        )}

        {showStats && (
            <div className="w-[90%] bg-white rounded-3xl xl:hidden mm:flex flex-col justify-center items-center mt-4 mb-4 xl:p-4 mm:p-2">
                <div className="w-[95%] flex justify-center items-center">
                    <div className="w-[50%] flex  items-center justify-center">

                        <div className="w-[25%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={total_sales} className="p-[7px]"/>       
                        </div>

                        <div className="flex flex-col grow ml-2">
                            <p className="font-Poppins text-[9px]">Total Income</p>
                            <p className="font-Poppins  text-[#495057] mm:text-[10px] mt-1">{totalSales}</p>
                        </div>

                    </div>

                    <div className="w-[50%] flex items-center justify-center">

                        <div className="w-[25%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={total_customer} className="p-[8px]" />
                        </div>

                        <div className="flex flex-col grow ml-2">
                            <p className="font-Poppins xl:text-[16px] mm:text-[8px]">Total Customer</p>

                            {showSkeletonNewCustomer && (
                                <div className="w-full ml-2 flex justify-center">
                                    <Skeleton paragraph={{rows : 0}} active />
                                </div>
                            )}

                            {newCustomerCount == 0 && (
                                <div className="w-full flex">
                                    <p className="font-Poppins text-[#495057] text-[10px] mt-1">{TotalCustomerCount}</p>
                                    <p className="text-[12px] text-red-500 font-Poppins mt-2 xl:flex mm:hidden">+{newCustomerCount} in Last 24 hr</p>
                                </div>
                            )}

                            {newCustomerCount > 0 && (
                                <div className="w-full flex">
                                    <p className="font-Poppins text-[#495057] text-[10px] mt-1">{TotalCustomerCount}</p>
                                    <p className="text-[12px] text-green-500 font-Poppins mt-2 xl:flex mm:hidden">+{newCustomerCount} in Last 24 hr</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className="w-[95%] flex justify-center items-center mt-5">

                    <div className="w-[50%] flex items-center">

                        <div className="w-[25%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={in_stock} className="p-[7px]"/>
                        </div>

                        <div className="flex flex-col grow ml-2">
                            <p className="font-Poppins text-[8px]">Total Products</p>
                            <p className="font-Poppins text-[#495057] mm:text-[10px] mt-1">{StockCount}</p>
                        </div>

                    </div>

                    <div className="w-[50%] flex items-center">

                        <div className="w-[25%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={revenue} className="p-[7px]"/>
                        </div>

                        <div className="flex flex-col grow ml-2">
                            <p className="font-Poppins text-[10px]">Revenue</p>
                            <p className="font-Poppins text-[#495057] mm:text-[10px] mt-1">NA</p>
                        </div>

                    </div>
                </div>

            </div>
        )}

        </>

    )
}



export default Overview_Stats;