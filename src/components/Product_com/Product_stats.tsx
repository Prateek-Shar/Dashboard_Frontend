import total_products from "/images/total_products.png"
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
            <div className="xl:w-[90%] mm:w-full rounded-3xl flex flex-col justify-evenly items-center mm:py-0 mm:px-0 xl:my-5 mm:my-0">

                <div className="w-full bg-[#f3f3f3] h-[1px]" />

                <div className="flex justify-evenly items-center my-3">
                    
                    <div className="xl:w-[25%] flex items-center mm:w-[30%]">

                        <div className="flex items-center">
                            <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={total_products} className="xl:p-3 mm:p-1"/>
                            </div>

                            <div className="flex flex-col grow xl:ml-3 mm:ml-2">
                                <p className="font-Poppins  mm:text-[6px] xl:text-[16px]">Total Products</p>
                                <p className="font-Poppins  text-[#495057] mm:text-[10px] xl:text-[16px] xl:mt-3 mm:mt-1">{productLength}</p>
                            </div>
                        </div>

                        <div className="xl:h-20 mm:h-10 flex justify-center items-center">
                            <div className="xl:w-[2px] mm:w-[1px] h-[80%] bg-[#f2f2f2]" />
                        </div>

                    </div>

                    <div className="xl:w-[25%] flex items-center mm:w-[30%]">

                        <div className="flex items-center">
                            <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                                <img src={in_stock} className="xl:p-4 mm:p-1" />
                            </div>

                            <div className="flex flex-col grow xl:ml-3 mm:ml-2">
                                <p className="font-Poppins mm:text-[7px] xl:text-[16px]">In Stock</p>
                                <p className="font-Poppins text-[#495057] mm:text-[10px] xl:text-[16px] xl:mt-3 mm:mt-1">{inStockCount}</p>
                            </div>
                        </div>

                        <div className="xl:h-20 mm:h-10 flex justify-center items-center">
                            <div className="xl:w-[2px] mm:w-[1px] h-[80%] bg-[#f2f2f2]" />
                        </div>

                    </div>

                    <div className="xl:w-[25%] flex items-center mm:w-[30%]">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={out_of_stock} className="xl:p-4 mm:p-1"/>
                        </div>

                        <div className="flex flex-col grow xl:ml-3 mm:ml-2">
                            <p className="font-Poppins  mm:text-[5px] xl:text-[16px]">Out Of Stock</p>
                            <p className="font-Poppins  text-[#495057]  mm:text-[10px] xl:text-[16px] xl:mt-3 mm:mt-2">{outOfStockCount}</p>
                        </div>

                    </div>
                </div>

                <div className="w-full bg-[#f3f3f3] h-[1px]" />

            </div>
        )}

        </>
    )
}

export default Product_stats;