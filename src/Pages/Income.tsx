import Income_stats from "../components/Income_com/Income_stats"
import  Income_head from "../components/Income_com/income_head"
import Income_table from "../components/Income_com/Income_table"
import Income_visualize from "../components/Income_com/income_visualize"
import Add_Income_bt from "../components/Income_com/Add_income_bt"
import { DetailContext } from '../context/Chart';
import { useEffect, useState } from "react"
import { AlertProvider } from "../context/result";
import Income_table_head from "../components/Income_com/Income_table_head"
import { Skeleton } from "antd"


interface MonthlyDetails {
    _id : string,
    amt : number
}

interface YearlyDetails {
    _id : string;
    amt : number
}

interface DailyDetails {
    amt : number;
    _id : string;
}


const Income = () => {

    const [dataByMonth , setDataByMonth] = useState<MonthlyDetails[]>([])
    const [dataByYear , setDataByYear] = useState<YearlyDetails[]>([])
    const [dataDaily, setDataByDay] = useState<DailyDetails[]>([])
    const [selectedValue , setSelectedValue] = useState<string | undefined>()

    const [incomeStats , setIncomeStats] = useState<number>(0)

    const [showSkeleton , setShowSkeleton] = useState(true)
    const [showChart , setShowChart] = useState(false)

    const fetchIncomeData = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_income_length`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                console.log("Something Broke Up");
                setIncomeStats(0);
                return;
            }

            const data = await res.json();
            setIncomeStats(typeof data.Income_stats === "number" ? data.Income_stats : 0);
        } catch {
            setIncomeStats(0);
        }
    };



    const handleData = async () => {
        try {
            const response1 = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_data_by_month`, {
                method: "GET",
                credentials: "include",
            });

            if (!response1.ok) {
                console.log("Something Broke Up in response 1");
                setDataByMonth([]);
            } else {
                const data = await response1.json();
                setDataByMonth(Array.isArray(data.detail) ? data.detail : []);
            }

            const response2 = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_data_by_year`, {
                method: "GET",
                credentials: "include",
            });

            if (!response2.ok) {
                console.log("Something Broke Up in response 2");
                setDataByYear([]);
            } else {
                const data2 = await response2.json();
                setDataByYear(Array.isArray(data2.detail) ? data2.detail : []);
            }

            const response3 = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_data_daily`, {
                method: "GET",
                credentials: "include",
            });

            if (!response3.ok) {
                console.log("Something Broke Up in response 3");
                setDataByDay([]);
            } else {
                const data3 = await response3.json();
                setDataByDay(Array.isArray(data3.detail) ? data3.detail : []);
            }
        } catch {
            setDataByMonth([]);
            setDataByYear([]);
            setDataByDay([]);
        }
    };

    useEffect(() => {
        void handleData();
        void fetchIncomeData();

        const chartReveal = window.setTimeout(() => {
            setShowSkeleton(false);
            setShowChart(true);
        }, 3000);

        return () => window.clearTimeout(chartReveal);
    }, []);




    return (

        <div className="xl:w-full h-screen mm:w-[90%] bg-[#f8f9fa]">


            <div className="w-full">
                <Income_head />
            </div>

            <div className="w-full">
                <hr className="w-full border-t-0 border-b-2 border-[#ebedf0]" />
            </div>

            <div className="w-full flex xl:justify-center mm:justify-evenly mm:items-center mt-10">
                <div className="xl:w-[70%] mm:w-[80%]">
                    <Income_stats />
                </div>

                <AlertProvider>
                    <div className="xl:w-[20%] flex justify-center items-center mm:w-[10%]">
                        <Add_Income_bt />
                    </div>
                </AlertProvider>
            </div>

            <div className="w-full flex justify-center">
                <Income_table />
            </div>

            <div className="w-full xl:flex mm:hidden justify-center"> 
                {showSkeleton && (
                    <div className="w-full flex justify-center items-center mt-20 mb-10">
                        <div className="w-[80%] flex justify-center items-center">
                            <Skeleton paragraph={{rows:6}} active/>
                        </div>
                    </div>
                )}

                {showChart && ( 
                    incomeStats > 0 && (

                        <div className="w-[80%] bg-white flex justify-center items-center flex-col rounded-4xl mt-20 mb-20">

                            <div className="w-full">
                                <Income_table_head  onSelect={setSelectedValue} />
                            </div>
                        
                            <DetailContext.Provider value={{
                                detailByMonth : dataByMonth , setDetailByMonth : setDataByMonth ,  
                                detailDaily : dataDaily , setDetailDaily :  setDataByDay ,
                                detailByYear : dataByYear , setDetailByYear : setDataByYear,
                                DataBy : selectedValue
                            }}>
                                <Income_visualize />
                            </DetailContext.Provider>

                        </div>
                    )
                )}
            </div>

        </div>
    )
}

export default Income