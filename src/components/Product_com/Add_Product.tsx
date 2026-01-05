import { AlertProvider } from "../../context/result";
import Add_Product_Page from "../../Pages/Add_Product_Page";


const Add_Product = () => {

    
    return (
        
        <AlertProvider>
            <div className="xl:w-full mm:w-[90%] xl:overflow-x-hidden xl:overflow-y-hidden mm:overflow-y-scroll">
                <Add_Product_Page />
            </div>  
        </AlertProvider>
    )
}

export default Add_Product;