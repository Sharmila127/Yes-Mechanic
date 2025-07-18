/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Vehicle } from "../vehicle/VehicleData";

import VehicleDetailCard from "../../components/common/Card/VehicleDetailCard"; 
import VehicleModal from "../vehicle/VehicleModal";
import { FaSearch } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { getvechiclemanage } from "../../features/VehicleManagement/service";
import { FONTS } from "../../constants/uiConstants";

const VehicleManagementPage = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleDatax, setVehicleDatax] = useState<any | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await getvechiclemanage("");
        // console.log("vehicle data", data);
        setVehicleDatax(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVehicle();
  }, []);

  const apiVehicleList = vehicleDatax?.data?.data || [];

  const carfiltereddata = apiVehicleList.filter((vehicle: any) => {
    const search = searchTerm.toLowerCase();
    return (
      vehicle.vehicleInfo?.model?.toLowerCase().includes(search) ||
      vehicle.vehicleInfo?.registrationNo?.toLowerCase().includes(search) ||
      vehicle.vehicleInventory?.currentState?.location?.toLowerCase().includes(search)
    );
  });

  const transformVehicle = (vehicle: any): Vehicle => {
  const normalizeFuelLevel = (
    raw: string
  ): Vehicle["vehicleInfo"]["currentFuelLevel"] => {
    const map: Record<string, "Empty" | "Quarter" | "Half Tank" | "Full"> = {
      empty: "Empty",
      quarter: "Quarter",
      half: "Half Tank",
      "half tank": "Half Tank",
      "full tank": "Full",
      full: "Full",
    };

    const normalized = raw?.toLowerCase().trim();
    return map[normalized] || undefined;
  };

  return {
    baseVehicleInfo: {
      image: vehicle?.vehicleInfo?.image ,
      title: vehicle?.vehicleInfo?.model || "Untitled",
      registrationNumber: vehicle?.vehicleInfo?.registrationNo || "N/A",
    },
    vehicleInfo: {
      kms: vehicle?.vehicleInfo?.mileage || "0",
      chassisNo: vehicle?.vehicleInfo?.chassisNo || "N/A",
      color: vehicle?.vehicleInfo?.color || "N/A",
      engineNo: vehicle?.vehicleInfo?.engineNo || "N/A",
      insuranceCompany: vehicle?.vehicleInfo?.insuranceCompany || "N/A",
      insuranceRenewalDate: vehicle?.vehicleInfo?.insuranceRenewalDate || "N/A",
      model: vehicle?.vehicleInfo?.model|| "N/A",
      currentFuelLevel: normalizeFuelLevel(
        vehicle?.vehicleInventory?.fuelLevel || ""
      ),
    },
    partnerDetails: {
      partnerName: vehicle?.partnerDetails?.Name || "",
      partnerPhone: vehicle?.partnerDetails?.Phone || "",
      partnerAddress: vehicle?.partnerDetails?.Address || "",
    },
    customerInfo: {
      name: vehicle?.customerInfo?.name || "",
      contactNo: vehicle?.customerInfo?.contactNo || "",
      address: vehicle?.customerInfo?.address || "",
    },
    carCondition: {
      fuelLevel: vehicle?.vehicleInventory?.fuelLevel || "N/A",
      selectedItems: vehicle?.vehicleInventory?.currentState?.selectedItems || [],
      images: vehicle?.vehicleInventory?.currentState?.imageUploaded || [],
    },
    checkInOutDates: {
      checkInDate: vehicle?.checkInOutDates?.checkInDate || "",
      checkOutDate: vehicle?.checkInOutDates?.checkOutDate || "",
    },
  };
};


  const handleReset = () => {
    setSearchTerm("");
  };

  return (
    <div>
      <div className="m-1 p-2">
        <h1 className="text-3xl text-red-700 !font-bold" style={{...FONTS.header}}>Vehicle Management</h1>
        <hr className="border-1 border-red-700 my-3" />
        <div className="flex mt-10">
          <FaSearch
            className="text-red-700 mt-3"
            style={{ position: "relative", left: "32px", top: "5px" }}
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className="text-red-700 placeholder:text-red-400 border border-red-700 px-12 py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-red-700 w-3/6 h-[50px]"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <RiResetLeftFill
            className="text-red-700 cursor-pointer hover:text-red-400"
            style={{ position: "relative", left: "-30px", top: "18px" }}
            onClick={handleReset}
            size={18}
          />
        </div>
      </div>

      <div className="relative">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {carfiltereddata.length > 0 ? (
            carfiltereddata.map((vehicle: any, index: number) => {
              const transformed = transformVehicle(vehicle);
              return (
                <VehicleDetailCard
                  key={index}
                  vehicle={transformed}
                  onViewDetails={() => setSelectedVehicle(transformed)}
                />
              );
            })
          ) : (
            <div
              className="flex flex-col items-center justify-center h-[54.7vh] w-full overflow-y-hidden"
              style={{ position: "relative", left: "350px" }}
            >
              {/* <img
                src={vehi.image}
                alt="car image"
                style={{ height: "255px", width: "255px" }}
              /> */}
              <div className="absolute top-2/3">
                <p className="text-red-700 font-semibold">
                  No car available for this search
                </p>
              </div>
            </div>
          )}
        </div>

        {selectedVehicle && (
          <VehicleModal
            vehicle={selectedVehicle}
            onClose={() => setSelectedVehicle(null)}
            redirectPath="/job-cards"
          />
        )}
      </div>
    </div>
  );
};

export default VehicleManagementPage;