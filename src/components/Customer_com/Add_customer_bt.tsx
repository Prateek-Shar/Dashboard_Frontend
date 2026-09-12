import add from "/images/add.png"
import { useNavigate } from "react-router-dom"

const   Add_product = () => {

    const navigate = useNavigate()

    const handleClickToNewCustomer = () => {
        navigate("/addCustomer")
    }

    
    return (
        <div className="flex items-center justify-center bg-white rounded-3xl py-3 z-50">
            <p className="font-Poppins xl:flex mm:hidden text-[18px] px-4">New Customer</p>

            <img src={add} onClick={handleClickToNewCustomer} className="xl:w-6 xl:h-6 mm:w-8 mm:h-8 xl:mr-4 mm:mr-0 xl:p-0 mm:p-1"/>
        </div>
    )
}

export default Add_product;