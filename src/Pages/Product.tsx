import Product_stats from "../components/Product_com/Product_stats"
import Add_product from "../components/Product_com/Add_product_bt"
import Product_table from "../components/Product_com/Product_table"
import Product_head from "../components/Product_com/product_head"
import { StatsProvider } from "../context/product_stats_context";
import { UserProvider } from "../context/login_context";
import Profile from "../components/Profile";


const Products = () => {


    return (
        
        <div className="min-h-screen w-full bg-[#f8f9fa] flex relative">  
            
            <div className="xl:w-[80] mm:w-full flex flex-col xl:border-r-2 border-[#ebedf0]">
                <UserProvider>
                    <div className="w-full">
                        <Product_head />
                    </div>
                </UserProvider>


                <StatsProvider>
                    <div className="w-full flex justify-center items-center mt-10">
                        <div className="xl:w-[65%] flex items-center justify-center mm:w-[90%]">
                            <Product_stats />
                        </div>

                        <div className="xl:w-[20%] mm:hidden xl:flex items-center justify-center">
                            <Add_product />
                        </div>
                    </div>

                    <div className="mm:flex xl:hidden justify-center items-center fixed bottom-3 right-3">
                        <Add_product />
                    </div>

                    <div className="w-full flex flex-col justify-center items-center my-10">
                        <Product_table  />
                    </div>
                </StatsProvider>
            </div>

            <div className="w-[20%] xl:flex mm:hidden items-start justify-center">
                <Profile />
            </div>

        </div>
    )
}

export default Products