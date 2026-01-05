// import { Select } from 'antd';
import { useRef, useState } from 'react';
import { useAlert } from '../../context/result';


const NewCustomerForm = () => {

    const defaultForm = {
        Customer_name : "",
        Company_name : "",
        Contact_no : "",
        Country : "",
        Email : "",
        Status : "",
        CID : 0,
        Industry : "",
        Social_Media : "",
        Created_at : new Date()
    };

    const { showSuccess, showFailure , hideAlerts} = useAlert();


    const [form, setForm] = useState({ ...defaultForm });

    const [StatusBox , setStatusBox] = useState(false)
    const [showSuggestionCountryBox , setShowSuggestionCountryBox] = useState(false)


    const SubmitDiv = useRef<HTMLDivElement>(null)
    const StatusInput = useRef<HTMLDivElement>(null)
    const CountryInputBox = useRef<HTMLDivElement>(null)


    const sendCustomer = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const stats = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_customer_stats`, {
                method: "GET",
                credentials: "include"
            });

            if (!stats.ok) {
                console.log("Error Occurred while fetching customer stats");
                showFailure();
                return;
            }

            const data = await stats.json();
            const next_cid = data.next_cid

            const formToSend = {
                ...form,
                CID: next_cid,
                Created_at: new Date()
            };

            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/send_customer`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formToSend) // ✅ This line is critical
            });

            if (!res.ok) {
                console.log("Something broke in frontend...........");
                showFailure();
                setTimeout(() => hideAlerts(), 3000);
                setForm({...defaultForm})
                return;
            }

            const responseData = await res.json();
            console.log("Response from server:", responseData);

            // divsChange();
            showSuccess();
            setTimeout(() => hideAlerts(), 3000);

            setForm({ ...defaultForm }); // CID will be fetched again next time

        } catch (err) {
            console.log("Failed to submit data", err);
            showFailure();
        }
    };



    const SendStatus = (status: string) => {
        setForm(prev => ({
            ...prev,
            Status: status
        }));

        if(StatusInput.current) {
           StatusInput.current.style.border = "2px solid #d8dee9";
        }

        setStatusBox(false); // Hide suggestions box
    };
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setForm(prev => ({
            ...prev,
            [name]: name === "Contact_no" ? Number(value) : value
        }))
    };

    const handleSelectSuggestion = (value: string) => {
        setForm(prev => ({
            ...prev,
            Country: value
        }));

        if(CountryInputBox.current) {
            CountryInputBox.current.style.border = "2px solid #d8dee9"
        }

        setShowSuggestionCountryBox(false);
    };


    // const handleSelectChange = (value: string) => {
    //     setForm(prev => {
    //         const updated = { ...prev, Status: value };
    //         console.log("Updated form:", updated); // Check if Status is present
    //         return updated;
    //     });
    // };

    const suggestions = ["India" , "asdasd" , "sdasdasd"]

    const ShowCountrySuggestion = () => {

        if(CountryInputBox.current) {
            CountryInputBox.current.style.borderBottom = "none"
        }

        setShowSuggestionCountryBox(true)
    }

    const showSuggestions = () => {

        if(StatusInput.current) {
            StatusInput.current.style.borderBottom = "none"
        }

        setStatusBox(true);
    }


    return (    
        <>
        <div className="w-full">
            <form onSubmit={sendCustomer} method='post'>

                <div className='w-full bg-[#edf6f9] mt-5'>    
                    <div className='xl:w-[40%] mm:w-full p-2'>
                        <p className='font-Poet text-2xl'>Personal Information</p>
                    </div>
                </div>

                <div className='w-[98%] flex xl:flex-row mm:flex-col justify-between items-center mt-5 xl:ml-2 xl:mr-2 mm:ml-0 mm:mr-0'>
                    <div className='xl:w-[40%] mm:w-full flex xl:justify-normal mm:justify-center'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Full Name : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type = "text" autoComplete="text"  name="Customer_name" placeholder="Customer name" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Customer_name}/>
                        </div>
                    </div>

                    <div className='xl:w-[40%] mm:w-full flex flex-col xl:my-0 mm:my-4'>
                        <div className='w-full flex xl:justify-normal mm:justify-center'>
                            <div className='w-[40%] xl:flex mm:hidden items-center'>
                                <p className='font-Poppins'>Country : </p>
                            </div>

                            <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]' ref={CountryInputBox}>
                                <input type='text' autoComplete='text' name="Country" placeholder="Country" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={(e)=>{ handleInputChange(e); ShowCountrySuggestion(); }} value={form.Country}/>
                            </div>
                        </div>

                        {showSuggestionCountryBox && (
                            <div className='w-full flex flex-col'>
                                {suggestions.map(sug => (
                                    <div className='w-[60%] ml-[206px] border-2 border-t-0 border-[#d8dee9] nth-[n]:border-b-0 nth-last-[1]:border-b-2 hover:bg-[#edf6f9] hover:cursor-pointer' onClick={ () => handleSelectSuggestion(sug) }>
                                        <p className='p-2'>{sug}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='w-[98%] flex xl:flex-row mm:flex-col justify-between xl:mt-10 mm:mt-0 xl:ml-2 xl:mr-2'>
                    <div className='xl:w-[40%] mm:w-full flex xl:my-0 mm:my-3 xl:justify-normal mm:justify-center'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Email : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type = "email" autoComplete="text" name='Email' placeholder="Email" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Email}/>
                        </div>
                    </div>

                    <div className='xl:w-[40%] mm:w-full flex xl:my-0 mm:my-3 xl:justify-normal mm:justify-center'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Contact No. : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type='number' autoComplete='text' name='Contact_no' placeholder="Contact" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Contact_no} />
                        </div>
                    </div>
                </div>

                <div className='w-full bg-[#edf6f9] mt-10'>    
                    <div className='xl:w-[40%] mm:w-full p-2'>
                        <p className='font-Poet text-2xl'>Company Details</p>
                    </div>
                </div>

                
                <div className='w-[98%] flex xl:flex-row mm:flex-col justify-between mt-10 xl:my-2 mm:my-5'>
                    <div className='xl:w-[40%] mm:w-full xl:justify-normal mm:justify-center flex '>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Company Name : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type = "text" autoComplete="text" name='Company_name' placeholder="Company name" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Company_name}/>
                        </div>
                    </div>

                    <div className='xl:w-[40%] flex mm:w-full xl:justify-normal mm:justify-center xl:my-0 mm:my-5'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Industry  : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type='text' autoComplete='text' name="Industry" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' placeholder="Industry Type" onChange={handleInputChange} value={form.Industry}/>
                        </div>
                    </div>
                </div>


                <div className='w-[98%] flex xl:justify-between mm:justify-center items-center xl:mt-10 xl:ml-2 xl:mr-2 xl:flex-row mm:flex-col'>
                    <div className='xl:w-[40%] mm:w-[90%] flex'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Social Media (if any) : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-full border-2 border-[#d8dee9] rounded-[5px] flex items-center justify-center'>
                            <input type ="url" autoComplete="text" placeholder='Social Links' name='Social_Media' className='w-full p-3 outline-0' onChange={(e) => handleInputChange(e) } value={form.Social_Media}/>
                        </div>
                    </div>

                    <div className='xl:w-[40%] mm:w-[90%] flex flex-col xl:my-0 mm:my-4'>
                        <div className='w-full flex'>
                            <div className='w-[40%] xl:flex mm:hidden items-center'>
                                <p className='font-Poppins'>Customer Type / Status  : </p>
                            </div>

                            <div className='xl:w-[60%] mm:w-full rounded-[5px] border-2 border-[#d8dee9]' ref={StatusInput}>
                                <input type='text' autoComplete='text' name='Status' className='w-full p-3 outline-0 xl:placeholder:bg-transparent mm:placeholder:flex' placeholder="Status" onChange={(e) => { handleInputChange(e); showSuggestions(); }}  value={form.Status}/>
                            </div>
                        </div>

                        {StatusBox && (
                            <div className='w-[60%] ml-[206px] flex flex-col bg-white border-[#d8dee9] border-t-0 border-2 shadow-2xs'>
                                <div className='w-full mt-2 hover:bg-[#edf6f9] hover:cursor-pointer'>
                                    <p className='p-2 font-Poppins' onClick={ () => {SendStatus("Active")} }>Active</p>
                                </div>
                                <div className='w-full hover:bg-[#edf6f9] hover:cursor-pointer'>
                                    <p className='p-2 font-Poppins' onClick={ () =>{SendStatus("Inactive")} }>Inactive</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                

                <div className='w-full flex justify-center items-center xl:mt-20 mm:my-10 xl:mb-5' ref={SubmitDiv}>
                    <div className='xl:w-[15%] mm:w-[50%] bg-linear-to-r from-[#00b4d8] to-[#90e0ef] flex justify-center items-center rounded-3xl'>
                        <button type="submit" className='p-3 w-full hover:cursor-pointer font-Poppins'>Submit</button>
                    </div>
                </div>  

            </form>
        </div>

        </>
    );
}

export default NewCustomerForm;
