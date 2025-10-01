import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Pie_info {
  _id: string;
  total: number;
}

const Pie_Chart = () => {
  const [data, setData] = useState<Pie_info[]>([]);

  const labels = data.map((dt) => dt._id);
  const datapoints = data.map((dt) => dt.total);

  const backgroundColors = [
    "#f7ad86",
    "#a8d1df",
    "#41dc8e",
    "#f94449",
    "#c0afe2"
  ];

  const getDataForPie = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/getDataForPie` , {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Something Broke up in frontend");
        return;
      }

      const data = await res.json();
      setData(data.Details);
    } catch (error) {
      console.error("Some Error Popped Up");
    }
  };

  useEffect(() => {
    getDataForPie();
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total by Country",
        data: datapoints,
        borderColor: "#191919",
        backgroundColor: backgroundColors.slice(0, datapoints.length),
      },
    ],
  };

  return (
    <>
    <div className='w-full justify-center items-center flex flex-col'>
      {data.length > 0 ? (
        <div className="w-full p-2 mt-4">
          <Pie data={chartData} />
         </div>
        ):(
        <div className="w-full p-2 mb-4 mt-4 flex justify-center">
          <p className="font-Poppins">No Record Found</p>
        </div>
    )}
    </div>
      
    </>
  );
};

export default Pie_Chart;
