import add from "/images/add.png"
import { useNavigate } from "react-router-dom"

const Add_product = () => {

    const navigate = useNavigate()

    const handleClickToNewProduct = () => {
        navigate("/addProduct")
    }

    
    return (
        <div className="w-full flex bg-white rounded-3xl">
            <div className="w-[80%] xl:flex items-center p-4 mm:hidden">
                <p className="font-Poppins text-[18px]">Add New Product</p>
            </div>

            <div className="xl:w-[15%] flex justify-center items-center mm:full">
                <img src={add} onClick={handleClickToNewProduct} className="w-[60%] hover:cursor-pointer"/>
            </div>
        </div>
    )
}

export default Add_product;