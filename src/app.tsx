import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Customer_page from "./Pages/Customer";
import Products from "./Pages/Product"
import Add_Product from "./components/Product_com/Add_Product";
import Add_Customer from "./components/Customer_com/Add_customer";
import Income from "./Pages/Income";
import Layout from "./layout";
import Add_Income from "./components/Income_com/Add_Income";
import Login_Register from "./Pages/Login_Register";
import ProtectedRoute from "./ProtectedRoute"
import Overview from "./Pages/Overview";
import No_Page from "./Pages/Page_404";

const App = () => {
    
    return (    
    
    <Router>
        <Layout>
            <Routes>

                <Route path="/" element={<Login_Register />} />
                <Route path="*" element={<No_Page />} />

                <Route
                    path="/customer"
                    element={
                    <ProtectedRoute>
                        <Customer_page />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                    <ProtectedRoute>
                        <Products />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/addProduct"
                    element={
                    <ProtectedRoute>
                        <Add_Product />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/income"
                    element={
                    <ProtectedRoute>
                        <Income />
                    </ProtectedRoute>
                    }
                />
                <Route
                    path="/addIncome"
                    element={
                    <ProtectedRoute>
                        <Add_Income />
                    </ProtectedRoute>
                    }
                />

                <Route
                    path="/addCustomer"
                    element={
                    <ProtectedRoute>
                        <Add_Customer/>
                    </ProtectedRoute>
                    }
                />

                <Route 
                    path="/overview"
                    element={
                        <ProtectedRoute>
                            <Overview />
                        </ProtectedRoute>
                    }
                />
                
            </Routes>
        </Layout>       
    </Router>
        
    )
}

export default App;