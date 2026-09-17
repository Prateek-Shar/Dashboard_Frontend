import { HeroSectionDemo } from "../components/login_section/demo"
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Landing_Page = () => {

    const navigate = useNavigate()
    
    const handleAutoLogin = async() => {
        
        const res = await axios.get(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getInfo` , {
            withCredentials : true,
        });

        if(!res) {
            navigate("/")
            return;
        }

        navigate("/overview");
        return;
    }


    useEffect(() => {
        handleAutoLogin()
    } , [])

    return (
        <HeroSectionDemo />
    )
}


export default Landing_Page;