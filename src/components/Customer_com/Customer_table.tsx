import { Flex, Tag, Select, Input, Space, Pagination, Skeleton } from "antd";
import { useEffect, useRef, useState } from "react";
import React from "react";
import bin from "../../images/Bin.png";
import { useAPI } from "../../context/customers_stats_context";

interface Customer {
  _id?: string;
  UserID?: string;
  Customer_name: string;
  Company_name: string;
  Contact_no: number;
  Email: string;
  Country: string;
  Status: string;
}


interface Customer_Details {
  _id?: string;
  UserID?: string;
  Customer_name: string;
  Company_name: string;
  Contact_no: number;
  Email: string;
  Country: string;
  Status: string;
}


const Table_content: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customersDet , setCustomerDet] = useState<Customer_Details[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showTable , setShowTable] = useState<boolean>(false);
  const [showSkeleton , setShowSkeleton] = useState(true)

  const { Search } = Input;

  const documentEachPage = 5;
  const currentPageLength = customers.length; // if productDet is current visible items

  const start = (currentPage - 1) * documentEachPage + 1;
  const end = start + currentPageLength - 1;

  const { setLoaderForApi , totalCustomerCount} = useAPI()

  const [normalTable , setNormalTable] = useState(true)
  const [filterTable , setFilterTable] = useState(false)


  // const ToggleTable = () => {
  //   if(normalTable.current) {
  //     normalTable.current.style.display = "none"
  //   }

  //   if(filterTable.current) {
  //     filterTable.current.style.display = "block"
  //   }
  // }


  const handleFilter = async(value : string) => {
    if (!value) {
      console.log("Value not provided");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getDataAccToFilter?value=${value}` , {
        method : "GET",
        credentials : "include"
      }) 
      
      if(!res.ok) {
        console.error("Something Broke Up");
      }

      const data = await res.json()
      setCustomerDet(data.Details)

      setNormalTable(false)
      setFilterTable(true)
    
    }

    catch(error) {
      console.error(error)
    }

  }


  // Fetch paginated customer data
  const fetchPageData = async(page: number) => {

    const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_customers?page=${page}` , {
      method: "GET",
      credentials : "include"
    })

    if(!res.ok) {
      console.log("Something Broke Up")
    }

    const data = await res.json()
    setCustomers(data.customer_stats)
  };


  // On search submit
  const onSearch = async (value: string) => {
    if (!value) {
      fetchPageData(currentPage); // Reset to paginated data
      console.log("Search value is empty, resetting to paginated data.");
      setSearchValue(""); // Clear search input
      return; 
    }

    try {
      console.log("Searching for:", value);
      const response = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/search_customer?name=${value}` , {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        console.error("Search request failed with status:", response.status);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error("Search Error:", error);
      setCustomers([]);
    }
  };

  // On page change
  const handleChange = (page: number) => {
    setCurrentPage(page);
    fetchPageData(page);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    console.log(`Selected: ${value}`);
  };


  useEffect(() => {
    fetchPageData(currentPage);
  }, []); 



  // useEffect(() => {
  //   if (customers.length > 0) {
  //     setShowTable(true);
  //   } else {
  //     setShowTable(false);
  //   }
  // }, [customers]);

  setTimeout(() => {
    setShowTable(true)

    setShowSkeleton(false)
  } , 3000)


  const deleteProduct = async(email: string) => {
    console.log("Deleting customer with email:", email);
    
    const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/deleteCustomer?email=${email}` , {
      method : "delete",
      credentials: "include"
    })

    if(!res.ok) {
      console.error("Something broke on frontend")
    }

    console.log("Product Deleted")

    //Call the api to reload stats data
    setLoaderForApi()
    
    //To change customers div
    setCustomers(customers.filter(cus => (cus.Email != email)))
  };



  return (
    
    <>

      {showSkeleton && (
        <div className="w-full flex justify-center items-center mt-20">
          <div className="w-[80%]">
            <Skeleton paragraph={{rows:10}} active/>
          </div>
        </div>
      )}  

      {showTable && (
        customers.length > 0 ? (
          <div className="w-[80%] flex flex-col justify-center items-center mb-10 bg-white rounded-4xl mt-15">

            <div className="w-[97%] mt-2 flex justify-between">
              <div className="w-[20%] p-4">
                <p className="font-Poppins text-2xl">All Customers</p>
              </div>


              <div className="w-[35%] flex justify-between">
                <div className="w-[60%] flex items-center">
                  <Space direction="vertical" className="w-full">
                    <Search
                      placeholder="Search"
                      onSearch={onSearch}
                      onChange={handleInputChange}
                      value={searchValue}
                      enterButton
                    />
                  </Space>
                </div>

                <div className="w-[30%] flex items-center justify-center ml-10">
                  <Select
                    showSearch
                    placeholder="Sort By"
                    className="w-[80%]"
                    onChange={handleSelectChange}
                    options={[
                      { value: "Newest" , label: "Newest" },
                      { value: "Oldest" , label: "Oldest" },
                      { value: "Active" , label: "Active"},
                      { value: "Inactive" , label: "Inactive"}
                    ]}
                    onSelect={handleFilter}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col mt-10">
              <div className="w-[95%] flex justify-evenly">
                <div className="w-[13%] flex justify-center p-2">
                  <p className="font-Poppins text-[#b5b7c0] text-[14px]">Customer</p>
                </div>
                <div className="w-[16%] flex justify-center p-2">
                  <p className="font-Poppins text-[#b5b7c0] text-[14px]">Company Name</p>
                </div>
                <div className="w-[16%] flex justify-center p-2">
                  <p className="font-Poppins text-[#b5b7c0] text-[14px]">Contact Number</p>
                </div>
                <div className="w-[16%] flex justify-center py-2 pl-5">
                  <p className="font-Poppins text-[#b5b7c0] text-[14px]">Email</p>
                </div>
                <div className="w-[14%] flex justify-center pt-2 pl-2">
                  <p className="font-Poppins text-[#b5b7c0] text-[14px]">Country</p>
                </div>
                <div className="w-[8%] flex justify-center py-2 pl-2">
                  <p className="font-Poppins text-[#b5b7c0] text-[14px]">Status</p>
                </div>
              </div>

              <div className="w-full flex">
                
                {normalTable && (
                <div className="w-full flex flex-col">
                  {customers.map((cust) => (
                    <div className="w-full flex justify-evenly">
                      <div className="w-[13%] flex justify-center my-2">
                        <p className="font-Poppins py-4 text-[#495057]">{cust.Customer_name}</p>
                      </div>

                      <div className="w-[16%] py-2 flex justify-center items-center my-2">
                        <p className="font-Poppins text-[#495057]">{cust.Company_name}</p>
                      </div>

                      <div className="w-[16%]  flex items-center justify-center my-2">
                        <p className="font-Poppins text-[#495057]">{cust.Contact_no}</p>
                      </div>

                      <div className="w-[16%] flex items-center justify-center my-2">
                        <p className="font-Poppins pl-6 text-[#495057]">{cust.Email}</p>
                      </div>

                      <div className="w-[14%] flex justify-center items-center my-2">
                        <p className="font-Poppins text-[#495057]">{cust.Country}</p>
                      </div>

                      <div className="w-[8%] pl-2 flex justify-center items-center my-2">
                        <Flex gap="4px 0" wrap>
                          <Tag color={cust.Status.toLowerCase() === "active" ? "success" : "error"}>
                            {cust.Status}
                          </Tag>
                        </Flex>
                      </div>
                      
                      <div className="w-[2%] ml-5 flex justify-center items-center rounded-4xl p-0.5 hover:cursor-pointer" onClick={ () => deleteProduct(cust.Email)}>
                        <img src={bin} />
                      </div>
                    </div>
                  ))}
                </div>
                )}

                {filterTable && (
                  <>
                  {customers.map((cust) => (
                    <>
                      <div className="w-[15%] ml-2">
                        <p className="font-Poppins pb-4 pl-13 pt-4 text-[#495057]">{cust.Customer_name}</p>
                      </div>

                      <div className="w-[16%] p-2 ml-8 flex justify-center items-center">
                        <p className="font-Poppins text-[#495057]">{cust.Company_name}</p>
                      </div>

                      <div className="w-[16%]  flex items-center justify-center ml-15">
                        <p className="font-Poppins text-[#495057]">{cust.Contact_no}</p>
                      </div>

                      <div className="w-[16%] ml-11 flex  items-center">
                        <p className="font-Poppins pl-6 text-[#495057]">{cust.Email}</p>
                      </div>

                      <div className="w-[14%] flex justify-center items-center ml-2 pl-5">
                        <p className="font-Poppins text-[#495057]">{cust.Country}</p>
                      </div>

                      <div className="w-[8%] ml-12 pl-2 flex justify-center items-center">
                        <Flex gap="4px 0" wrap>
                          <Tag color={cust.Status.toLowerCase() === "active" ? "success" : "error"}>
                            {cust.Status}
                          </Tag>
                        </Flex>
                      </div>
                      
                      <div className="w-[2%] ml-5 flex justify-center items-center rounded-4xl p-0.5 hover:cursor-pointer" onClick={ () => deleteProduct(cust.Email)}>
                        <img src={bin} />
                      </div>
                    </>
                  ))}
                  </>
                )}
              </div>
            </div>

            <div className="w-full flex flex-col">
              <div className="w-full flex justify-center mt-2  mb-2">
                <hr className="w-full border-[#f2f2f2]" />
              </div>

              <div className="w-full flex justify-between rounded-b-4xl">
                <div className="w-[40%] mt-2 mb-2 flex items-center">
                  <p className="font-Poppins pl-4 text-[#d9d2d7] text-[13px]">
                    Showing {start} to {end} out of {totalCustomerCount}
                  </p>
                </div>
                <div className="w-[20%] mt-4 mb-4">
                  <Pagination
                    current={currentPage}
                    onChange={handleChange}
                    total={totalCustomerCount}
                    pageSize={5}
                  />
                </div>
              </div>
            </div>
            
          </div>

        ) : (

          <div className="w-full flex justify-center items-center my-40">
            <div className="w-[80%] bg-white py-10 flex justify-center rounded-2xl">
              <p className="font-Poppins text-2xl">No Customers Found.</p>
            </div>
          </div>

        )
    
      )}
      
      
          
    </>

          


  );

};

export default Table_content;
