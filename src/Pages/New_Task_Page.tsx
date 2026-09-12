import Profile from "../components/Profile";
import NewTaskFrom from "../components/project_tasks_com/newTaskFrom";
import Task_Head from "../components/project_tasks_com/TaskHead";
import { UserProvider } from "../context/login_context";

const New_Task = () => {

    return (

        <div className="w-full min-h-screen flex">

            <div className="xl:w-[80%] h-full mm:w-full border-r-2 flex flex-col items-center  border-[#ebedf0]">
                <div className="w-full">
                    <UserProvider>
                        <Task_Head />
                    </UserProvider>
                </div>

                <NewTaskFrom />
            </div>

            <div className="w-[20%] xl:flex mm:hidden flex-col items-center justify-start">
                <Profile />

                <div className="w-full flex justify-around items-center my-5">
                    <hr className="border-0 bg-[#f6f6f6] w-[30%] h-[2px] rounded-full" />

                    <p className="font-Poet">Activity</p>

                    <hr className="border-0 bg-[#f6f6f6] w-[30%] h-[2px] rouded-full" />
                </div>
            </div>
        </div>
        
    )
}


export default New_Task;