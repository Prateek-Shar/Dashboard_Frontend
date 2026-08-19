import { useRef, useState } from 'react';

interface Data {
    onSelect : (value : string | undefined) => void
}


const Income_table_head:React.FC<Data> = ( {onSelect} ) => {

    const [optionsDiv , setOptionsDiv] = useState(false)

    const [options] = useState<string[]>(["Monthly" , "Yearly"])
    const para1 = useRef<HTMLDivElement>(null);
    const para2 = useRef<HTMLDivElement>(null);


    const enableOptionsTab = () => {
        setOptionsDiv(true)
    }

    const disableOptionsTab = () => {
        setOptionsDiv(false)
    }


    const handleSelect = (value : string) => {
        console.info("Value : " , value)
        // const data1 = para1.current.textContent ?? undefined;
        onSelect(value);
             
    }




    return (
        <>
            <div className="w-full flex justify-between relative">
                <div className="w-[20%]">
                    <p className="text-2xl font-Poppins pl-6 pb-2 pt-6">Visualize</p>
                </div>  

                <div className={`w-[10%] flex flex-col justify-center items-center mr-4 border-2 mt-2 border-gray-200 rounded-2xl hover:text-[#4095fe] z-50 ${optionsDiv ? "border-b-0" : "border-b-2"}`} onMouseEnter={enableOptionsTab} onMouseLeave={disableOptionsTab}>

                    <div className='w-full p-3 rounded-[12px]'>
                        <button className='w-full font-Poppins'>Action</button>
                    </div>

                    {optionsDiv && (
                    <div className={`absolute top-13 flex flex-col items-center rounded-b-[13px] mb-2 border-2 border-gray-200 bg-[#f5f5f5] w-[10%] ${optionsDiv ? "border-t-0" : "border-t-2"}`}>
                        <div className='flex justify-center rounded-2xl'>
                            {/* <p className='hover:cursor-pointer text-[13px] text-black font-Poppins' onClick={handleSelect1} ref={para1}>Monthly</p> */}
                            <div className='w-full flex flex-col justify-center items-center'>
                                {options.map((op) => (
                                    <p className="hover:cursor-pointer text-[14px] text-black font-Poppins py-2" onClick={() => handleSelect(op)}>{op}</p> 
                                ))}
                            </div>
                        </div>
                    </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default Income_table_head;