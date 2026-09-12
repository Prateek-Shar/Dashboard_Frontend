import { useNavigate } from "react-router-dom"
import add from "/images/add.png"

const Add_Task_Bt = () => {
    
    const navigate = useNavigate()

    const handleClickToNewTask = () => {
        navigate("/newTask")
    }

    return (
        <div className="flex items-center justify-center bg-white rounded-3xl px-3 py-3 hover:cursor-pointer" onClick={handleClickToNewTask}>
            <p className="font-Poppins xl:flex mm:hidden text-[18px] px-4">New Task</p>

            <img src={add}  className="xl:w-6 xl:h-6 mm:w-8 mm:h-8 xl:mr-4 mm:mr-0 xl:p-0 mm:p-1"/>
        </div>
    )
}


export default Add_Task_Bt