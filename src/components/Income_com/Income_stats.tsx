import rupee from "/images/rupee.png"
import customer_growth from "/images/customer_growth.png"
import catagories from "/images/categories.png"
import transaction from "/images/transaction.png"
import { useEffect, useState } from "react"
import { Skeleton } from "antd"


const Income_stats = () => {

    const [total_income , setTotalIncome] = useState(0)
    const [monthly_growth , setMonthlyGrowth] = useState(0)
    const [total_transaction , setTotalTransaction] = useState(0)
    const [top_category , setTopCategory] = useState<string>("NA")

    const [showStats , setShowStats] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)

    const handleAPI = async() => {
        const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getIncomeStats` , {
            method: "GET",
            credentials : "include"
        })

        if (!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()

        setTotalIncome(data.Total_Income)
        setMonthlyGrowth(data.Monthly_Growth)
        setTotalTransaction(data.Total_Transaction)
        setTopCategory(data.Top_Category)
    }

    useEffect(() => {
        handleAPI()
    } , [])


    setTimeout(() => {
        setShowSkeleton(false)
        setShowStats(true)
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
            <>
            {/* Large Screen */}
            <div className="w-full bg-white rounded-3xl xl:flex mm:hidden justify-evenly items-center mt-4 mb-4 xl:p-4">
                <div className="xl:w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={rupee} className="object-contain w-[60%]"/>       
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins xl:p-2 xl:text-[16px] ">Total Income</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins text-[13px] xl:p-2  text-[#495057]">{total_income}</p>
                        </div>
                    </div>

                </div>

                <div className="xl:w-[20%] flex ">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={customer_growth} className="object-contain w-[50%]" />
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins p-2 text-[16px]">Monthly Growth</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins text-[13px] xl:p-2  text-[#495057]">{monthly_growth}</p>
                        </div>
                    </div>

                </div>


                <div className="xl:w-[20%] flex ">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={transaction} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins p-2 text-[16px]">No of Trasaction</p>
                        </div>

                        <div className="w-full ">
                            <p className="font-Poppins text-[13px] p-2  text-[#495057] ">{total_transaction}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%] flex ">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={catagories} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins p-2 text-[16px]">Top Catagory</p>
                        </div>

                        <div className="w-full ">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{top_category}</p>
                        </div>
                    </div>

                </div>
            </div>


            {/* Small Screen */}
            <div className="w-full bg-white rounded-3xl xl:hidden mm:flex-col justify-evenly items-center mt-4 mb-4 xl:p-4 mm:p-2">
                <div className="w-full xl:hidden mm:flex justify-evenly items-center">
                    <div className="xl:w-[20%] mm:w-[50%] flex">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={rupee} className="object-contain w-[60%]"/>       
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="w-full">
                                <p className="font-Poppins xl:p-2 mm:py-2 mm:text-[9px] xl:text-[16px] mm:pl-2">Total Income</p>
                            </div>

                            <div className="w-full">
                                <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{total_income}</p>
                            </div>
                        </div>

                    </div>

                    <div className="xl:w-[20%] flex mm:w-[50%]">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={customer_growth} className="object-contain w-[50%]" />
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="w-full">
                                <p className="font-Poppins p-2 xl:text-[16px] mm:text-[8px]">Monthly Growth</p>
                            </div>

                            <div className="w-full">
                                <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{monthly_growth}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full xl:hidden mm:flex justify-center items-center mt-5">

                    <div className="xl:w-[20%] flex mm:w-[50%]">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={transaction} className="object-contain w-[50%]"/>
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="w-full ">
                                <p className="font-Poppins p-2 xl:text-[16px] mm:text-[8px]">No of Trasaction</p>
                            </div>

                            <div className="w-full ">
                                <p className="font-Poppins xltext-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{total_transaction}</p>
                            </div>
                        </div>

                    </div>

                    <div className="w-[20%] flex mm:w-[50%]">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={catagories} className="object-contain w-[50%]"/>
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="w-full ">
                                <p className="font-Poppins p-2 xl:text-[16px] mm:text-[10px]">Top Catagory</p>
                            </div>

                            <div className="w-full ">
                                <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{top_category}</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
        )}

        </>

    )
}

export default Income_stats