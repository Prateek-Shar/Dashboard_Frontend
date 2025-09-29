import { Flex, Tag, Select, Input, Space, Pagination } from "antd";
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

  const { Search } = Input;

  const documentEachPage = 5;
  const currentPageLength = customers.length; // if productDet is current visible items

  const start = (currentPage - 1) * documentEachPage + 1;
  const end = start + currentPageLength - 1;

  const { setLoaderForApi , totalCustomerCount } = useAPI()

  const normalTable = useRef<HTMLDivElement>(null)
  const filterTable = useRef<HTMLDivElement>(null);



  const ToggleTable = () => {
    if(normalTable.current) {
      normalTable.current.style.display = "none"
    }

    if(filterTable.current) {
      filterTable.current.style.display = "block"
    }
  }


  const handleFilter = async(value : string) => {
    if (!value) {
      console.log("Value not provided");
    }

    try {
      const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/getDataAccToFilter?value=${value}` , {
        method : "GET",
        credentials : "include"
      }) 
      
      if(!res.ok) {
        console.error("Something Broke Up");
      }

      const data = await res.json()
      setCustomerDet(data.Details)

      ToggleTable();
    
    }

    catch(error) {
      console.error(error)
    }

  }


  // Fetch paginated customer data
  const fetchPageData = async(page: number) => {

    const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/get_customers?page=${page}` , {
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
      const response = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/search_customer?name=${value}` , {
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



  useEffect(() => {
    if (customers.length > 0) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
  }, [customers]);


  const deleteProduct = async(email: string) => {
    console.log("Deleting customer with email:", email);
    
    const res = await fetch(`https://dashboard-backend-1-0w4b.onrender.com/deleteCustomer?email=${email}` , {
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
    
    {showTable ? (
      <div className="w-[90%] flex flex-col justify-center items-center mb-10">
      <div className="w-[90%] flex flex-col items-center mt-15">
        <div className="w-full rounded-t-3xl p-2 flex justify-between bg-white">
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
      </div>
      

      <div className="w-full flex justify-center">

        <div className="w-[90%] flex flex-col mb-2 rounded-b-4xl bg-white">
          <div className="w-[94%] flex mt-10">
            <div className="w-[10%] flex justify-center p-2 ml-8">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Customer</p>
            </div>
            <div className="w-[13%] flex justify-center p-2 ml-28">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Company Name</p>
            </div>
            <div className="w-[13%] flex justify-center p-2 ml-25">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Contact Number</p>
            </div>
            <div className="w-[8%] flex justify-center p-2 ml-21">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Email</p>
            </div>
            <div className="w-[8%] flex justify-center p-2 ml-35">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Country</p>
            </div>
            <div className="w-[8%] flex justify-center p-2 ml-20">
              <p className="font-Poppins text-[#b5b7c0] text-[14px]">Status</p>
            </div>
          </div>

          <div className="w-full flex">
            
            <div className="w-[98%] mt-4" ref={normalTable}>
              {customers.length > 0 ? (
                customers.map((cust, index) => (
                  <div className="w-full flex nth-[1]:mt-2 nth-last-[1]:mb-2 nth-last-[1]:mt-2" key={index}>
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
                  </div>
                ))
              ) : (
                <p className="text-center w-full py-5 font-Poppins">No Customers Found.</p>
              )}
            </div>

          </div>


          <div className="w-full mt-4 hidden" ref={filterTable}>
            {customersDet.length > 0 ? (
              customersDet.map((cust, index) => (
                <div className="w-full flex mt-2" key={index}>
                  <div className="w-[15%] ml-4">
                    <p className="font-Poppins pb-4 pl-13 pt-4 text-[#495057]">{cust.Customer_name}</p>
                  </div>
                  <div className="w-[15%] p-2 ml-8 flex justify-center">
                    <p className="font-Poppins text-[#495057]">{cust.Company_name}</p>
                  </div>
                  <div className="w-[16%] flex items-center justify-center ml-17">
                    <p className="font-Poppins text-[#495057]">{cust.Contact_no}</p>
                  </div>
                  <div className="w-[16%] ml-11 flex items-center">
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
                </div>
              ))
            ) : (
              <p className="text-center w-full py-5 font-Poppins">No Customers Found.</p>
            )}
          </div>


          <div className="w-fullmt-4 flex justify-center mt-2 mb-2">
            <hr className="w-[95%] border-[#f2f2f2]" />
          </div>

          <div className="w-full flex justify-between rounded-b-4xl">
            <div className="w-[40%] mt-4 mb-4 flex items-center">
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
    </div>

    ) : ( 

    <div className="w-full p-30 flex justify-center items-center">
      <div className="w-[80%] flex justify-center items-center bg-white rounded-3xl">
          <p className="font-Poppins p-10 text-2xl">No Customers Found</p>
      </div>
    </div>

    )} 

    </>
  );
};

export default Table_content;
