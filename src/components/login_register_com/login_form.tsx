import cross from "/images/cross.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/login_context";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import eye_close from "/images/eye_close.png";
import eye_open from "/images/eye_open.png";


const formDefault = {
    Username: "",
    Password: "",
};

interface OnErrMsg {
    err : (value : String) => void
}

const Login_form:React.FC<OnErrMsg> = ({err}) => {


    const [form, setForm] = useState(formDefault);
    const [errorDiv , setErrorDiv] = useState(false)
    const [typeText , setTypeText] = useState(false)
    const [loader , setLoader] = useState(false)
    const [submitBt , setSubmitBt] = useState(true);

    const [eyeclose , setEyeclose] = useState(true)
    const [eyeopen , setEyeopen] = useState(false)

    const [err_msg , setErrMsg] = useState<string>("")


    const { LoadUserApi } = useUser()


    const navigate = useNavigate();



    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            return newForm;
        });
    }

    const api = import.meta.env.VITE_PRODUCTION_ADDRESS;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoader(true)
            setSubmitBt(false);

            const res = await fetch(`${api}/UserCheck`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(form),
                headers: {
                    "Content-Type": "application/json",
                },  
            });

            const data = await res.json();

            if (!res.ok) {
                console.log("Failed to login user:", data.msg || data.error);

                setErrMsg(data.msg || data.error)
                err(err_msg)
                
                setErrorDiv(true)

                setTimeout(() => {
                    setErrorDiv(false)
                } , 5000)

                setForm({...formDefault})

                setLoader(false)
                setSubmitBt(true);
                return;
            }

            // localStorage.setItem("User Data" , JSON.stringify({
            //     Username : data.login_det.Username,
            //     Profession : data.login_det.Profession
            // }) ) 

            console.log("Msg : " , data.message);

            setLoader(false)
            setSubmitBt(true)

            LoadUserApi()

            navigate("/overview");
            return;

        } catch (error) {
            console.error("Error during login:", error);
            setErrorDiv(true)
            setErrMsg(String(error));

            setTimeout(() => {
                setErrorDiv(false)
            } , 5000)

            setLoader(false)
            setSubmitBt(true)
            setForm({...formDefault})
        }
    };

    const togglePassword = () => {
        setTypeText(prev => !prev);
        setEyeclose(prev => !prev);
        setEyeopen(prev => !prev);
    }

    return (
        
       <div className="xl:w-[80%] mt-20 flex flex-col ml:w-full mm:mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">

                {errorDiv && (
                    <div className="w-full flex justify-center items-center mb-2">
                        <div className="w-[50%] flex justify-center items-center">
                            <img src={cross} className="object-contain w-[6%]"/>
                            <p className="font-Poppins text-red-500 ml-2">{err_msg}</p>
                        </div>
                    </div>
                )}


                <div className="xl:w-[70%] xl:mt-5 ml:w-[85%] mm:w-[90%] mm:mt-0 ml:mt-5">
                    <input type="text" placeholder="Enter Username" name="Username" autoComplete="off" onChange={handleChange} value={form.Username} className="font-Poppins p-5 w-full bg-[#e0e6f9] rounded-2xl placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0" />
                </div>

                <div className="xl:w-[70%] flex mt-8 mb-2 justify-center ml:w-[85%] mm:w-[90%]">
                    <div className="w-[90%] bg-[#e0e6f9] rounded-l-2xl">
                        <input type={typeText ? "text" : "password"} placeholder="Enter Password"  name="Password" value={form.Password} onChange={handleChange} className=" font-Poppins w-full p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                    </div>

                    {eyeclose && (
                        <div className="w-[10%] flex justify-center items-center bg-[#e0e6f9] rounded-r-2xl">
                            <img src={eye_close} className="object-contain w-[50%] hover:cursor-pointer" onClick={togglePassword}/>
                        </div>
                    )}

                    {eyeopen && (
                        <div className="w-[10%] flex justify-center items-center bg-[#e0e6f9] rounded-r-2xl">
                            <img src={eye_open} className="object-contain w-[50%] hover:cursor-pointer" onClick={togglePassword}/>
                        </div>
                    )}
                </div>

                <div className="w-full flex mt-15 justify-center mb-10">
                    <div className="xl:w-[30%] bg-[#3062f0] flex justify-center rounded-3xl shadow-2xl shadow-blue-400 ml:w-[50%] mm:w-[50%] outline-0">

                    {loader && (
                        <div className="w-[40%] flex justify-center items-center">
                            <div className="w-full p-2 ml:w-[75%] mm:w-full">
                                <Spin size="large" indicator={<LoadingOutlined style={{ color : "#ffffff" }}  spin />} />
                            </div>
                        </div>
                    )}

                    {submitBt && (
                        <div className="w-[50%] flex mm:w-[80%]">
                            <button type="submit" className="w-full p-3 text-white font-Poppins hover:cursor-pointer">Sign In</button>
                        </div>
                    )}
                    </div>                    
                </div>

            </form>

        </div>


    )
}

export default Login_form;