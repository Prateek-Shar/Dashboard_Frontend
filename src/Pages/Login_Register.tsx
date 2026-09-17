import Login_form from "../components/login_register_com/login_form";
import Register_Head from "../components/login_register_com/register_head";
import Login_Head from "../components/login_register_com/login_head";
import Register_Form from "../components/login_register_com/register_form";
import { UserProvider } from '../context/login_context';
import { useState } from "react";
import DashboardBackground from "../components/login_section/Dashboard_bg";


const Login_Register = () => {


    const [isRegister, setIsRegister] = useState(false);
    const [isLogin , setIsLogin] = useState(true)
    // const [loginBg , setIsLoginBg] = useState(true)
    // const [registerBg , setIsRegisterBg] = useState(false)
    // const [msg , setMsg] = useState<String>("")
    // const [errorDiv , setErrorDiv] = useState(false)


    const handleToggleToSignupPage = () => {
        setIsRegister(true)
        // setIsRegisterBg(true)
        // setIsLoginBg(false)
        setIsLogin(false)
    }

    const handleToggleToLoginPage = () => {
        setIsLogin(true)
        // setIsLoginBg(true)
        setIsRegister(false)
        // setIsRegisterBg(false)
    }



    return (
        
        <div className="relative min-h-screen overflow-hidden">

        <DashboardBackground />

        {/* Your actual website content */}
        <div className="relative z-10 xl:w-screen xl:h-screen flex xl:justify-normal items-center ml:w-full ml:justify-center mm:w-full mm:h-screen mm:justify-center mm:py-13 overflow-x-hidden overflow-y-hidden">

            <div className="xl:w-screen mm:w-full flex justify-center items-center">
                {/* {loginBg && (
                <>
                    <div className="absolute mm:hidden xl:top-60 xl:left-80 xl:w-[64%] xl:h-[47%] bg-[#e4e7f4] rounded-xl shadow-lg z-0 ml:top-44 ml:left-13 ml:w-[80%] ml:h-[57%] mm:top-33 mm:left-8 mm:w-[88%] mm:h-[61%]" />
                    <div className="xl:flex absolute xl:top-56 xl:left-87 xl:w-[61%] xl:h-[51%] bg-[#e4e7f4] rounded-xl shadow-xl z-10 mm:hidden" />
                </>
                )}

                {registerBg && (
                <>
                    <div className="mm:hidden xl:flex absolute xl:top-17 xl:left-79 xl:w-[64.5%] xl:h-[84%] bg-[#e4e7f4] rounded-xl shadow-lg z-0 ml:top-23 ml:left-3 ml:w-[88%] ml:h-[80%] mm:top-23 mm:left-3 mm:w-[88%] mm:h-[80%]" />
                    <div className="mm:hidden xl:flex absolute xl:top-13 xl:left-87 xl:w-[61%] xl:h-[89%] bg-[#e4e7f4] rounded-xl shadow-xl z-10 ml:top-22 ml:left-5 ml:w-[87%] ml:h-[81%] mm:top-22 mm:left-5 mm:w-[87%] mm:h-[81%]" />
                </> 
                )} */}

            
                <div className="relative z-20 xl:w-[70%] rounded-2xl shadow-2xl flex bg-[#F1F5F9] mm:w-full">
                    
                    <div className="xl:w-[40%] p-10 xl:flex flex-col justify-evenly mm:hidden bg-[#EEF4FF] rounded-l-2xl border-r-2 border-[#E5E7EB]"> 
                        <div className="w-[80%]">
                            <h1 className="font-Poppins text-[#4a79ff] p-2 text-3xl">Welcome Back 👋</h1>
                            <div className="mt-2 px-2">
                                <span className="font-Poppins text-gray-600 py-1">Manage your work,</span> 
                                <p className="font-Poppins text-gray-600 py-1">track progress, </p>
                                <p className="font-Poppins text-gray-600 py-1">and stay focused — all in one place.</p>
                            </div>
                        </div>

                        <div className="w-[70%] mt-2">
                            <p className="text-gray-600 p-2 font-Poppins">A whole new</p>
                            <span className="text-gray-600 p-2 font-Poppins">productive journey,</span>
                            <p className="text-gray-600 p-2 font-Poppins">starts right here</p>
                        </div>
                    </div>

                    {/* <div className="w-full flex justify-center items-center mt-5">
                        <div className="w-[50%] flex justify-center items-center">
                            <img src={cross} className="object-contain w-[4%]"/>
                            <p className="font-Poppins text-red-500 ml-2">{err_msg}</p>
                        </div>
                    </div> */}

                    <div className="xl:w-[60%] mm:w-full flex flex-col xl:rounded-r-2xl mm:rounded-2xl bg-[#f8f9ff] ">
                        <UserProvider>
                            {isRegister && (
                                <div className="flex flex-col items-center">
                                    <Register_Head onSwitch={handleToggleToLoginPage} />
                                    <Register_Form onSwitch={handleToggleToLoginPage}/>
                                </div>
                            )}


                            {isLogin && (
                                <div className="flex flex-col items-center">
                                    <Login_Head onSwitch={handleToggleToSignupPage} />
                                    <Login_form  />    
                                </div>
                            )}
                        </UserProvider>
                    </div>

                </div>  

            </div>

        </div>



        </div>
        
    );
};


export default Login_Register;
