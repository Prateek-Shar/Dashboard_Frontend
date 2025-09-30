import { Select } from 'antd';
import { useRef, useState , useEffect} from 'react';
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


    const ProductNameHeading = useRef<HTMLDivElement>(null);
    const ProductQuantityHeading = useRef<HTMLDivElement>(null);
    const ProductNameInput = useRef<HTMLDivElement>(null);
    const ProductQuantityInput = useRef<HTMLDivElement>(null);
    const ProductPriceHeading = useRef<HTMLDivElement>(null);
    const ProductPriceInput = useRef<HTMLDivElement>(null);
    const ProductCatagoryHeading = useRef<HTMLDivElement>(null);
    const ProductCatagoryInput = useRef<HTMLDivElement>(null);
    const DiscountHeading = useRef<HTMLDivElement>(null);
    const DiscountInput = useRef<HTMLDivElement>(null);

    const QuantityMainHeading = useRef<HTMLDivElement>(null)
    const PriceMainHeading = useRef<HTMLDivElement>(null);
    const CatagoryMainHeading = useRef<HTMLDivElement>(null)
    const DiscountMainHeading = useRef<HTMLDivElement>(null)
    const mainDiv = useRef<HTMLDivElement>(null);
    const SubmitBt =  useRef<HTMLDivElement>(null)
    const parentBt = useRef<HTMLDivElement>(null)

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
            const res = await fetch("https://dashboard-backend-1-0w4b.onrender.com/send_products", {
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
            const resp = await fetch("https://dashboard-backend-1-0w4b.onrender.com/get_pid", {
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
        if(ProductNameHeading.current) {
            ProductNameHeading.current.style.display = "none"
            setPlaceholderName("Enter Product Name")
        }

        if(ProductCatagoryHeading.current) {
            ProductCatagoryHeading.current.style.display = "none"
        }

        if(ProductPriceHeading.current) {
            ProductPriceHeading.current.style.display = "none"
            setPlaceholderPrice("Enter Product Price")
        }

        if(ProductQuantityHeading.current) {
            ProductQuantityHeading.current.style.display = "none"
            setPlaceholderQuantity("Enter Product Quantity")
        }

        setPlaceholderCatagory("Search / Select Catagory")
        setPlaceholderDiscount("Specify Discount (in %)")


        if(ProductNameInput.current) {
            ProductNameInput.current.style.marginTop = "0px";
        }

        if(ProductQuantityInput.current) {
            ProductQuantityInput.current.style.marginTop = "0px"
        }

        if(ProductPriceInput.current) {
            ProductPriceInput.current.style.marginTop = "0px"
        }

        if(ProductCatagoryInput.current) {
            ProductCatagoryInput.current.style.marginTop = "0px"
        }

        if(DiscountHeading.current) {
            DiscountHeading.current.style.display = "none"
        }

        if(PriceMainHeading.current) {
            PriceMainHeading.current.style.marginTop = "1.5rem"
        }

        if(CatagoryMainHeading.current) {
            CatagoryMainHeading.current.style.marginTop = "1rem"
        }

        if(DiscountMainHeading.current) {
            DiscountMainHeading.current.style.marginTop = "0rem"
        }

        if(mainDiv.current) {
            mainDiv.current.style.padding = "17rem"
        }

        if(parentBt.current) {
            parentBt.current.style.bottom = "4px"
            parentBt.current.style.left = "33rem"
        }

    }



    const showHeading = () => {
        setPlaceholderName("")

        if(ProductNameHeading.current) {
            ProductNameHeading.current.style.display = "flex";
            ProductNameHeading.current.style.marginTop = "5px";
        }

        if(ProductNameInput.current) {
            ProductNameInput.current.style.marginTop = "10px";
        }

        if(PriceMainHeading.current) {
            PriceMainHeading.current.style.marginTop = "5rem";
        }

        if(DiscountMainHeading.current) {
            DiscountMainHeading.current.style.marginTop = "7rem"
        }

        if(mainDiv.current) {
            mainDiv.current.style.padding = "20rem"
        }

        if(SubmitBt.current) {
            SubmitBt.current.style.marginTop = "3rem"
        }

    }

    const showHeading2 = () => {
        setPlaceholderQuantity("")

        if(ProductQuantityHeading.current) {
            ProductQuantityHeading.current.style.display = "flex";
            ProductQuantityHeading.current.style.marginTop = "5px";
        }

        if(ProductQuantityInput.current) {
            ProductQuantityInput.current.style.marginTop = "10px"
        }

        if(CatagoryMainHeading.current) {
            CatagoryMainHeading.current.style.marginTop = "50px"
        }



    }

    const showHeading3 = () => {
        setPlaceholderPrice("")

        if(ProductPriceHeading.current) {
            ProductPriceHeading.current.style.display = "flex";
            ProductPriceHeading.current.style.marginTop = "10px";
        }


        if(DiscountMainHeading.current) {
            DiscountMainHeading.current.style.marginTop = "112px"
        }


        if(SubmitBt.current) {
            SubmitBt.current.style.marginTop = "5rem"
        }
    }

    const showHeading4 = () => {
        if(ProductCatagoryHeading.current) {
            ProductCatagoryHeading.current.style.display = "flex";
            ProductCatagoryHeading.current.style.marginTop = "15px"
        }

        if(ProductCatagoryInput.current) {
            ProductCatagoryInput.current.style.marginTop = "10px"
        }

        // if(mainDiv.current) {
        //     mainDiv.current.style.marginTop = "400px"
        // }
    }


    const showHeading5 = () => {
        setPlaceholderDiscount("")

        if(DiscountHeading.current) {
            DiscountHeading.current.style.display = "flex"
            DiscountHeading.current.style.marginTop = "15px"
        }

        if(DiscountInput.current) {
            DiscountInput.current.style.marginTop = "10px"
        }

        
        if(mainDiv.current) {
            mainDiv.current.style.top = "500"
        }

        if(SubmitBt.current) {
            SubmitBt.current.style.marginTop = "8rem"
        }
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
        <div className="w-full relative p-[17rem]" ref={mainDiv}>
            <form onSubmit={sendProducts} method='post'>
                

                <div className='w-[25%] flex flex-col absolute top-0 left-50 mt-10' >
                    <div className="w-[45%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl" ref={ProductNameHeading}>
                        <p className='font-Poppins p-2'>Product Name</p>
                    </div>    
                    
                    <div className="w-full bg-white border-2 border-[#adb5bd] rounded-3xl" ref={ProductNameInput}>
                        <input
                            type="text"
                            name="Product_name"
                            value={form.Product_name}
                            onChange={handleInputChange}
                            onClick={showHeading}
                            placeholder={placeholderName}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>
                </div>



                <div className='w-[25%] flex flex-col absolute top-0 right-50 mt-8' ref={QuantityMainHeading}>
                    <div className='w-[50%] hidden bg-[#e9ecef] animate-wiggle p-2 rounded-2xl' ref={ProductQuantityHeading}>
                        <p className='font-Poppins'>Product Quantity</p>
                    </div>

                    <div className="w-full border-2 rounded-3xl border-[#adb5bd] bg-white" ref={ProductQuantityInput}>
                        <input
                            type="number"
                            name="Product_quantity"
                            value={form.Product_quantity}
                            onClick={showHeading2}
                            onChange={handleInputChange}
                            placeholder={placeholderQuantity}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>
                </div>
                


                <div className='w-[25%] top-33 left-50 absolute mt-5' ref={PriceMainHeading}>
                    <div className='w-[40%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl p-2' ref={ProductPriceHeading}>
                        <p className='font-Poppins'>Product Price</p>
                    </div> 
            
                    <div className="w-full bg-white border-2 rounded-3xl border-[#adb5bd] mt-2" ref={ProductPriceInput}>
                        <input
                            type="number"
                            name="Product_price"
                            value={form.Product_price}
                            onClick={showHeading3}
                            onChange={handleInputChange}
                            placeholder={placeholderPrice}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>
                </div>



                <div className='w-[25%] top-40 right-50 absolute' ref={CatagoryMainHeading}>
                    <div className='w-[50%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl p-2' ref={ProductCatagoryHeading}>
                        <p className='font-Poppins'>Product Catagory</p>
                    </div> 

                    <div className="w-full flex items-center mt-3" ref={ProductCatagoryInput}>
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



                <div className='w-[25%] top-70 left-50 absolute' ref={DiscountMainHeading}>
                    <div className='w-[30%] hidden bg-[#e9ecef] animate-wiggle rounded-2xl p-2' ref={DiscountHeading}>
                        <p className='font-Poppins'>Discount</p>
                    </div> 

                    <div className="w-full border-2 rounded-3xl border-[#adb5bd] bg-white" ref={DiscountInput}>
                        <input
                            type="number"
                            name="Discount"
                            value={form.Discount}
                            onClick={showHeading5}
                            onChange={handleInputChange}
                            placeholder={placeholderDiscount || undefined}
                            className="w-full p-4 font-Poppins focus:outline-0"
                        />
                    </div>
                </div>



                <div className='w-full' ref={parentBt}>
                    <div className='w-[20%] absolute bg-linear-to-r from-[#00b4d8] to-[#90e0ef]  rounded-3xl mb-6 bottom-0 left-130' ref={SubmitBt}>
                        <button type="submit" className='p-3 w-full hover:cursor-pointer font-Poppins'>Submit</button>
                    </div>  
                </div>

                
                
            </form>
        </div>



        </>
    );
}

export default NewProductForm;
