import { MdCall } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FONTS } from "../../constants/constants";
import { FaCar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import CustomerServiceDetails from "./CustomerServiceDetails";
import { getAllHistory } from "./Services";

interface handle {
  handleBack: () => void;
}

const CustomerProfileDetails: React.FC<handle> = ({ handleBack}) => {
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(()=>{
    const fetchCustomerHistory = async()=>{
      try{
        const response:any = await getAllHistory('');
        console.log("Customer History Response:", response.data.data);
        console.log("First Customer Data:", response.data.data[0]);
        if(response.data.data && response.data.data.length > 0) {
          setCustomerData(response.data.data[0]);
        }
      }catch(error){
        console.error("Error fetching customer history:", error);
      }
    }
    fetchCustomerHistory();
  },[])

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Profile Section - Left Side */}
      <div className="w-full md:w-2/3 lg:w-1/4 p-2 relative">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 h-full">
          {/* Back Button - Top Left Corner */}
          <motion.button
            className="absolute top-3 left-3 z-10 p-2 hover:bg-gray-100 transition"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </motion.button>

          <div
            className="flex flex-col items-center py-8 px-4 bg-gradient-to-b from-amber-50 to-white"
            style={{ fontFamily: FONTS.header.fontFamily }}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-28 h-28 mb-4 rounded-full shadow-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300"
              src="https://www.svgrepo.com/show/475692/whatsapp-color.svg"
              alt="Customer Profile"
              whileHover={{ scale: 1.05 }}
            />

            <motion.h5
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800"
            >
              {customerData?.customerName || customerData?.name || customerData?.customer_name || "Loading..."}
            </motion.h5>

            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-sm text-amber-600 font-medium"
            >
              {customerData?.profession || customerData?.type || "Customer"}
            </motion.span>


          </div>

          <motion.div
            className="px-6 py-4 border-t border-gray-100"
            style={{ fontFamily: FONTS.paragraph.fontFamily }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {[
              { icon: <MdCall />, label: "Phone", value: customerData?.phoneNumber || customerData?.phone || customerData?.mobile || "N/A" },
              { icon: <MdEmail />, label: "Email", value: customerData?.emailAddress || customerData?.email || "N/A" },
              { icon: <FaCar />, label: "Vehicles", value: customerData?.vehicleDetails || customerData?.vehicles || customerData?.vehicle || "N/A" },
              { icon: <FaLocationDot />, label: "Address", value: customerData?.customerAddress || customerData?.address || customerData?.location || "N/A" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-start mb-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <div className="text-amber-600 mt-1 mr-3">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-gray-700 font-medium pt-1 pb-1">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </div>

      {/* Content Section - Right Side */}
      <CustomerServiceDetails />
    </div>
  );
};

export default CustomerProfileDetails;