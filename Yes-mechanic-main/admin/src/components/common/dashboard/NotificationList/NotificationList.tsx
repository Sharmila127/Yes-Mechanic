/* eslint-disable @typescript-eslint/no-explicit-any */



import { useState, useRef, useEffect } from 'react';
import { FONTS } from "../../../../constants/uiConstants"//COLOUR
import {GetTransactionDashboard} from "../../../../pages/Dashboards/services/index"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "../../charts/RechartsWrapper";

import { ChevronDown } from "lucide-react";

const dateRanges = ['weekly', 'monthly', 'yearly'];

// const customerData = [
//   { month: "Jan", current: 40000, lastYear: 60000 },
//   { month: "Feb", current: 48000, lastYear: 42000 },
//   { month: "Mar", current: 51000, lastYear: 50000 },
//   { month: "Apr", current: 55000, lastYear: 47000 },
//   { month: "May", current: 49000, lastYear: 62000 },
//   { month: "Jun", current: 53000, lastYear: 58000 },
//   { month: "Jul", current: 52000, lastYear: 50000 },
//   { month: "Aug", current: 54000, lastYear: 46000 },
//   { month: "Sep", current: 60000, lastYear: 48000 },
//   { month: "Oct", current: 45000, lastYear: 52000 },
//   { month: "Nov", current: 80000, lastYear: 61000 },
//   { month: "Dec", current: 70000, lastYear: 61000 },
// ];



const CustomerAnalyticsChart = () => {
  const [selectedRange, setSelectedRange] = useState('weekly'); // Set default value and will be used
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [transactionData, setTransactionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


 useEffect(() => {
  const fetchTransactionData = async () => {
    setLoading(true);
    setError("");
    try{
      const response:any =await GetTransactionDashboard({ period :selectedRange }); 
     console.log("📊 Real Transaction Data:", response);
     setTransactionData(response?.data?.data || []);
   } catch (error) {
    setError("Failed to fetch transaction data");
     console.error("Error fetching transaction data:", error);
   }finally {
    setLoading(false)
 };
 };
 fetchTransactionData();

   const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedRange] );

  // Function to get filtered data based on selected range
  // const getFilteredData = () => {
  //   // Add your filtering logic here based on selectedRange
  //   // For now, returning the same data, but you can modify this based on your needs
  //   switch (selectedRange) {
  //     case 'Weekly':
  //       // You can return weekly data here - for demo, showing first 4 months
  //       return customerData.slice(0, 4).map(item => ({
  //         ...item,
  //         month: `Week ${customerData.indexOf(item) + 1}`
  //       }));
  //     case 'Monthly':
  //       return customerData;
  //     case 'Yearly':
  //       // You can return yearly aggregated data here - for demo, showing quarterly data
  //       return [
  //         { month: "Q1", current: 139000, lastYear: 152000 },
  //         { month: "Q2", current: 157000, lastYear: 167000 },
  //         { month: "Q3", current: 166000, lastYear: 144000 },
  //         { month: "Q4", current: 195000, lastYear: 174000 },
  //       ];
  //     default:
  //       return customerData;
  //   }
  // };
const getFilteredData = () => {
  if (!transactionData || Object.keys(transactionData).length === 0) {
    return [{ label: "No Data", amount: 0, comparison: 0 }];
  }

  return Object.entries(transactionData).map(([key, value]) => {
    let label = key;

    if (selectedRange === 'weekly') {
      label = key.toUpperCase(); // WEEK1, WEEK2, etc.
    }

    if (selectedRange === 'monthly') {
      label = key.charAt(0).toUpperCase() + key.slice(1); // Jan, Feb, etc.
    }

    if (selectedRange === 'yearly') {
      label = key.toUpperCase(); // 2022, 2023 etc.
    }

    return {
      label,
      amount: value,
     // comparison: 0 // Change if you have actual comparison data
    };
  });
};


  

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <p className=" text-lg" style={{  ...FONTS.cardheader }}> Total Transaction </p>
        <div className="flex items-center space-x-2 ">
          <div className="relative " ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center text-xs text-[#9b111e] border px-3 py-1.5 rounded-3xl bg-white hover:bg-gray-50"
            >
              <span className="mr-2">{selectedRange}</span>
              <ChevronDown className="w-4 h-4 text-[#9b111e]" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 bg-white text-[#9b111e] border rounded-3xl shadow-lg z-10 min-w-[100px]">
                {dateRanges.map((period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedRange(period);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      selectedRange === period 
                        ? 'text-[#9b111e] bg-gray-50 font-medium' 
                        : 'text-gray-700'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
     {loading ? (<div className="text-center text-sm text-gray-500">Loading...</div>) : error ?(
      <div className="text-center text-sm text-gray-500">{error}</div>
     ) :(
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={getFilteredData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366F1" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#6366F1" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorLastYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A5B4FC" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#A5B4FC" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" style={{...FONTS.paragraph}}/>
          <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
          <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            name="Total Transaction"
            stroke="#6366F1"
            fill="url(#colorCurrent)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          {/* <Line
            type="monotone"
            dataKey="comparison"
            name="Pending"
            stroke="#A5B4FC"
            fill="url(#colorLastYear)"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          /> */}
        </LineChart>
      </ResponsiveContainer>
      )}
    </div>
  );
};

export default CustomerAnalyticsChart;


