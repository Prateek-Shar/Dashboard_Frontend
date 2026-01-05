import add from "/images/add.png"
import { useNavigate } from "react-router-dom"

const Add_Income_bt = () => {
    
    const navigate = useNavigate()

    const handleClicktoNewIncome = () => {
        navigate("/addIncome")
    }

    
    return (
        
        <div className="xl:w-[70%] bg-white rounded-3xl mm:w-full">
            <div className="w-full flex">
                <div className="w-[80%] xl:flex items-center p-4 mm:hidden">
                    <p className="font-Poppins text-[16px]">Add New Income</p>
                </div>

                <div className="xl:w-[15%] flex justify-center items-center mm:w-full xl:p-0 mm:p-1">
                    <img src={add} onClick={handleClicktoNewIncome} className="w-[60%] hover:cursor-pointer"/>
                </div>
            </div>
        </div>
    )
}

export default Add_Income_bt