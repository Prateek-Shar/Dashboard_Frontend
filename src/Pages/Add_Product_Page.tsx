import { useAlert } from "../context/result"
import NewProductForm from "../components/Product_com/newProductForm"
import { UserProvider } from "../context/login_context"
import Product_head from "../components/Product_com/product_head"
import check from "/images/check.png"
import cross from "/images/cross.png"


const Add_Product_Page = () => {

    const { successVisible , failureVisible } = useAlert()

    return (

        <div className="w-full h-screen bg-[#f8f9fa]"> 

            <UserProvider>
                <div className="w-full">
                    <Product_head />
                </div>
            </UserProvider>

            <div className="w-full flex justify-center mb-4">
                <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0  border-[#ebedf0]" />
            </div>

            <div className="w-full flex justify-center items-center xl:mt-20 mm:mt-10">
                <div className="w-[80%] bg-white rounded-4xl mt-2">

                    <div className="w-full flex justify-center items-center rounded-t-4xl">
                        <p className="font-Alan xl:text-[24px] mm:text[20px] p-4">Add Product</p>
                    </div>
                    

                    <div className="w-full mt-4">
                        <NewProductForm />
                    </div>
                </div>
            </div>


            {successVisible && (
                <div className="w-[20%] flex absolute bottom-0 right-0 bg-[#e3fcf7] border-2  border-green-500 rounded-2xl mb-2 mr-2">
                    <div className="w-[5%] bg-green-600 rounded-tl-[14px]  rounded-bl-[14px]" />

                    <div className="w-[20%] flex justify-center items-center">
                        <img src={check} className="object-contain w-[60%] p-2" />
                    </div>

                    <div className="w-[75%] flex items-center">
                        <p className="font-Poppins text-[18px]">Data Entered Successfully</p>
                    </div>
                </div>
            )}


            {failureVisible && (
                <div className="w-[20%] flex absolute bottom-0 right-0 bg-red-100 border-2 shadow-2xs  shadow-red-500  border-red-500 rounded-2xl mb-2 mr-2">
                    <div className="w-[5%] bg-red-600 rounded-tl-[14px]  rounded-bl-[13px]" />

                    <div className="w-[20%] flex justify-center items-center">
                        <img src={cross} className="object-contain w-[60%] p-2" />
                    </div>

                    <div className="w-[80%] flex items-center ">
                        <p className="font-Poppins text-[18px]">Unable to send data</p>
                    </div>
                </div>
            )}
        </div> 

    )
}

export default Add_Product_Page