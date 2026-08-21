import Table_content from "../components/Customer_com/Customer_table"
import Stats from "../components/Customer_com/Customer_stats";
import Customer_head from "../components/Customer_com/customer_head";
import Add_customer from "../components/Customer_com/Add_customer_bt"
import { StatsProvider } from "../context/customers_stats_context";
import { UserProvider } from "../context/login_context";
import Profile from "../components/Profile";


const Customer_page = () => {



    return (
        <div className="bg-[#f8f9fa] w-full min-h-screen relative flex">

            <div className="xl:w-[80%] mm:w-full xl:border-r-2 border-[#ebedf0]">
                <UserProvider>
                    <div className="w-full flex items-center justify-center">
                        <Customer_head />
                    </div>  
                </UserProvider>

                {/* <div className="w-full">
                    <hr className="w-full border-t-0 border-b-2 border-[#ebedf0]" />
                </div> */}
                
                <StatsProvider>
                    <div className="w-full flex justify-evenly items-center mt-10">

                        <div className="xl:w-[65%] mm:w-[85%] flex items-center justify-center">
                            <Stats />
                        </div>

                        <div className="xl:w-[16%] xl:flex mm:hidden items-center justify-center">
                            <Add_customer />  
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <Table_content />
                    </div>  
                </StatsProvider>

                <div className="mm:flex xl:hidden justify-center items-center fixed bottom-3 right-3">
                    <Add_customer />
                </div>

            </div>

            <div className="w-[20%] xl:flex mm:hidden justify-center items-start c">
                <Profile />
            </div>
        </div>
    )
}   


export default Customer_page;