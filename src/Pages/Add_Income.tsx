import Add_Income_Page from "./Add_Income_Page"
import { AlertProvider } from "../context/result"

const Add_Income = () => {

    return (

        <AlertProvider>
            <div className="w-full">
                <Add_Income_Page />
            </div> 
        </AlertProvider>
    )
}

export default Add_Income