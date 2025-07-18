import type { FC } from "react";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { FONTS } from "../../../constants/uiConstants";
import carDefaultlogo from "../../../assets/INVALID CAR LOGO.png"; // fallback image

export type Vehicle = {
  vehicleInfo: {
    kms?: string;
    fuel?: string;
    transmission?: string;
    location: string;
    registeredYear?: string;
    insuranceStatus?: string;
    availability?: string;
    currentFuelLevel?: "Empty" | "Quarter" | "Half Tank" | "Full";
  };
  baseVehicleInfo: {
    image?: string;
    title: string;
    registrationNumber: string;
  };
  customerDetails?: {
    fullName?: string;
  };
};

type Props = {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
};

const VehicleDetailCard: FC<Props> = ({ vehicle, onViewDetails }) => {
  const {
    kms = "N/A",
    fuel = "N/A",
    transmission = "N/A",
    location = "Unknown",
  } = vehicle.vehicleInfo;

  const {
    image = carDefaultlogo,
    title = "Untitled",
    registrationNumber = "Not Assigned",
  } = vehicle.baseVehicleInfo;

  return (
    <div
      className="relative rounded-2xl p-5"
      style={{
        height: "330px",
        background: "linear-gradient(180deg, #fdefe9 0%, #fff 100%)",
        borderColor: "#E6A895",
        boxShadow:
          "0 8px 20px rgba(155, 17, 30, 0.15), 0 4px 8px rgba(230, 168, 149, 0.2)",
        // ...FONTS.header,
        transition: "box-shadow 0.3s ease",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(155, 17, 30, 0.3), 0 6px 15px rgba(230, 168, 149, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(155, 17, 30, 0.15), 0 4px 8px rgba(230, 168, 149, 0.2)";
      }}
    >
      {/* Vehicle Image */}
      <div
        className="w-full h-44 rounded-xl overflow-hidden mb-4"
        style={{
          borderColor: "#E6A895",
          boxShadow: "inset 0 0 10px #fdefe9",
        }}

      >
		{/* this give default if the API give Image it Changes */}
        <div className="flex w-full h-full rounded">
          <img
            src={image || carDefaultlogo}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = carDefaultlogo;
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-xl font-extrabold mb-1"
        style={{ ...FONTS.cardheader }}
      >
        {registrationNumber} - {title}
      </h3>

      {/* Specs */}
      <p className="text-sm text-[#9b111e] opacity-75 mb-2 tracking-wide" style={{...FONTS.cardSubHeader}}>
        {kms} <span className="mx-2">•</span> {fuel}{" "}
        <span className="mx-2">•</span> {transmission}
      </p>

      {/* Actions and Location */}
      <div
        className="mt-5 flex items-center justify-between text-sm font-medium"
        style={{ color: "#9b111e" }}
      >
        <button
          onClick={() => onViewDetails(vehicle)}
          className="!bg-[#9b111e] !text-white  font-semibold py-2 px-3 rounded-3xl transition-all duration-300 shadow-md flex items-center gap-2 hover:!bg-opacity-90"
          style={{...FONTS.subParagraph}}
        >
          <FaEye className="text-sm" /> View Details
        </button>
        <span
          className="flex items-center"
          style={{
            ...FONTS.subParagraph,
          }}
        >
          <FaMapMarkerAlt className="mr-1" /> {location}
        </span>
      </div>
    </div>
  );
};

export default VehicleDetailCard;
