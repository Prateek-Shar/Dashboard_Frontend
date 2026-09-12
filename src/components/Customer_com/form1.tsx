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

        if(country.current) {
            country.current.style.borderBottom = "2px solid #adb5bd"
            country.current.style.borderRadius = "20px"
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

        if(country.current) {
            country.current.style.borderBottom = "none"
            country.current.style.borderRadius = "10px"
        }


        setShowSuggestionCountryBox(true)
    }
    

    return (

        <>

        <div className="w-full">
            <form onSubmit={sendCustomer} method='post'>

                <div className='w-full my-5 flex justify-center'>    
                    <p className='font-Alan xl:text-2xl mm:text-[16px]'>Personal Information</p>
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

                
                <div className='w-[98%] flex xl:flex-row mm:flex-col justify-between items-center xl:mt-15 xl:ml-2 xl:mr-2 mm:ml-0 mm:mr-0 mm:mt-2 xl:py-0 mm:py-4'>
                    <div className='xl:w-[40%] mm:w-[80%] flex xl:flex-row mm:flex-col xl:justify-normal mm:justify-center mm:items-center'>
                        <p className='font-Poppins xl:flex mm:hidden mr-2'>Full Name : </p>

                        <input type = "text" autoComplete="off"  name="Customer_name" placeholder="Customer name" className='border-2 py-2 pl-2 border-[#adb5bd] xl:text-[16px] mm:text-[13px] rounded-2xl outline-0 xl:placeholder:text-transparent mm:placeholder:flex font-Poppins' onChange={handleInputChange} value={form.Customer_name}/>
                    </div>

                    <div className='xl:w-[40%] mm:w-[80%] flex xl:flex-row mm:flex-col justify-center items-center relative xl:mt-0 mm:mt-4'>
                        <p className='font-Poppins xl:flex mm:hidden mr-2'>Country : </p>

                        <input type='text' autoComplete='off' name="Country" placeholder="Country" className='py-2 pl-2 xl:text-[16px] mm:text-[13px] outline-0 xl:placeholder:text-transparent mm:placeholder:flex font-Poppins border-2 border-[#adb5bd] rounded-2xl' onChange={(e)=>{ handleInputChange(e); ShowCountrySuggestion(); disable(); }} value={form.Country}  ref={country}/>

                        {showSuggestionCountryBox && ( 
                        <div className='mm:w-[80%] xl:w-[78%] rounded-b-2xl flex justify-center items-end flex-col absolute top-7 xl:left-0'>
                            {suggestions
                                .filter(sug => sug.startsWith(v ?? ""))
                                .map(sug => (
                                    <div
                                        className='w-[52%] border-2 border-t-0 border-[#adb5bd] hover:bg-[#edf6f9] bg-[#edf6f9] hover:cursor-pointer'
                                        onClick={() => handleSelectSuggestion(sug)}
                                        key={sug}
                                    >
                                        <p className='py-2 pl-2 font-Poppins xl:text-[16px] mm:text-[13px]'>{sug}</p>
                                    </div>
                            ))}
                        </div>
                        )}
                    </div>
                
                </div>

                <div className='w-[98%] flex xl:flex-row mm:flex-col justify-between xl:mt-10 mm:mt-0 xl:ml-2 xl:mr-2 xl:py-0 mm:py-1'>

                    <div className='xl:w-[40%] mm:w-full flex xl:justify-start mm:justify-center items-center'>
                        <p className='font-Poppins xl:flex mm:hidden mr-2'>Email : </p>
                        
                        <input type = "email" autoComplete="off" name='Email' placeholder="Email" className='border-2 border-[#adb5bd] rounded-2xl py-2 pl-2 outline-0 xl:placeholder:text-transparent mm:placeholder:flex font-Poppins xl:text-[16px] mm:text-[13px]' onChange={handleInputChange} value={form.Email}/>
                    </div>

                    <div className='xl:w-[40%] mm:w-full flex xl:mt-0 mm:mt-4 justify-center items-center'>
                        <p className='font-Poppins xl:flex mm:hidden mr-2'>Contact No. : </p>

                        <input type='number' autoComplete='off' name='Contact_no' placeholder="Contact" className='border-2 border-[#adb5bd] rounded-2xl py-2 pl-2 outline-0 xl:placeholder:text-transparent mm:placeholder:block font-Poppins xl:text-[16px] mm:text-[13px]' onChange={handleInputChange} value={form.Contact_no} />
                    </div>
                </div>

                                
                <div className='w-full flex justify-center items-center xl:mt-20 mm:my-10 xl:mb-5' ref={SubmitDiv}>
                    <button type="submit" className='bg-linear-to-r from-[#00b4d8] to-[#90e0ef] xl:px-8 py-2 mm:px-6 hover:cursor-pointer font-Poppins flex rounded-3xl'>Next</button>
                </div>  

            </form>
        </div>

        </>
    )
}


export default Form1;