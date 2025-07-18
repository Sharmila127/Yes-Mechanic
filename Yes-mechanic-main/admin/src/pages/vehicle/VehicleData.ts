export type Vehicle = {
  baseVehicleInfo: {
    image: string;
    title: string;
    registrationNumber: string;
  };
  vehicleInfo: {
    kms: string;
    chassisNo: string;
    color: string;
    engineNo: string;
    insuranceCompany: string;
    insuranceRenewalDate: string;
    model: string;
    currentFuelLevel?: "Empty" | "Quarter" | "Half Tank" | "Full";
  };
  partnerDetails: {
    partnerName: string;
    partnerPhone: string;
    partnerAddress: string;
  };
  customerInfo: {
    name: string;
    contactNo: string;
    address:string;
  };
  carCondition: {
    fuelLevel: string;
    selectedItems: string[];
    images: string[];
  };
  checkInOutDates: {
    checkInDate: string;
    checkOutDate: string;
  };
};