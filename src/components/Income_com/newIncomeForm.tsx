import { Select } from 'antd';
import { useRef, useState } from 'react';
import { useAlert } from '../../context/result';

const NewIncomeForm = () => {

    const defaultForm = {
        // Created_at : new Date(),
        Source : "",
        Amount : "",
        Catagory : "",
        Created_at : new Date()
    };

    const select1 = useRef<HTMLDivElement>(null);
    const select2 = useRef<HTMLDivElement>(null);
    const AmountInput = useRef<HTMLDivElement>(null);


    const [form, setForm] = useState({ ...defaultForm }); // First product gets ID 1
    const [showModeOfPaymentHeading , setModeOfPaymentHeading] = useState(false)
    const [showCatagoryHeading , setCatagoryHeading] = useState(false)
    const [showIncomeHeading , setIncomeHeading] = useState(false)

    const [placeholderPaymentMode ,  setPlaceholderPaymentMode] = useState("Search / Select Mode of Payment")
    const [placeholderIncomeCatagory , setPlaceholderIncomeCatagory] = useState("Search / Select Income Catagory")
    const [placeholderAmount , setPlaceholderAmount] = useState("Enter Amount")


    const { showSuccess , showFailure , hideAlerts } = useAlert()

    const sendIncome = async (e: React.FormEvent) => {
        e.preventDefault();

        const formToSend = { ...form };
        console.log(formToSend)

        try {
            const res = await fetch("https://dashboard-backend-1-0w4b.onrender.com/send_income", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formToSend),
            });


            if (!res.ok)  {
                showFailure()

                setTimeout(() => {
                    hideAlerts()
                } , 3000)

                console.log("Something broke up in frontend")
                return;
            }


            const data = res.json()
            console.log(data)
            setForm({ ...defaultForm });
            reload_all_divs()

            showSuccess()

            setTimeout(() => {
                hideAlerts()
            } , 3000)

        } catch (err) {
            console.log("Failed to submit data")
        }

    };

    const showHeading1 = () => {
        setPlaceholderPaymentMode("");

        setModeOfPaymentHeading(true)
    }

    const showHeading2 = () => {
        setPlaceholderIncomeCatagory("")

        setCatagoryHeading(true)
    }

    const showHeading3 = () => {
        setPlaceholderAmount("")

        setIncomeHeading(true);
    }



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const reload_all_divs = () => {
        setModeOfPaymentHeading(false)
        setCatagoryHeading(false)
        setIncomeHeading(false)
        setPlaceholderIncomeCatagory("Search / Select Income Catagory")
        setPlaceholderPaymentMode("Search / Select Mode of Payment")
        setPlaceholderAmount("Enter Amount")
    }

    const handleSourceChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            Source: value
        }));
    };

    const handleCatagoryChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            Catagory: value
        }));
    };``

    return (    
        <>
        <div className="w-full flex flex-col">
            <form onSubmit={sendIncome} method='post' >
                    
                <div className='w-full flex justify-evenly mt-10'>
                    <div className="w-[25%] mt-2">
                        {showModeOfPaymentHeading && ( 
                            <div className="w-[50%] bg-[#e9ecef] rounded-2xl  animate-wiggle">
                                <p className='font-Poppins p-2'>Mode of Payment</p>
                            </div> 
                        )}

                        <div className='w-full mt-2 mb-3 flex items-center' ref={select1}>
                            <Select
                                showSearch
                                optionFilterProp="label"
                                className='w-full'
                                placeholder={placeholderPaymentMode}
                                onClick={showHeading1}
                                value={form.Source || undefined}
                                style={{paddingTop : ""}}
                                onChange={handleSourceChange}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    // { value: 'Online Sales', label: 'Online Sales' },
                                    // { value: 'COD', label: 'Cash on Delivery (COD)' },
                                    { value: 'Bank Transfer', label: 'Bank Transfer' },
                                    { value: 'UPI', label: 'UPI (Google Pay / PhonePe / etc.)' },
                                    { value: 'Cash Payment', label: 'Cash Payment' },
                                ]}
                            />
                        </div>
                    </div>


                    <div className='w-[25%]'>
                        {showCatagoryHeading && (
                            <div className='w-[40%] bg-[#e9ecef] animate-wiggle p-2 rounded-2xl'>
                                <p className='font-Poppins'>Catagory</p>
                            </div>
                        )}

                        <div className="w-full mt-3 mb-3 flex items-center" ref={select2}>
                            <Select
                                showSearch
                                placeholder={placeholderIncomeCatagory}
                                optionFilterProp="label"
                                className='w-full'
                                value={form.Catagory || undefined}
                                onClick={showHeading2}
                                onChange={handleCatagoryChange}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    { value: 'Product Sales', label: 'Product Sales' },
                                    { value: 'Freelance Work', label: 'Freelance Work' },
                                    { value: 'Salary', label: 'Salary' },
                                    { value: 'Gift Received', label: 'Gift Received' },
                                    { value: 'Interest Income', label: 'Interest Income' },
                                    { value: 'Other', label: 'Other' },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                        
                
                <div className='w-[59%] flex justify-evenly mt-15'>
                    <div className='w-[45%]'>
                        {showIncomeHeading && (
                            <div className='w-[30%] bg-[#e9ecef] animate-wiggle rounded-2xl p-2'>
                                <p className='font-Poppins'>Amount</p>
                            </div>
                        )}

                        <div className="w-full flex border-2 rounded-3xl border-[#adb5bd] bg-white mt-3" ref={AmountInput}>
                            <input
                                type="number"
                                name="Amount"
                                value={form.Amount}
                                onClick={showHeading3}
                                onChange={handleInputChange}
                                placeholder={placeholderAmount}
                                className="w-full p-4 font-Poppins focus:outline-0"
                            />
                        </div>
                    </div>
                </div>



                <div className='w-full flex justify-center'>
                    <div className='w-[20%] flex justify-center  mb-8 mt-20 bg-linear-to-r from-[#00b4d8] to-[#90e0ef] rounded-3xl'>
                        <button type="submit" className='p-3 hover:cursor-pointer font-Poppins'>Submit</button>
                    </div>
                </div>

            </form>
        </div>

        </>
    );
}

export default NewIncomeForm;
