import Add_Income_Page from "../../Pages/Add_Income_Page"
import { AlertProvider } from "../../context/result"

const Add_Income = () => {

    return (

        <AlertProvider>
            <div className="w-full overflow-x-hidden overflow-y-hidden">
                <Add_Income_Page />
            </div> 
        </AlertProvider>
    )
}

export default Add_Income