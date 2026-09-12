import type { FormEvent } from "react";
import { useState , useRef, useEffect } from "react";
import { Spin } from 'antd';
import plus from "/images/plus.png";

interface det {
    Project_name : string,
    Task_desc : string,
    Task_status : string,
    End : number,
    Progress : number,
    Start : Date,
    // Members : [string]
}

const NewTaskFrom = () => {

    const [form , setForm] = useState<det>({
        "Project_name" : "",
        "Task_desc" : "",
        "Task_status" : "",
        "Progress" : 0,
        "End" : 0,
        "Start" : new Date(),
        // "Members" : [""]
    }) 

    
    const [Loader , setLoader] = useState<boolean>(false);
    const [submitBt , setSubmitBt] = useState<boolean>(true);
    const [members , setMembers] = useState<string[]>([])

    const [statusOptions] = useState<string[]>(["In Progress" , "Completed"])


    const [optionsDiv , setOptionsDiv] = useState<boolean>(false);
    
    const default_form = useRef({ ...form }); 
    const statusBox = useRef<HTMLInputElement>(null);

    const api_url = import.meta.env.VITE_PRODUCTION_ADDRESS

    // const d = new Date().toString()
    // console.log("Date : " , d);

    const handleNew = async(e : FormEvent) => {
        e.preventDefault()

        setLoader(true)
        setSubmitBt(false)

        // console.log("Form : " , form)

        const res = await fetch(`${api_url}/newTask` , {
            method : "post",
            headers : {
                "Content-type" : "application/json",
            },
            credentials : "include",
            body : JSON.stringify(form)
        })

        if(!res) {
            console.error("Something broke")
            setForm(default_form.current)
            setSubmitBt(true)
            setLoader(false)
            return;
        }

        setForm(default_form.current);
        setSubmitBt(true)
        setLoader(false)
        return;
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form , 
            [e.target.name] : e.target.value
        })

        if(statusBox.current) {
            statusBox.current.style.borderBottom = "none"
            statusBox.current.style.borderBottomRightRadius = "5px"
            statusBox.current.style.borderBottomLeftRadius = "5px"
        }
    }

    const reset = () => {
        if(statusBox.current) {
            statusBox.current.style.borderBottom = "2px solid #adb5bd"
            statusBox.current.style.borderBottomRightRadius = "15px"
            statusBox.current.style.borderBottomLeftRadius = "15px"
        }
    }

    // const showMembers = () => {
    //     console.info("Members : " , members)
    // }

    return (
        
        <div className="w-[80%] flex items-center justify-center shadow-md flex-col my-20 rounded-2xl">  
            <p className="font-Alan text-3xl mt-5">New Task</p>

            <form onSubmit={handleNew} className="w-full flex flex-col items-center justify-center my-10">
                <div className="w-full flex xl:flex-row mm:flex-col justify-evenly items-center my-5">
                    <div className="xl:w-[30%] mm:w-[90%] flex flex-col" >
                        <p className="flex font-Poppins">Title</p>
                        <input type="text" className="grow border-2 px-2 py-3 rounded-2xl outline-0 border-[#adb5bd] font-Poppins mt-2" placeholder="Enter Task Name" autoComplete="off" name="Project_name" value={form.Project_name} onChange={handleChange} /> 
                    </div>
                    <div className="xl:w-[30%] mm:w-[90%] flex flex-col xl:mt-0 mm:mt-10">
                        <p className="flex font-Poppins">Description</p>
                        <input type="text" className="px-2 py-3 border-2 grow rounded-2xl outline-0 border-[#adb5bd] font-Poppins mt-2" placeholder="Enter Brief Desc." autoComplete="off" name="Task_desc" value={form.Task_desc} onChange={handleChange} /> 
                    </div>
                </div>

                <div className="w-full flex xl:flex-row mm:flex-col justify-evenly items-center my-5">
                    <div className="xl:w-[30%] mm:w-[90%] flex flex-col" >
                        <p className="flex font-Poppins">Progress (in %)</p>
                        <input type="text" className="px-2 py-3 grow border-2 rounded-2xl outline-0 border-[#adb5bd] font-Poppins mt-2" name="Progress" autoComplete="off" value={form.Progress} onChange={handleChange} /> 
                    </div>

                    <div className="xl:w-[30%] mm:w-[90%] flex flex-col relative xl:mt-0 mm:mt-10">
                        <p className="flex font-Poppins">Status</p>
                        <input type="text" className="px-2 py-3 border-2 grow rounded-2xl outline-0 border-[#adb5bd] font-Poppins mt-2" name="Task_status" placeholder="Choose the Status" autoComplete="off" value={form.Task_status} onChange={ (e)=> { handleChange(e); setOptionsDiv(true) }} ref={statusBox}/> 

                        {optionsDiv && (
                            statusOptions.map((it) => {
                                return (
                                    <div className="grow outline-0 font-Poppins border-[#adb5bd] border-l-2 border-r-2 border-b-0 border-t-0 border-2 last:border-b-2 first:border-t-0">
                                        <p className="px-2 py-3 hover:bg-gray-100 hover:cursor-default" onClick={ () => {
                                            setForm(prev => ({
                                                ...prev,
                                                "Task_status" : it
                                            })); setOptionsDiv(false); reset();
                                        }}>{it}</p>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div> 

                <div className="xl:w-[73%] mm:w-full flex flex-col xl:items-start mm:items-center my-10">
                    <div className="xl:w-[41%] mm:w-[90%] flex flex-col">
                        <p className="flex font-Poppins">Expected End Data (in days)</p>
                        <input type="text" className="px-2 py-3 grow border-2 rounded-2xl outline-0 border-[#adb5bd] font-Poppins mt-2" name="End" placeholder="eg. 30 , 10 , 5" autoComplete="off" value={form.End} onChange={handleChange} /> 
                    </div>

                    {/* <div className="w-[65%] flex flex-col mt-10">
                        <p className="flex font-Poppins">Team Details</p>
                        <div className="flex items-center">
                            <input type="text" className="px-2 py-3 grow border-2 rounded-2xl outline-0 border-[#adb5bd] font-Poppins mt-2" name="Members" placeholder="Enter Member names" autoComplete="off" value={form.Members} onChange={handleChange} /> 
                            <img src={plus} className="w-8 h-8 bg-gray-100 rounded-full ml-12" onClick={ () => {
                                setForm(prev => ({
                                    ...prev,
                                    "Members" : form.Members
                                }));
                            }} alt="New Member" />
                        </div>
                    </div> */}
                </div> 

                {submitBt && (
                    <button type="submit" className="bg-amber-600 px-6 py-2 rounded-3xl font-Poet mt-10">Submit</button>
                )}

                {Loader && (
                <div className="flex px-6 py-2 border-2 border-blue-400">
                    <Spin />
                </div>
                )}
            </form>
        </div>

    )
}


export default NewTaskFrom;