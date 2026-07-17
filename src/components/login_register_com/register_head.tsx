interface Register {
    onSwitch : () => void;
}

const Register_Head:React.FC<Register> = ( {onSwitch} ) => {


    return (

        <div className="xl:w-[80%] mm:w-full ml:w-full flex justify-evenly mt-2 xl:mr-20 mm:mr-0">
            <button className="xl:w-[40%] mm:w-[25%]">
                <div className="w-full rounded-3xl flex justify-center mt-2">
                    <p className="font-Poppins xl:p-3 m:p-2 xl:text-[16px] mm:text-[14px] text-[#3b60e7]">Sign Up</p>
                </div>  

                <div className="w-full flex justify-center items-center">
                    <div className="w-[10%] xl:mt-0 mm:mt-1">
                        <hr className="border-[#3b60e7] border-2 w-full rounded-4xl" />
                    </div>
                </div>
            </button>

            <button className="w-[30%] bg-white rounded-3xl flex justify-center mt-2 mb-2 shadow-lg">
                <p className="font-Poppins xl:p-3 mm:p-2 xl:text-[16px] mm:text-[14px] hover:cursor-pointer" onClick={onSwitch}>Sign In</p>
            </button>
        </div>
    )
}

export default Register_Head;