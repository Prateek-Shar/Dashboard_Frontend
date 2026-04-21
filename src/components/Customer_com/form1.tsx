import { useRef, useState } from "react";
import cross from "/images/cross.png"

export type CustomerFormData = {
    Customer_name: string;
    Company_name: string;
    Contact_no: string | number;
    Country: string;
    Email: string;
    Status: string;
    CID: number;
    Industry: string;
    Social_Media: string;
    Created_at: Date;
};

type Form1Props = {
    form: CustomerFormData;
    setForm: React.Dispatch<React.SetStateAction<CustomerFormData>>;
    onNext: () => void;
};

const Form1: React.FC<Form1Props> = ({ form, setForm, onNext }) => {
 
    const SubmitDiv = useRef<HTMLDivElement>(null)

    const CountryInputBox = useRef<HTMLDivElement>(null)
    const country = useRef<HTMLInputElement>(null)

    const suggestions = ["India" , "USA" , "Russia" , "UK"]
    const [showSuggestionCountryBox , setShowSuggestionCountryBox] = useState(false)
    const [error , setError] = useState(false)

    const sendCustomer = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(`Customer : ${form.Customer_name}`)
        console.log(`Country : ${form.Country}`)

        // Treat "successful completion" of Form1 as passing basic required validation,
        // then move to Form2 (parent-controlled).
        const missing =
            !form.Customer_name ||
            !form.Country ||
            !form.Email ||
            form.Contact_no === "" ||
            form.Contact_no === null ||
            form.Contact_no === undefined;

        if (!missing) {
            onNext();
        }

        if(missing) {
            setError(true)
            form.Customer_name = ""
            form.Contact_no = ""
            form.Email = ""
            form.Country = ""
        }
        
        setTimeout(() => {
            setError(false)
        } , 4000)

    };
    
    
    const v = country.current?.value;
    console.log(`value is : ${v}`)

    const disable = () => {

        if(country.current) {
            if(country.current.value === "") {
                if(CountryInputBox.current) {
                    CountryInputBox.current.style.borderBottom = "2px solid #d8dee9";
                    setShowSuggestionCountryBox(false)
                }
            }   
        }
    }
    

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
    

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setForm(prev => ({
            ...prev,
            [name]: name === "Contact_no" ? Number(value) : value
        }))
    };

    const ShowCountrySuggestion = () => {

        if(CountryInputBox.current) {
            CountryInputBox.current.style.borderBottom = "none"
        }

        setShowSuggestionCountryBox(true)
    }
    

    return (

        <>

        <div className="w-full">
            <form onSubmit={sendCustomer} method='post'>

                <div className='w-full mt-5 flex justify-center'>    
                    <div className='xl:w-[30%] bg-[#edf6f9] mm:w-full p-2 flex justify-center rounded-2xl'>
                        <p className='font-Alan text-2xl'>Personal Information</p>
                    </div>
                </div>

                {error && (
                    <div className="w-full mt-10">
                        <div className="flex justify-center items-center">
                            <div className="w-[2%]">
                                <img src={cross} className="object-contain w-[90%]"/>
                            </div>

                            <div className="flex justify-center items-center ml-2">
                                <p className="text-red-500 text-[18px]">Missing Fields</p>
                            </div>
                        </div>
                    </div>
                )}

                
                <div className='w-[98%] flex xl:flex-row mm:flex-col justify-between items-center xl:mt-15 xl:ml-2 xl:mr-2 mm:ml-0 mm:mr-0'>
                    <div className='xl:w-[40%] mm:w-full flex xl:justify-normal mm:justify-center'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Full Name : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type = "text" autoComplete="off"  name="Customer_name" placeholder="Customer name" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Customer_name}/>
                        </div>
                    </div>

                    <div className='xl:w-[40%] mm:w-full flex flex-col xl:my-0 mm:my-4'>
                        <div className='w-full flex xl:justify-normal mm:justify-center'>
                            <div className='w-[40%] xl:flex mm:hidden items-center'>
                                <p className='font-Poppins'>Country : </p>
                            </div>

                            <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]' ref={CountryInputBox}>
                                <input type='text' autoComplete='off' name="Country" placeholder="Country" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={(e)=>{ handleInputChange(e); ShowCountrySuggestion(); disable(); }} value={form.Country}  ref={country}/>
                            </div>
                        </div>

                        {showSuggestionCountryBox && ( 
                        <div className='w-full flex flex-col'>
                            {suggestions
                                .filter(sug => sug.startsWith(v ?? ""))
                                .map(sug => (
                                    <div
                                        className='w-[60%] ml-[206px] border-2 border-t-0 border-[#d8dee9] hover:bg-[#edf6f9] hover:cursor-pointer'
                                        onClick={() => handleSelectSuggestion(sug)}
                                        key={sug}
                                    >
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
                            <input type = "email" autoComplete="off" name='Email' placeholder="Email" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Email}/>
                        </div>
                    </div>

                    <div className='xl:w-[40%] mm:w-full flex xl:my-0 mm:my-3 xl:justify-normal mm:justify-center'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Contact No. : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                            <input type='number' autoComplete='off' name='Contact_no' placeholder="Contact" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Contact_no} />
                        </div>
                    </div>
                </div>

                                
                <div className='w-full flex justify-center items-center xl:mt-20 mm:my-10 xl:mb-5' ref={SubmitDiv}>
                    <div className='xl:w-[15%] mm:w-[50%] bg-linear-to-r from-[#00b4d8] to-[#90e0ef] flex justify-center items-center rounded-3xl'>
                        <button type="submit" className='p-3 w-full hover:cursor-pointer font-Poppins'>Next</button>
                    </div>
                </div>  

            </form>
        </div>

        </>
    )
}


export default Form1;