import Income_head from "../components/Income_com/income_head"
import NewIncomeForm from "../components/Income_com/newIncomeForm"
import check from "../images/check.png"
import cross from "../images/cross.png"
import { useAlert } from "../context/result"


const Add_Income = () => {

    const { successVisible , failureVisible } = useAlert()

    return (
        <div className="w-screen h-screen bg-[#f8f9fa]"> 
            <div className="w-full">
                <Income_head />
            </div>

            <div className="w-full flex justify-center items-center mt-10">
                <div className="w-[80%] bg-white rounded-4xl mt-2">

                    <div className="w-full flex justify-center items-center rounded-t-4xl">
                        <p className="font-Poppins text-[24px] p-4">Add Income</p>
                    </div>
                    
                    <div className="w-full mt-4">
                        <NewIncomeForm />
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

export default Add_Income