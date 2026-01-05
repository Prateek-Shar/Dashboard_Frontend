import Table_content from "../components/Customer_com/Customer_table"
import Stats from "../components/Customer_com/Customer_stats";
import Customer_head from "../components/Customer_com/customer_head";
import Add_customer from "../components/Customer_com/Add_customer_bt"
import { StatsProvider } from "../context/customers_stats_context";
import { UserProvider } from "../context/login_context";


const Customer_page = () => {



    return (
        <div className="bg-[#f8f9fa] xl:w-full mm:w-[90%] relative xl:overflow-x-scroll mm:overflow-x-hidden">

            <UserProvider>
                <div className="w-full flex items-center justify-center">
                    <Customer_head />
                </div>  
            </UserProvider>

            <div className="w-full">
                <hr className="w-full border-t-0 border-b-2 border-[#ebedf0]" />
            </div>
            
            <StatsProvider>
                <div className="w-full flex justify-evenly items-center mt-10">

                    <div className="xl:w-[65%] mm:w-[70%] flex items-center justify-center">
                        <Stats />
                    </div>

                    <div className="xl:w-[20%] mm:w-[20%] flex items-center justify-center">
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