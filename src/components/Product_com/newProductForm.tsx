import { Select } from 'antd';
import { useState , useEffect} from 'react';
import { useAlert } from '../../context/result';


const NewProductForm = () => {

    const defaultForm = {
        P_id : "",  // Will auto-assign below
        Product_name: "",
        Product_catagory: "",
        Product_price: "",
        Product_quantity: "",
        Discount : "",
    };


    const [ProductNameHeading , setProductNameHeading] = useState(false)
    const [ProductQuantityHeading , setProductQuantityHeading] = useState(false)
    const [ProductDiscountHeading , setProductDiscountHeading] = useState(false)
    const [ProductPriceHeading , setProductPriceHeading] = useState(false);
    const [ProductCatagoryHeading , setProductCatagoryHeading] = useState(false);



    const [productId, setProductId] = useState(1);
    const [form, setForm] = useState({ ...defaultForm, P_id: 1 }); 
    const [placeholderName , setPlaceholderName] = useState("Enter Product Name")
    const [placeholderQuantity , setPlaceholderQuantity] = useState("Enter Product Quantity")
    const [placeholderPrice , setPlaceholderPrice] = useState("Enter Product Price")
    const [placeholderCatagory , setPlaceholderCatagory] = useState("Search / Select Catagory")
    const [placeholderDiscount , setPlaceholderDiscount] = useState("Specify Discount (in %)")



    const { showSuccess, showFailure , hideAlerts} = useAlert();


    const sendProducts = async (e: React.FormEvent) => {
        e.preventDefault();

        const formToSend = { ...form };

        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/send_products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials : "include",
                body: JSON.stringify(formToSend),
            });

            if (!res.ok) {
                showFailure();

                setTimeout(() => {
                    hideAlerts()
                } , 5000)
                
                defaultDivs()
                
                // Increment productId for next product
                const newProductId = productId + 1;
                setProductId(newProductId);

                setForm({ ...defaultForm, P_id: newProductId });
                
                return;
            }

            if(res.ok) {
                await res.json();
                showSuccess();
                
                setTimeout(() => {
                    hideAlerts()
                } , 5000)


                defaultDivs();

                const newProductId = productId + 1;
                setProductId(newProductId);
                setForm({ ...defaultForm, P_id: newProductId });
                
                console.log("Next Product ID : " , newProductId)
            }

        } 
        
        catch (err) {
            console.log("Failed to submit data")
            showFailure()
        }
        
    };

    const getProductID = async() => {

        try {
            const resp = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_pid`, {
                method: "GET",
                credentials: "include"
            });

            const data = await resp.json()
            setProductId(data.P_id)
            return;
        }

        catch(error) {
            console.log("Something Broke UP")
        }
    }

    useEffect(() => {
        getProductID();
    }, []);


    const defaultDivs = () => {
        setProductNameHeading(false)
        setProductDiscountHeading(false)
        setProductCatagoryHeading(false)
        setProductQuantityHeading(false)
        setProductPriceHeading(false)
        setPlaceholderName("Enter Product Name")
        setPlaceholderCatagory("Search / Select Catagory")
        setPlaceholderDiscount("Specify Discount (in %)")
        setPlaceholderPrice("Enter Product Price")
        setPlaceholderQuantity("Enter Product Quantity")
    }



    const showHeading = () => {

        setPlaceholderName("")

        setProductNameHeading(true)

    }

    const showHeading2 = () => {

        setPlaceholderQuantity("")

        setProductQuantityHeading(true)

    }

    const showHeading3 = () => {

        setPlaceholderPrice("")

        setProductPriceHeading(true)
        
    }

    const showHeading4 = () => {
        
        setPlaceholderCatagory("")

        setProductCatagoryHeading(true)

    }


    const showHeading5 = () => {

        setPlaceholderDiscount("")

        setProductDiscountHeading(true)

    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (value: string) => {
        setForm(prev => ({
            ...prev,
            Product_catagory: value
        }));
    };

    return (    
        <>
        <div className="w-full flex flex-col">
            <form onSubmit={sendProducts} method='post'>
                
                <div className='w-full flex xl:flex-row justify-evenly items-center xl:mt-0 mm:mt-0 mm:flex-col'>
                    <div className='xl:w-[25%] flex flex-col xl:mt-10 mm:mt-0'>
                        {ProductNameHeading && (
                            <div className="w-[45%] flex bg-[#e9ecef] animate-wiggle rounded-2xl">
                                <p className='font-Poppins p-2'>Product Name</p>
                            </div>    
                        )}
                        
                        <div className="w-full bg-white border-2 border-[#adb5bd] rounded-3xl mt-3">
                            <input
                                type="text"
                                name="Product_name"
                                value={form.Product_name}
                                onChange={handleInputChange}
                                onClick={showHeading}
                                placeholder={placeholderName}
                                className="w-full xl:p-4 mm:py-3 mm:px-4 font-Poppins focus:outline-0 xl:text-[16px] mm:text-[12px]" 
                            />
                        </div>
                    </div>


                    <div className='xl:w-[25%] flex flex-col xl:mt-8 mm:mt-4'>
                        {ProductQuantityHeading && (
                            <div className='w-[50%] flex bg-[#e9ecef] animate-wiggle p-2 rounded-2xl'>
                                <p className='font-Poppins'>Product Quantity</p>
                            </div>
                        )}

                        <div className="w-full border-2 rounded-3xl border-[#adb5bd] bg-white mt-3">
                            <input
                                type="number"
                                name="Product_quantity"
                                value={form.Product_quantity}
                                onClick={showHeading2}
                                onChange={handleInputChange}
                                placeholder={placeholderQuantity}
                                className="w-full xl:p-4 mm:py-3 mm:px-4  font-Poppins focus:outline-0 xl:text-[16px] mm:text-[12px]"
                            />
                        </div>
                    </div>
                </div>
                

                <div className='w-full flex xl:flex-row justify-evenly items-center xl:mt-10 mm:mt-3 mm:flex-col'>
                    <div className='xl:w-[25%] mt-5'>
                        {ProductPriceHeading && (
                            <div className='w-[40%] flex bg-[#e9ecef] animate-wiggle rounded-2xl p-2' >
                                <p className='font-Poppins'>Product Price</p>
                            </div> 
                        )}

                        <div className="w-full bg-white border-2 rounded-3xl border-[#adb5bd] xl:mt-2">
                            <input
                                type="number"
                                name="Product_price"
                                value={form.Product_price}
                                onClick={showHeading3}
                                onChange={handleInputChange}
                                placeholder={placeholderPrice}
                                className="w-full p-4 font-Poppins focus:outline-0 xl:text-[16px] mm:text-[12px] xl:p-4 mm:py-3 mm:px-4"
                            />
                        </div>
                    </div>



                    <div className='xl:w-[25%] '>
                        {ProductCatagoryHeading && (
                            <div className='w-[50%] flex bg-[#e9ecef] animate-wiggle rounded-2xl xl:p-2 mm:p-0'>
                                <p className='font-Poppins'>Product Catagory</p>
                            </div> 
                        )}

                        <div className="xl:w-full mm:w-[95%] flex items-center xl:mt-3 mm:mt-8 mm:ml-2">
                            <Select
                                showSearch
                                placeholder={placeholderCatagory}
                                optionFilterProp="label"
                                value={form.Product_catagory || undefined}
                                className='w-full'
                                onChange={handleSelectChange}
                                onClick={showHeading4}
                                filterSort={(optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                }
                                options={[
                                    { value: 'Daily Items', label: 'Daily Items' },
                                    { value: 'Grocery', label: 'Grocery' },
                                    { value: 'Video Games', label: 'Video Games' },
                                    { value: "Electric Appliances" , label : "Electric Appliances"},
                                    { value : "Others" , label : "Others" },
                                ]}
                            />
                        </div>
                    </div>
                </div>


                <div className='xl:w-[58%] flex justify-center items-center xl:mt-15 mm:w-full mm:mt-5'>
                    <div className='xl:w-[43%]'>
                        {ProductDiscountHeading && (
                            <div className='w-[30%] flex bg-[#e9ecef] animate-wiggle rounded-2xl p-2'>
                                <p className='font-Poppins'>Discount</p>
                            </div> 
                        )}

                        <div className="w-full border-2 rounded-3xl border-[#adb5bd] bg-white mt-3">
                            <input
                                type="number"
                                name="Discount"
                                value={form.Discount}
                                onClick={showHeading5}
                                onChange={handleInputChange}
                                placeholder={placeholderDiscount || undefined}
                                className="w-full xl:p-4 mm:py-3 mm:px-4 font-Poppins focus:outline-0 xl:text-[16px] mm:text-[12px]"
                            />
                        </div>
                    </div>
                </div>



                <div className='w-full xl:mt-20 flex justify-center items-center mm:mt-15'>
                    <div className='xl:w-[20%] mm:w-[40%] bg-gradient-to-r from-[#00b4d8] to-[#90e0ef] rounded-3xl mb-6'>
                        <button type="submit" className='xl:p-3 mm:p-2 w-full hover:cursor-pointer font-Poppins mm:text-[14px] xl:text-[16px]'>Submit</button>
                    </div>  
                </div>

                
                
            </form>
        </div>



        </>
    );
}

export default NewProductForm;
