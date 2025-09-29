import { useEffect , useState } from "react";
import { Pagination } from "antd";

interface Income_det {
    Created_at : string,
    Source : string,
    Amount : number,
    Catagory : string
}

const Income_table = () => {
    const [incomeStats , setIncomeStats] = useState<Income_det[]>([])
    const [currentPage , setCurrentPage] = useState<number>(1)
    const [totalIncome , setTotalIncome] = useState<number>(0)
    const [showTable , setShowTable] = useState(false)

    const documentEachPage = 5;

    const currentPageLength = incomeStats.length; 

    const start = (currentPage - 1) * documentEachPage + 1;
    const end = start + currentPageLength - 1;

    
    const fetchIncomePageData = async(page : number) => {
        const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_income_detail?page=${page}` , {
            method : "GET",
            credentials : "include"
        })

        if (!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()
        setIncomeStats(data.Income_stats)
    }


    const fetchIncomeLength = async() => {
        const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/getIncomeStats` , {
            method : "GET",
            credentials : "include"
        })

        if (!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()
        setTotalIncome(data.Total_Transaction)
    }


    const handleChange = (page : number) => {
        setCurrentPage(page)
        fetchIncomePageData(page)
    }

    useEffect(() => {
        fetchIncomePageData(currentPage)
        fetchIncomeLength()
    } , [])


    useEffect(() => {
        if(totalIncome > 0) {
            setShowTable(true)
        }

        else {
            setShowTable(false)
        }
    })

 
    return (

        <>
            {showTable ? (
                <div className="w-[80%] flex flex-col mt-10 rounded-4xl bg-white"> 
                    <div className="w-full pt-6 pl-5 pb-2 rounded-t-4xl mt-2" >
                        <p className="font-Poppins text-2xl">Income Records</p>
                    </div>  

                    <div className="w-full flex justify-evenly mt-8 mb-1">
                        <div className="w-[20%] p-2 flex justify-center items-center">
                            <p className="font-Poppins text-[#bcc3cc]">Date</p>
                        </div>

                        <div className="w-[20%] p-2 flex justify-center items-center">
                            <p className="font-Poppins text-[#bcc3cc] text-[16px]">Source</p>
                        </div>

                        <div className="w-[20%] p-2 flex justify-center items-center">
                            <p className="font-Poppins text-[#bcc3cc]">Amount</p>
                        </div>

                        <div className="w-[20%] p-2 flex justify-center items-center">
                            <p className="font-Poppins text-[#bcc3cc]">Catagory</p>
                        </div>
                    </div>

                    <div className="w-full flex justify-center ">
                        <hr className="w-[95%] border-[#f2f2f2]" />
                    </div>

                    <div className="w-full">
                        <div className="w-full flex flex-col "> {/* Changed to flex-col */}
                            {incomeStats.length > 0 ? (
                            incomeStats.map((stat, index) => {
                                const isoDate = new Date(stat.Created_at).toDateString();
                                return (
                                    <div key={index} className="flex w-full justify-evenly mb-2">
                                        <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                            <p className="font-Poppins p-3 text-[#495057]">{isoDate}</p>
                                        </div>

                                        <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                            <p className="font-Poppins text-[#495057]">{stat.Source}</p>
                                        </div>

                                        <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                            <p className="font-Poppins text-[#495057]">{stat.Amount}</p>
                                        </div>

                                        <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                            <p className="font-Poppins text-[#495057]">{stat.Catagory}</p>
                                        </div>
                                    </div>
                                );
                            })

                            ) : (
                            <div className="w-full p-4 flex justify-center mt-4 mb-4">
                                <p className="font-Poppins">No Results Found</p>
                            </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full flex justify-between rounded-b-4xl">
                        <div className="w-[40%] mt-4 mb-4 flex items-center ml-2">
                            <p className="font-Poppins pl-4 text-[#d9d2d7] text-[13px]">
                                Showing {start} to {end} out of {totalIncome}
                            </p>
                        </div>
                        <div className="w-[20%] mt-4 mb-4 mr-6">
                        <Pagination
                            onChange={handleChange}
                            current={currentPage}
                            total={totalIncome}
                            pageSize={5}
                        />
                        </div>
                    </div>

                </div>  

            ) : (

            <div className="w-full p-30 justify-center items-center" >
                <div className="w-[80%] bg-white flex justify-center rounded-2xl">
                    <p className="p-10 font-Poppins text-2xl">No Records Found</p>
                </div>
            </div>

            )}
            

        </>

    )
}

export default Income_table;