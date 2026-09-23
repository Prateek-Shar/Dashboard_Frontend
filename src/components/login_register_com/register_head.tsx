interface Register {
    onSwitch : () => void;
}

const Register_Head:React.FC<Register> = ( {onSwitch} ) => {


    return (

        <div className="flex justify-evenly w-[90%] mt-2 mm:mr-0">
            <button className="flex flex-col">
                <div className="rounded-3xl flex justify-center mt-2">
                    <p className="font-Poppins xl:p-3 mm:p-[5px] xl:text-[16px] mm:text-[14px] text-[#3b60e7]">Sign Up</p>
                </div>  

                <div className="w-full flex justify-center items-center">
                    <hr className="border-[#3b60e7] border-2 w-5 rounded-4xl" />
                </div>
            </button>

            <button className="flex bg-white rounded-3xl justify-center mt-2 mb-2 shadow-lg px-3">
                <p className="font-Poppins xl:p-3 mm:p-2 xl:text-[16px] mm:text-[14px] hover:cursor-pointer" onClick={onSwitch}>Sign In</p>
            </button>
        </div>
    )
}

export default Register_Head;