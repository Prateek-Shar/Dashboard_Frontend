import Product_stats from "../components/Product_com/Product_stats"
import Add_product from "../components/Product_com/Add_product_bt"
import Product_table from "../components/Product_com/Product_table"
import Product_head from "../components/Product_com/product_head"
import { StatsProvider } from "../context/product_stats_context";
import { UserProvider } from "../context/login_context";


const Products = () => {


    return (
        
        <div className="w-full bg-[#f8f9fa] flex flex-col">  

            <UserProvider>
                <div className="w-full">
                    <Product_head />
                </div>
            </UserProvider>

            <StatsProvider>
                <div className="w-full flex justify-center items-center mt-10">
                    <div className="w-[65%] flex items-center justify-center">
                        <Product_stats />
                    </div>

                    <div className="w-[20%] flex items-center justify-center">
                        <div className="w-[80%]" >
                            <Add_product />
                        </div>      
                    </div>
                </div>


                <div className="w-full flex flex-col justify-center items-center mt-15">
                    <div className="w-full">
                        <Product_table  />
                    </div>
                </div>
            </StatsProvider>

        </div>
    )
}

export default Products