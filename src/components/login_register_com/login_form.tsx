import eye_open from "/images/eye_open.png";
import google from "/images/google.png";
import facebook from "/images/facebook.png";
import twitter from "/images/twitter.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/login_context";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


const formDefault = {
    Username: "",
    Password: "",
};


const Login_form = () => {


    const [form, setForm] = useState(formDefault);
    const [errorDiv , setErrorDiv] = useState(false)
    const [typeText , setTypeText] = useState(false)
    const [loader , setLoader] = useState(false)
    const [submitBt , setSubmitBt] = useState(true);

    const [err_msg , setErrMsg] = useState<string>("")


    const { LoadUserApi } = useUser()


    const navigate = useNavigate();



    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('Input change:', name, value);
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            console.log('New form state:', newForm);
            return newForm;
        });
    }

    const api = import.meta.env.VITE_PRODUCTION_ADDRESS;

    // console.info(`api : ${api}`) 


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
                setErrorDiv(true)

                setTimeout(() => {
                    setErrorDiv(false)
                } , 5000)

                setForm({...formDefault})

                setLoader(false)
                setSubmitBt(true);
                return;
            }

            localStorage.setItem("User Data" , JSON.stringify({
                Username : data.login_det.Username,
                Profession : data.login_det.Profession
            }) ) 

            console.log("Msg : " , data.message);

            setLoader(false)
            setSubmitBt(true)

            await LoadUserApi()

            navigate("/overview");
            return;

        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const togglePassword = () => {
        setTypeText(prev => !prev);
    }


    return (
        
       <div className="xl:w-[80%] mt-20 flex flex-col ml:w-full mm:mt-10">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">

                {errorDiv && (
                    <div className="w-full flex justify-center">
                        <div className="w-[60%] m-1 p-1 flex justify-center">
                            <p className="font-Poppins text-red-800">{err_msg}</p>
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

                    <div className="w-[10%] flex justify-center items-center bg-[#e0e6f9] rounded-r-2xl">
                        <img src={eye_open} className="object-contain w-[50%] hover:cursor-pointer" onClick={togglePassword} />
                    </div>
                </div>

                <div className="w-full flex mt-15 justify-center mb-10">
                    <div className="xl:w-[30%] bg-[#3062f0] flex justify-center rounded-3xl shadow-2xl shadow-blue-400 ml:w-[50%] mm:w-[50%]">

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

            {/* <div className="w-full mt-20 flex justify-evenly">
                <div className="xl:w-[30%] ml:w-[20%] mm:w-[15%] flex justify-center items-center">
                    <hr className="border-[#acafbc] border-2 w-full" />
                </div>

                <div className="xl:w-[30%] ml:w-[50%] mm:w-[45%] flex justify-center items-center">
                    <p className="font-Poppins mm:text-[12px] ml:text-[16px]">Or Continue With</p>
                </div>

                <div className="xl:w-[30%] ml:w-[20%] mm:w-[15%] flex justify-center items-center">
                    <hr className="border-[#acafbc] border-2 w-full" />
                </div>
            </div>

            <div className="w-full flex justify-evenly mt-10 mb-5 xl:mb-10">
                <div className="w-[20%] bg-[#dce2f0] p-4 mm:p-3 flex justify-center items-center rounded-2xl">
                    <img src={google} className="object-contain xl:w-[30%] ml:w-[40%] mm:w-[50%]"/>
                </div>  

                <div className="w-[20%] bg-[#dce2f0] p-2 mm:p-2 flex justify-center items-center rounded-2xl">
                    <img src={facebook} className="object-contain xl:w-[30%] w-[40%]"/>
                </div>  

                <div className="w-[20%] bg-[#dce2f0] p-2 mm:p-2 flex justify-center items-center rounded-2xl">
                    <img src={twitter} className="object-contain xl:w-[25%] w-[30%]"/>
                </div>  
            </div> */}

        </div>


    )
}

export default Login_form;