import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
import { COLORS } from "../../constants/uiConstants";

const CityAddPage: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [newCity, setNewCity] = useState("");
  const [pincode, setPincode] = useState("");
  // const [shortCode, setShortCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cityData = {
      newCity,
      pincode,
      // shortCode,
    };
    console.log("City Data:", cityData);
    toast.success("city Added sucessfully");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-500 hover:text-red-600 text-lg"
        >
          <HiOutlineXMark className="text-white w-8 h-8 bg-[#9b111e]  p-1 rounded-3xl" />
        </button>
        <h2
          className="font-bold text-2xl pt-0 pl-2  pb-2  mb-4"
          
        style={{
          color : COLORS.primary
        }}
        >
          ADD CITY
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6" >
          <input
            type="text"
            placeholder="New City"
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a00000]"
            required
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md focus:outline-none focus:ring-2 focus:ring-[#a00000]"
            required
          />

          {/* <input
            type="text"
            placeholder="Enter city-code"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a00000]"
          /> */}

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="flex items-center justify-center font-bold px-8 py-2 rounded-3xl text-white transition duration-200 active:scale-105 hover:bg-[#a00000]"
              style={{
                backgroundColor : COLORS.primary
                  
              }}
           
           >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CityAddPage;
