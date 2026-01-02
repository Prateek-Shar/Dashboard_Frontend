import { AlertProvider } from "../../context/result"
import Add_Customer_Page from "../../Pages/Add_Customer_Page"

const Add_Customer = () => {

    return (

        <AlertProvider>
            <div className="w-full overflow-x-hidden overflow-y-hidden">
                <Add_Customer_Page />
            </div>
        </AlertProvider>
    )
}

export default Add_Customer;