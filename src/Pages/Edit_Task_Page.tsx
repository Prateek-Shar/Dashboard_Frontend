import Profile from "../components/Profile";
import TaskForm from "../components/project_tasks_com/editTaskForm";
import calender from "/images/calender.png"

const Edit_Task = () => {

    const date = new Date().getDate()
    const month =  new Date().toLocaleString('default', { month: 'long' });
    const year = new Date().getFullYear()

    return (

        <div className="w-full h-dvh flex">  

            <div className="xl:w-[80%] mm:w-full border-r-2 border-[#f0f0f2]">

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

                <div className="w-full flex items-center justify-center">
                    <TaskForm />
                </div>

            </div>

            <div className="w-[20%] xl:flex mm:hidden justify-center items-start">
                <Profile />
            </div>
        </div>
    )
}


export default Edit_Task;