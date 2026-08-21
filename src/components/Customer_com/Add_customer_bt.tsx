import add from "/images/add.png"
import { useNavigate } from "react-router-dom"

const   Add_product = () => {

    const navigate = useNavigate()

    const handleClickToNewCustomer = () => {
        navigate("/addCustomer")
    }

    
    return (
        <div className="flex bg-white rounded-3xl px-2 py-2 z-50">
            <p className="font-Poppins xl:flex mm:hidden text-[18px]">New Customer</p>

            <img src={add} onClick={handleClickToNewCustomer} className="w-10 h-10 p-2"/>
        </div>
    )
}

export default Add_product;