import eye_open from "../../images/eye_open.png";
import google from "../../images/google.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/login_context";
import { useDebounceCallback } from "usehooks-ts";


const formDefault = {
    Username: "",
    Password: "",
};


const Login_form = () => {


    const [form, setForm] = useState(formDefault);
    const [errorDiv , setErrorDiv] = useState(false)
    const [typeText , setTypeText] = useState(false)


    const { LoadUserApi } = useUser()


    const navigate = useNavigate();


    const DebounceForUsername = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('Input change:', name, value);
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            console.log('New form state:', newForm);
            return newForm;
        });
    } , 2000);


    const DebounceForPassword = useDebounceCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('Input change:', name, value);
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            console.log('New form state:', newForm);
            return newForm;
        });
    } , 2000);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/UserCheck`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // important to send cookies
            body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Failed to login user:", data.message || data.error);

                setErrorDiv(true)

                setTimeout(() => {
                    setErrorDiv(false)
                } , 3000)

                setForm({...formDefault})

                return;
            }

            localStorage.setItem("User Data" , JSON.stringify({
                Username : data.login_det.Username,
                Profession : data.login_det.Profession
            }) ) 

            console.log("Login successful:", data);
            await LoadUserApi()
            navigate("/overview");

        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const togglePassword = () => {
        setTypeText(prev => !prev);
    }

    return (
        
       <div className="w-[80%] mt-20 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col items-center">

                {errorDiv && (
                    <div className="w-full flex justify-center">
                        <div className="w-[60%] m-1 p-1 flex justify-center">
                            <p className="font-Poppins text-red-800">Invalid Username Or Password</p>
                        </div>
                    </div>
                )}

                <div className="w-[70%] mt-5 ">
                    <input type="text" placeholder="Enter Username" name="Username" onChange={DebounceForUsername} autoComplete="text" className="font-Poppins p-5 w-full bg-[#e0e6f9] rounded-2xl placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0" />
                </div>

                <div className="w-[70%] flex mt-8 mb-2  justify-center">
                    <div className="w-[90%] bg-[#e0e6f9] rounded-l-2xl">
                        <input type={typeText ? "text" : "password"} placeholder="Enter Password" name="Password" onChange={DebounceForPassword} autoComplete="text" className=" font-Poppins w-full p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                    </div>

                    <div className="w-[10%] flex justify-center items-center bg-[#e0e6f9] rounded-r-2xl">
                        <img src={eye_open} className="object-contain w-[50%] hover:cursor-pointer" onClick={togglePassword} />
                    </div>
                </div>

                <div className="w-full p-2 flex mt-15 justify-center">
                    <div className="w-[40%] bg-[#3062f0] flex rounded-3xl shadow-2xl shadow-blue-400">
                        <button type="submit" className="w-full p-3 text-white font-Poppins hover:cursor-pointer">Sign In</button>
                    </div>
                </div>
            </form>

            <div className="w-full mt-20 flex justify-evenly">
                <div className="w-[30%] flex justify-center items-center">
                    <hr className="border-[#acafbc] border-2 w-full" />
                </div>

                <div className="w-[30%] flex  justify-center items-center">
                    <p className="font-Poppins">Or Continue With</p>
                </div>

                <div className="w-[30%] flex justify-center items-center">
                    <hr className="border-[#acafbc] border-2 w-full" />
                </div>
            </div>

            <div className="w-full flex justify-evenly mt-10 mb-5">
                <div className="w-[20%] bg-[#dce2f0] p-4 flex justify-center items-center rounded-2xl">
                    <img src={google} className="object-contain w-[40%]"/>
                </div>  

                <div className="w-[20%] bg-[#dce2f0] p-2 flex justify-center items-center rounded-2xl">
                    <img src={facebook} className="object-contain w-[40%]"/>
                </div>  

                <div className="w-[20%] bg-[#dce2f0] p-2 flex justify-center items-center rounded-2xl">
                    <img src={twitter} className="object-contain w-[30%]"/>
                </div>  
            </div>

        </div>


    )
}

export default Login_form;