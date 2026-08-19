import Line_Chart from "../components/Overview_com/line_chart";
import Pie_Chart from "../components/Overview_com/pie_chart";
import Overview_Head from "../components/Overview_com/overview_head"
import Overview_Stats from "../components/Overview_com/overview_stats"
import Latest_Transaction from "../components/Overview_com/latest_transac";
import Alerts_Box from "../components/Overview_com/alerts_box";
import Profile from "../components/Profile";


const Overview = () => {

    return (
        
        <div className="xl:w-full min-h-screen flex bg-[#f8f9fa]">
            
            <div className="xl:w-[80%] mm:w-full mm:border-r-0 xl:border-r-2 border-[#ebedf0]">
                <div className="w-full flex justify-between">
                    <Overview_Head />
                </div>

                {/* <div className="w-full flex justify-center mb-4">
                    <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0  border-[#ebedf0]" />
                </div> */}

                <div className="w-full flex items-center justify-center xl:mt-10 mm:mt-5">
                    <Overview_Stats />
                </div>

                <div className="w-full flex justify-evenly items-center xl:mt-15 ml:mt-5 mm:mt-5">
                
                    <div className="xl:flex w-[50%] flex-col rounded-4xl shadow-lg my-10 mm:hidden mm:rounded-3xl">
                        <div className="flex justify-center mb-2 mt-3">
                            <p className="font-Poppins text-[#9197b3] ml:text-[10px] mm:text-[10px] xl:text-[16px]">Total Income as Per Catagory</p>
                        </div>

                        <div className="flex justify-center">
                            <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2]" />
                        </div>
                                    
                        <div className="flex p-5">
                            <Line_Chart/>
                        </div>
                    </div>

                    <div className="xl:flex flex-col rounded-3xl shadow-lg my-5 ml:hidden mm:hidden">
                        <div className="flex justify-center mb-2 mt-3 px-5">
                            <p className="font-Poppins text-[#9197b3] text-[14px]">Total Customers as per Country</p>
                        </div>

                        <div className="flex justify-center">
                            <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2] ml:w-[99%]" />
                        </div>
                        
                        <div className="flex">
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

                {/* Laptop res */}
                <div className="w-full xl:flex xl:justify-evenly xl:items-center xl:mt-15 ml:flex ml:justify-center ml:items-center mm:flex mm:justify-center ml:mt-0 mm:mt-0">
                    <div className="xl:w-[40%] my-5 rounded-3xl shadow-lg mm:w-[80%]">
                        <Latest_Transaction />
                    </div>

                    <div className="xl:w-[30%] xl:flex my-10 rounded-3xl shadow-lg mm:w-[50%] mm:hidden">
                        <Alerts_Box />
                    </div>
                </div>

                {/* Mobile res */}
                <div className="w-full xl:hidden justify-center items-center mm:flex my-8">
                    <Alerts_Box />
                </div>

                <div className="w-full xl:hidden mm:flex justify-center items-center mt-10 mb-5">
                    <div className="w-[75%] flex justify-center">
                        <div className="mm:w-[2.5%] ml:w-[2.1%] flex justify-center items-center animate-pulse">
                            <div className="w-full h-[6px] bg-red-600 rounded-full" />
                        </div>

                        <div className="flex items-center pl-2">
                            <p className="text-[10px] font-Poet">Open on a desktop for more insights.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[20%] xl:flex mm:hidden justify-center items-start">
                <Profile />
            </div>

        </div>

    )
}

export default Overview;