import rupee from "/images/rupee.png"
import customer_growth from "/images/customer_growth.png"
import catagories from "/images/categories.png"
import transaction from "/images/transaction.png"
import { useEffect, useState } from "react"
import { Skeleton } from "antd"


const Income_stats = () => {

    const [total_income , setTotalIncome] = useState()
    const [monthly_growth , setMonthlyGrowth] = useState()
    const [total_transaction , setTotalTransaction] = useState()
    const [top_category , setTopCategory] = useState()

    const [showStats , setShowStats] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)

    const handleAPI = async() => {
        const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/getIncomeStats` , {
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
            <div className="w-full bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 p-4">
                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={rupee} className="object-contain w-[60%]"/>       
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins p-2">Total Income</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{total_income}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%] flex">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={customer_growth} className="object-contain w-[50%]" />
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins p-2">Monthly Growth</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{monthly_growth}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%]  flex ">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={transaction} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins p-2">No of Trasaction</p>
                        </div>

                        <div className="w-full ">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{total_transaction}</p>
                        </div>
                    </div>

                </div>

                <div className="w-[20%]  flex ">

                    <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={catagories} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[70%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins p-2">Top Catagory</p>
                        </div>

                        <div className="w-full ">
                            <p className="font-Poppins text-[13px] p-2 text-[#495057]">{top_category}</p>
                        </div>
                    </div>

                </div>

            </div>
        )}

        </>

    )
}

export default Income_stats