import { useEffect, useRef, useState } from "react"
import { Skeleton } from "antd";

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

    const [ZeroStockDiv , setZeroStockDiv] = useState(false)
    const [LowStockDiv , setLowStockDiv] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)

    const NoStockIndicator = useRef<HTMLDivElement>(null)
    const LowStockIndicator = useRef<HTMLDivElement>(null)


    const GetProductStatstics = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_LOCAL_ADDRESS}/product_stats` , {
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


    const handleClickToLowStockDiv = () => {

        setLowStockDiv(true)
        setZeroStockDiv(false)

        if(LowStockIndicator.current) {
            LowStockIndicator.current.style.backgroundColor = "#00c951"
        }

        if(NoStockIndicator.current) {
            NoStockIndicator.current.style.backgroundColor = "#99a1af"
        }
    }

    const handleClickToZeroStockDiv = () => {

        setZeroStockDiv(true)
        setLowStockDiv(false)

        if(LowStockIndicator.current) {
            LowStockIndicator.current.style.backgroundColor = "#99a1af"
        }

        if(NoStockIndicator.current) {
            NoStockIndicator.current.style.backgroundColor = "#00c951"
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLowStockDiv(false)
            setShowSkeleton(false)
            setZeroStockDiv(true)
        }, 3000)
    }, [])



    return (
        <div className="w-full flex-col">

        <div className="w-full flex justify-between mt-2 mb-1">

            <div className="xl:w-[20%] ml:w-[25%] mm:w-[25%] flex mr-2 hover:cursor-pointer mt-2 mb-2 ml:ml-2 mm:ml-2" onClick={handleClickToZeroStockDiv}>
                <div className="xl:w-[15%] ml:w-[10%] mm:w-[10%] flex justify-center items-center ml:p-[1px] mm:p-[1px]">
                    <div className="xl:w-[60%] xl:h-[7px] ml:w-full mm:w-full ml:h-[5px] mm:h-[5px] h-3 rounded-4xl bg-green-500" ref={NoStockIndicator}/>
                </div>

                <div className="xl:w-[85%] ml:w-[90%] mm:w-[90%] flex justify-center items-center">
                    <p className="font-Poppins ml:text-[8px] mm:text-[8px] xl:text-[12px]">Out-of-Stock</p>
                </div>
            </div>


            <div className="xl:w-[30%] flex justify-center items-center p-2 mt-1 ml:w-[30%] mm:w-[32%] ml:mt-0 ml:mr-2 mm:mt-0">
                <p className="font-Poppins text-[#9197b3] ml:text-[10px] mm:text-[10px] xl:text-[16px]">Stocks Details</p>
            </div>


            <div className="xl:w-[20%] flex ml-2 hover:cursor-pointer mt-2 mb-2 ml:w-[25%] mm:w-[25%]" onClick={handleClickToLowStockDiv}>
                <div className="xl:w-[9%] flex justify-center items-center mm:w-[9%] ml:w-[11%]">
                    <div className="xl:w-[80%] xl:h-[7px] ml:h-[8px] mm:h-[5px] rounded-4xl bg-gray-400" ref={LowStockIndicator} />
                </div>

                <div className="w-[89%] flex justify-center items-center">
                    <p className="font-Poppins ml:text-[9px] mm:text-[8px] xl:text-[12px]">Low-In-Stock</p>
                </div>
            </div>

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

        {ZeroStockDiv && (
            <div className="w-full flex flex-row justify-center">
                <div className="w-full">
                    {zeroStockDetail.length > 0 ? (
                    zeroStockDetail.map((stat) => (
                        <div className="w-full p-3 nth-[1]:mt-2 nth-last-[1]:mb-2">
                            <p className="font-Poppins text-[#495057]">{stat.Product_name} has {stat.Product_quantity} quantity</p>
                        </div>
                    ))
                    ) : (
                    <div className="w-full p-2 flex justify-center items-center mb-4 mt-4 ml:p-0 mm:p-0">
                        <p className="font-Poppins ml:text-[10px] mm:text-[10px] xl:text-[12px]">No Out of Stock Records Found</p>
                    </div>
                    )}
                </div>
            </div>
        )}

        {LowStockDiv && (
        <div className="w-full flex flex-col justify-center gap-2">
            <>
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
                    <p className="font-Poppins xl:text-[12px]">No Low Stock Records Found</p>
                </div>
            )}
            </> 
        </div>
        )}



        </div>
    )
}





export default Alerts_Box