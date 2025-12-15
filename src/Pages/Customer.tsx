import Table_content from "../components/Customer_com/Customer_table"
import Stats from "../components/Customer_com/Customer_stats";
import Customer_head from "../components/Customer_com/customer_head";
import Add_customer from "../components/Customer_com/Add_customer_bt"
import { StatsProvider } from "../context/customers_stats_context";
import { UserProvider } from "../context/login_context";


const Customer_page = () => {



    return (
        <div className="bg-[#f8f9fa] w-full relative">

            <UserProvider>
                <div className="w-full flex items-center justify-center">
                    <Customer_head />
                </div>  
            </UserProvider>

            <StatsProvider>
                <div className="w-full flex justify-evenly items-center mt-10">

                    <div className="w-[65%] flex items-center justify-center">
                        <Stats />
                    </div>

                    <div className="w-[20%] flex items-center justify-center">
                        <div className="w-full rounded-4xl m-4" >
                            <Add_customer />
                        </div>      
                    </div>
                </div>

                <div className="w-full flex items-center justify-center">
                    <Table_content />
                </div>  
            </StatsProvider>

        </div>
    )
}   


export default Customer_page;