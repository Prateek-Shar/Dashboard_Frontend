import Product_stats from "../components/Product_com/Product_stats"
import Add_product from "../components/Product_com/Add_product_bt"
import Product_table from "../components/Product_com/Product_table"
import Product_head from "../components/Product_com/product_head"
import { StatsProvider } from "../context/customers_stats_context";


const Products = () => {


    return (
        
        <div className="w-full bg-[#edede9]">  
            <Product_head />
            
            <div className="w-full flex justify-center items-center mt-10">

                <StatsProvider>
                    <div className="w-[65%] flex items-center justify-center">
                        <Product_stats />
                    </div>
                </StatsProvider>

                <div className="w-[20%] flex items-center justify-center">
                    <div className="w-[80%]" >
                        <Add_product />
                    </div>      
                </div>
            </div>


            <div className="w-full flex flex-col justify-center items-center mt-15">
                <StatsProvider>
                    <div className="w-full">
                        <Product_table  />
                    </div>
                </StatsProvider>
            </div>

        </div>
    )
}

export default Products