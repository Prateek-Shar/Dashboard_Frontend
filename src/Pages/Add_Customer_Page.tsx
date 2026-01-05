import { useAlert } from "../context/result"
import NewCustomerForm from "../components/Customer_com/newCustomerForm"
import Customer_head from "../components/Customer_com/customer_head"
import { UserProvider } from "../context/login_context"
import check from "/images/check.png"
import cross from "/images/cross.png"

const Add_Customer_Page = () => {

    const { successVisible , failureVisible } = useAlert()

    return (

        <div className="w-full h-screen relative bg-[#f8f9fa]"> 

            <UserProvider>
                <div className="w-full">
                    <Customer_head />
                </div>
            </UserProvider>

            <div className="w-full flex justify-center mb-4">
                <hr className="w-full border-t-2 border-b-0 border-l-0 border-r-0  border-[#ebedf0]" />
            </div>


            <div className="w-full flex justify-center items-center xl:mt-20 mm:mt-15">
                <div className="w-[80%] bg-white rounded-4xl mt-2 mb-10">

                    <div className="w-full flex justify-center items-center rounded-t-4xl">
                        <p className="font-Alan text-[24px] p-4">Add Customer</p>
                    </div>
                    

                    <div className="w-full">
                        <NewCustomerForm />
                    </div>
                </div>
            </div>


            {successVisible && (
                <div className="w-[20%] flex absolute top-3 right-0 bg-[#e3fcf7] border-2  border-green-500 rounded-2xl mb-2 mr-2">
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
                <div className="w-[20%] flex absolute top-4 right-0 bg-red-100 border-2 shadow-2xs  shadow-red-500  border-red-500 rounded-2xl mb-2 mr-2">
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


export default Add_Customer_Page;