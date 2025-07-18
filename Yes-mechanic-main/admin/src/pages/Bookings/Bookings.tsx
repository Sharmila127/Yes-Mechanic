import React, { useEffect, useState } from 'react';
import CompactServiceCard from '../../components/Bookings/CompactServiceCard';
import AssignedRequests from '../../components/Bookings/AssignedRequests';
import { GetAssignedRequest, GetPendingRequest } from './service';
import { FONTS } from '../../constants/uiConstants';

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
	assigned_date: string;
	partnerId: {
		contact_info: {
			state: string;
			city: string;
			address1: string;
			address2: string;
			phoneNumber: string;
		};
		firstName: string;
		lastName: string;
		id: string;
	};
};
type AssignedService = {
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
	assigned_date: string;
	partnerId: {
		contact_info: {
			state: string;
			city: string;
			address1: string;
			address2: string;
			phoneNumber: string;
		};
		firstName: string;
		lastName: string;
		id: string;
	};
};
const ServiceRequests: React.FC = () => {
	const [currentView, setCurrentView] = useState<'pending' | 'assigned'>(
		'pending'
	);
	const [assignedRequests, setAssignedRequests] = useState<AssignedService[]>(
		[]
	);
	const [searchTerm, setSearchTerm] = useState('');
	const [pendingRequests, setPendingRequests] = useState<pendingService[]>([]);

  async function fetchpending() {
    try {
      const data = await GetPendingRequest()
      setPendingRequests(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

	async function fetchassigned() {
		try {
			const data = await GetAssignedRequest();
			setAssignedRequests(data?.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (currentView === 'pending') {
			fetchpending();
		} else {
			fetchassigned();
		}
	}, [currentView]);

	const handleAssignPartner = async (requestId: string, partner: string) => {
		// Find the request to assign
		const requestToAssign = pendingRequests.find(
			(req) => req._id === requestId
		);
		if (requestToAssign) {
			// Create assigned request with additional fields

			const assignedRequest = {
				...requestToAssign,
				assignedPartner: partner,
				assignedDate: new Date().toISOString(),
				status: 'assigned',
			};

			// Add to assigned requests
			setAssignedRequests((prev) => [...prev, assignedRequest]);

			// Remove from pending requests
			setPendingRequests((prev) => prev.filter((req) => req._id !== requestId));

			// Switch to assigned view
			setCurrentView('assigned');
		}
	};


  const filteredPendingRequests = pendingRequests.filter(request => {
    const searchLower = searchTerm.toLowerCase();
    const matchesId = request?._id.toString().includes(searchLower);
    const matchesName = request?.customerId?.firstName?.toLowerCase().includes(searchLower) ?? " ";
    return matchesId || matchesName;
  });

  const filteredAssignedRequests = assignedRequests.filter(request => {
    const searchLower = searchTerm.toLowerCase();
    const matchesId = request._id.toString().includes(searchLower);
    const matchesName = request?.customerId?.firstName?.toLowerCase().includes(searchLower) ?? " ";
    return matchesId || matchesName;
  });

  return (
    <div className="min-h-screen bg-[#FAF3EB]">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl !font-bold  mb-3"
              style={{ ...FONTS.header }}>Service Requests</h1>
              <p className="text-sm !text-gray-600"
              style={{ ...FONTS.subHeader }}>Manage automotive service requests</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by ID or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-64 pl-10 pr-3 py-2 border border-[#717171] placeholder:text-[#717171] rounded-3xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#9b111e] focus:border-[#9b111e] text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Toggle Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentView('pending')}
                  className={`px-4 py-2 rounded-3xl font-medium border transition-colors ${
                    currentView === 'pending'
                      ? 'bg-[#9b111e] text-white'
                      : 'bg-[white] text-[#9b111e] border-[#9b111e] '
                  }`}
                >
                  Pending ({filteredPendingRequests.length})
                </button>
                <button
  onClick={() => setCurrentView('assigned')}
  className={`px-4 py-2 rounded-3xl font-medium border transition-colors
    ${
			currentView === 'assigned'
				? 'bg-[#9b111e] text-white border-[#9b111e]'
				: 'bg-[white] text-[#9b111e] border-[#9b111e] '
		}`}
								>
									Assigned
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

    
      <div className="w-full py-6">
        {currentView === 'pending' ? (
          <>
            {/* Search Results Info */}
            {searchTerm && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Search Results:</span> Found {filteredPendingRequests.length} pending request(s) matching "{searchTerm}"
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4">
              {
              filteredPendingRequests.map((request) => (
                <CompactServiceCard 
                  key={request._id} 
                  request={request} 
                  onAssign={handleAssignPartner}
                />
              ))}
            </div>

						{filteredPendingRequests?.length === 0 && !searchTerm && (
							<div className='text-center py-12'>
								<div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
									<svg
										className='w-8 h-8 text-gray-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={1.5}
											d='M9 12h6M9 16h6M9 8h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<h3 className='text-lg font-semibold text-gray-900 mb-2'>
									No pending requests
								</h3>
								<p className='text-gray-600'>New requests will appear here</p>
							</div>
						)}

            {filteredPendingRequests.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">No pending requests match your search for "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-3 text-[#9b111e] hover:text-[#7a0e17] font-medium text-sm rounded-3xl"
                >
                  Clear search
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Search Results Info for Assigned */}
            {searchTerm && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <span className="font-medium">Search Results:</span> Found {filteredAssignedRequests.length} assigned request(s) matching "{searchTerm}"
                </p>
              </div>
            )}
            
            <AssignedRequests
              assignedRequests={filteredAssignedRequests.map(request => ({
                ...request,
                partnerId: {
                  companyName: (request.partnerId as any).companyName ?? "",
                  ...request.partnerId
                }
              }))}
              searchTerm={searchTerm}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceRequests;
