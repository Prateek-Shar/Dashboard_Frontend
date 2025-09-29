import Income_stats from "../components/Income_com/Income_stats"
import  Income_head from "../components/Income_com/income_head"
import Income_table from "../components/Income_com/Income_table"
import Income_visualize from "../components/Income_com/income_visualize"
import Add_Income_bt from "../components/Income_com/Add_income_bt"
import { DetailContext } from '../context/Chart';
import { useEffect, useRef, useState } from "react"
import { UserProvider } from "../context/login_context"
import { AlertProvider } from "../context/result";
import Income_table_head from "../components/Income_com/Income_table_head"


interface MonthlyDetails {
    Catagory : string,
    Amount : number
}

interface YearlyDetails {
    Catagory : string;
    Amount : number
}

interface DailyDetails {
    Amount : number;
    Catagory : string;
}


const Income = () => {

    const [dataByMonth , setDataByMonth] = useState<MonthlyDetails[]>([])
    const [dataByYear , setDataByYear] = useState<YearlyDetails[]>([])
    const [dataDaily, setDataByDay] = useState<DailyDetails[]>([])

    const [incomeStats , setIncomeStats] = useState<number>()

    const VisualizeDiv = useRef<HTMLDivElement>(null)

    const fetchIncomeData = async() => {
        const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_income_length` , {
            method : "GET",
            credentials : "include"
        })

        if (!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()
        setIncomeStats(data.Income_stats)
    }



    const handleData = async() => {
        const response1 = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_data_by_month` , {
            method : "GET",
            credentials : "include"
        })

        if (!response1.ok) {    
            console.log("Something Broke Up")
        }

        const data = await response1.json()
        setDataByMonth(data.detail)



        const response2 = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_data_by_year` , {
            method : "GET",
            credentials : "include"
        })

        if (!response2.ok) {
            console.log("Something Broke Up")
        }

        const data2 = await response2.json()
        setDataByYear(data2.detail)



        const response3 = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_data_daily` , {
            method : "GET",
            credentials : "include"
        })

        if (!response3.ok) {
            console.log("Something Broke Up in response3")
        }

        const data3 = await response3.json()
        setDataByDay(data3.detail)

    }

    useEffect(() => {
        handleData()
        fetchIncomeData()
        console.log("income length : " , incomeStats)
    }, [])



    if(incomeStats == 0) {
        if(VisualizeDiv.current) {
            VisualizeDiv.current.style.display = "none"
        }
    }

    const [selectedValue , setSelectedValue] = useState<string | undefined>()

    return (

        <div className="w-full bg-[#edede9]">

            <UserProvider>
                <div className="w-full">
                    <Income_head />
                </div>
            </UserProvider>

            <div className="w-full flex justify-center mt-10">
                <div className="w-[70%]">
                    <Income_stats />
                </div>

                <AlertProvider>
                    <div className="w-[20%] flex justify-center items-center">
                        <Add_Income_bt />
                    </div>
                </AlertProvider>
            </div>

            <div className="w-full flex justify-center">
                <Income_table />
            </div>

            <div className="w-full flex justify-center" ref={VisualizeDiv}> 
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
            </div>

        </div>
    )
}

export default Income