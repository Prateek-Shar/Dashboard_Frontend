import Table_content from "../components/Customer_com/Customer_table"
import Stats from "../components/Customer_com/Customer_stats";
import Customer_head from "../components/Customer_com/customer_head";
import Add_customer from "../components/Customer_com/Add_customer_bt"
import check from "../images/check.png"
import cross from "../images/cross.png"
import { useAlert } from "../context/result";
import { StatsProvider } from "../context/customers_stats_context";


const Customer_page = () => {

    const { successVisible, failureVisible } = useAlert();

    return (
        <div className="bg-[#edede9] w-full relative">

            <div className="w-full flex items-center justify-center">
                <Customer_head />
            </div>  

           <div className="w-full flex justify-evenly items-center mt-10">
                <StatsProvider>
                    <div className="w-[65%] flex items-center justify-center">
                        <Stats />
                    </div>
                </StatsProvider>

                <div className="w-[20%] flex items-center justify-center">
                    <div className="w-full rounded-4xl m-4" >
                        <Add_customer />
                    </div>      
                </div>
            </div>

            <StatsProvider>
                <div className="w-full flex items-center justify-center">
                    <Table_content />
                </div>  
            </StatsProvider>


            {successVisible && (
                <div className="w-[25%] hidden bg-amber-600 shadow-2xl absolute bottom-0 right-0">
                    <div className="">
                        <img src={check} />
                    </div>

                    <div className="">
                        <p>Data Entered Successfully</p>
                    </div>
                </div>
            )}


            {failureVisible && (
                <div className="w-[25%] hidden bg-blue-600 shadow-2xl absolute bottom-0 right-0">
                    <div className="">
                        <img src={cross} />
                    </div>

                    <div className="">
                        <p>Unable to send data</p>
                    </div>
                </div>
            )}

        </div>
    )
}   


export default Customer_page;