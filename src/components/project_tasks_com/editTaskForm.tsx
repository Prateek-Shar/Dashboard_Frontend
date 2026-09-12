import { useState, type FormEvent, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";

interface det {
    Project_name : string,
    Task_desc : string,
    Task_status : string,
    Duration : number,
    Progress : number
}

const EditTaskForm = () => {

    const [form , setForm] = useState<det>({
        Project_name : "",
        Task_desc : "",
        Task_status : "",
        Duration : 0 ,
        Progress : 0
    }) 

    const navigate = useNavigate()

    const {id} = useParams()
    console.log("ID : " , id)

    const handleTaskInfo = async() => {
        const response = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_task_info/${id}` , {
            method : "GET",
            credentials : "include"
        })

        if(!response.ok) {
            throw new Error("Failed to fetch task info")
        }

        const data = await response.json()
        setForm(data.result)
    }


    const handleModify = async(e : FormEvent) => {
        e.preventDefault()  
        
        console.log("Form : " , form)
        
        const response = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/edit_task?id=${id}`, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "credentials" : "include"
            },
            body : JSON.stringify(form)
        })

        if(!response.ok) {
            throw new Error("Failed to modify task")
            return;
        }

        navigate("/task&projects")
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form , 
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        handleTaskInfo()
    }, [])


    return (

        <div className="w-[80%] flex items-center justify-center shadow-2xl flex-col my-20 rounded-2xl">  
            <p className="font-Alan text-3xl mt-5">Edit Task</p>

            <form onSubmit={handleModify} className="w-full flex flex-col items-center justify-center my-10">
                <div className="w-full flex justify-evenly items-center my-5">
                    <div className="w-[30%] flex items-center" >
                        <input type="text" className="grow border-2 px-2 py-3 rounded-2xl outline-0 border-[#adb5bd] font-Poppins" name="Project_name" value={form.Project_name} onChange={handleChange} /> 
                    </div>
                    <div className="w-[30%] flex items-center">
                        <input type="text" className="px-2 py-3 border-2 grow rounded-2xl outline-0 border-[#adb5bd] font-Poppins" name="Task_desc" value={form.Task_desc} onChange={handleChange} /> 
                    </div>
                </div>

                <div className="w-full flex justify-evenly items-center">
                    <div className="w-[30%] flex items-center" >
                        <input type="text" className="px-2 py-3 grow border-2 rounded-2xl outline-0 border-[#adb5bd] font-Poppins" name="Progress" value={form.Progress} onChange={handleChange} /> 
                    </div>

                    <div className="w-[30%] flex items-center" >
                        <input type="text" className="px-2 py-3 border-2 grow rounded-2xl outline-0 border-[#adb5bd] font-Poppins" name="Duration" value={form.Duration} onChange={handleChange} /> 
                    </div>
                </div> 

                <div className="w-full flex justify-center items-center my-5">
                    <div className="w-[30%] flex items-center" >
                        <input type="text" className="px-2 py-3 grow border-2 rounded-2xl outline-0 border-[#adb5bd] font-Poppins" name="Task_status" value={form.Task_status} onChange={handleChange} /> 
                    </div>
                </div> 

                <button type="submit" className="bg-amber-600 px-6 py-2 rounded-3xl font-Poet mt-10">Modify</button>
            </form>
        </div>
    )
}


export default EditTaskForm;