import efficiency from "/images/efficiency.png"
import track from "/images/track.png"
import finish from "/images/finish.png"
import { useEffect, useState } from "react"
import { Skeleton } from "antd"


const Project_Task_Stats = () => {

    const [showStats , setShowStats] = useState(false)
    const [showSkeleton , setShowSkeleton] = useState(true)

    const [totalTasks , setTotalTasks] = useState<number>(0)
    const [tracked , setTracked] = useState<number>(0)

    const api_url = import.meta.env.VITE_PRODUCTION_ADDRESS

    const getStats = async() => {
        const res = await fetch(`${api_url}/getTaskStats` , {
            method : "get",
            headers : {
                "Content-type" : "application/json"
            },
            credentials : "include"
        })

        if(!res.ok) {
            console.error("Something unexpected hit");
            return;
        }

        const data = await res.json()
        setShowSkeleton(false)
        setShowStats(true)
        setTotalTasks(data.Completed_count || 0)
        setTracked(data.Tracked_count || 0)
    }


    useEffect(() => {
        getStats()
    } , [])


    return (
        <>
        {showSkeleton && (
            <div className="w-full flex justify-center items-center mt-10 mb-10">
                <div className="w-[85%] flex justify-center items-center">
                    <Skeleton paragraph={{rows:1}} active/>
                </div>
            </div>
        )}

        {showStats && (
            <>
            {/* Large Screen */}
            <div className="w-full rounded-3xl xl:flex flex-col mm:hidden justify-evenly items-center my-4 p-4 ml-7">

                <div className="w-full bg-[#f3f3f3] h-[1px]" />

                <div className="flex my-3 justify-between items-center">

                    <div className="w-[30%] flex">
                        <div className="w-full flex justify-center items-center">
                            <div className="w-[15%] bg-[#f0f0f2] rounded-4xl flex justify-center items-center">
                                <img src={finish} className="p-2"/>       
                            </div>

                            <div className="w-[70%] flex flex-col ml-3">

                                <div className="w-full">
                                    <p className="font-Poppins xl:p-2 xl:text-[16px]">Finished</p>
                                </div>

                                <div className="w-full">
                                    <p className="font-Poppins text-[13px] xl:p-2  text-[#495057]">{totalTasks}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <div className="w-[2px] h-[70%] bg-[#f0f0f2]" />
                        </div>
                    </div>


                    <div className="w-[30%] flex">

                        <div className="w-full flex items-center">
                            <div className="w-[15%] bg-[#f0f0f2] rounded-4xl flex justify-center items-center">
                                <img src={track} className="p-2" />
                            </div>

                            <div className="w-[70%] flex flex-col ml-3">

                                <div className="w-full">
                                    <p className="font-Poppins p-2 text-[16px]">Tracked</p>
                                </div>

                                <div className="w-full">
                                    <p className="font-Poppins text-[13px] xl:p-2  text-[#495057]">{tracked}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            <div className="w-[2px] h-[70%] bg-[#f0f0f2]" />
                        </div>  
                    </div>


                    <div className="w-[30%] flex">
                        <div className="w-full flex items-center">
                            <div className="w-[15%] bg-[#f0f0f2] rounded-4xl flex justify-center items-center">
                                <img src={efficiency} className="p-2"/>
                            </div>

                            <div className="w-[70%] flex flex-col ml-3">

                                <div className="w-full ">
                                    <p className="font-Poppins p-2 text-[16px]">Efficiency</p>
                                </div>

                                <div className="w-full ">
                                    <p className="font-Poppins text-[13px] p-2  text-[#495057] ">NA</p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="w-[2px] bg-[#f0f0f2]" /> */}
                    </div>
                </div>

                <div className="w-full bg-[#f3f3f3] h-[1px]" /> 


            </div>


            {/* Small Screen */}
            <div className="w-full bg-white rounded-3xl xl:hidden mm:flex-col justify-evenly items-center mt-4 mb-4 xl:p-4 mm:p-2">
                <div className="w-full xl:hidden mm:flex justify-evenly items-center">
                    <div className="xl:w-[20%] mm:w-[50%] flex items-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={finish} className="p-3"/>       
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="w-full">
                                <p className="font-Poppins xl:p-2 mm:py-2 mm:text-[10px] xl:text-[16px] mm:pl-2">Finished</p>
                            </div>

                            <div className="w-full">
                                <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{totalTasks}</p>
                            </div>
                        </div>

                    </div>

                    <div className="xl:w-[20%] flex mm:w-[50%]">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={track} className="p-3" />
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="w-full">
                                <p className="font-Poppins p-2 xl:text-[16px] mm:text-[10px]">Tracked</p>
                            </div>

                            <div className="w-full">
                                <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">{tracked}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="w-full xl:hidden mm:flex mt-5">

                    <div className="xl:w-[20%] flex mm:w-[50%] items-center justify-center">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={efficiency} className="p-3"/>
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="flex ">
                                <p className="font-Poppins p-2 xl:text-[16px] mm:text-[10px]">Efficiency</p>
                            </div>

                            <div className="w-full ">
                                <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">NA</p>
                            </div>
                        </div>

                    </div>

                    {/* <div className="w-[20%] flex mm:w-[50%]">

                        <div className="w-[30%] bg-[#e9ecef] rounded-4xl flex justify-center items-center">
                            <img src={catagories} className="object-contain w-[50%]"/>
                        </div>

                        <div className="w-[70%] flex flex-col">

                            <div className="w-full ">
                                <p className="font-Poppins p-2 xl:text-[16px] mm:text-[10px]">Top Catagory</p>
                            </div>

                            <div className="w-full ">
                                <p className="font-Poppins xl:text-[13px] xl:p-2 mm:p-0 mm:pl-2 text-[#495057] mm:text-[10px]">NA</p>
                            </div>
                        </div>

                    </div> */}
                </div>

            </div>
        </>
        )}

        </>

    )
}

export default Project_Task_Stats