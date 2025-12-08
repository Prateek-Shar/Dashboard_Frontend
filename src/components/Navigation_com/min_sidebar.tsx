import activity from "../../images/activity.png"
import customer from "../../images/customers2.png"
import income from "../../images/income.png";
import man from "../../images/man.png";
import box from "../../images/box-open.png";
import over from "../../images/overview.png"

const Min_sidebar = () => {
    

    return (
        <div className="w-[10%] flex flex-col items-center">
            
            <div className="w-full flex justify-center mt-2">
                <div className="w-[70%] flex justify-center items-center">
                    <img src={activity} />
                </div>
            </div>

            <div className="w-full h-[50%] flex flex-col items-center mt-2">
                <div className="w-[70%] flex justify-center items-center mt-8 p-1">
                    <img src={over} />
                </div>

                <div className="w-[70%] flex justify-center items-center mt-5 p-1">
                    <img src={customer} />
                </div>

                <div className="w-[70%]  flex justify-center items-center mt-4 p-1">
                    <img src={income} />
                </div>

                <div className="w-[70%] flex justify-center items-center mt-4 p-1">
                    <img src={box} />
                </div>
            </div>

    
            <div className="w-[70%] mt-25 mb-6">
                <img src={man} className="object-contain w-[90%]"/>
            </div>  

        </div>
    )
}


export default Min_sidebar