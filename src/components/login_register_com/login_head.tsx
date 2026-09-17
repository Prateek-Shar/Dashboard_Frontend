interface Register {
    onSwitch: () => void;
}

const Login_Head:React.FC<Register> = ( {onSwitch} ) => {


    return (

        <div className="flex justify-evenly xl:mt-8 xl:w-[80%] mm:w-[95%] xl:mr-20 mm:mr-0 mm:mt-8">
            <button className="xl:w-[40%] mm:w-[40%] mm:items-normal xl:flex xl:flex-col xl:items-center">
                <div className="xl:w-[50%] mm:w-full rounded-3xl flex justify-center">
                    <p className="font-Poppins xl:p-3 mm:py-2 text-[#3b60e7] mm:text-[16px] xl:text-[16px]">Sign In</p>
                </div>  

                <div className="w-full flex justify-center items-center">
                    <div className="w-[10%]">
                        <hr className="border-[#3b60e7] border-2 w-full rounded-4xl" />
                    </div>
                </div>
            </button>

            <button className="xl:w-[25%] mm:w-[40%] bg-white rounded-3xl flex justify-center shadow-lg">
                <p className="font-Poppins xl:p-3 mm:p-2 hover:cursor-pointer mm:text-[16px] xl:text-[16px]" onClick={onSwitch}>SignUp</p>
            </button>
        </div>

    )
}

export default Login_Head;