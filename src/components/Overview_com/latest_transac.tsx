import { useEffect, useState } from "react"
import { Skeleton } from "antd"


interface Income_det {
    Created_at : string,
    Source : string,
    Amount : number,
    Catagory : string
}


const Latest_Transaction = () => {

    const [stats , getStats] = useState<Income_det[]>([])

    const getLatestTransaction = async() => {

        try {
            const response = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getLatestTransaction` , {
                method : "GET",
                credentials : "include"
            })

            if(!response.ok) {
                console.error("Something Broke up in fetching api")
                return;
            }

            const data = await response.json()

            getStats(data.detail)
            return;
        }

        catch(error) {
            console.error("Something Broke Up in latest transaction")
        }
    }

    useEffect(() => {
        getLatestTransaction()
    }, []);

    const [showSkeleton , setShowSkeleton] = useState(true)
    const [showTable , setShowTable] = useState(false)

    setTimeout(() => {
        setShowSkeleton(false)
        setShowTable(true)
    } , 3000)

    return (
        <>

            <div className="w-full p-2 flex justify-center items-center mt-2">
                <p className="font-Poppins text-[#9197b3] ml:text-[11px] mm:text-[11px] xl:text-[15px]">Last 3 Transactions</p>
            </div>

            <div className="w-full flex justify-center">
                <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2]" />
            </div>

        
            {showSkeleton && (
                <div className="w-full flex justify-center items-center mt-10 mb-10">
                    <div className="w-[80%]">
                        <Skeleton paragraph={{rows:5}} active/>
                    </div>
                </div>
            )}


            {showTable && (
                <>
                    {stats.length === 0 ? (

                        <div className="xl:p-6 flex justify-center mm:py-3 ml:py-4">
                            <p className="font-Poppins ml:text-[10px] mm:text-[10px] xl:text-[16px]">No Records Found</p>
                        </div>

                        ) : (

                        <div className="w-full">
                            <div className="flex justify-evenly mt-8 mb-1">
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

                            {stats.map((st, index) => {

                            const isoDate = new Date(st.Created_at).toDateString();
                            const SlicedDate = isoDate.slice(0, 10);

                            return (
                                <div key={index} className="flex w-full justify-evenly mb-2">
                                    <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                        <p className="font-Poppins p-3 text-[#495057]">{SlicedDate}</p>
                                    </div>
                                    <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                        <p className="font-Poppins text-[#495057]">{st.Source}</p>
                                    </div>
                                    <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                        <p className="font-Poppins text-[#495057]">{st.Amount}</p>
                                    </div>
                                    <div className="w-[20%] mt-2 flex justify-center items-center mb-2">
                                        <p className="font-Poppins text-[#495057]">{st.Catagory}</p>
                                    </div>
                                </div>
                            );

                            })}
                        </div>
                    )}
                </>
            )}
        </>
    )
}


export default Latest_Transaction