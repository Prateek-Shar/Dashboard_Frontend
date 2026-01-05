interface Register {
    onSwitch: () => void;
}

const Login_Head:React.FC<Register> = ( {onSwitch} ) => {


    return (

        <div className="w-[80%] flex justify-evenly xl:mt-4 xl:w-[75%] mr-10 mm:mr-0">
            <div className="w-[40%] xl:w-[27%]">
                <div className="w-full rounded-3xl flex justify-center mt-2">
                    <p className="font-Poppins p-3 mm:py-2 text-[#3b60e7] mm:text-[15px]">Sign In</p>
                </div>  

                <div className="w-full flex justify-center items-center">
                    <div className="w-[10%]">
                        <hr className="border-[#3b60e7] border-2 w-full rounded-4xl" />
                    </div>
                </div>
            </div>

            <div className="w-[40%] xl:w-[30%] bg-white rounded-3xl flex justify-center mt-2 mb-2 shadow-lg">
                <p className="font-Poppins p-3 mm:p-2 hover:cursor-pointer mm:text-[14px]" onClick={onSwitch}>SignUp</p>
            </div>
        </div>

    )
}

export default Login_Head;