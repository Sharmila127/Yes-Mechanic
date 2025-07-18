import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FONTS } from "../../constants/uiConstants";
import { GetAssignedScheduleReq } from "./Service";
import { assignedScheduleRequest } from "./scheduleType";
import { FaUserAlt, FaCarAlt, FaClipboardList } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

export default function ScheduledRequestsPage() {
  const navigate = useNavigate();
  const [scheduledRequests, setScheduledRequests] = useState<assignedScheduleRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRequest, setSelectedRequest] = useState<assignedScheduleRequest | null>(null);
  const [open, setOpen] = useState(false);

  async function fetchedData() {
    const data = await GetAssignedScheduleReq();
    setScheduledRequests(data?.data || []);
  }

  useEffect(() => {
    fetchedData();
  }, []);

  const openModal = (request: assignedScheduleRequest) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="bg-[#FAF3EB] min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-12 h-12 bg-white border-2 border-[#9b111e] text-[#9b111e] rounded-3xl hover:bg-[#9b111e] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            title="Back to Schedule Requests"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <h1 className="!text-[20px] !font-bold" style={{...FONTS.header}}>
            Scheduled Requests
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400 focus-visible:ring-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-80 border-2 border-gray-200 rounded-3xl focus-visible:ring-0 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
              style={{...FONTS.paragraph}}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 rounded-3xl"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {scheduledRequests?.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-8xl mb-6">📅</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-4" style={{...FONTS.cardSubHeader}}>
            {searchTerm ? "No matching scheduled requests found" : "No scheduled requests yet"}
          </h3>
          <p className="text-lg text-gray-500 mb-8" style={{...FONTS.paragraph}}>
            {searchTerm ? "Try adjusting your search terms" : "Assigned requests will appear here"}
          </p>
          
          {!searchTerm && (
            <button
              onClick={() => navigate('/request-queue/schedule')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#9b111e] to-[#c41e3a] !text-white rounded-3xl hover:from-[#80101a] hover:to-[#a01829] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-semibold text-lg"
              style={{...FONTS.paragraph}}
            >
              <svg className="w-6 text-white h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Go to Schedule Requests
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {scheduledRequests.map((req) => (
            <div
              key={req._id}
              className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              onClick={() => openModal(req)}
            >
              <div className="flex gap-4 p-5">
                <div className="w-20 h-20 rounded-full border-4 border-[#9b111e] p-1 shadow-md">
                  <img
                    src="https://www.pngmart.com/files/23/Red-Car-PNG-Clipart.png"
                    alt="Car"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>

                <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] text-gray-700">
                  <div className="flex items-center gap-2">
                    <FaUserAlt className="text-lg" />
                    <span>{req.customerId?.firstName || 'Customer'} {req.customerId?.lastName || ''}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoCall className="text-lg" />
                    <span>{req.customerId?.contact_info?.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClipboardList className="text-lg" />
                    <span>{req.customerId?.vehicleInfo?.registerNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCarAlt className="text-lg" />
                    <span>{req.customerId?.vehicleInfo?.model || 'N/A'}</span>
                  </div>
                </div>
              </div>

             {req.partnerId && (
  <div className="bg-green-50 border border-green-500 mx-5 rounded-xl px-5 py-4 mb-4 relative">
    <div className="flex justify-between items-center mb-3">
      <div className="flex items-center gap-2 font-bold text-green-700 text-lg">
        <FaUserAlt />
        Assigned Partner
      </div>
      <div className="bg-green-600 text-white text-xs px-4 py-1 rounded-full font-semibold shadow-sm">
        Assigned On: {new Date(req.assigned_date).toLocaleDateString()}
      </div>
    </div>
    <div className="grid grid-cols-2 text-sm text-gray-700 gap-y-2">
      <p><span className="font-semibold">Partner ID:</span> {req.partnerId?.id || "N/A"}</p>
      <p><span className="font-semibold">Name:</span> {req.partnerId?.firstName || ""} {req.partnerId?.lastName || ""}</p>
      <p className="col-span-2">
        <span className="font-semibold">Phone:</span> {req.partnerId?.contact_info?.phoneNumber || "N/A"}
      </p>
    {(req.partnerId?.contact_info?.address1 || req.partnerId?.contact_info?.address2) && (
  <p className="col-span-2">
    <span className="font-semibold">Address:</span>{" "}
    {req.partnerId?.contact_info?.address1}
    {req.partnerId?.contact_info?.address1 && req.partnerId?.contact_info?.address2 && ", "}
    {req.partnerId?.contact_info?.address2}
  </p>
)}


      <p className="col-span-2">
        <span className="font-semibold">Location:</span> {req.partnerId?.contact_info?.city || ""}, {req.partnerId?.contact_info?.state || ""}
      </p>
    </div>
  </div>
)}
              <div className="flex justify-between items-center px-5 pb-4">
                <div className="bg-yellow-400 text-white text-sm font-bold px-4 py-1 rounded-full">
                  {req.status || "Pending"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(req.schedule_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
          <div className="w-full sm:w-1/2 h-full bg-[#FAF3EB] border-l-4 border-green-600 shadow-2xl p-8 relative overflow-y-auto rounded-3xl transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-green-600 tracking-wide" style={{...FONTS.header}}>
                Scheduled Request Details
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-black text-3xl font-bold rounded-3xl"
              >
                &times;
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl flex items-center justify-center font-bold shadow-md">
                  ✅
                </div>
              </div>

              <div className="flex-1 space-y-4 text-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-lg">
                  <p className="!text-gray-800 text-[14px]" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Request ID:</span>{" "}
                    {selectedRequest.requestId || "N/A"}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Customer:</span>{" "}
                    {selectedRequest.customerId?.firstName || ""} {selectedRequest.customerId?.lastName || ""}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Mobile:</span>{" "}
                    {selectedRequest.customerId?.contact_info?.phoneNumber || "N/A"}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Car No:</span>{" "}
                    {selectedRequest.customerId?.vehicleInfo?.registerNumber || "N/A"}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Vehicle:</span>{" "}
                    {selectedRequest.customerId?.vehicleInfo?.model || "N/A"}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Service:</span>{" "}
                    {selectedRequest.service?.[0]?.service_name || "General Service"}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Priority:</span>{" "}
                    {selectedRequest.priority || "Low"}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Amount:</span>{" "}
                    {selectedRequest.amount || "N/A"}
                  </p>
                  <p className="!text-green-600 text-lg font-semibold" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Assigned Partner:</span>{" "}
                    {selectedRequest.partnerId?.firstName || ""} {selectedRequest.partnerId?.lastName || ""}
                  </p>
                  <p className="!text-green-600 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Partner Contact:</span>{" "}
                    {selectedRequest.partnerId?.contact_info?.phoneNumber || "N/A"}
                  </p>
                  <p className="!text-green-600 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Partner Location:</span>{" "}
                    {selectedRequest.partnerId?.contact_info?.city || ""}, {selectedRequest.partnerId?.contact_info?.state || ""}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Scheduled Date:</span>{" "}
                    {new Date(selectedRequest.schedule_date).toLocaleDateString()}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Assigned Date:</span>{" "}
                    {new Date(selectedRequest.assigned_date).toLocaleDateString()}
                  </p>
                  <p className="!text-gray-800 text-lg" style={{...FONTS.cardSubHeader}}>
                    <span style={{...FONTS.cardSubHeader}}>Status:</span>{" "}
                    {selectedRequest.status || "Pending"}
                  </p>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2 bg-gray-200 !text-gray-800 rounded-3xl hover:!bg-gray-300"
                    style={{...FONTS.paragraph}}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}