import add from "/images/add.png"
import { useNavigate } from "react-router-dom"

const Add_product = () => {

    const navigate = useNavigate()

    const handleClickToNewProduct = () => {
        navigate("/addProduct")
    }

    
    return (
        
        <div className="flex items-center bg-white rounded-3xl px-2 py-2">

            <p className="font-Poppins xl:flex text-center mm:hidden text-[18px] px-2">New Product</p>

            <img src={add} onClick={handleClickToNewProduct} className="hover:cursor-pointer xl:h-10 xl:w-10 mm:w-8 mm:h-8 xl:p-2 mm:p-1 xl:ml-2 mm:ml-0"/>

        </div>
    )
}

export default Add_product;