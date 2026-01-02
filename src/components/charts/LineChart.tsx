import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { DetailContext } from '../../context/Chart';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);



const LineChart = () => {

  const { detailDaily } = useContext(DetailContext);
  const { detailByMonth } = useContext(DetailContext);
  const { detailByYear } = useContext(DetailContext);

  const { DataBy } = useContext(DetailContext);

  
  const [monthDiv , setMonthDiv] = useState(false)
  const [yearDiv , setYearDiv] = useState(false);
  const [dailyDiv , setDailyDiv] = useState(false)

  console.log("Monthly or Yearly : " , DataBy);

  const labels = detailDaily.map(item => item._id);
  const dataPoints = detailDaily.map(item => item.amt);

  const label2 = detailByMonth.map(item => item._id);
  const dataPoints2 = detailByMonth.map(item => item.amt);

  const label3 = detailByYear.map(item => item._id);
  const dataPoints3 = detailByYear.map(item => item.amt);
  

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Amount',
        data: dataPoints,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data2 = {
    labels: label2,
    datasets: [
      {
        label: 'Amount',
        data: dataPoints2,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


   const data3 = {
    labels: label3,
    datasets: [
      {
        label: 'Amount',
        data: dataPoints3,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options3 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  
  useEffect(() => {
    if (DataBy === "Yearly") {
      setYearDiv(true);
      setMonthDiv(false);
      setDailyDiv(false)
    } else if (DataBy === "Monthly") {
      setMonthDiv(true);
      setYearDiv(false);
      setDailyDiv(false);
    } else {
      setMonthDiv(false)
      setYearDiv(false)
      setDailyDiv(true);
    }
  }, [DataBy]);

  return (
    
    <div className='w-full flex flex-col items-center'>

      {dailyDiv && (
      <div className='w-[70%]'>
        <div className='w-full'>
        {detailDaily.length > 0 ? (
          <div className='w-full flex flex-col'>
            <div className='w-full'>
              <Line data={data} options={options} />
            </div>

            <div className='w-full p-2 mt-6 flex justify-center'>
                <p className='font-Poppins'>Daily Income</p>
            </div>
          </div>
        ) : (
          <div className='w-full'>
            <p className='text-center text-gray-500 font-Poppins'>No data available for Daily Income</p>
          </div>
        )}
        </div>
      </div>
      )}

      {monthDiv && (
      <div className='w-[70%] mt-8'>
        {detailByMonth.length > 0 ? (

          <div className='w-full flex flex-col'>
            <div className='w-full'>
              <Line data={data2} options={options2} />
            </div>

            <div className='w-full p-2 mt-6 flex justify-center'>
                <p className='font-Poppins'>Monthly Income</p>
            </div>
          </div>

        ) : (
          <div className='w-full'>
            <p className='text-center text-gray-500 font-Poppins'>No data available for Monthly Income</p>
          </div>
        )}
      </div>
      )}


      {yearDiv && ( 
      <div className='w-[70%] mt-8'>
        {detailByYear.length > 0 ? ( 
          <div className='w-full flex flex-col'>
            <div className='w-full'>
              <Line data={data3} options={options3} />
            </div>

            <div className='w-full p-2 mt-6 flex justify-center'>
                <p className='font-Poppins'>Yearly Income</p>
            </div>
          </div>
        ) : (
          <div className='w-full'>
            <p className='text-center text-gray-500 font-Poppins'>No data available for Yearly Income</p>
          </div>
        )} 
      </div>
      )}

    </div>
  );
};

export default LineChart;
