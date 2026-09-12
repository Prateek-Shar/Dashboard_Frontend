import Project_Task_Stats from "../components/project_tasks_com/project&task_stats";
import LineChart from "../components/project_tasks_com/production_chart";
import Task_Details from "../components/project_tasks_com/task_details";
import Profile from "../components/Profile";
import Add_Task_Bt from "../components/project_tasks_com/addTaskBt";
import Task_Head from "../components/project_tasks_com/TaskHead";
import { UserProvider } from "../context/login_context";



const Project_Task = () => {

    const date = new Date().getDate()
    const month =  new Date().toLocaleString('default', { month: 'short' });

    const endForChart = new Date()

    const startForChart = new Date(endForChart)
    startForChart.setDate(endForChart.getDate() - 7)

    console.log("Start : " , startForChart.toString())
    console.log("End : " , endForChart.toString())

    const end = date - 7;

    return (

        <div className="w-full min-h-screen flex bg-[#f8f9fa]">

            <div className="xl:w-[80%] mm:w-full border-r-2 border-[#f0f0f2] relative">
                
                <UserProvider>
                    <Task_Head />
                </UserProvider>

                <div className="flex justify-around items-center">
                    <div className="xl:w-[70%] mm:w-[80%] justify-center items-center xl:mt-0 mm:mt-5">
                        <Project_Task_Stats />
                    </div>

                    <div className="w-[20%] xl:flex mm:hidden items-center justify-center">
                        <Add_Task_Bt />
                    </div>
                </div>

                <div className="xl:hidden mm:flex fixed bottom-5 right-5">
                    <Add_Task_Bt />
                </div>

                <div className="w-full xl:flex mm:hidden justify-center items-center my-10">
                    <div className="w-[93%] flex flex-col items-center justify-center">
                        <div className="w-full flex justify-between items-center">
                            <p className="font-Alan text-2xl">Performence</p>

                            <div className="flex bg-[#f1f1f1] rounded-3xl justify-center items-center px-4 py-2">
                                <p className="font-Poppins text-[13px]">{end}-{date} {month}</p>
                                {/* <img src={down} className="object-contain w-6 h-6 py-1 ml-1" />  */}
                            </div>
                        </div>

                        <div className="w-[80%] flex mt-5">
                            <LineChart from={startForChart} to={endForChart}/>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-center items-center">
                    <Task_Details  />
                </div>

                <div className="w-full xl:hidden mm:flex justify-center items-center my-10">
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

            <div className="w-[20%] xl:flex mm:hidden items-center flex-col">
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