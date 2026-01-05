import add from "/images/add.png"
import { useNavigate } from "react-router-dom"

const Add_product = () => {

    const navigate = useNavigate()

    const handleClickToNewCustomer = () => {
        navigate("/addCustomer")
    }

    
    return (
        <div className="w-full flex bg-white rounded-3xl">
            <div className="w-[80%] xl:flex mm:hidden items-center p-4">
                <p className="font-Poppins text-[18px]">Add New Customer</p>
            </div>

            <div className="xl:w-[15%] mm:w-full flex justify-center items-center xl:p-0 mm:p-1">
                <img src={add} onClick={handleClickToNewCustomer} className="w-[60%] hover:cursor-pointer"/>
            </div>
        </div>
    )
}

export default Add_product;