import eye_open from "/images/eye_open.png";
import { useState } from "react";
import cross from "/images/cross.png"
import uncheck_checkbox from "/images/checkbox_uncheck.png";
import checked_checkbox from "/images/checkbox_checked.png";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


interface ToggleToSwitch {
    onSwitch : () => void
}


const Register_Form:React.FC<ToggleToSwitch> = ( {onSwitch} ) => {

    const default_form = {
        Username: "",
        Email: "",
        Password: "",
        Profession: "",
    } 

    const [form, setForm] = useState(default_form);
    const [errorDiv , setErrorDiv] = useState(false)
    const [isChecked , setIsChecked] = useState(false)
    const [typeText , setTypeText] = useState(false)
    const [loader , setLoader] = useState(false)

    const [err_msg , setErrMsg] = useState<string>("")


    const handleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log('Input change:', name, value);
        setForm((prev) => {
            const newForm = { ...prev, [name]: value };
            console.log('New form state:', newForm);
            return newForm;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setLoader(true)

        e.preventDefault();
        
        if (!isChecked) {
            alert("You must agree to Terms and Condition before SignUp")
        }

        const formData = { ...form};

        const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/newUser` , {
            method: "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (res.ok) {
            setLoader(false)
            console.log("User registered successfully:", data);
            onSwitch()
        }

        if (!res.ok) {
            setLoader(false)
            setErrMsg(data.err_msg)
            setErrorDiv(true)

            setIsChecked(false)
            
            setTimeout(() => {
                setErrorDiv(false)
            } , 3000)

            setForm({ ...default_form });
            return;
        }   
    };

    
    const togglePassword = () => {
        setTypeText(prev => !prev);
    }



    return (
        <div className="w-[80%] mt-10 mb-5">
            <form onSubmit={handleSubmit} className="flex flex-col">

                {errorDiv && (
                    <div className="w-full flex justify-center items-center">
                        <div className="w-[50%] flex justify-center items-center">
                            <div className="w-[15%] flex justify-center items-center">
                                <img src={cross} className="object-contain w-[80%] p-2" />
                            </div>

                            <div className="flex">
                                <p className="font-Poppins p-1 text-red-600">{err_msg}</p>
                            </div>
                        </div>
                    </div>
                )}  
                
                <div className="w-full flex justify-center mt-5">
                    <input type="text" placeholder="Enter User Name" onChange={handleChange} value={form.Username} name="Username" autoComplete="off" className="font-Poppins w-[70%] bg-[#e0e6f9] rounded-2xl p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                </div>
                 

                <div className="w-full mt-8 flex justify-center">
                    <input type="text" placeholder="Enter Email" value={form.Email} onChange={handleChange} name="Email" autoComplete="text" className="font-Poppins p-5 w-[70%] bg-[#e0e6f9] rounded-2xl placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0" />
                </div>

                <div className="w-full flex mt-8 mb-2 justify-center">
                    <div className="w-[60%] bg-[#e0e6f9] rounded-l-2xl">
                        <input type={typeText ? "text" : "password"} placeholder="Enter Password" value={form.Password} onChange={handleChange} autoComplete="password" name="Password" className="font-Poppins w-full p-5 placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                    </div>

                    <div className="w-[10%] flex justify-center items-center bg-[#e0e6f9] rounded-r-2xl">
                        <img src={eye_open} className="object-contain w-[50%] hover:cursor-pointer" onClick={togglePassword}/>
                    </div>
                </div>

                <div className="w-full flex justify-center mt-8">
                    <input type="text" placeholder="Enter Profession" onChange={handleChange} value={form.Profession} name="Profession" autoComplete="text" className="font-Poppins w-[70%] rounded-2xl p-5 bg-[#e0e6f9] placeholder:text-[#9299a9] placeholder:font-Poppins focus:outline-0"/>
                </div>


                <div className="w-full p-2 mt-8 flex justify-center">
                    <div className="w-[10%] flex justify-center">
                        <img src={!isChecked ? uncheck_checkbox : checked_checkbox} onClick={handleCheckbox} className="w-[50%] object-contain"/>
                    </div>

                    <div className="w-[50%] flex items-center">
                        <p className="font-Poppins">Agree To Terms and Conditions</p>
                    </div>
                </div>

                <div className="w-full p-2 flex mt-10  mb-5 justify-center">
                    <div className="w-[40%] bg-[#3062f0] flex justify-center rounded-3xl shadow-2xl shadow-blue-400">

                    {loader && (
                        <div className="w-[20%] flex justify-center items-center">
                            <div className="w-full p-2">
                                <Spin size="large" indicator={<LoadingOutlined style={{ color : "#ffffff" }}  spin />} />
                            </div>
                        </div>
                    )}

                        <div className="w-[50%] flex">
                            <button type="submit" className="w-full p-3 text-white font-Poppins hover:cursor-pointer">Sign In</button>
                        </div>
                    </div>

                </div>
            </form>
            
        </div>
    )

}

export default Register_Form;