import { AlertProvider } from "../../context/result";
import Add_Product_Page from "../../Pages/Add_Product_Page";


const Add_Product = () => {

    
    return (
        
        <AlertProvider>
            <div className="w-full overflow-x-hidden overflow-y-hidden">
                <Add_Product_Page />
            </div>  
        </AlertProvider>
    )
}

export default Add_Product;