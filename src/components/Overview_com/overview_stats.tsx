import total_sales from "/images/total_sales.png";
import new_customer from "/images/new_customers.png";
import in_stock from "/images/in_stock.png";
import revenue from "/images/revenue.png";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";



const Overview_Stats = () => {

    const [totalSales , setTotalSales] = useState<number>(0)
    const [inStockCount , setInStockCount] = useState<number>(0);
    const [newCustomerCount , setNewCustomerCount] = useState<number>(0);

    const [showStats , setShowStats] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)



    const getOverviewStats = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_LOCAL_ADDRESS}/get_overview_stats` , {
                method : "GET",
                credentials : "include"
            })

            if(!res.ok) {
                console.log("Error fetching data..........")
                return;
            }

            const data = await res.json()
            setNewCustomerCount(data.cusStats)
            setTotalSales(data.Total_Income)
            setInStockCount(data.product_stats1)
        }

        catch(error) {
            console.log("Error fetching data : " , error)
        }
    }


    useEffect(() => {
        getOverviewStats();
    } , [])


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
                            <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[4px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[3px]">New Customers</p>
                        </div>

                        <div className="w-full ml:mt-1">
                            <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">{newCustomerCount}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={in_stock} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins xl:py-1 xl:text-[16px] ml:text-[3px] ml:p-0 ml:pl-2 mm:pl-2 mm:p-0 mm:text-[3px]">Products In Stock</p>
                        </div>

                        <div className="w-full ml:mt-1">
                            <p className="font-Poppins xl:text-[13px] xl:py-1 text-[#495057] ml:p-0 ml:pl-2 ml:text-[5px] mm:py-1 mm:pl-2 mm:text-[5px]">{inStockCount}</p>
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