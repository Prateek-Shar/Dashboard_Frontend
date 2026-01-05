import Line_Chart from "../components/Overview_com/line_chart";
import Pie_Chart from "../components/Overview_com/pie_chart";
import Overview_Head from "../components/Overview_com/overview_head"
import Overview_Stats from "../components/Overview_com/overview_stats"
import Latest_Transaction from "../components/Overview_com/latest_transac";
import Alerts_Box from "../components/Overview_com/alerts_box";


const Overview = () => {

    return (
        
        <div className="xl:w-full bg-[#f8f9fa] ml:w-[90%] mm:w-[90%]">
            
            <div className="w-full flex justify-between">
                <Overview_Head />
            </div>

            <div className="w-full flex justify-center mb-4">
                <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0  border-[#ebedf0]" />
            </div>

            <div className="w-full flex items-center justify-center mt-10">
                <div className="ml:w-[90%] mm:w-[90%] xl:w-[80%]">
                    <Overview_Stats />
                </div>
            </div>

            <div className="w-full flex justify-evenly items-center mt-15 ml:mt-5 mm:mt-5">
               
                <div className="xl:w-[40%] flex flex-col bg-white rounded-4xl shadow-lg mt-10 mb-10 ml:w-[80%] mm:w-[75%] mm:rounded-3xl">
                    <div className="w-full flex justify-center mb-2 mt-3">
                        <p className="font-Poppins text-[#9197b3] ml:text-[10px] mm:text-[10px] xl:text-[16px]">Total Income as Per Catagory</p>
                    </div>

                    <div className="w-full flex justify-center">
                        <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2]" />
                    </div>
                                
                    <div className="w-full flex">
                        <Line_Chart/>
                    </div>
                </div>

                <div className="xl:flex w-[20%] flex flex-col bg-white rounded-4xl shadow-lg mt-10 mb-10 ml:hidden mm:hidden">
                    <div className="w-full flex justify-center mb-2 mt-3">
                        <p className="font-Poppins text-[#9197b3] text-[14px]">Total Customers as per Country</p>
                    </div>

                    <div className="w-full flex justify-center">
                        <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2] ml:w-[99%]" />
                    </div>
                    
                    <div className="w-full flex">
                        <Pie_Chart />
                    </div>
                </div>

            </div>
            
            <div className="xl:hidden ml:flex w-full justify-center items-center mm:flex">
                <div className="w-[80%] flex flex-col bg-white rounded-3xl shadow-lg mt-10 mb-10">
                    <div className="w-full flex justify-center mb-2 mt-3">
                        <p className="font-Poppins text-[#9197b3] ml:text-[10px] mm:text-[10px] xl:text-[10px]">Total Customers as per Country</p>
                    </div>

                    <div className="w-full flex justify-center">
                        <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2] ml:w-[99%]" />
                    </div>
                    
                    <div className="w-full flex">
                        <Pie_Chart />
                    </div>
                </div>
            </div>


            <div className="w-full xl:flex xl:justify-evenly xl:items-center xl:mt-10 ml:flex ml:justify-center ml:items-center mm:flex mm:justify-center ml:mt-0 mm:mt-0">
                <div className="xl:w-[40%] bg-white mt-10 mb-10 rounded-3xl shadow-lg ml:w-[80%] mm:w-[80%]">
                    <Latest_Transaction />
                </div>

                <div className="xl:w-[30%] xl:flex bg-white mt-10 mb-10 rounded-3xl shadow-lg ml:w-[50%] ml:hidden mm:hidden">
                    <Alerts_Box />
                </div>
            </div>

            <div className="ml:flex xl:hidden justify-center items-center mm:flex">
                <div className="bg-white mt-10 mb-10 rounded-2xl shadow-lg w-[80%]">
                    <Alerts_Box />
                </div>
            </div>

        </div>

    )
}

export default Overview;