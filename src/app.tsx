import { Routes, Route , BrowserRouter } from "react-router-dom";
import Customer_page from "./Pages/Customer";
import Products from "./Pages/Product"
import Add_Product from "./components/Product_com/Add_Product";
import Add_Customer from "./components/Customer_com/Add_customer";
import Income from "./Pages/Income";
import Add_Income from "./components/Income_com/Add_Income";
import Login_Register from "./Pages/Login_Register";
import ProtectedRoute from "./ProtectedRoute"
import Overview from "./Pages/Overview";
import No_Page from "./Pages/Page_404";
import With_Sidebar from "./withSidebar";
import No_sidebar from "./NoSidebar";


const App = () => {
    
    return (    
    
        <BrowserRouter>
            <Routes>
                    
                <Route element = {<No_sidebar />}>
                    <Route path="/" element={<Login_Register />} />
                    <Route path="*" element={<No_Page />} />
                </Route>

                <Route element = {<With_Sidebar />} >
                    <Route element={<ProtectedRoute />} >
                        <Route 
                            path="customer"
                            element={ <Customer_page /> } 
                        />

                        <Route
                            path="products"
                            element={ <Products /> } 
                        />

                        <Route
                            path="addProduct"
                            element={ <Add_Product /> } 
                        />

                        <Route
                            path="income"
                            element={ <Income /> } 
                        />

                        <Route
                            path="addIncome"
                            element={
                                <Add_Income /> } 
                        />

                        <Route
                            path="addCustomer"
                            element={ <Add_Customer/> }
                        />

                        <Route 
                            path="overview"
                            element={ <Overview /> }
                        />
                    </Route>
                </Route>

            </Routes>
        </BrowserRouter>

    )
}

export default App;