import Line_Chart from "../components/Overview_com/line_chart";
import Pie_Chart from "../components/Overview_com/pie_chart";
import Overview_Head from "../components/Overview_com/overview_head"
import Overview_Stats from "../components/Overview_com/overview_stats"
import Latest_Transaction from "../components/Overview_com/latest_transac";
import Alerts_Box from "../components/Overview_com/alerts_box";


const Overview = () => {

    return (
        
        <div className="w-full bg-[#edede9]">
            
            <div className="w-full flex justify-between ">
                <Overview_Head />
            </div>

            <div className="w-full flex justify-center mb-4">
                <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#ced4da]" />
            </div>

            <div className="w-full flex items-center justify-center mt-10">
                <div className="w-[90%]">
                    <Overview_Stats />
                </div>
            </div>

            <div className="w-full flex justify-evenly items-center mt-15">
               
                <div className="w-[40%] flex flex-col bg-white rounded-4xl shadow-lg mt-10 mb-10">
                    <div className="w-full flex justify-center mb-2 mt-3">
                        <p className="font-Poppins text-[#9197b3]">Total Income as Per Catagory</p>
                    </div>

                    <div className="w-full flex justify-center">
                        <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2]" />
                    </div>
                                
                    <div className="w-full flex">
                        <Line_Chart/>
                    </div>
                </div>

                <div className="w-[20%] flex flex-col bg-white rounded-4xl shadow-lg mt-10 mb-10">
                    <div className="w-full flex justify-center mb-2 mt-3">
                        <p className="font-Poppins text-[#9197b3]">Total Customers as per Country</p>
                    </div>

                    <div className="w-full flex justify-center">
                        <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0 border-[#f2f2f2]" />
                    </div>
                    
                    <div className="w-full flex">
                        <Pie_Chart />
                    </div>
                </div>

            </div>

            <div className="w-full flex justify-evenly items-center mt-10">
                <div className="w-[40%] bg-white mt-10 mb-10 rounded-4xl shadow-lg">
                    <Latest_Transaction />
                </div>

                <div className="w-[40%] bg-white mt-10 mb-10 rounded-3xl shadow-lg">
                    <Alerts_Box />
                </div>
            </div>


        </div>

    )
}

export default Overview;