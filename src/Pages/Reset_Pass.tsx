import DashboardBackground from "../components/login_section/Dashboard_bg";
import { useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import eye_close from "/images/eye_close.png";
import eye_open from "/images/eye_open.png";
import cross from "/images/cross.png";


interface formOne {
    Username: string,
};


interface formTwo {
    Password : string,
    Confirm_password : string
}

const Reset = () => {

    const navigate = useNavigate()

    const [formOne , setFormOne] = useState<formOne>({
        Username : "",
    });

    const [formTwo , setFormTwo] = useState<formTwo>({
        Password : "",
        Confirm_password : ""
    })  

    const resetForm = () => {
        setFormTwo({ ...formTwoDefault });
    };

    const [formOneDefault] = useState<formOne>(formOne)
    const [formTwoDefault] = useState<formTwo>(formTwo)

    const [loader] = useState(false)
    const [submitBt] = useState(true);
    const [typeText , setTypeText] = useState(false)
    const [errorDiv , setErrorDiv] = useState(false)
    const [err_msg , setErrMsg] = useState<string>("")

    const [disabled] = useState<boolean>(false)

    const [eyeclose , setEyeclose] = useState(true)
    const [eyeopen , setEyeopen] = useState(false)

    const [stepCount , setStepCount] = useState<number>(1)
    
    const handleChangeFormOne = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormOne((prev) => {
            const newForm = { ...prev, [name]: value };
            return newForm;
        });
    }
    
    const handleChangeFormTwo = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormTwo((prev) => {
            const newForm = { ...prev, [name]: value };
            return newForm;
        });
    }

    const user = encodeURI(formOne.Username)

    const api = import.meta.env.VITE_PRODUCTION_ADDRESS;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const verified = await verify_user()

        if(verified) {
            setStepCount(2)
        }

        if(stepCount == 2) {
            await changePass()
        }
    };

    const togglePassword = () => {
        setTypeText(prev => !prev);
        setEyeclose(prev => !prev);
        setEyeopen(prev => !prev);
    }


    const changePass = async() => {

        const res = await fetch(`${api}/changePass?search=${user}` , {
            method : "put",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(formTwo)
        })

        const data = await res.json()

        if(!res.ok) {
            console.error("Something hit")
            setFormTwo(formTwoDefault)
            setErrorDiv(true)
            setErrMsg(data.msg)
            resetForm()

            setTimeout(() => {
                setErrorDiv(false)
            } , 2000)

            return;
        }

        navigate("/login_register")
        console.info("Password changed")
        
    }

    const verify_user = async() => {

        const res = await fetch(`${api}/verify_user?search=${user}`, {
            method: "get",
            credentials: "include",
        });

        const data = await res.json()

        if(!res.ok) {
            setErrorDiv(true)
            setErrMsg(data.msg)
            setFormOne(formOneDefault)

            setTimeout(() => {
                setErrorDiv(false)
            } , 2000)

            return false
        }

        return true
    }
    
    return (

        <div className="relative overflow-hidden">
        
            <DashboardBackground />

            <div className="w-screen min-h-screen flex justify-center items-center">

                <div className="xl:w-[60%] mm:w-full flex xl:flex-row mm:flex-col justify-center">
                    <div className="xl:w-[50%] mm:w-full xl:py-10 xl:px-10 mm:py-5 mm:px-5 xl:flex flex-col justify-evenly bg-[#EEF4FF] xl:rounded-l-2xl xl:rounded-tr-none mm:rounded-t-2xl border-r-2 border-[#E5E7EB]"> 
                        <div className="flex flex-col xl:my-10 mm:my-5">
                            <h1 className="font-Poppins text-[#4a79ff] p-2 xl:text-3xl mm:text-2xl">Reset Your Password 🔐</h1>
                            <div className="mt-5 px-2">
                                <span className="font-Poppins text-gray-600 py-1">Forgot your password? No worries — we'll help you get back into your account securely.</span>
                            </div>
                        </div>

                        <div className="my-5">
                            <p className="text-gray-600 p-2 font-Poppins">Create a new password and get back to managing your work with ease.</p>
                        </div>
                    </div>

                    <div className="xl:w-[50%] mm:w-full flex flex-col bg-[#EEF4FF] xl:rounded-r-2xl xl:rounded-bl-none mm:rounded-b-2xl justify-center">
                        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center">

                            {errorDiv && (
                                <div className="flex justify-center items-center mt-5">
                                    <img src={cross} className="object-contain w-4 h-4"/>
                                    <p className="font-Poppins text-red-500 ml-2">{err_msg}</p>
                                </div>
                            )}

                            {stepCount == 1 && (
                                <div className="xl:w-[70%] mm:w-[90%] flex mm:mt-0 ml:mt-5">
                                    <input type="text" placeholder="Enter Username" name="Username" autoComplete="off" onChange={handleChangeFormOne} value={formOne.Username} className="font-Poppins p-5 w-full bg-[#e0e6f9] rounded-2xl placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0 disabled:cursor-not-allowed" disabled={disabled} />
                                </div>
                            )}
                            
                            {stepCount == 2 && (
                                <div className="flex flex-col justify-center items-center xl:mt-5 mm:mt-0">
                                <div className="xl:w-[70%] bg-[#e0e6f9] flex mt-8 mb-2 justify-center mm:w-[90%] rounded-2xl">
                                    {/* <div className="w-[90%]  rounded-l-2xl"> */}
                                        <input type={typeText ? "text" : "password"} placeholder="New Password"  name="Password" value={formTwo.Password} onChange={handleChangeFormTwo} className=" font-Poppins w-full p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                                    {/* </div> */}

                                    {eyeclose && (
                                        <div className="xl:w-[10%] mm:w-[13%] flex justify-center items-center hover:cursor-pointer">
                                            <img src={eye_close} className="p-2" onClick={togglePassword}/>
                                        </div>
                                    )}

                                    {eyeopen && (
                                        <div className="xl:w-[10%] mm:w-[13%] flex justify-center items-center hover:cursor-pointer">
                                            <img src={eye_open} className="p-2" onClick={togglePassword}/>
                                        </div>
                                    )}
                                </div>

                                <div className="xl:w-[70%] bg-[#e0e6f9] flex mt-8 mb-2 justify-center ml:w-[85%] mm:w-[90%] rounded-2xl">
                                {/* <div className="w-[90%]  rounded-l-2xl"> */}
                                    <input type={typeText ? "text" : "password"} placeholder="Confirm New Password"  name="Confirm_password" value={formTwo.Confirm_password} onChange={handleChangeFormTwo} className=" font-Poppins w-full p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                                {/* </div> */}

                                {eyeclose && (
                                    <div className="xl:w-[10%] mm:w-[13%] flex justify-center items-center hover:cursor-pointer">
                                        <img src={eye_close} className="p-2" onClick={togglePassword}/>
                                    </div>
                                )}

                                {eyeopen && (
                                    <div className="xl:w-[10%] mm:w-[13%] flex justify-center items-center hover:cursor-pointer">
                                        <img src={eye_open} className="p-2" onClick={togglePassword}/>
                                    </div>
                                )}
                                </div>
                                </div>
                            )}


                            <div className="flex mt-15 justify-center mb-10">
                                <div className="bg-[#3062f0] flex justify-center rounded-3xl shadow-2xl shadow-blue-400 ml:w-[50%] mm:w-[50%] outline-0">

                                {loader && (
                                    <div className="w-[40%] flex justify-center items-center">
                                        <div className="w-full p-2 ml:w-[75%] mm:w-full">
                                            <Spin size="large" indicator={<LoadingOutlined style={{ color : "#ffffff" }}  spin />} />
                                        </div>
                                    </div>
                                )}

                                {submitBt && (
                                    <div className="flex shrink-0 bg-[#3062f0] rounded-3xl">
                                        <button type="submit" className="px-5 py-3 text-white font-Poppins hover:cursor-pointer">{stepCount === 1 ? "Continue" : "Reset Password"}</button>
                                    </div>
                                )}
                                </div>                    
                            </div>

                        </form>

                    </div>
                </div>

            </div>
        </div>

        
    )
}


export default Reset;