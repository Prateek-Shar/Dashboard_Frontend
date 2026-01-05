import { useRef, useState } from 'react';

interface Data {
    onSelect : (value : string | undefined) => void
}


const Income_table_head:React.FC<Data> = ( {onSelect} ) => {

    const [OptionsDiv , setOptionsDiv] = useState(false)

    const para1 = useRef<HTMLDivElement>(null);
    const para2 = useRef<HTMLDivElement>(null);


    const enableOptionsTab = () => {
        setOptionsDiv(true)
    }

    const disableOptionsTab = () => {
        setOptionsDiv(false)
    }


    const handleSelect1 = () => {
        if(para1.current) {
            const data1 = para1.current.textContent ?? undefined;
            onSelect(data1);
            console.log("Data from option1 : " , data1)
        }        
    }

    const handleSelect2 = () => {
        if(para2.current) {
            const data2 = para2.current.textContent ?? undefined;
            onSelect(data2);
            console.log("Data from option2 : " , data2)
        }  
    }



    return (
        <>
            <div className="w-full flex justify-between">
                <div className="w-[20%]">
                    <p className="text-2xl font-Poppins pl-6 pb-2 pt-6">Visualize</p>
                </div>  

                <div className="w-[10%] flex flex-col justify-center items-center mr-4 border-2 mt-2 border-gray-200 rounded-2xl hover:text-[#4095fe] z-50" onMouseEnter={enableOptionsTab} onMouseLeave={disableOptionsTab}>

                    <div className='w-full  p-3 rounded-[12px]'>
                        <button className='w-full  font-Poppins'>Action</button>
                    </div>

                    {OptionsDiv && (
                    <div className='w-[90%] bg-white flex flex-col items-center rounded-b-[13px] mb-2'>
                        <div className='hover:bg-[#f5f5f5] w-full flex justify-center rounded-2xl'>
                            <p className='p-2 hover:cursor-pointer text-black font-Poppins' onClick={handleSelect1} ref={para1}>Monthly</p>
                        </div>

                        <div className='hover:bg-[#f5f5f5] w-full rounded-2xl flex justify-center'>
                            <p className='p-2 hover:cursor-pointer text-black font-Poppins' onClick={handleSelect2} ref={para2}>Yearly</p>
                        </div>
                    </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default Income_table_head;