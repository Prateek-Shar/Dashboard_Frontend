import { useEffect } from "react";
import { useUser } from "../../context/login_context";
import calender from "/images/calender.png"

const Task_Head = () => {

    const { userDetails , LoadUserApi} = useUser()

    const date = new Date().getDate()
    const month =  new Date().toLocaleString('default', { month: 'long' });
    const year = new Date().getFullYear()
    

    useEffect(() => {
        LoadUserApi()
    } , [])


    return (

        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <div className="flex mt-5 xl:ml-10 mm:ml-5">
                    <p className="font-Alan xl:text-3xl mm:text-[20px]">Hello , {userDetails?.First_name}</p>
                </div>

                <div className="flex">
                    <p className="font-Poppins text-[#9197b3] xl:ml-10 mm:ml-5 mt-2 xl:text-[16px] mm:text-[13px]">Track team progress here . You almost reach a goal</p>
                </div>
            </div>

            <div className="xl:flex mm:hidden justify-end items-center mr-7">
                <p className="font-Alan">{date} {month} , {year}</p>

                <div className="flex w-[6%] bg-[#f0f0f2] rounded-4xl ml-2">
                    <img src={calender} className="p-3" />
                </div>
            </div>
        </div>
        
    )
}

export default Task_Head;