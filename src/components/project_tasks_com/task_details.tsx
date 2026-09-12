import down from "/images/down_arr.png"
import clock from "/images/clock.png"
import check from "/images/checklist.png"
import dots from "/images/dots.png"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Skeleton } from "antd"


interface det {
    // Project_name : string,
    Task_desc : string,
    Task_id : string,
    Task_status : string,
    Progress : number,
    // Start_date : string,
    End_date : string,
    // Duration : number,
    _id : string
}


const Task_Details = () => {

    const month = new Date().toLocaleString('default', { month: 'long' });

    const [showStats , setShowStats] = useState<boolean>(false)
    const [showSkeleton , setShowSkeleton] = useState<boolean>(true)
    
    const [details , setDetails] = useState<det[]>([])   
    const [options , setOptions] = useState<string | null>(null)

    const navigate = useNavigate()

    const handleProjectDetails = async() => {
        const response = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/task_details` , {
            method : "get",
            credentials : "include" 
        })

        if(!response) {
            console.error("api hit")
            return;
        }

        const data = await response.json()
        setDetails(data.result)
        setShowSkeleton(false)
        setShowStats(true)
    }

    const handleClickToOptions = (id : string) => {
        setOptions(prev => prev === id ? null : id)
    }

    useEffect(() => {
        handleProjectDetails()
    } , [])


    return (

        <div className="xl:w-[93%] mm:w-[90%] mm:bg-white xl:bg-transparent rounded-3xl flex flex-col justify-evenly items-center my-6">

            {showSkeleton && (
                <div className="w-full">
                    <Skeleton paragraph={{rows : 3}} active />
                </div>
            )}

            {showStats && (
                details.length > 0 ? (
                    <>
                    <div className="xl:w-full mm:w-[90%] flex justify-between items-center my-5">
                        <div className="xl:flex mm:hidden w-[30%] flex justify-between">
                            <p className="font-Alan text-2xl">Current Tasks</p>
                            <div className="w-[5%] flex justify-center items-center">
                                <div className="w-[2px] h-[90%] bg-[#f4f4f6]"/>
                            </div> 
                            <p className="font-medium text-[20px]">Done 30%</p>
                        </div>

                        <p className="xl:hidden mm:flex font-Poet">Task Details</p>
                        
                        <div className="flex bg-[#f1f1f1] px-4 py-2 rounded-3xl justify-center items-center">
                            <p className="font-Poppins text-[13px]">{month}</p>
                            <img src={down} className="object-contain w-4 h-4 ml-2" />
                        </div>
                    </div>

                    <div className="w-full xl:flex mm:hidden flex-col mt-5">
                        <div className="flex grow">
                            <div className="w-[55%] flex items-center">
                                <p className="flex font-Poppins text-[#ababac] pl-2">Task Description</p>
                            </div>

                            <div className="w-[20%] flex justify-center items-center">
                                <p className="flex font-Poppins text-[#ababac]">Status</p>
                            </div>

                            <div className="w-[15%] flex justify-center items-center">
                                <p className="flex font-Poppins text-[#ababac]">DeadLine</p>
                            </div>

                            <div className="w-[10%] flex justify-center items-center">
                                <p className="flex font-Poppins text-[#ababac]">Action</p>
                            </div>
                        </div>

                        <div className="w-full bg-[#f0f0f2] p-[1px] my-2" />
                    </div>

                    {details.map((dt) => {
                        return (
                            <div className="xl:w-full mm:w-[90%] flex xl:flex-row mm:flex-col justify-between items-center nth-[1]:mt-3 nth-last-[1]:mb-3 my-3" key={dt._id}>

                                {/* Task */}
                                <div className="xl:w-[55%] mm:w-full flex items-center">
                                    <div className="xl:w-[8%] mm:w-[18%] flex bg-[#f0f0f2] rounded-full">
                                        <img src={check} className="p-4" />
                                    </div>

                                    <p className="font-medium ml-3 text-[18px]">
                                        {dt.Task_desc}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="xl:w-[20%] mm:w-[56%] flex xl:justify-center mm:justify-normal items-center">
                                    <div className="rounded-full bg-green-400 p-1" />

                                    <p className="font-Poppins text-[14px] ml-2">
                                        {dt.Task_status}
                                    </p>
                                </div>

                                {/* Duration */}
                                <div className="xl:w-[15%] mm:w-[61%] xl:mt-0 mm:mt-2 flex items-center xl:justify-center mm:justify-normal">
                                    <img src={clock} className="w-8 h-8 p-2" />

                                    <p className="font-Poet ml-2">
                                        {new Date(dt.End_date).toString().slice(4,10)}
                                    </p>
                                </div>

                                {/* Menu */}
                                <div className="xl:w-[10%] mm:w-[60%] relative flex xl:justify-center mm:justify-normal items-center">
                                    <div className="flex justify-center relative" onClick={() => {handleClickToOptions(dt._id)}}>
                                        <img src={dots} className="w-10 h-10 p-2" />
                                    </div>
                                    
                                    {options === dt._id && (
                                    <div className="flex flex-col absolute top-5 items-center px-2">
                                        <p className="font-semibold" onClick={ () => {navigate(`/editPage/${dt.Task_id}`)}}>Edit Tasks</p>
                                        <p className="font-semibold">Preview</p>
                                        {/* <p className="font-semibold">Change Status</p> */}
                                    </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    </>

                ) : (
                    <div className="w-full flex justify-center items-center my-5">
                        <p className="font-Poppins py-5">No Records Found</p>
                    </div>
                )

            )}

        </div>
    )
}


export default Task_Details;
