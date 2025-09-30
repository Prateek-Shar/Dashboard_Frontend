// import { Select } from 'antd';
import { useRef, useState } from 'react';
import { useAlert } from '../../context/result';


const   NewCustomerForm = () => {

    const defaultForm = {
        Customer_name : "",
        Company_name : "",
        Contact_no : "",
        Country : "",
        Email : "",
        Status : "",
        CID : 0,
        Created_at : new Date()
    };

    const { showSuccess, showFailure , hideAlerts } = useAlert();


    const [form, setForm] = useState({ ...defaultForm });

    // const [placeholderCustomerName , setPlaceholderCustomerName] = useState("Enter Customer Name")
    // const [placeholderCompamyName , setPlaceholderCompanyName] = useState("Enter Company Name")
    // const [placeholderContact , setPlaceholderContact] = useState("Enter Contact Number")
    // const [placeholderCountry , setPlaceholderCountry] = useState("Enter Country")
    // const [placeholderEmail , setPlaceholderEmail] = useState("Enter Email Address")


    const SubmitDiv = useRef<HTMLDivElement>(null)


    const sendCustomer = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const stats = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_customer_stats`, {
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

            const res = await fetch("https://dashboard-backend-1-0w4b.onrender.com/send_customer", {
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


    // const divsChange = () => {
    //     setPlaceholderCustomerName("Enter Customer Name")
    //     setPlaceholderCompanyName("Enter Company Name")
    //     setPlaceholderContact("Enter Contact Number")
    //     setPlaceholderCountry("Enter Country")
    //     setPlaceholderEmail("Enter Email Address")
    // }


    

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
        
    //     setForm(prev => ({
    //         ...prev,
    //         [name]: name === "Contact_no" ? Number(value) : value
    //     }))
    // };

    // const handleSelectChange = (value: string) => {
    //     setForm(prev => {
    //         const updated = { ...prev, Status: value };
    //         console.log("Updated form:", updated); // Check if Status is present
    //         return updated;
    //     });
    // };





    return (    
        <>
        <div className="w-full">
            <form onSubmit={sendCustomer} method='post'>

                <div className='w-full bg-amber-700 mt-5'>    
                    <div className='w-[40%] p-2'>
                        <p className='font-Poet text-2xl'>Personal Information</p>
                    </div>
                </div>

                <div className='w-[98%] flex justify-between mt-5 ml-2 mr-2'>
                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Full Name : </p>
                        </div>

                        <div className='w-[60%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type = "text" autoComplete="text"  name="Customer_name" className='w-full p-3'/>
                        </div>
                    </div>

                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Country : </p>
                        </div>

                        <div className='w-[60%] border-2 border-[#d8dee9] rounded-[5px] '>
                            <input type='text' autoComplete='text' name="Country" className='w-full p-3'/>
                        </div>
                    </div>
                </div>

                <div className='w-[98%] flex justify-between mt-10 ml-2 mr-2'>
                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Email : </p>
                        </div>

                        <div className='w-[60%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type = "email" autoComplete="text" name='Email' className='w-full p-3'/>
                        </div>
                    </div>

                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Contact No. : </p>
                        </div>

                        <div className='w-[60%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type='number' autoComplete='text' name='Contact_no' className='w-full p-3' />
                        </div>
                    </div>
                </div>

                <div className='w-full bg-amber-700 mt-10'>    
                    <div className='w-[40%] p-2'>
                        <p className='font-Poet text-2xl'>Company Details</p>
                    </div>
                </div>

                
                <div className='w-[98%] flex justify-between mt-10 ml-2 mr-2'>
                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Company Name : </p>
                        </div>

                        <div className='w-[60%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type = "text" autoComplete="text" name='Company_name' className='w-full p-3'/>
                        </div>
                    </div>

                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Industry  : </p>
                        </div>

                        <div className='w-[60%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type='text' autoComplete='text' name="Industry" className='w-full p-3'/>
                        </div>
                    </div>
                </div>


                <div className='w-[98%] flex justify-between mt-10 ml-2 mr-2'>
                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Social Media (if any) : </p>
                        </div>

                        <div className='w-[60%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type ="url" autoComplete="text" name='links' className='w-full p-3' />
                        </div>
                    </div>

                    <div className='w-[40%] flex'>
                        <div className='w-[40%] flex items-center'>
                            <p className='font-Poppins'>Customer Type / Status  : </p>
                        </div>

                        <div className='w-[60%] rounded-[5px] border-2 border-[#d8dee9]'>
                            <input type='text' autoComplete='text' name='Status' className='w-full p-3'/>
                        </div>
                    </div>
                </div>


                {/* <div className='w-[26%] flex flex-col absolute right-50 top-83' ref={StatusMainDiv}> 
                    <div className="w-[55%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl ml-3" ref={StatusHeading}>
                        <p className='font-Poppins p-2'>Customer Status</p>
                    </div> 

                    <div className="w-[95%] mt-8 mb-3 flex items-center ml-4" ref={StatusInput}>
                        <Select
                            showSearch
                            placeholder="Select / Search Status"
                            optionFilterProp="label"
                            className='w-full'
                            value={form.Status || undefined}
                            onClick={showHeading6}
                            onChange={handleSelectChange}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={[
                                { value: 'Active', label: 'Active' },
                                { value: 'Inactive', label: 'Inactive' }
                            ]}
                        />
                    </div>
                </div> */}

                

                <div className='w-full flex justify-center items-center mt-20 mb-5' ref={SubmitDiv}>
                    <div className='w-[15%] bg-linear-to-r from-[#00b4d8] to-[#90e0ef] flex justify-center items-center rounded-3xl'>
                        <button type="submit" className='p-3 w-full hover:cursor-pointer font-Poppins'>Submit</button>
                    </div>
                </div>  

            </form>
        </div>

        </>
    );
}

export default NewCustomerForm;
