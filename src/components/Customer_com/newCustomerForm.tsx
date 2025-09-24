import { Select } from 'antd';
import { useRef, useState } from 'react';
import { useAlert } from '../../context/result';
import { useAPI } from '../../context/functions';

const NewCustomerForm = () => {

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

    const [placeholderCustomerName , setPlaceholderCustomerName] = useState("Enter Customer Name")
    const [placeholderCompamyName , setPlaceholderCompanyName] = useState("Enter Company Name")
    const [placeholderContact , setPlaceholderContact] = useState("Enter Contact Number")
    const [placeholderCountry , setPlaceholderCountry] = useState("Enter Country")
    const [placeholderEmail , setPlaceholderEmail] = useState("Enter Email Address")

    const CompanyNameInput = useRef<HTMLDivElement>(null);
    const CustomerNameInput = useRef<HTMLDivElement>(null);
    const CountryNameInput = useRef<HTMLDivElement>(null);
    const ContactNumberInput = useRef<HTMLDivElement>(null);
    const StatusInput = useRef<HTMLDivElement>(null);
    const EmailInput = useRef<HTMLDivElement>(null);

    const CompanyNameHeading = useRef<HTMLDivElement>(null);
    const CustomerNameHeading = useRef<HTMLDivElement>(null);
    const ContactNumberHeading = useRef<HTMLDivElement>(null);
    const EmailHeading = useRef<HTMLDivElement>(null);
    const CountryNameHeading = useRef<HTMLDivElement>(null);
    const StatusHeading = useRef<HTMLDivElement>(null);

    const CustomerMainDiv = useRef<HTMLDivElement>(null)
    const CustomerNameMainDiv = useRef<HTMLDivElement>(null)
    const CompanyNameMainDiv = useRef<HTMLDivElement>(null)
    const ContactNumberMainDiv = useRef<HTMLDivElement>(null)
    const CountryNameMainDiv = useRef<HTMLDivElement>(null)
    const EmailMainDiv = useRef<HTMLDivElement>(null)
    const StatusMainDiv = useRef<HTMLDivElement>(null)
    const SubmitDiv = useRef<HTMLDivElement>(null)


    const FinalDiv = useRef<HTMLDivElement>(null);
    const { setLoaderForApi1 } = useAPI()


    const sendCustomer = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const stats = await fetch(`http://localhost:8080/get_customer_stats`, {
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

            const res = await fetch("http://localhost:8080/send_customer", {
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

            setLoaderForApi1()

            divsChange();
            showSuccess();
            setTimeout(() => hideAlerts(), 3000);

            setForm({ ...defaultForm }); // CID will be fetched again next time

        } catch (err) {
            console.log("Failed to submit data", err);
            showFailure();
        }
    };


    const divsChange = () => {
        if(CustomerNameHeading.current) {
            CustomerNameHeading.current.style.display = "none";
        }

        if(CompanyNameHeading.current) {
            CompanyNameHeading.current.style.display = "none";
        }

        if(ContactNumberHeading.current) {
            ContactNumberHeading.current.style.display = "none";
        }

        if(CountryNameHeading.current) {
            CountryNameHeading.current.style.display = "none";  
        }

        if(EmailHeading.current) {
            EmailHeading.current.style.display = "none";
        }

        if(StatusHeading.current) {
            StatusHeading.current.style.display = "none";
        }

        setTimeout(()=> {
            ResetFinalDiv()
        } , 2000)

        const ResetFinalDiv = () => {
            if(FinalDiv.current) {
                FinalDiv.current.style.display = "none"
            }
        }   

        setPlaceholderCustomerName("Enter Customer Name")
        setPlaceholderCompanyName("Enter Company Name")
        setPlaceholderContact("Enter Contact Number")
        setPlaceholderCountry("Enter Country")
        setPlaceholderEmail("Enter Email Address")
    }




    const showHeading = () => {

        if(CustomerNameHeading.current) {
            CustomerNameHeading.current.style.display = "flex";
        }

        if(ContactNumberMainDiv.current) {
            ContactNumberMainDiv.current.style.marginTop = "40px"
        }

        setPlaceholderCustomerName("")
    }

    const showHeading2 = () => {

        if(CompanyNameHeading.current) {
            CompanyNameHeading.current.style.display = "flex";
        }

        if(CountryNameMainDiv.current) {
            CountryNameMainDiv.current.style.marginTop = "40px"
        }

        setPlaceholderCompanyName("")
    }

    const showHeading3 = () => {

        if(ContactNumberHeading.current) {
            ContactNumberHeading.current.style.display = "flex";
        }

        if(EmailMainDiv.current) {
            EmailMainDiv.current.style.marginTop = "80px"
        }

        if(CustomerMainDiv.current) {
            CustomerMainDiv.current.style.padding = "320px"
        }

        if(SubmitDiv.current) {
            SubmitDiv.current.style.marginTop = "80px"
        }

        setPlaceholderContact("")
    }

    const showHeading4 = () => {

        if(CountryNameHeading.current) {
            CountryNameHeading.current.style.display = "flex";
        }

        if(StatusMainDiv.current) {
            StatusMainDiv.current.style.marginTop = "80px";
        }

        setPlaceholderCountry("")
    }


    const showHeading5 = () => {

        if(EmailHeading.current) {
            EmailHeading.current.style.display = "flex";
        }

        if(SubmitDiv.current) {
            SubmitDiv.current.style.marginTop = "100px"
        }

        if(SubmitDiv.current) {
            SubmitDiv.current.style.marginTop = "20px"
        }

        setPlaceholderEmail("")
    }


    const showHeading6 = () => {
        if(StatusHeading.current) {
            StatusHeading.current.style.display = "flex";
        }

        if(StatusInput.current) {
            StatusInput.current.style.marginTop = "12px";
        }
    }
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setForm(prev => ({
            ...prev,
            [name]: name === "Contact_no" ? Number(value) : value
        }))
    };

    const handleSelectChange = (value: string) => {
        setForm(prev => {
            const updated = { ...prev, Status: value };
            console.log("Updated form:", updated); // Check if Status is present
            return updated;
        });
    };





    return (    
        <>
        <div className="w-full relative mt-10 p-70" ref={CustomerMainDiv}>
            <form onSubmit={sendCustomer} method='post'>

                
                <div className='w-[26%] flex flex-col absolute top-10 left-50' ref={CustomerNameMainDiv}>
                    <div className="w-[55%] hidden animate-wiggle rounded-2xl bg-[#e9ecef]" ref={CustomerNameHeading}>
                        <p className='font-Poppins p-2'>Customer Name</p>
                    </div>    

                    <div className="w-full h-[70px] bg-white border-2 border-[#adb5bd] rounded-3xl flex justify-center mt-2" ref={CustomerNameInput}>
                        <input
                            type="text"
                            name="Customer_name"
                            value={form.Customer_name}
                            onChange={handleInputChange}
                            onClick={showHeading}
                            placeholder={placeholderCustomerName}
                            className="w-full p-4 font-Poppins focus:outline-0 text-[#495057]"
                        />
                    </div>
                </div>



                <div className='w-[25%] flex flex-col absolute right-50 top-10' ref={CompanyNameMainDiv}>
                    <div className='w-[55%] hidden bg-[#e9ecef] animate-wiggle p-2 rounded-2xl' ref={CompanyNameHeading}>
                        <p className='font-Poppins'>Company Name</p>
                    </div>

                    <div className="w-full h-[70px] flex justify-center border-2 rounded-3xl border-[#adb5bd] bg-white mt-2" ref={CompanyNameInput}>
                        <input
                            type="text"
                            name="Company_name"
                            value={form.Company_name}   
                            onClick={showHeading2}
                            onChange={handleInputChange}
                            placeholder={placeholderCompamyName}
                            className="w-full p-4 font-Poppins focus:outline-0 text-[#495057]"
                        />
                    </div>
                </div>
                

                <div className='w-[26%] flex flex-col absolute left-50 top-45' ref={ContactNumberMainDiv}>
                    <div className="w-[60%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl" ref={ContactNumberHeading}>
                        <p className='font-Poppins p-2'>Contact Number</p>
                    </div>    
        
                    <div className="w-full h-[70px] bg-white border-2 rounded-3xl flex border-[#adb5bd] mt-3" ref={ContactNumberInput}>
                        <input
                            type="text"
                            name="Contact_no"
                            value={form.Contact_no}
                            onClick={showHeading3}
                            onChange={handleInputChange}
                            placeholder={placeholderContact}
                            className="w-full p-4 font-Poppins focus:outline-0 text-[#495057]"
                        />
                    </div>
                </div>



                <div className='w-[25%] flex flex-col absolute right-50 top-45' ref={CountryNameMainDiv}>
                    <div className='w-[50%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl' ref={CountryNameHeading}>
                        <p className='font-Poppins p-2'>Country Name</p>
                    </div>

                    <div className="w-full h-[70px]  bg-white flex border-2 rounded-3xl border-[#adb5bd] mt-3" ref={CountryNameInput}>
                        <input
                            type="text"
                            name="Country"
                            value={form.Country}
                            onClick={showHeading4}
                            onChange={handleInputChange}
                            placeholder={placeholderCountry}
                            className="w-full p-4 font-Poppins focus:outline-0 text-[#495057]"
                        />
                    </div>
                </div>


                <div className='w-[26%] flex flex-col absolute top-83 left-50' ref={EmailMainDiv}>
                    <div className="w-[30%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl" ref={EmailHeading}>
                        <p className='font-Poppins p-2'>Email</p>
                    </div> 
                
                    <div className="w-full h-[70px] bg-white border-2 flex rounded-3xl border-[#adb5bd] mt-3" ref={EmailInput}>
                        <input
                            type="email"
                            name="Email"
                            value={form.Email}
                            onClick={showHeading5}
                            onChange={handleInputChange}
                            placeholder={placeholderEmail}
                            className="w-full p-4 font-Poppins focus:outline-0 text-[#495057]"
                        />
                    </div>
                </div>


                <div className='w-[26%] flex flex-col absolute right-50 top-83' ref={StatusMainDiv}> 
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
                </div>

                

                <div className='w-[20%] absolute top-120 right-130' ref={SubmitDiv}>
                    <div className='w-full bg-linear-to-r from-[#00b4d8] to-[#90e0ef] flex justify-center items-center rounded-3xl'>
                        <button type="submit" className='p-3 w-full hover:cursor-pointer font-Poppins'>Submit</button>
                    </div>
                </div>  

            </form>
        </div>

        </>
    );
}

export default NewCustomerForm;
