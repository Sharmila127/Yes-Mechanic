// import React, { useState, useRef, useEffect } from 'react';
// // import { FONTS } from "../../../../constants/uiConstants"//FONT
// import { COLORS } from "../../../../constants/uiConstants"//COLOUR

// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from 'recharts';
// // import { ChevronDown } from 'lucide-react';

// //for data
// const data = [
//   { month: 'Jan', BMW: 50, FORToyotaKirloskar: 30,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Feb', BMW: 35, FORToyotaKirloskar: 47,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Mar', BMW: 25, FORToyotaKirloskar: 39,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Apr', BMW: 40, FORToyotaKirloskar: 26,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'May', BMW: 12, FORToyotaKirloskar: 45,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Jun', BMW: 32, FORToyotaKirloskar: 22,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Jul', BMW: 24, FORToyotaKirloskar: 33,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Aug', BMW: 50, FORToyotaKirloskar: 18,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Sep', BMW: 35, FORToyotaKirloskar: 50,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Oct', BMW: 25, FORToyotaKirloskar: 29,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Nov', BMW: 40, FORToyotaKirloskar: 41,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
//   { month: 'Dec', BMW: 12, FORToyotaKirloskar: 36,Kia: ,Skoda: ,MGMotor: ,Honda: ,Volkswagen: },
// ];

// //for drop down
// // const dateRanges = ['Center1', 'Center2', 'Center3', 'Center4', 'Center5'];

// const TotalRevenue: React.FC = () => {
//   // const [selectedRange, setSelectedRange] = useState('Center1'); // Set default value
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="bg-white w-full mx-auto relative">
//       <div className="flex justify-between items-center ">
//         {/* content  */}
//         <div>
//           <h2 className="text-lg " style={{ color: COLORS.primary }}>Vehicle Management</h2>
//           <div className="flex space-x-4 text-xs mt-4">
//             <div className="flex items-center space-x-1 text-blue-600">
//               <span className="h-2 w-2 bg-[#ffdede] rounded-full"></span>
//               <span className='text-[#ffdede]'>BMW </span>
//             </div>
//             <div className="flex items-center space-x-1 text-rose-400">
//               <span className="h-2 w-2 bg-[#ffc4c4] rounded-full"></span>
//               <span className='text-[#ffc4c4]'>FORD</span>
//             </div>
//           </div>
//         </div>

//         {/* <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="flex items-center text-xs border px-1 py-1.5 rounded-md text-[#9b111e] bg-white hover:bg-gray-50"
//           >
           
//             <ChevronDown className="w-6 h-4 text-[#9b111e]" />
//           </button>
//           {isOpen && (
//             <div className="absolute mt-2 bg-white h-20 text-[#9b111e] overflow-hidden overflow-y-auto border rounded-md shadow-lg z-10">
//               {dateRanges.map((range) => (
//                 <button
//                   key={range}
//                   onClick={() => {
//                     setSelectedRange(range);
//                     setIsOpen(false);
//                   }}
//                   className="block w-full text-left px-4 py-2 text-sm hover:text-red-600"
//                 >
//                   {range}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div> */}
//       </div>

//       {/* Chart */}
//       <div className=' -ml-10'>
//         <ResponsiveContainer width="100%" height={100}>
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="BMW" fill="#ffc4c4" barSize={10} radius={[6, 6, 0, 0]} />
//             <Bar dataKey="FORD" fill="#ffdede" barSize={10} radius={[6, 6, 0, 0]} />
            
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default TotalRevenue;




// // //this is the stack bar 
import { } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from '../../charts/RechartsWrapper';
// import { ChevronDown } from 'lucide-react';
import { FONTS } from "../../../../constants/uiConstants"; // your color constants

// Sample data (converted from ApexChart format)
const chartData = [
 { date: 'Jan', MarutiSuzuki: 44, Mahindra: 13, TataMotors: 11, ToyotaKirloskar: 21, Kia: 67, Skoda: 39, MGMotor: 12, Honda: 75, Volkswagen: 33 },
  { date: 'Feb', MarutiSuzuki: 55, Mahindra: 23, TataMotors: 17, ToyotaKirloskar: 7, Kia: 62, Skoda: 40, MGMotor: 10, Honda: 88, Volkswagen: 45 },
  { date: 'Mar', MarutiSuzuki: 41, Mahindra: 20, TataMotors: 15, ToyotaKirloskar: 25, Kia: 56, Skoda: 35, MGMotor: 21, Honda: 64, Volkswagen: 19 },
  { date: 'Apr', MarutiSuzuki: 67, Mahindra: 8, TataMotors: 15, ToyotaKirloskar: 13, Kia: 79, Skoda: 58, MGMotor: 41, Honda: 37, Volkswagen: 11 },
  { date: 'May', MarutiSuzuki: 22, Mahindra: 13, TataMotors: 21, ToyotaKirloskar: 22, Kia: 47, Skoda: 53, MGMotor: 66, Honda: 29, Volkswagen: 92 },
  { date: 'Jun', MarutiSuzuki: 43, Mahindra: 27, TataMotors: 14, ToyotaKirloskar: 8, Kia: 74, Skoda: 25, MGMotor: 18, Honda: 91, Volkswagen: 36 },
  { date: 'Jul', MarutiSuzuki: 44, Mahindra: 13, TataMotors: 11, ToyotaKirloskar: 21, Kia: 61, Skoda: 48, MGMotor: 30, Honda: 87, Volkswagen: 22 },
  { date: 'Aug', MarutiSuzuki: 55, Mahindra: 23, TataMotors: 17, ToyotaKirloskar: 7, Kia: 42, Skoda: 69, MGMotor: 13, Honda: 51, Volkswagen: 70 },
  { date: 'Sep', MarutiSuzuki: 41, Mahindra: 20, TataMotors: 15, ToyotaKirloskar: 25, Kia: 38, Skoda: 59, MGMotor: 27, Honda: 62, Volkswagen: 44 },
  { date: 'Oct', MarutiSuzuki: 67, Mahindra: 8, TataMotors: 15, ToyotaKirloskar: 13, Kia: 88, Skoda: 77, MGMotor: 19, Honda: 32, Volkswagen: 55 },
  { date: 'Nov', MarutiSuzuki: 22, Mahindra: 13, TataMotors: 21, ToyotaKirloskar: 22, Kia: 45, Skoda: 31, MGMotor: 24, Honda: 58, Volkswagen: 63 },
  { date: 'Dec', MarutiSuzuki: 43, Mahindra: 27, TataMotors: 14, ToyotaKirloskar: 8, Kia: 36, Skoda: 66, MGMotor: 35, Honda: 73, Volkswagen: 50 },
];

// Dropdown filter data
// const dateRanges = ['Center1', 'Center2', 'Center3', 'Center4', 'Center5'];

const TotalRevenue: React.FC = () => {
  // const [selectedRange, setSelectedRange] = useState('Center1');
  // Removed unused isOpen state and related useEffect since dropdown is commented out
  // const [isOpen, setIsOpen] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  return (
    <div className="bg-white w-full mx-auto relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg" style={{ ...FONTS.cardheader }}>
           Vehicle
          </h2>
          
        </div>

        {/* <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs border px-1 py-1.5 rounded-md text-[#9b111e] bg-white hover:bg-gray-50"
          >
            <ChevronDown className="w-6 h-4 text-[#9b111e] ml-1" />
          </button>
          {isOpen && (
            <div className="absolute mt-2 bg-white h-15 text-[#9b111e] overflow-hidden overflow-y-auto border rounded-md shadow-lg z-10">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm hover:text-red-600"
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div> */}
      </div>

      <div className="-ml-10 mt-2 ">
        <ResponsiveContainer width="100%" height={100}>
          <BarChart data={chartData} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" style={{...FONTS.paragraph}}/>
            <YAxis />
            <Tooltip />
            <Bar dataKey="MarutiSuzuki" stackId="stack" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Mahindra" stackId="stack" fill="#fda4af" radius={[4, 4, 0, 0]} />
            <Bar dataKey="TataMotors" stackId="stack" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ToyotaKirloskar" stackId="stack" fill="#d8b4fe" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Kia" stackId="stack" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Skoda" stackId="stack" fill="#fda4af" radius={[4, 4, 0, 0]} />
            <Bar dataKey="MGMotor" stackId="stack" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Honda" stackId="stack" fill="#d8b4fe" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Volkswagen" stackId="stack" fill="#93c5fd" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalRevenue;