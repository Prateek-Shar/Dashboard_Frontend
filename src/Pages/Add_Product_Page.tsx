import { useAlert } from "../context/result"
import NewProductForm from "../components/Product_com/newProductForm"
import { UserProvider } from "../context/login_context"
import Product_head from "../components/Product_com/product_head"
import check from "/images/check.png"
import cross from "/images/cross.png"
import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"


const Add_Product_Page = () => {

    const { successVisible , failureVisible } = useAlert()

    const statusDiv = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if(statusDiv.current) {
            gsap.fromTo(statusDiv.current , {
                opacity : 0 ,
            } , {
                opacity : 1 , duration : 2
            })
        }
    })


    return (

        <div className="w-full min-h-dvh bg-[#f8f9fa]"> 

            <UserProvider>
                <div className="w-full">
                    <Product_head />
                </div>
            </UserProvider>

            <div className="w-full flex justify-center items-center xl:mt-20 mm:mt-10">
                <div className="w-[80%] bg-white flex flex-col justify-center items-center rounded-4xl my-5">

                    <p className="font-Alan xl:text-[24px] mm:text[20px] p-4">Record Product</p>
                    
                    <div className="w-full mt-4">
                        <NewProductForm />
                    </div>
                </div>
            </div>


            {successVisible && (
                <>
                {/* <div className="w-[20%] xl:flex mm:hidden absolute bottom-0 right-0 bg-[#e3fcf7] border-2 border-green-500 rounded-2xl xl:mb-2 mm:mb-1 mr-2">
                    <div className="w-[5%] bg-green-600 rounded-tl-[14px] rounded-bl-[14px]" />

                    <div className="w-[20%] flex justify-center items-center">
                        <img src={check} className="object-contain w-[60%] p-2" />
                    </div>

                    <p className="font-Poppins text-[18px]">Data Entered Successfully</p>
                </div> */}

                <div className="flex justify-center items-center static bottom-0 right-0 my-10" ref={statusDiv}>
                    <div className="w-fit flex items-center bg-[#e3fcf7] border-2 border-green-500 rounded-2xl">
                        <div className="xl:w-3 xl:h-8 bg-green-600 rounded-tl-[14px] rounded-bl-[14px]" />

                        <img src={check} className="object-contain w-8 h-8 p-2" />

                        <p className="font-Poppins text-[14px] pr-3">Data Entered Successfully</p>
                    </div>
                </div>
                </>
            )}


            {failureVisible && (
                <div className="flex static bottom-0 right-0 items-center justify-center my-10" ref={statusDiv}>
                    <div className="w-fit border-2 border-red-500 rounded-2xl bg-red-200 flex items-center">
                        <div className="xl:w-3 xl:h-8 bg-red-600 rounded-tl-[14px] rounded-bl-[14px]" />

                        <img src={cross} className="object-contain w-8 h-8 p-2" />

                        <p className="font-Poppins text-[14px] pr-3">Unable to send data</p>
                    </div>
                </div>
            )}
        </div> 

    )
}

export default Add_Product_Page