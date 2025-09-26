import Hello from "../../images/Hello.png"
import links from "../../images/link.png"
import add from "../../images/add.png"
import right from "../../images/right_arr.png";
import { Skeleton } from 'antd';
import { useRef , useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserData {
  Username : string;
  Profession: string;
  UID: number;
}


const Overview_Head = () => {

    const [Loader, setLoader] = useState(false);
    const [userDetails, setUserDetails] = useState<UserData | null>(null);

    const Navigate = useNavigate()

    const MoreLinks = useRef<HTMLDivElement>(null);
    const QuickLinksBt = useRef<HTMLDivElement>(null);
    const resetBt = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await fetch("https://dashboard-backend-1-0w4b.onrender.com/getUserInfo", {
            credentials: "include",
            method : "GET"
            });
            const data = await res.json();
    
            if (res.ok) {
            setUserDetails(data.login_det); // set { Username, Profession, UID }
            } else {
            console.warn("Not authenticated:", data.error);
            }
        
        setLoader(true);
    
        } catch (error) {
            console.error("Failed to load user", error);
        }
        };
    
        setTimeout(() => {
        fetchUser();
        } , 1000)
        
    }, []);
    

    const handleQuickLinks = () => {

        if(MoreLinks.current) {
            MoreLinks.current.style.display = "flex"
        }

        if(resetBt.current) {
            resetBt.current.style.display = "flex"
        }
        
        if(QuickLinksBt.current) {
            QuickLinksBt.current.style.display = "none"
        }
    }

    const ResetToQuickLinksDiv = () => {

        if(resetBt.current) {
            resetBt.current.style.display = "none"
        }

        if(MoreLinks.current) {
            MoreLinks.current.style.display = "none"
        }

        if(QuickLinksBt.current) {
            QuickLinksBt.current.style.display = "flex"
        }
    }


    const handleClickToCustomer = () => {
        Navigate("/addCustomer")
    }

    const handleClickToIncome = () => {
        Navigate("/addIncome")
    }

    const handleClickToProducts = () => {
        Navigate("/addProduct")
    }


    return (
        <>

        <div className="w-[50%] flex flex-col">

            <div className="w-full ml-2">
                <p className="font-Poppins text-2xl p-1">Overview</p>
            </div>

            {Loader? (
                <div className="w-[30%] flex ml-2">
                    <div className="w-[80%] flex items-center">
                        <p className="font-Poppins text-[16px]  pl-1">Welcome Back , {userDetails?.Username}</p>
                    </div>

                    <div className="w-[10%] flex justify-center items-center">
                        <img src={Hello} className="pl-1"/>
                    </div>
                </div>
            ) : (

                <div className="w-full ml-3">
                    <Skeleton paragraph={{rows : 0}} active />
                </div>
            )}
            
        </div>

        <div className="w-[50%] flex flex-row-reverse ">

            <div className="w-[20%] h-13 flex bg-white m-2 p-2 justify-center shadow-2xs rounded-[50px] hover:cursor-pointer" onClick={handleQuickLinks} ref={QuickLinksBt}>
                <div className="w-[70%] flex justify-center items-center">
                    <p className="font-Poppins">Quick Links</p>
                </div>

                <div className="w-[20%] p-2 flex justify-center items-center">
                    <img src={links} />
                </div>
            </div>


            <div className="expand-div m-2 justify-evenly items-center hidden" ref={MoreLinks} >

                <div className="w-[5%] h-6.5 flex justify-center items-center p-1 bg-white rounded-[100px] mt-3 mb-2 border-2 border-[#ced4da] shadow-2xl hover:cursor-pointer"  ref={resetBt} onClick={ResetToQuickLinksDiv}>
                    <div className="w-full">
                        <img src={right} />
                    </div>  
                </div>

                <div className="w-[25%] flex bg-[#ced4da] m-1 justify-around rounded-2xl hover:cursor-pointer p-1" onClick={handleClickToProducts}>
                    <div className="w-[70%] flex justify-center items-center">
                        <p className="font-Poppins text-[14px]">Add Product</p>
                    </div>

                    <div className="w-[20%] p-1.5 flex justify-center items-center">
                        <img src={add} />
                    </div>
                </div>

                <div className="w-[25%] flex bg-[#ced4da] m-1 justify-around rounded-2xl hover:cursor-pointer p-1" onClick={handleClickToIncome}>
                    <div className="w-[70%] flex justify-center items-center">
                        <p className="font-Poppins text-[14px]">Add Income</p>
                    </div>

                    <div className="w-[20%] p-1.5 flex justify-center items-center">
                        <img src={add} />
                    </div>
                </div>

                <div className="w-[30%] flex white bg-[#ced4da] m-1 justify-around rounded-2xl hover:cursor-pointer" onClick={handleClickToCustomer}>
                    <div className="w-[80%] flex justify-center items-center">
                        <p className="font-Poppins text-[14px]">Add Customer</p>
                    </div>

                    <div className="w-[20%] p-2 flex justify-center items-center">
                        <img src={add} />
                    </div>
                </div>
            </div>

        </div>


        </>
    )
}


export default Overview_Head