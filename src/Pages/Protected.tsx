import secure from "/images/security.webm"

const Protected = () => {

    return (

        <div className="w-screen h-screen bg-[#eef4ff] flex justify-center items-center flex-col">
            
            <div className="w-[20%] h-[25%] flex justify-center">
                <video src={secure} autoPlay muted loop className="object-contain w-[60%]" />
            </div>

            <div className="w-[30%] flex justify-center">
                <p className="font-Alan p-2 text-2xl">Cookie authentication in progress ...</p>
            </div>

        </div>
        
    )
}


export default Protected;