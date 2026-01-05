import total_customers from "/images/total_products.png"
import in_stock from "/images/in_stock.png"
import out_of_stock from "/images/out_of_stock.png";
import { useAPI } from "../../context/product_stats_context";
import { useState } from "react";
import { Skeleton } from "antd";

const Product_stats = () => {

    const { inStockCount , outOfStockCount , productLength } = useAPI()

    const [showStats , setShowStats] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)
    
    setTimeout(() => {
        setShowSkeleton(false)
        setShowStats(true)
    } , 4000)


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
            <div className="xl:w-[90%] mm:w-full bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 xl:p-4 mm:py-4 mm:px-2">
                <div className="xl:w-[25%] flex mm:w-[30%]">

                    <div className="w-[40%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={total_customers} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[60%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins xl:p-2 mm:p-0 mm:pl-2 mm:text-[4px] xl:text-[16px]">Total Products</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins xl:p-2 text-[#495057] mm:p-0 mm:pl-2 mm:pt-1 mm:text-[10px] xl:text-[16px]">{productLength}</p>
                        </div>
                    </div>

                </div>

                <div className="xl:w-[25%] flex mm:w-[30%]">

                    <div className="w-[40%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={in_stock} className="object-contain w-[50%]" />
                    </div>

                    <div className="w-[60%] flex flex-col">

                        <div className="w-full">
                            <p className="font-Poppins xl:p-2 mm:text-[7px] xl:text-[16px] mm:p-0 mm:pl-2">In Stock</p>
                        </div>

                        <div className="w-full">
                            <p className="font-Poppins xl:p-2 text-[#495057] mm:p-0 mm:pl-2 mm:pt-1 mm:text-[10px] xl:text-[16px]">{inStockCount}</p>
                        </div>
                    </div>

                </div>

                <div className="xl:w-[25%] flex mm:w-[30%]">

                    <div className="w-[40%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                        <img src={out_of_stock} className="object-contain w-[50%]"/>
                    </div>

                    <div className="w-[60%] flex flex-col">

                        <div className="w-full ">
                            <p className="font-Poppins xl:p-2 mm:text-[5px] xl:text-[16px] mm:p-0 mm:pl-2">Out Of Stock</p>
                        </div>

                        <div className="w-full ">
                            <p className="font-Poppins p-2 text-[#495057] mm:p-0 mm:pl-2 mm:pt-1 mm:text-[10px] xl:text-[16px]">{outOfStockCount}</p>
                        </div>
                    </div>

                </div>
            </div>
        )}

        </>
    )
}

export default Product_stats;