/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePendingRequest } from "../../pages/Bookings/service";
import { FetchPartnerList } from "../../utils/CommonApiFetch";
import { FaCalendarAlt } from "react-icons/fa";
import { BsFillClockFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaCar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";


type pendingService = {
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
		};
		vehicleInfo: {
			registerNumber: string;
			model: string;
		};
		firstName: string;
		lastName: string;
	};
	service: [
		{
			_id: string;
			service_name: string;
			uuid: string;
		}
	];
	createdAt: string;
};
interface CompactServiceCardProps {
	request: pendingService;
	onAssign?: (requestId: string, partner: string) => void;
}

const CompactServiceCard: React.FC<CompactServiceCardProps> = ({
	request,
	onAssign,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedPartner, setSelectedPartner] = useState('');
	const [partnerList, setpartnerList] = useState<any[]>([]);

	const handleAssign = async () => {
		if (!selectedPartner) {
			toast.error('Please select a partner.');
			return;
		}
		toast.success(`Assigned to ${selectedPartner}`);
		const data = { uuid: request.uuid };
		await updatePendingRequest(selectedPartner, data);

		if (onAssign) {
			onAssign(request.uuid, selectedPartner);
		}

		setIsModalOpen(false);
		setSelectedPartner('');
	};

	async function setOpenModel() {
		const data: any = await FetchPartnerList();
		setpartnerList(data);
		setIsModalOpen(true);
	}

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
  {/* Header */}
  <div className="flex items-center justify-between mb-3">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-[#9b111e] rounded-full flex items-center justify-center text-white font-bold text-base">
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
    <p className="flex"><FaCalendarAlt className="mr-2" /> {request.createdAt.split('T')[0]}</p>
    <p className="text-sm items-center  flex text-gray-500">
      <BsFillClockFill className='mr-2' />{new Date(request.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </p>
  </div>
  <hr className="mb-3" />

  {/* Customer Name and Contacts */}
  <div className="grid grid-cols-2 gap-8 mb-4">
    <div>
      <div className="flex items-center mb-2 gap-2">
        <p className="text-sm flex gap-3 items-center font-semibold text-gray-700"> <FaUser className="w-4 h-4" />Customer Name</p>
      </div>
      <p className=" ml-8 text-gray-900 text-sm">{request?.customerId?.firstName + ' ' + request?.customerId?.lastName || "Null"}</p>
    </div>
    <div>
      <div className="flex items-center mb-2 gap-2">
        <p className="text-sm flex gap-3 items-center font-semibold text-gray-700"> <IoCall className="w-5 h-5" />Contacts</p>
      </div>
      <p className="ml-8 text-gray-900 text-sm">{request?.customerId?.contact_info?.phoneNumber}</p>
    </div>
  </div>

  {/* Register Number and Vehicle Model */}
  <div className="grid grid-cols-2 gap-8 mb-4">
    <div>
      <div className="flex items-center mb-2 gap-2">
        <p className="text-sm items-center flex gap-3 font-semibold text-gray-700"><BiSolidEdit className="h-5 w-5" />Register Number</p>
      </div>
      <p className=" ml-8 text-gray-900 text-sm">{request?.customerId?.vehicleInfo?.registerNumber || "null"}</p>
    </div>
    <div>
      <div className="flex items-center mb-2 gap-2">
        <p className="text-sm flex gap-3 items-center font-semibold text-gray-700"> <FaCar className="h-5 w-5" />Vehicle Model</p>
      </div>
      <p className="ml-8 text-gray-900 text-sm">{request?.customerId?.vehicleInfo.model || "null"}</p>
    </div>
  </div>

  {/* Services and Locations */}
  <div className="grid grid-cols-2 gap-8 mb-4">
    <div>
      <div className="flex items-center mb-2 gap-2">
        <p className="text-sm flex gap-3 items-center font-semibold text-gray-700">
          <MdOutlineMiscellaneousServices className="h-6 w-6" />
          Services
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {request.service.slice(0, 3).map((service: any, index: number) => (
          <span key={index} className="ml-8 text-green-600 text-sm font-medium">
            {service.service_name}
          </span>
        ))}
        {request.service.length > 3 && (
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm font-medium">
            +{request.service.length - 3} more
          </span>
        )}
      </div>
    </div>
    <div>
      <div className="flex items-center mb-2 gap-2">
        <p className="text-sm flex gap-3 items-center font-semibold text-gray-700"> <FaLocationDot className="h-4 w-4" />Locations</p>
      </div>
      <p className="text-gray-900 ml-8 truncate text-sm">{request?.customerId?.contact_info?.address1+' '+
          request?.customerId?.contact_info?.address2+' '+ request?.customerId?.contact_info?.city+' '+
          request?.customerId?.contact_info.state
        }</p>
    </div>
  </div>

  {/* Partner Button */}
  <div className="flex justify-end">
    <button
      onClick={setOpenModel}
      className="bg-[#9b111e] text-white px-6 py-1 rounded-full text-md font-medium w-full"
    >
      Partner
    </button>
  </div>
</div>

			{isModalOpen && (
				<div className='fixed inset-0 z-50 flex'>
					<div
						className='absolute inset-0 bg-black bg-opacity-40'
						onClick={() => setIsModalOpen(false)}
					/>
					<div className='ml-auto w-1/2 h-full bg-[#fef3f2] shadow-xl z-50 p-6 overflow-y-auto animate-slide-in relative rounded-l-xl border-l-4 border-[#9b111e]'>
						<button
							onClick={() => setIsModalOpen(false)}
							className='absolute top-4 right-6 text-gray-600 text-xl font-bold hover:text-gray-800 rounded-3xl'
						>
							&times;
						</button>

						<h2 className='text-2xl font-bold text-[#9b111e] mb-6'>
							Assign Partner
						</h2>

            <div className="bg-white shadow-md rounded-xl p-5 grid grid-cols-2 gap-4 mb-6 border">
              <div>
                <p className="text-sm text-gray-500 font-medium">Customer:</p>
                <p className="font-semibold text-gray-800">{request?.customerId?.firstName+' '+request?.customerId?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Mobile:</p>
                <p className="font-semibold text-gray-800">{request?.customerId?.contact_info?.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Car No:</p>
                <p className="font-semibold text-gray-800">{request?.customerId?.vehicleInfo?.registerNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Vehicle:</p>
                <p className="font-semibold text-gray-800">{request?.customerId?.vehicleInfo?.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Issues:</p>
                <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                  {request?.service.map((service: any, index: number) => (
                    <li key={index} className="font-medium">{service?.service_name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Address:</p>
                <p className="font-semibold text-gray-800">{request?.customerId?.contact_info?.address1 + ' ' +
                  request?.customerId?.contact_info?.address2 + ' ' + request?.customerId?.contact_info?.city + ' ' +
                  request?.customerId?.contact_info?.state}</p>
              </div>
            </div>

						<div className='mb-6'>
							<label className='block text-sm font-medium text-gray-700 mb-1'>
								Select Partner:
							</label>
							<select
								value={selectedPartner}
								onChange={(e) => setSelectedPartner(e.target.value)}
								className='w-full border border-gray-300 rounded-md px-3 py-2 text-sm'
							>
								<option value=''>-- Choose a partner --</option>
								{partnerList?.map((items, index) => {
									return (
										<option key={index} value={items._id}>
											{items?.id +
												' ' +
												items.firstName +
												' ' +
												items.lastName +
												'-' +
												items.contact_info.city}
										</option>
									);
								})}
								{/* <option value="Donald spares & services">Donald spares & services</option>
                <option value="kar spa services">kar spa services</option> */}
							</select>
						</div>

						<div className='flex justify-end gap-3'>
							<button
								onClick={() => setIsModalOpen(false)}
								className='bg-gray-200 text-gray-700 px-4 py-2  font-medium hover:bg-gray-300 rounded-3xl'
							>
								Cancel
							</button>
							<button
								onClick={handleAssign}
								disabled={!selectedPartner}
								className='bg-[#9b111e] text-white px-4 py-2 rounded-3xl font-medium hover:bg-[#7e0e19] disabled:opacity-50'
							>
								Assign Partner
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default CompactServiceCard;
