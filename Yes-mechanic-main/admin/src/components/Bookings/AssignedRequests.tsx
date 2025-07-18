/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";


interface AssignedRequest {
    _id: string;
    requestId: string;
    uuid: string;
    requestType: string;
    customerId: {
      contact_info: {
        state: string;
        city: string;
        address1: string;
        address2: string;
        phoneNumber: string;
      }
      vehicleInfo: {
        registerNumber: string;
        model: string;
      }
      firstName: string;
      lastName: string;
    }
    service: [
      {
        _id: string;
        service_name: string;
        uuid: string;
      }
    ]
    createdAt: string;
    assigned_date:string;
    partnerId:{
      companyName: string;
      contact_info: {
        state: string;
        city: string;
        address1: string;
        address2: string;
        phoneNumber: string;
      }
      firstName: string;
      lastName: string;
      id:string;
    }
  }
interface AssignedRequestsProps {
  assignedRequests: AssignedRequest[];
  searchTerm?: string;
}

const AssignedRequests: React.FC<AssignedRequestsProps> = ({ assignedRequests, searchTerm }) => {
  return (
<div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
  {assignedRequests.map((request) => (
    <div
      key={request._id}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-base">
            SR
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base">
              #{request?.requestId}
            </h3>
          </div>
        </div>
      </div>

      {/* Date and Time */}
      <div className="flex justify-between text-sm text-gray-600 font-medium text-right leading-tight mb-4">
        <p className="flex gap-2"> <FaCalendarAlt />{new Date(request.createdAt).toLocaleDateString()}</p>
        <p className="text-sm flex items-center gap-2 text-gray-500">
          <BsFillClockFill />
          {new Date(request.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>

      {/* Assigned Partner Info */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaUser className="text-green-600 mr-3" />
            <p className="text-lg font-semibold text-green-600">Assigned Partner</p>
          </div>
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Assigned On: {new Date(request?.assigned_date).toLocaleDateString()}
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Partner ID:</span> {request?.partnerId?.id}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-600">Name:</p>
            <p className="text-green-900">{request.partnerId?.firstName} {request.partnerId?.lastName}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-600">Company Name:</p>
            <p className=" text-green-900">{request.partnerId?.companyName }</p>
          </div>
        </div>
      </div>

      {/* Customer Name and Contacts */}
      <div className="grid grid-cols-2 gap-8 mb-4">
        <div>
          <div className="flex items-center mb-2">
            <p className="text-sm flex items-center gap-3 font-semibold text-gray-700"> <FaUser className="w-4 h-4" />Customer Name</p>
          </div>
          <p className="font-semibold ml-8 text-gray-900 text-sm">{request?.customerId?.firstName+' '+request?.customerId?.lastName || "customer name"}</p>
        </div>

        <div>
          <div className="flex items-center mb-2">
            <p className="text-sm font-semibold flex items-center gap-3 text-gray-700"><IoCall className="w-5 h-5" />Contacts</p>
          </div>
          <p className="font-semibold text-gray-900 ml-8 text-sm">{request?.customerId?.contact_info?.phoneNumber}</p>
        </div>
      </div>

      {/* Register Number and Vehicle Model */}
      <div className="grid grid-cols-2 gap-8 mb-4">
        <div>
          <div className="flex items-center mb-2">
            <p className="text-sm font-semibold flex items-center gap-3 text-gray-700"><BiSolidEdit className="h-5 w-5"/>Register Number</p>
          </div>
          <p className="font-semibold ml-8 text-gray-900 text-sm">{request?.customerId?.vehicleInfo?.registerNumber || 'null'}</p>
        </div>
        <div>
          <div className="flex items-center mb-2">
           <p className="text-sm font-semibold text-gray-700 flex items-center gap-3"><FaCar className="h-5 w-5" />Vehicle Model</p>
          </div>
          <p className="font-semibold text-gray-900 ml-8 text-sm">{request?.customerId?.vehicleInfo?.model || 'null'}</p>
        </div>
      </div>

      {/* Services and Locations */}
      <div className="grid grid-cols-2 gap-8 mb-4">
        <div>
          <div className="flex items-center mb-2">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-3">
             <MdOutlineMiscellaneousServices className="h-6 w-6" />
              Services
            </p>
          </div>
          <div className="flex flex-wrap ml-8 gap-1">
            {request?.service.slice(0, 3).map((service: any, index: number) => (
              <span key={index} className="text-green-600 text-sm font-medium">
                {service?.service_name}
              </span>
            ))}
            {request.service.length > 3 && (
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm font-medium">
                +{request?.service.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-3"><FaLocationDot className="h-4 w-4" />Locations</p>
          </div>
          <p className="text-gray-900 ml-8 truncate text-sm">{request?.customerId?.contact_info?.address1 + ' ' +
            request?.customerId?.contact_info?.address2 + ' ' + request?.customerId?.contact_info?.city + ' ' +
            request?.customerId?.contact_info?.state
          }</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex justify-between items-center">
        <span className="bg-green-600 text-white px-4 py-2 ml-2 rounded-full text-sm font-medium">
          Assigned
        </span>
      </div>
    </div>
  ))}

  {assignedRequests?.length === 0 && !searchTerm && (
    <div className="col-span-full text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No assigned requests</h3>
      <p className="text-gray-600">Assigned requests will appear here</p>
    </div>
  )}

  {assignedRequests?.length === 0 && searchTerm && (
    <div className="col-span-full text-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
      <p className="text-gray-600">No assigned requests match your search for "{searchTerm}"</p>
    </div>
  )}
</div>
  );
};

export default AssignedRequests;