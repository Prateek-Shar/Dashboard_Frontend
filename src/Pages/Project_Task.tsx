import Project_stats from "../components/project_tasks_com/stats";
import LineChart from "../components/project_tasks_com/production_chart";
import Task_Details from "../components/project_tasks_com/task_details";
import down from "/images/down_arr.png"
import calender from "/images/calender.png"
import Profile from "../components/Profile";



const Project_Task = () => {

    const date = new Date().getDate()
    const month =  new Date().toLocaleString('default', { month: 'long' });
    const year = new Date().getFullYear()


    // const handleClick = () => {
    //     const res = fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/dummydata` , {
    //         method : "post"
    //     })

    //     if(!res) {
    //         console.error("Something went wrong")
    //         return;
    //     }

    //     console.info("Success")
    // }


    // bg-[#f8f9fa]
    return (

        <div className="w-full min-h-screen flex bg-[#f8f9fa]">

            <div className="w-[80%] border-r-2 border-[#f0f0f2]  min-h-screen">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <div className="flex mt-5 ml-10">
                            <p className="font-Alan text-3xl">Hello , Prateek</p>
                        </div>

                        <div className="flex">
                            <p className="font-Poppins text-[#9197b3] ml-10 mt-2">Track team progress here . You almost reach a goal</p>
                        </div>
                    </div>

                    <div className="flex justify-end items-center mr-7">
                        <p className="font-Alan">{date} {month} , {year}</p>

                        <div className="flex w-[6%] bg-[#f0f0f2] rounded-4xl ml-2">
                            <img src={calender} className="p-3" />
                        </div>
                    </div>
                </div>
                

                <div className="flex">
                    <Project_stats />
                </div>

                <div className="w-full flex justify-center items-center my-10">
                    <div className="w-[93%] flex flex-col">
                        <div className="flex justify-between items-center">
                            <p className="font-Alan text-2xl">Performence</p>

                            <div className="w-[13%] flex bg-[#f1f1f1] p-2 rounded-3xl justify-center items-center   ">
                                <p className="font-Poppins text-[13px]">01 - 07 {month}</p>
                                <img src={down} className="object-contain w-[18%] p-1 ml-2" />
                            </div>
                        </div>

                        <div className="flex mt-5">
                            <LineChart />
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center">
                    <Task_Details  />
                </div>

            </div>

            <div className="w-[20%] flex items-center flex-col">
                {/* <button className="p-2 bg-amber-400 rounded-2xl" onClick={handleClick}>Add Data</button> */}

                <Profile />

                <div className="w-full flex justify-around items-center my-5">
                    <hr className="border-0 bg-[#f6f6f6] w-[30%] h-[3px] rounded-full" />

                    <p className="font-Poet">Activity</p>

                    <hr className="border-0 bg-[#f6f6f6] w-[30%] h-[3px] rouded-full" />
                </div>
            </div>

        </div>
    )
}


export default Project_Task;