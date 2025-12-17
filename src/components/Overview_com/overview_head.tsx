import Hello from "/images/Hello.png"
import links from "/images/link.png"
import add from "/images/add.png"
import right from "/images/right_arr.png";
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

    const [moreLinks , setMoreLinks] = useState(false)
    const [quickLinksBt , setQuickLinksBt] = useState(true)
    // const MoreLinks = useRef<HTMLDivElement>(null);
    // const QuickLinksBt = useRef<HTMLDivElement>(null);
    const resetBt = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const fetchUser = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getUserInfo`, {
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
        setMoreLinks(true)
        setQuickLinksBt(false)
    }

    const ResetToQuickLinksDiv = () => {
        setMoreLinks(false)
        setQuickLinksBt(true)
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

        <div className="xl:w-[50%] flex flex-col ml:w-full mm:w-full">

            <div className="w-full ml-2">
                <p className="font-Poppins text-2xl p-1 ml:text-[20px] mm:text-[20px]">Overview</p>
            </div>

            {Loader? (
                <div className="xl:w-[32%] flex ml-2 ml:w-[80%] mm:w-[80%]">
                    <div className="w-[80%] flex items-center">
                        <p className="font-Poppins xl:text-[16px] pl-1 ml:text-[12px] mm:text-[11px]">Welcome Back , {userDetails?.Username}</p>
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

        <div className="w-[50%] flex items-center flex-row-reverse">

            {quickLinksBt && (
                <div className="xl:w-[20%] flex bg-white justify-center shadow-2xs rounded-[50px] hover:cursor-pointer mr-2 ml:w-[30%] mm:w-[35%]" onClick={handleQuickLinks}>
                    <div className="xl:w-[70%] xl:flex justify-center items-center my-2.5 ml:hidden mm:hidden ">
                        <p className="font-Poppins ml:text-[12px] mm:text-[9px] xl:text-[16px]">Quick Links</p>
                    </div>

                    <div className="xl:w-[20%] xl:p-1 flex justify-center items-center mm:p-2 mm:w-full ml:w-full ml:p-2">
                        <img src={links} className="object-contain w-[60%]"/>
                    </div>
                </div>
            )}

            {moreLinks && (
                <div className="expand-div flex justify-evenly items-center">

                    <div className="w-[4%] flex justify-center items-center bg-white rounded-[100px] mt-3 mb-2 border-2 border-[#ced4da] shadow-2xl hover:cursor-pointer"  ref={resetBt} onClick={ResetToQuickLinksDiv}>
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

                    <div className="w-[28%] flex white bg-[#ced4da] m-1 justify-around rounded-2xl hover:cursor-pointer" onClick={handleClickToCustomer}>
                        <div className="w-[75%] flex justify-center items-center">
                            <p className="font-Poppins text-[14px]">Add Customer</p>
                        </div>

                        <div className="w-[20%] p-2 flex justify-center items-center">
                            <img src={add} />
                        </div>
                    </div>
                </div>

            )}

        </div>

        </>
    )
}


export default Overview_Head