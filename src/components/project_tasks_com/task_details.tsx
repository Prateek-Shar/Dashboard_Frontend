import down from "/images/down_arr.png"
import calender from "/images/calender.png"
import clock from "/images/clock.png"
import dots from "/images/dots.png"
import { useEffect, useState } from "react"


interface det {
    // Project_name : string,
    Task_desc : string,
    // Task_id : string,
    Task_status : string,
    Progress : number,
    // Start_date : string,
    // End_date : string,
    Duration : number,
    _id : string
}

const Task_Details = () => {

    const [details , setDetails] = useState<det[]>([])   

    const handleProjectDetails = async() => {
        const response = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/task_details` , {
            method : "get"
        })

        if(!response) {
            console.error("api hit")
            return;
        }

        const data = await response.json()
        setDetails(data.result)
        console.info("Data fetching successful")
    }

    useEffect(() => {
        handleProjectDetails()
    } , [])


    return (

        <div className="w-[93%] flex flex-col justify-evenly items-center my-6">

            <div className="w-full flex justify-between items-center my-5">
                <div className="w-[30%] flex justify-between">
                    <p className="font-Alan text-2xl">Current Tasks</p>
                    <div className="w-[5%] flex justify-center items-center">
                        <div className="w-[2px] h-[90%] bg-[#f4f4f6]"/>
                    </div> 
                    <p className="font-medium text-[20px]">Done 30%</p>
                </div>
                
                <div className="w-[8%] flex bg-[#f1f1f1] p-2 rounded-3xl justify-center items-center   ">
                    <p className="font-Poppins text-[13px]">Week</p>
                    <img src={down} className="object-contain w-[30%] p-1 ml-2" />
                </div>
            </div>

            {details.map((dt) => {
                return (
                    <div className="w-full flex justify-between items-center nth-[1]:mt-3 nth-last-[1]:mb-3 my-3" key={dt._id}>

                        {/* Task */}
                        <div className="w-[55%] flex items-center">
                            <div className="w-[8%] flex bg-[#f6f7f4] rounded-full">
                                <img src={calender} className="p-3" />
                            </div>

                            <p className="font-medium ml-3 text-[18px]">
                                {dt.Task_desc}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="w-[20%] flex justify-center items-center">
                            <div className="rounded-full bg-green-400 p-1" />

                            <p className="font-Poppins text-[14px] ml-2">
                                {dt.Task_status}
                            </p>
                        </div>

                        {/* Duration */}
                        <div className="w-[15%] flex items-center justify-center">
                            <img src={clock} className="w-8 h-8 p-2" />

                            <p className="font-Poet ml-2">
                                {dt.Duration}
                            </p>
                        </div>

                        {/* Menu */}
                        <div className="w-[10%] flex justify-center">
                            <img src={dots} className="w-10 h-10 p-2" />
                        </div>

                    </div>
                )
            })}

        </div>
    )
}


export default Task_Details;
