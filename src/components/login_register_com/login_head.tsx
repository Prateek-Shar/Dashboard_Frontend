interface Register {
    onSwitch: () => void;
}

const Login_Head:React.FC<Register> = ( {onSwitch} ) => {


    return (

        <div className="w-[90%] flex justify-evenly xl:mt-8 mm:mt-8">
            <button className="mm:items-normal xl:flex xl:flex-col xl:items-center">
                <div className="rounded-3xl flex justify-center">
                    <p className="font-Poppins xl:p-3 mm:py-2 text-[#3b60e7] mm:text-[16px] xl:text-[16px]">Sign In</p>
                </div>  

                <div className="flex justify-center items-center">
                    <hr className="border-[#3b60e7] border-2 w-5 rounded-4xl" />
                </div>
            </button>

            <button className="bg-white rounded-3xl flex justify-center items-center px-5 shadow-lg hover:cursor-pointer" onClick={onSwitch}>
                <p className="font-Poppins mm:text-[16px] xl:text-[16px]" >SignUp</p>
            </button>
        </div>

    )
}

export default Login_Head;