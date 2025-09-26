import { useEffect, useRef, useState } from "react"

interface info {
    Product_name : string;
    Product_quantity : number
}

interface info2 {
    Product_name : string;
    Product_quantity : number
}




const Alerts_Box = () => {

    const [zeroStockDetail , setZeroStockDetail] = useState<info[]>([]);
    const [lowStockDetail , setLowStockDetail] = useState<info2[]>([])


    const ZeroStockDiv = useRef<HTMLDivElement>(null)
    const LowStockDiv = useRef<HTMLDivElement>(null)

    const NoStockIndicator = useRef<HTMLDivElement>(null)
    const LowStockIndicator = useRef<HTMLDivElement>(null)


    const GetProductStatstics = async() => {
        try {
            const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/product_stats` , {
                method : "GET",
                credentials : "include"
            })

            if (!res.ok) {
                console.log("Error fetching data..........")
            }

            const data = await res.json()

            //Zero Stock
            setZeroStockDetail(data.product_stats4)

            //Low Stock
            setLowStockDetail(data.product_stats5)
        }

        catch(error) {
            console.log("Error Fetching data : " , error)
        }
    }


    useEffect(() => {
        GetProductStatstics()
    }, [])  


    const hnadleClickToLowStockDiv = () => {

        if(LowStockDiv.current) {
            LowStockDiv.current.style.display = "flex";
        }

        if(ZeroStockDiv.current) {
            ZeroStockDiv.current.style.display = "none"
        }

        if(LowStockIndicator.current) {
            LowStockIndicator.current.style.backgroundColor = "#00c951"
        }

        if(NoStockIndicator.current) {
            NoStockIndicator.current.style.backgroundColor = "#99a1af"
        }
    }

    const hnadleClickToNoStockDiv = () => {

        if(LowStockDiv.current) {
            LowStockDiv.current.style.display = "none";
        }

        if(ZeroStockDiv.current) {
            ZeroStockDiv.current.style.display = "flex"
        }

        if(LowStockIndicator.current) {
            LowStockIndicator.current.style.backgroundColor = "#99a1af"
        }

        if(NoStockIndicator.current) {
            NoStockIndicator.current.style.backgroundColor = "#00c951"
        }
    }


    return (
        <>

        <div className="w-full flex justify-between mt-2 mb-1">

            <div className="w-[20%] flex ml-2 hover:cursor-pointer mt-2 mb-2" onClick={hnadleClickToLowStockDiv}>
                <div className="w-[11%] flex justify-center items-center">
                    <div className="w-[80%] h-3 rounded-4xl bg-green-500" ref={LowStockIndicator} />
                </div>

                <div className="w-[89%] flex justify-center items-center">
                    <p className="font-Poppins">Low-In-Stock</p>
                </div>
            </div>

            <div className="w-[20%] flex justify-center items-center p-2 mt-1">
                <p className="font-Poppins text-[#9197b3]">Stocks Details</p>
            </div>

            <div className="w-[20%] flex mr-2 hover:cursor-pointer mt-2 mb-2" onClick={hnadleClickToNoStockDiv}>
                <div className="w-[15%] flex justify-center items-center">
                    <div className="w-[60%] h-3 rounded-4xl bg-gray-400" ref={NoStockIndicator}/>
                </div>

                <div className="w-[85%] flex justify-center items-center">
                    <p className="font-Poppins">Out-of-Stock</p>
                </div>
            </div>
            
        </div>

        <div className="w-full flex justify-center">
            <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2]" />
        </div>

        <div className="w-full hidden flex-row justify-center" ref={ZeroStockDiv}>
            <div className="w-full">
                {zeroStockDetail.length > 0 ? (
                zeroStockDetail.map((stat) => (
                    <div className="w-full p-3 nth-[1]:mt-2 nth-last-[1]:mb-2">
                        <p className="font-Poppins text-[#495057]">{stat.Product_name} has {stat.Product_quantity} quantity</p>
                    </div>
                ))
                ) : (
                <div className="w-full p-2 flex justify-center items-center mb-4 mt-4">
                    <p className="font-Poppins">No Out of Stock Records Found</p>
                </div>
                )}
            </div>
        </div>


        <div className="w-full flex-col justify-center gap-2" ref={LowStockDiv}>
        {lowStockDetail.length > 0 ? (
            lowStockDetail.map((stat, index) => (
            <div key={index} className="w-full p-2 mt-1 ml-2 nth-[1]:mt-2 nth-last-[1]:mb-2">
                <p className="font-Poppins text-[#495057]">
                {stat.Product_name ? stat.Product_name : "(Unknown Product)"} is low in stock which has {stat.Product_quantity} quantity
                </p>
            </div>
            ))
        ) : (
            <div className="w-full p-2 mt-4 mb-4 flex justify-center items-center">
                <p className="font-Poppins">No Low Stock Records Found</p>
            </div>
        )}
        </div>



        </>
    )
}





export default Alerts_Box