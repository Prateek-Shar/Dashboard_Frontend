import total_customers from "../../images/total_products.png"
import in_stock from "../../images/in_stock.png"
import out_of_stock from "../../images/out_of_stock.png";
import { useAPI } from "../../context/functions";

const Product_stats = () => {

    const { inStockCount , outOfStockCount , productLength } = useAPI()

   
    return (
        <div className="w-[90%] bg-white rounded-3xl flex justify-evenly items-center mt-4 mb-4 p-4">
            <div className="w-[25%] flex">

                <div className="w-[40%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                    <img src={total_customers} className="object-contain w-[50%]"/>
                </div>

                <div className="w-[60%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">Total Products</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins p-2 text-[#495057]">{productLength}</p>
                    </div>
                </div>

            </div>

            <div className="w-[25%] flex">

                <div className="w-[40%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                    <img src={in_stock} className="object-contain w-[50%]" />
                </div>

                <div className="w-[60%] flex flex-col">

                    <div className="w-full">
                        <p className="font-Poppins p-2">In Stock</p>
                    </div>

                    <div className="w-full">
                        <p className="font-Poppins p-2 text-[#495057]">{inStockCount}</p>
                    </div>
                </div>

            </div>

            <div className="w-[25%]  flex ">

                <div className="w-[40%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                    <img src={out_of_stock} className="object-contain w-[50%]"/>
                </div>

                <div className="w-[60%] flex flex-col">

                    <div className="w-full ">
                        <p className="font-Poppins p-2">Out Of Stock</p>
                    </div>

                    <div className="w-full ">
                        <p className="font-Poppins p-2 text-[#495057]">{outOfStockCount}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Product_stats;