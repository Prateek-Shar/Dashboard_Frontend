import { useEffect } from "react";
import { Line } from "react-chartjs-2";

interface d {
    from : Date,
    to : Date
}

const Line_chart:React.FC<d> = ( {from , to} ) => {
    // const labels = Utils.months({count: 7});

    const api_uri = import.meta.env.VITE_PRODUCTION_ADDRESS

    const getData = (from : Date , to : Date) => {
        const res = fetch(`${api_uri}/getDataForChart?start=${from}&end=${to}` , {
            method : "get",
        })

        if(!res) {
            console.error("Something unexpected hit")
            return;
        }
    }

    useEffect(() => {
        getData(from , to)
    } , [])

    console.log("From : " , from  , ":" , "To : " , to )

    const data = {
        labels : ["Monday" , "Tuesday" , "Wednesday" , "Thursday" , "Friday"],
        datasets : [{
            label : "Dummy Data Set",
            data : [2, 5.5, 2, 8.5, 1.5],
            fill : false,
            borderColor: 'rgb(75, 192, 192)',
            tension : 0.1,
        }]
    }

    return (
        <div className="w-full p-2">
            <Line
                data = {data}
            />
        </div>
    )
}


export default Line_chart;