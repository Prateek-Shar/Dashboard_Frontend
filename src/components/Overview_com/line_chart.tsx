import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

interface LineInfo {
  _id: string;    // category name, e.g. "Grocery"
  total: number;  // total value for the category
}

const Line_Chart = () => {
  const [LineData, setLineData] = useState<LineInfo[]>([]);

  const getLineInfo = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PRODUCTION_ADDRESS}/get_line_chart_info`, {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      setLineData(data.Details); // Use "Details" key as in your API data
    } catch (error) {
      console.error("Something Broke On Frontend");
    }
  };

  useEffect(() => {
    getLineInfo();
  }, []);

  const labels = LineData.map(ld => ld._id);
  const datapoints = LineData.map(ld => ld.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: datapoints,
        borderColor: "#36a2eb",
        backgroundColor: "#9ad0f5",
        tension: 0.4,
      }
    ]
  };

 return (
  <>

    <div className='w-full justify-center items-center flex flex-col'>
      {LineData.length > 0 ? (
        <div className="w-full flex justify-center items-center mt-3 p-10">
          <Line data={chartData} />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center p-2 mt-4 mb-4">
          <p className="font-Poppins">No Data Found</p>
        </div>
      )}
    </div>

  </>
  );
};

export default Line_Chart;
