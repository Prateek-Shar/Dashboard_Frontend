import { useRef, type Dispatch, type SetStateAction } from "react";
import { type CustomerFormData } from "./form1";


type Form2Props = {
    form: CustomerFormData;
    setForm: Dispatch<SetStateAction<CustomerFormData>>;
    onSubmit: () => void;
};

const Form2: React.FC<Form2Props> = ({ form, setForm, onSubmit }) => {
    const StatusInput = useRef<HTMLDivElement>(null)


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setForm(prev => ({
            ...prev,
            [name]: name === "Contact_no" ? Number(value) : value
        }))
    };

    const showSuggestions = () => {

        if(StatusInput.current) {
            StatusInput.current.style.borderBottom = "none"
        }
    }


    return (
        <>

            <div className='w-full mt-5 flex justify-center'>    
                <div className='xl:w-[30%] xl:flex justify-center mm:w-full p-2 bg-[#edf6f9] rounded-2xl'>
                    <p className='font-Alan text-2xl'>Company Details</p>
                </div>
            </div>

            
            <div className='w-[98%] flex xl:flex-row mm:flex-col justify-between xl:my-10 mm:my-5 xl:ml-2'>
                <div className='xl:w-[40%] mm:w-full xl:justify-normal mm:justify-center flex'>
                    <div className='w-[40%] xl:flex mm:hidden items-center'>
                        <p className='font-Poppins'>Company Name : </p>
                    </div>

                    <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                        <input type = "text" autoComplete="off" name='Company_name' placeholder="Company name" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' onChange={handleInputChange} value={form.Company_name}/>
                    </div>
                </div>

                <div className='xl:w-[40%] flex mm:w-full xl:justify-normal mm:justify-center xl:my-0 mm:my-5'>
                    <div className='w-[40%] xl:flex mm:hidden items-center'>
                        <p className='font-Poppins'>Industry  : </p>
                    </div>

                    <div className='xl:w-[60%] mm:w-[90%] border-2 border-[#d8dee9] rounded-[5px]'>
                        <input type='text' autoComplete='off' name="Industry" className='w-full p-3 outline-0 xl:placeholder:hidden mm:placeholder:flex' placeholder="Industry Type" onChange={handleInputChange} value={form.Industry}/>
                    </div>
                </div>
            </div>


            <div className='w-[98%] flex xl:justify-between mm:justify-center items-center xl:mt-10 xl:ml-2 xl:mr-2 xl:flex-row mm:flex-col'>
                <div className='xl:w-[40%] mm:w-[90%] flex'>
                    <div className='w-[40%] xl:flex mm:hidden items-center'>
                        <p className='font-Poppins'>Social Media (if any) : </p>
                    </div>

                    <div className='xl:w-[60%] mm:w-full border-2 border-[#d8dee9] rounded-[5px] flex items-center justify-center'>
                        <input type ="url" autoComplete="off" placeholder='Social Links' name='Social_Media' className='w-full p-3 outline-0' onChange={(e) => handleInputChange(e) } value={form.Social_Media}/>
                    </div>
                </div>

                <div className='xl:w-[40%] mm:w-[90%] flex flex-col xl:my-0 mm:my-4'>
                    <div className='w-full flex'>
                        <div className='w-[40%] xl:flex mm:hidden items-center'>
                            <p className='font-Poppins'>Customer Type / Status  : </p>
                        </div>

                        <div className='xl:w-[60%] mm:w-full rounded-[5px] border-2 border-[#d8dee9]' ref={StatusInput}>
                            <input type='text' autoComplete='off' name='Status' className='w-full p-3 outline-0 xl:placeholder:bg-transparent mm:placeholder:flex' placeholder="Status" onChange={(e) => { handleInputChange(e); showSuggestions(); }}  value={form.Status}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex justify-center items-center xl:mt-20 mm:my-10 xl:mb-5'>
                <div className='xl:w-[15%] mm:w-[50%] bg-linear-to-r from-[#00b4d8] to-[#90e0ef] flex justify-center items-center rounded-3xl'>
                    <button
                        type="button"
                        className='p-3 w-full hover:cursor-pointer font-Poppins'
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

        </>
    )
}


export default Form2;