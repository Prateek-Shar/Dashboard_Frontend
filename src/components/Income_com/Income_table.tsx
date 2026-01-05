import { useEffect , useState } from "react";
import { Pagination, Skeleton } from "antd";


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
    const [showSkeleton , setShowSkeleton] = useState(true)

    const documentEachPage = 5;

    const currentPageLength = incomeStats.length; 

    const start = (currentPage - 1) * documentEachPage + 1;
    const end = start + currentPageLength - 1;

    
    const fetchIncomePageData = async(page : number) => {
        const res = await fetch(`${import.meta.env.VITE_LOCAL_ADDRESS}/get_income_detail?page=${page}` , {
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
        const res = await fetch(`${import.meta.env.VITE_LOCAL_ADDRESS}/getIncomeStats` , {
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
    } , [])


    setTimeout(() => {
        fetchIncomeLength()

        setShowSkeleton(false)

        setShowTable(true)
    } , 3000)

 
    return (

        <>
            {showSkeleton && (
                <div className="w-full flex justify-center items-center mt-10">
                    <div className="w-[80%]">
                        <Skeleton paragraph={{rows:6}} active/>
                    </div>
                </div>
            )}  
            

            {showTable && (
                incomeStats.length > 0  ? (
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
                                {incomeStats.length > 0 && (
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

                    <div className="w-full flex justify-center items-center xl:my-40 mm:py-40">
                        <div className="xl:w-[70%] mm:w-[80%] bg-white py-10 flex justify-center xl:rounded-2xl mm:rounded-3xl">
                            <p className="font-Poppins xl:text-2xl mm:text-[20px]">No Income Found.</p>
                        </div>
                    </div>

                )

            )}
            

        </>

    )
}

export default Income_table;