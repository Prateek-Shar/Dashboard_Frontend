import links from "/images/link.png"
import add from "/images/add.png"
import right from "/images/right_arr.png";
import { Skeleton } from 'antd';
import { useRef , useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

interface UserData {
  First_name : string
}


const Overview_Head = () => {

    const [Loader, setLoader] = useState(false);
    const [userDetails, setUserDetails] = useState<UserData | null>(null);
    const [moreLinks , setMoreLinks] = useState(false)
    const [quickLinksBt , setQuickLinksBt] = useState(true)

    const Navigate = useNavigate()

    const resetBt = useRef<HTMLDivElement>(null);

    const expandDivRef = useRef<HTMLDivElement>(null);

    const fetchUser = async () => {  
        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getUserInfo`, {
                credentials: "include",
                method : "GET"
            });

            const data = await res.json();
    
            if (!res.ok) {
                console.error("Not authenticated:", data.error);
                return;
            } 

            setUserDetails(data.login_det); 
        
        setLoader(true);
    
        } catch (error) {
            console.error("Failed to load user", error);
        }
    };

    useEffect(() => {
        fetchUser()        
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

    useEffect(() => {
        if(expandDivRef.current && moreLinks) {
            gsap.fromTo(expandDivRef.current, {
                width : "0px",
            } , {width : "600px",
                duration : 1
            })
        }
    })


    return (
        <>

        <div className="xl:w-[80%] flex flex-col mm:w-full">

            {/* <div className="w-full ml-2">
                <p className="font-Poppins text-2xl p-1 ml:text-[20px] mm:text-[20px]">Overview</p>
            </div> */}

            {Loader? (
                <div className="flex flex-col mt-4 xl:ml-10 mm:ml-0">
                    <div className="flex items-center px-4">
                        <p className="font-Alan xl:text-3xl ml:text-[12px] mm:text-[18px]">Hello , {userDetails?.First_name}</p>
                    </div>


                    <div className="flex px-4">
                        <p className="font-Poppins text-[#9197b3] pl-0.5 mt-2 xl:text-[16px] mm:text-[12px]">Everything you need to understand your business at a glance.</p>
                    </div>
                </div>
            ) : (

                <div className="w-full ml-3 mt-5">
                    <Skeleton paragraph={{rows : 0}} active />
                </div>
            )}
            
        </div>

        <div className="w-[50%] xl:flex mm:hidden items-center flex-row-reverse">

            {quickLinksBt && (
                <div className="flex justify-center shadow-2xs rounded-[50px] hover:cursor-pointer mr-2 p-2 w-fit bg-white" onClick={handleQuickLinks}>
                    <div className="xl:flex items-center ml:hidden mm:hidden">
                        <p className="font-Poppins ml:text-[12px] mm:text-[9px] xl:text-[16px]">Quick Links</p>
                    </div>

                    <div className="flex justify-center items-center xl:ml-2 mm:ml-0 w-6">
                        <img src={links} className="p-1"/>
                    </div>
                </div>
            )}

            {moreLinks && (
                <div className="flex justify-evenly items-center" ref={expandDivRef}>

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

                    <div className="w-[28%] flex white bg-[#ced4da] m-1 justify-around rounded-2xl hover:cursor-pointer p-1" onClick={handleClickToCustomer}>
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