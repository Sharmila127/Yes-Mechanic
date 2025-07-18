import type { FC } from "react";
import type { Vehicle } from "./VehicleData";
import { Link } from "react-router-dom";
import carDefaultlogo from "../../assets/INVALID CAR LOGO.png";
import { FONTS } from "../../constants/uiConstants";

type Props = {
  vehicle: Vehicle;
  onClose: () => void;
  redirectPath: string;
};

const VehicleModal: FC<Props> = ({ vehicle, onClose, redirectPath }) => {
  const baseInfo = vehicle.baseVehicleInfo;

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 relative w-full max-w-5xl h-[95vh] overflow-y-auto shadow-2xl"
        onClick={handleInnerClick}
        style={{
          background: "linear-gradient(180deg, #fdefe9 0%, #fff 100%)",
          borderColor: "#E6A895",
          boxShadow:
            "0 8px 20px rgba(155, 17, 30, 0.15), 0 4px 8px rgba(230, 168, 149, 0.2)",
        }}
      >
        <button
          className="absolute top-4 right-4 text-[#9b111e] hover:text-red-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex justify-center items-center w-full py-4">
          <div className="w-[450px] h-64 bg-gray-100 rounded-lg overflow-hidden shadow">
			{/* this give default if the API give Image it Changes */}
            {baseInfo.image && baseInfo.image.trim() !== "" ? (
              <img
                src={baseInfo.image}
                alt={baseInfo.title || "vehicle image"}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = carDefaultlogo;
                }}
              />
            ) : (
              <img
                src={carDefaultlogo}
                alt="default vehicle image"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <h5 className="text-3xl font-bold text-[#9b111e] mb-2" style={{...FONTS.subHeader}}>
          {baseInfo.registrationNumber} - {baseInfo.title}
        </h5>


        

       {vehicle.partnerDetails && (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold text-[#9b111e] mb-6"style={{ ...FONTS.cardheader }}>Partner</h3>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4"style={{ ...FONTS.cardSubHeader }}>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name: {vehicle.partnerDetails.partnerName || "N/A"}</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone: {vehicle.partnerDetails.partnerPhone || "N/A"}</label>
       
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address:{vehicle.partnerDetails.partnerAddress || "N/A"}</label>
        
      </div>
    </div>
  </div>
)}

        {vehicle.customerInfo && (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold text-[#9b111e] mb-6" style={{ ...FONTS.cardheader }}>
      Owner Details
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ ...FONTS.cardSubHeader }}>
      {Object.entries(vehicle?.customerInfo).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {key} : {value || "N/A"}
          </label>
          
        </div>
      ))}
    </div>
  </div>
)}


        {vehicle.vehicleInfo && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-[#9b111e] mb-4" style={{...FONTS.cardheader}}>
              Vehicle Details
            </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ ...FONTS.cardSubHeader }}>
                {Object.entries(vehicle.vehicleInfo).map(([key, value]) => (
                  <div key={key} >
                     <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {key} : {value || "N/A"}
          </label>
          </div>
                ))}
              
            </div>
          </div>
        )}

       {vehicle.carCondition && (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold text-[#9b111e] mb-4" style={{ ...FONTS.cardheader }}>
      Car Condition
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ ...FONTS.cardSubHeader }}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
          Fuel Level : {vehicle.carCondition.fuelLevel || "N/A"}
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
          Selected Items : {vehicle.carCondition.selectedItems.join(", ")}
        </label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
          Images :
        </label>
        <div className="flex flex-wrap gap-2 mt-1">
          {vehicle.carCondition.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`condition-img-${i}`}
              className="w-20 h-16 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
)}


        {vehicle.checkInOutDates && (
  <div className="mt-8">
    <h3 className="text-2xl font-semibold text-[#9b111e] mb-4" style={{ ...FONTS.cardheader }}>
      Entries
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ ...FONTS.cardSubHeader }}>
      {Object.entries(vehicle.checkInOutDates).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, (str) => str.toUpperCase())}{" "}
            : {value || "N/A"}
          </label>
        </div>
      ))}
    </div>
  </div>
)}

        <div className="flex justify-start items-center mt-4">
          <Link
            to={redirectPath}
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 !text-white font-semibold py-2 px-6 rounded shadow-md transition"
            style={{...FONTS.paragraph}}
          >
            Job Card
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;