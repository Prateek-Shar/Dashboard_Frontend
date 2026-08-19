import total from "/images/total_sales.png"
import growth from "/images/growth.png"
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
            <div className="w-full rounded-3xl xl:flex flex-col mm:hidden justify-evenly items-center my-4 xl:p-2">

                <div className="w-full bg-[#f3f3f3] h-[1px]" />

                <div className="flex my-4 justify-evenly">

                    <div className="w-[25%] flex items-center justify-evenly">
                        <div className="flex items-center">
                            <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={total} className="p-4"/>       
                            </div>

                            <div className="flex flex-col shrink-0">
                                <p className="font-Poppins xl:p-2 xl:text-[15px] ">Total Income</p>
                                <p className="font-Poppins text-[13px] xl:p-2  text-[#495057]">{total_income}</p>
                            </div>
                        </div>

                        <div className="w-[2px] h-[50px] bg-[#f0f0f2] shrink-0 mr-3" />
                    </div>

                    <div className="w-[25%] flex items-center justify-evenly">
                        <div className="flex items-center">
                            <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={growth} className="p-4" />
                            </div>  

                            <div className="flex flex-col grow">
                                <p className="font-Poppins py-2 text-[15px] pl-2">Monthly Growth</p>
                                <p className="font-Poppins text-[13px] xl:p-2 text-[#495057]">{monthly_growth}</p>
                            </div>
                        </div>

                        <div className="w-[2px] h-[50px] bg-[#f0f0f2] shrink-0 mr-3" />
                    </div>


                    <div className="w-[25%] flex items-center">

                        <div className="flex items-center">
                            <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={transaction} className="p-4"/>
                            </div>

                            <div className="flex flex-col">
                                <p className="font-Poppins p-2 text-[15px]">No of Trasaction</p>
                                <p className="font-Poppins text-[13px] p-2 text-[#495057] ">{total_transaction}</p>
                            </div>  
                        </div>

                        <div className="w-[2px] h-[50px] bg-[#f0f0f2] shrink-0 mr-3" />

                    </div>

                    <div className="w-[25%] flex items-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={catagories} className="p-4"/>
                        </div>

                        <div className="flex flex-col">
                            <p className="font-Poppins p-2 text-[15 px]">Top Catagory</p>
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{top_category}</p>
                        </div>

                    </div>
                </div>

                <div className="w-full bg-[#f3f3f3] h-[1px]" />
                
            </div>


            {/* Small Screen */}
            <div className="w-full bg-white rounded-3xl xl:hidden mm:flex-col justify-evenly items-center mt-4 mb-4 xl:p-4 mm:p-2">
                <div className="w-full flex justify-center items-center">
                    <div className="w-[50%] flex  items-center justify-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={total} className="p-[7px]"/>       
                        </div>

                        <div className="flex flex-col grow">
                            <p className="font-Poppins mm:py-2 mm:text-[9px] mm:pl-2">Total Income</p>
                            <p className="font-Poppins mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{total_income}</p>
                        </div>

                    </div>

                    <div className="w-[50%] flex items-center justify-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={growth} className="p-[8px]" />
                        </div>

                        <div className="flex flex-col grow">
                            <p className="font-Poppins p-2 xl:text-[16px] mm:text-[8px]">Monthly Growth</p>
                            <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{monthly_growth}</p>
                        </div>

                    </div>
                </div>

                <div className="w-full flex justify-center items-center mt-5">

                    <div className="w-[50%] flex items-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={transaction} className="p-[7px]"/>
                        </div>

                        <div className="flex flex-col grow">
                            <p className="font-Poppins p-2 text-[8px]">No of Trasaction</p>
                            <p className="font-Poppins mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{total_transaction}</p>
                        </div>

                    </div>

                    <div className="w-[50%] flex items-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={catagories} className="p-[7px]"/>
                        </div>

                        <div className="flex flex-col grow">
                            <p className="font-Poppins p-2 mm:text-[8px]">Top Catagory</p>
                            <p className="font-Poppins xl:text-[13px] p-0 pl-2 text-[#495057] mm:text-[10px]">{top_category}</p>
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