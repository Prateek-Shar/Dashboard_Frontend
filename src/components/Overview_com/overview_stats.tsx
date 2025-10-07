import total_sales from "../../images/total_sales.png";
import new_customer from "../../images/new_customers.png";
import in_stock from "../../images/in_stock.png";
import revenue from "../../images/revenue.png";
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
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_overview_stats` , {
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
            <div className="w-full bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 p-4">
                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={total_sales} className="object-contain w-[60%]"/>       
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins p-2">Total Income</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">₹ {totalSales}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={new_customer} className="object-contain w-[50%]" />
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins p-2">New Customers</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{newCustomerCount}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%]  flex ">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={in_stock} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins p-2">Products In Stock</p>
                        </div>

                        <div className="w-full ">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{inStockCount}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%] flex ">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={revenue} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins p-2">Revenue(CM)</p>
                        </div>

                        <div className="w-full ">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">NA</p>
                        </div>
                    </div>

                </div>

            </div>
        )}

        </>

    )
}



export default Overview_Stats;