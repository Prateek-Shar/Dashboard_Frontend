import { useEffect, useState } from "react"


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
            const response = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/getLatestTransaction` , {
                method : "GET",
                credentials : "include"
            })

            if(!response.ok) {
                console.error("Something Broke up in fetching api")
            }

            const data = await response.json()
            getStats(data.detail)
        }

        catch(error) {
            console.error("Something Broke Up")
        }
    }

    useEffect(() => {
        getLatestTransaction()
    }, [])

    return (
        <>
        <div className="w-full p-2 flex justify-center items-center mt-2">
            <p className="font-Poppins text-[#9197b3]">Last 3 Transactions</p>
        </div>

        <div className="w-full flex justify-center">
            <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2]" />
        </div>

        {stats.length === 0 ? (
            <div className="p-2 mt-4 mb-4 flex justify-center">
                <p className="font-Poppins">No Records Found</p>
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
    )
}


export default Latest_Transaction