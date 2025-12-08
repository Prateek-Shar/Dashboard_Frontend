import human from "../images/human.png";
import rocket from "../images/boost.png"
import Login_form from "../components/login_register_com/login_form";
import Register_Head from "../components/login_register_com/register_head";
import Login_Head from "../components/login_register_com/login_head";
import Register_Form from "../components/login_register_com/register_form";
import { UserProvider } from '../context/login_context';
import { useState } from "react";



const Login_Register = () => {


    const [isRegister, setIsRegister] = useState(false);
    const [isLogin , setIsLogin] = useState(false)
    const [handleDefault , setHandleDefault] = useState(true)

    const handleToggleToSignupPage = () => {
        setIsRegister(true)
        setIsLogin(false)
        setHandleDefault(false)
    }

    const handleToggleToLoginPage = () => {
        setIsLogin(true)
        setIsRegister(false)
        setHandleDefault(false)
    }

    return (

        <div className="xl:w-screen xl:h-screen bg-[#a8b0ff] flex justify-center items-center ml:w-full ml:h-screen ml:justify-normal mm:w-full mm:h-full mm:justify-normal mm:py-13">

            <div className="w-[90%] flex justify-center items-center">
            
                <div className="absolute top-20 left-82 w-[63%] h-[86%] bg-[#e4e7f4] rounded-xl shadow-lg z-0 ml:top-23 ml:left-3 ml:w-[88%] ml:h-[80%] mm:top-23 mm:left-3 mm:w-[88%] mm:h-[80%]" />
                <div className="absolute top-10 left-93 w-[63%] h-[86%] bg-[#e4e7f4] rounded-xl shadow-xl z-10 ml:top-22 ml:left-5 ml:w-[87%] ml:h-[81%] mm:top-22 mm:left-5 mm:w-[87%] mm:h-[81%]" />

            
                <div className="relative z-20 w-[70%] h-[90%] rounded-2xl shadow-2xl flex bg-[#e8ecf8] ml:w-[95%] ml:ml-5 mm:ml-5 mm:w-[95%]">
                    
                    <div className="w-[40%] p-10 flex flex-col justify-evenly ml:hidden mm:hidden"> 
                        <div className="w-[80%]">
                            <h1 className="font-Poppins text-[#4a79ff] p-2 text-4xl"><span className="text-blue-700 font-Poppins">Welcome</span> to our Community</h1>
                        </div>

                        <div className="w-[70%] mt-2">
                            <p className="text-gray-600 p-2 font-Poppins">A whole new productive journey starts right here</p>
                        </div>
                        <div className="w-[50%] flex mt-10">
                            <div className="w-[50%]">
                                <img src={human} />
                            </div>

                            <div className="w-[50%] flex justify-center items-center">
                                <img src={rocket}/> 
                        </div>
                        </div>

                    </div>

                    <UserProvider>
                        {handleDefault && (
                        <div className="w-[60%] bg-[#f8f9ff] rounded-2xl flex flex-col items-center ml:w-full mm:w-full">
                            <Login_Head onSwitch={handleToggleToSignupPage} />
                            <Login_form />    
                        </div>
                        )}



                        {isRegister && (
                            <div className="w-[60%] bg-[#f8f9ff] rounded-2xl flex flex-col items-center">
                                <Register_Head onSwitch={handleToggleToLoginPage} />
                                <Register_Form onSwitch={handleToggleToLoginPage}/>
                            </div>
                        )}


                        {isLogin && (
                            <div className="w-[60%] bg-[#f8f9ff] rounded-2xl flex flex-col items-center ml:w-full">
                                <Login_Head onSwitch={handleToggleToSignupPage} />
                                <Login_form />
                            </div>
                        )}
                    </UserProvider>

                    
                </div>

            </div>
        </div>
        
    );
};


export default Login_Register;
