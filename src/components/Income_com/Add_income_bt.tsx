import add from "/images/add.png"
import { useNavigate } from "react-router-dom"

const Add_Income_bt = () => {
    
    const navigate = useNavigate()

    const handleClicktoNewIncome = () => {
        navigate("/addIncome")
    }

    
    return (
        
        <div className="xl:w-[65%] px-2 py-1 flex justify-evenly items-center bg-white rounded-3xl mm:w-full">
            <p className="font-Poppins text-[16px] xl:flex mm:hidden">New Income</p>

            <img src={add} onClick={handleClicktoNewIncome} className="w-10 h-10 p-2" />
        </div>
    )
}

export default Add_Income_bt