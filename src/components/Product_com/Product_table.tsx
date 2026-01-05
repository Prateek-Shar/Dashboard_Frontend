import { useEffect , useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space, Pagination } from 'antd';
import daily_items from "/images/daily_items.png";
import Grocery from "/images/grocery.png";
import Others from "/images/Others.png";
import Food from "/images/Food.png";
import default_image from "/images/default.png";
import Video_Games from "/images/Video_Games.png"
import electric_app from "/images/electric_appliances.png";
import { useAPI } from "../../context/product_stats_context";
import { Skeleton } from "antd";

interface Product_details {
    P_id: number;
    Product_name: string;
    Product_quantity: number;
    Product_price: number;
    Product_catagory: string;
}


// Category to Image mapping
const categoryImages: { [key: string]: string } = {
    Food: Food,
    'Daily Items': daily_items,
    Grocery: Grocery,
    "Video Games" : Video_Games,
    Others: Others,
    "Electric Appliances" : electric_app
};

const Product_table = () => {

    const [productDet, setProductDet] = useState<Product_details[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [productCount, setProductCount] = useState(0);
    const [showSkeleton , setShowSkeleton] = useState(true)

    const [showTable , setShowTable] = useState(false);

    const documentEachPage = 5;

    const currentPageLength = productCount;

    const start = (currentPage - 1) * documentEachPage + 1;
    const end = start + currentPageLength - 1;

    const { setLoaderForApi } = useAPI()

    const fetchProductPageData = async (page : number) => {
        const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_product_statistics?page=${page}` , {
            method : "GET",
            credentials : "include"
        })

        if (!res.ok) {
            console.log("Something Broke Up")
        }

        const data = await res.json()
        setProductDet(data.stats)
    }
    

    const getStats = async() => {

        try {
            const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/product_stats` , {
                method : "GET",
                credentials : "include"
            })

            if(!res.ok) {
                throw new Error("Unauthorized or server error");
            }

            const data = await res.json()
            setProductCount(data.product_stats3);
        }

        catch(error) {
            console.log("Got Error")
        }

    }
    

    const handleDelete = async(P_id: number) => {
        fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/delete_product?P_id=${P_id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            console.log("Deleted:", data);
            // Refresh after delete
            handleChange(currentPage);    // refresh total products count
            getStats();    // refresh productCount if needed

            setLoaderForApi()

            message.success("Product Deleted Successfully");
        })
        .catch(err => {
            console.error("Delete Error:", err);
            message.error("Delete Failed");
        });
    };



    const handleChange = async (page: number) => {
        setCurrentPage(page);
        fetchProductPageData(page)
    };


    setTimeout(() => {
        setShowSkeleton(false)
        // setShowTableDet(true)
        setShowTable(true)
    } , 3000)


    useEffect(() => {
        getStats()
        fetchProductPageData(currentPage); 
    } , [])


    return (
    <>
        {showSkeleton && (
            <div className="w-full flex justify-center items-center mt-10 mb-10">
                <div className="w-[75%] flex justify-center items-center">
                        <Skeleton paragraph={{rows:8}} active/>
                </div>
            </div>
        )}

        {showTable && (
            <>
            {productCount > 0 ? (
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-[85%] bg-white flex flex-col rounded-t-4xl items-center">
                        <div className="w-[95%] flex justify-between mt-4">
                            <div className="w-[15%] flex justify-center">
                                <p className="font-Poppins p-2 text-[#bcc3cc]">Image</p>
                            </div>

                            <div className="w-[15%] flex justify-center">
                                <p className="font-Poppins p-2 text-[#bcc3cc]">Product Name</p>
                            </div>

                            <div className="w-[15%] flex justify-center ">
                                <p className="font-Poppins p-2 text-[#bcc3cc]">Catagory</p>
                            </div>

                            <div className="w-[15%] flex justify-center ">
                                <p className="font-Poppins p-2 text-[#bcc3cc]">Price</p>
                            </div>

                            <div className="w-[15%] flex justify-center">
                                <p className="font-Poppins p-2 text-[#bcc3cc]">Status</p>
                            </div>

                            <div className="w-[15%] flex justify-center">
                                <p className="font-Poppins p-2 text-[#bcc3cc]">Action</p>
                            </div>
                        </div>
                    
                    
                        <div className="w-[98%] mt-2 mb-2">
                            <hr className="border-[#f2f2f2]" />
                        </div>

                    </div>

                    <div className="w-full flex justify-center items-center flex-col">
                        <div className="w-[85%] flex flex-col">
                            <div className="w-full bg-white ">
                                {productDet.length > 0 ? (
                                    productDet.map((product) => {
                                        const items: MenuProps['items'] = [
                                            {
                                                label: 'Delete',
                                                key: product.P_id.toString(),
                                            }
                                        ];

                                        const onClick: MenuProps['onClick'] = (info) => {
                                            handleDelete(Number(info.key));
                                        };

                                        return (
                                            <div key={product.P_id} className="w-full flex py-2">
                                                <div className="w-[15%] flex justify-center items-center ml-7">
                                                    <img
                                                        src={categoryImages[product.Product_catagory] || default_image}
                                                        alt={product.Product_catagory}
                                                        className="object-contain w-[25%] p-2"
                                                    />
                                                </div>
                                                <div className="w-[14%] ml-5 p-5 flex justify-center items-center">
                                                    <p className="font-Poppins text-[#495057]">{product.Product_name}</p>
                                                </div>
                                                <div className="w-[15%] ml-7 flex justify-center items-center">
                                                    <p className="font-Poppins text-[#495057]">{product.Product_catagory}</p>
                                                </div>
                                                <div className="w-[14%] ml-5 flex justify-center items-center">
                                                    <p className="font-Poppins text-[#495057]">₹{product.Product_price}</p>
                                                </div>
                                                <div className="w-[15%] ml-7 flex justify-center items-center">
                                                    <p className="font-Poppins text-[#495057]">
                                                        {Number(product.Product_quantity) <= 0 ? "Out of Stock" : "In Stock"}
                                                    </p>
                                                </div>
                                                <div className="w-[15%] ml-7 flex justify-center items-center">
                                                    <Dropdown menu={{ items, onClick }}>
                                                        <a onClick={(e) => e.preventDefault()}>
                                                            <Space className="text-[#6ab1fd]">
                                                                Action
                                                                <DownOutlined />
                                                            </Space>
                                                        </a>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="w-full text-white p-4 text-center">
                                        <p>No Records Found</p>
                                    </div>
                                )}
                            </div>

                            <div className="w-[98%]">
                                <hr className="border-[#f2f2f2]" />
                            </div>

                            <div className="w-full bg-white flex justify-between rounded-b-4xl">
                                <div className="w-[40%] mt-4 mb-4 flex items-center">
                                    <p className='font-Poppins pl-4 text-[#d9d2d7] text-[13px]'>
                                        Showing {start} to {end} out of {productCount}
                                    </p>
                                
                                </div>
                                <div className="w-[20%] mt-4 mb-4 ">
                                    <Pagination
                                        current={currentPage}
                                        onChange={handleChange}
                                        total={productCount}
                                        pageSize={documentEachPage} // assuming you are showing 5 per page
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (

            <div className="w-full xl:p-30 mm:p-10 flex justify-center items-center">
                <div className="w-[80%] flex justify-center items-center bg-white rounded-3xl">
                    <p className="font-Poppins xl:p-10 xl:text-2xl mm:text-[15px] mm:p-8">No Products Found</p>
                </div>
            </div>

            )}

        </>

        )}
        
    </>

    );
};

export default Product_table;
