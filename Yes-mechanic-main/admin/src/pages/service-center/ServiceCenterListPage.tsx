/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';

import { useState, useRef, useEffect } from "react"
// import { FaArrowTrendUp } from "react-icons/fa6"
// import { BsEye } from "react-icons/bs"
import { IoClose } from "react-icons/io5"
import { MdAddCircleOutline } from "react-icons/md"
import { FiSearch } from "react-icons/fi"
import { COLORS, FONTS } from "../../constants/uiConstants"
import Client from "../../api"
import { fetchCountries, fetchState } from "../../features/ServiceCenter/externalapi"
import { toast } from "react-toastify"
import { TbCloudUpload } from "react-icons/tb";

interface ContactInfo {
	phoneNumber: string;
	state: string;
	city: string;
	address1: string;
	address2: string;
}

interface PartnerFormData {
	firstName: string;
	lastName: string;
	companyName?: string;
	aadhar: string;
	pan: string;
	gstNo: string;
	regNo: string;
	email: string;
	password: string;
	contact_info: ContactInfo;
	role: 'partner';
	image?: File | null;
}

type ServiceCenterListProps = {
	onView: (step: any) => void;
	handleBack: () => void;
	partner: any;
	setpartner: (id: number) => void;
};

export const ServiceCenterListPage: React.FC<ServiceCenterListProps> = ({
	onView,
	partner,
	setpartner,
}) => {
	const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
		null
	);
	const [showSearch, setShowSearch] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [showPartnerForm, setShowPartnerForm] = useState(false);
	const partnerFileInputRef = useRef<HTMLInputElement>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Partner form state
	const [partnerFormData, setPartnerFormData] = useState<PartnerFormData>({
		firstName: '',
		lastName: '',
		companyName: '',
		aadhar: '',
		pan: '',
		gstNo: '',
		regNo: '',
		email: '',
		password: '',
		contact_info: {
			phoneNumber: '',
			state: '',
			city: '',
			address1: '',
			address2: '',
		},
		role: 'partner',
		image: null,
	});

	function changeData(index: number) {
		onView(1);
		console.log(index, 'partner');
		setpartner(index);
	}

	// Partner form handlers
	const handlePartnerFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value, files } = e.target as HTMLInputElement;

		if (name === 'image' && files) {
			setPartnerFormData((prev) => ({ ...prev, image: files[0] }));
		} else if (name.startsWith('contact_info.')) {
			const key = name.split('.')[1] as keyof ContactInfo;
			setPartnerFormData((prevData) => ({
				...prevData,
				contact_info: {
					...prevData.contact_info,
					[key]: value,
				},
			}));
		} else {
			setPartnerFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handlePartnerFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		const data = new FormData();
		Object.entries(partnerFormData).forEach(([key, value]) => {
			if (key === 'contact_info') {
				Object.entries(value).forEach(([subKey, subValue]) => {
					data.append(`contact_info.${subKey}`, String(subValue));
				});
			} else if (key === 'image' && value instanceof File) {
				data.append('image', value);
			} else if (value !== undefined && value !== null) {
				data.append(key, value as string);
			}
		});

		try {
			await new Client().admin.servicecenter.postPartner(data);

			// Reset form and close modal
			setPartnerFormData({
				firstName: '',
				lastName: '',
				companyName: '',
				aadhar: '',
				pan: '',
				gstNo: '',
				regNo: '',
				email: '',
				password: '',
				contact_info: {
					phoneNumber: '',
					state: '',
					city: '',
					address1: '',
					address2: '',
				},
				role: 'partner',
				image: null,
			});
			setShowPartnerForm(false);
			if (partnerFileInputRef.current) {
				partnerFileInputRef.current.value = '';
			}
			toast.success('Partner registered successfully!');
		} catch (error: any) {
			console.log('Registration failed!', error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const Spinner = ({ className = '' }: { className?: string }) => (
		<svg
			className={`animate-spin h-5 w-5 ${className}`}
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			viewBox='0 0 24 24'
		>
			<circle
				className='opacity-25'
				cx='12'
				cy='12'
				r='10'
				stroke='currentColor'
				strokeWidth='4'
			></circle>
			<path
				className='opacity-75'
				fill='currentColor'
				d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
			></path>
		</svg>
	);

	const handleCancelPartnerForm = () => {
		setShowPartnerForm(false);
		setPartnerFormData({
			firstName: '',
			lastName: '',
			companyName: '',
			aadhar: '',
			pan: '',
			gstNo: '',
			regNo: '',
			email: '',
			password: '',
			contact_info: {
				phoneNumber: '',
				state: '',
				city: '',
				address1: '',
				address2: '',
			},
			role: 'partner',
			image: null,
		});
		if (partnerFileInputRef.current) {
			partnerFileInputRef.current.value = '';
		}
	};

	// Filter partners based on search term
	const filteredPartners = partner.filter(
		(center: any) =>
			`${center.firstName} ${center.lastName}`
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			center.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const [city, setCity] = useState<any[]>([]);

	const getCountries = async () => {
		const states: any = state.filter(
			(item) => item.name === partnerFormData.contact_info.state
		);
		const response = await fetchCountries(states[0].iso2);
		if (response && response.data) {
			setCity(response.data);
		} else {
			setCity([]);
		}
	};

	useEffect(() => {
		getCountries();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [partnerFormData.contact_info.state]);

	const [state, setState] = useState<any[]>([]);

	const getStates = async () => {
		const response = await fetchState();
		if (response) {
			setState(response.data);
		} else {
			setState([]);
		}
	};

	useEffect(() => {
		getStates();
	}, []);

	return (
		<div
			className='flex flex-col bg-gray-100'
			style={{ background: COLORS.bgColor }}
		>
			<div className='flex gap-6 flex-wrap'>
				<div
					className='flex-1 min-w-[600px] bg-white p-5'
					style={{ background: COLORS.bgColor }}
				>
					<div className='flex justify-between items-center border-b border-gray-300 pb-4 mb-4 flex-wrap gap-4'>
						<h1
							className='font-bold font-koh !font-bold text-3xl pt-2 !text-[#9b111e]'
							style={{ ...FONTS.header }}
						>
							Partners
						</h1>
						<div className='flex items-center gap-3 flex-wrap'>
							<button
								className='bg-[#fce8e8] font-koh text-gray-600 hover:text-[#9b111e] p-2 rounded-3xl transition'
								title='Search'
								onClick={() => setShowSearch(!showSearch)}
							>
								<FiSearch size={22} className='text-[#800000] font-koh' />
							</button>

							{showSearch && (
								<input
									type='text'
									className='px-4 py-1.5 border border-[#800000] focus:border-[#800000] rounded-md shadow-sm focus:outline-none'
									placeholder='Search service centers...'
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							)}

              <button
                className="!text-white px-4 py-2 bg-[#9b111e] rounded-3xl transition duration-200 flex items-center gap-2"
                style={{ ...FONTS.paragraph,}}
                onClick={() => setShowPartnerForm(true)}
              >
                <MdAddCircleOutline size={18} /> Add
              </button>
            </div>
          </div>
          

          <div className="grid grid-cols-2 gap-4 mt-4 " >
            {filteredPartners.map((center: any, index: number) => (
              <div className="relative" key={index}>
                <div className="bg-white p-6 rounded-lg shadow flex flex-col items-start h-full w-full ">
                  <div>
                  <img
                    src={center.image}
                    alt={center.companyName+" logo"}
                    className="w-72 h-40 object-cover rounded-lg"
                  />
                  </div>
                   <div className="absolute right-8 bottom-20 gap-2 mt-2 sm:mt-0">
                    {/* {selectedCardIndex !== index && ( */}
                      <button
                        onClick={() => changeData(index)}
                        className="!text-white  px-4 py-1 rounded-3xl bg-[#9b111e] transition duration-200 flex items-center gap-1.5 text-sm"
                        style={{ ...FONTS.paragraph,
                          
                        }}
                      >
                        View
                      </button>
                    {/* )} */}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800" style={{color : COLORS.primary}}>
                      {center.companyName}
                    </h3>

                    <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#717171]">Address : </h3>
                    <p className="text-sm text-[#717171]" >
                     {center.contact_info.address1}, {center.contact_info.address2}, {center.contact_info.city}
                    </p>
                    </div>

                    <div className="flex items-center gap-2">
                    <h3 className="font-bold text-[#717171]">Contact : </h3>
                    <p className="text-sm text-[#717171]">
                     {center?.contact_info?.phoneNumber}
                    </p>
                    </div>
                  </div>

                 
                </div>

								{selectedCardIndex === index && (
									<div className='mt-4 relative borderrounded-3xl p-4 bg-gray-50'>
										<button
											onClick={() => setSelectedCardIndex(null)}
											className='absolute top-2 right-2 text-gray-600 hover:text-red-600 pt-5 pr-5'
										>
											<IoClose size={30} />
										</button>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>

      {/* Partner Registration Modal */}
      {showPartnerForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl !font-bold !text-[#9b111e]"
                style={{...FONTS.header}}
                >Partner Registration</h3>
                <button
                  onClick={handleCancelPartnerForm}
                  className="p-2 hover:bg-gray-100 rounded-3xl transition-colors"
                >
                  <IoClose size={24} className="text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handlePartnerFormSubmit} className="p-6">
              <div className="grid grid-cols-3 md:grid-cols-3 gap-6"
              style={{...FONTS.paragraph}}
              >
              
                 
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="First Name"
                      value={partnerFormData.firstName}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Last Name"
                      value={partnerFormData.lastName}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border placeholder:text-[#717171] border-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company Name"
                      value={partnerFormData.companyName}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>
                  
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contact_info.phoneNumber"
                      required
                      placeholder="Phone Number"
                      value={partnerFormData.contact_info.phoneNumber}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <select
                        name="contact_info.state"
                        value={partnerFormData.contact_info.state}
                        onChange={handlePartnerFormChange}
                        className={`w-full px-4 py-2 border border-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition ${partnerFormData ? 'text-black' : 'text-[#717171]'}`}

                      >
                        <option className="text-[#717171]" value="" disabled>Select a state</option>
                        {state.map(city => (
                          <option className="text-[#717171] " key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <select
                        name="contact_info.city"
                        value={partnerFormData.contact_info.city}
                        onChange={handlePartnerFormChange}
                        className={`w-full px-4 py-2 border border-[#717171]  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition ${partnerFormData ? 'text-black' : 'text-[#717171]'}`}>                      
                        <option className="text-[#717171]" value=""  disabled >Select a city</option>
                        {city.map(city => (
                          <option className="text-[#717171]" key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Aadhar No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="aadhar"
                      required
                      placeholder="Aadhar no"
                      value={partnerFormData.aadhar}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <input
                      type="text"
                      name="contact_info.address1"
                      placeholder="Address Line 1"
                      value={partnerFormData.contact_info.address1}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                    <input
                      type="text"
                      name="contact_info.address2"
                      placeholder="Address Line 2"
                      value={partnerFormData.contact_info.address2}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reg No 
                    </label>
                    <input
                      type="text"
                      name="regNo"
                      placeholder="regNo"
                      value={partnerFormData.regNo}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border border-[#717171] placeholder:text-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>
 
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PAN No 
                    </label>
                    <input
                      type="text"
                      name="pan"
                      placeholder="PAN no"
                      value={partnerFormData.pan}
                      onChange={handlePartnerFormChange}
                      className="w-full px-4 py-2 border placeholder:text-[#717171] border-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST No 
                    </label>
                    <input
                      type="text"
                      name="gstNo"
                      placeholder="GST No"
                      value={partnerFormData.gstNo}
                      onChange={handlePartnerFormChange}
                      className="placeholder:text-[#717171] w-full px-4 py-2 border border-[#717171]  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>
                                  
              </div>

              <div className="col-span-full">
  <label className="block text-sm mt-4 font-medium text-gray-700 mb-2">
    Upload Profile Image
  </label>
  <div className="grid grid-rows-2 justify-center items-center px-6 py-8 border  border-[#717171] rounded-md">
      <div>
      <TbCloudUpload  className="mx-auto w-10 h-10"/>
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-600">
        <label
          htmlFor="file-upload"
          className="relative cursor-pointer rounded-md bg-gray-200 font-medium text-gray-700 px-4 py-2 hover:bg-gray-300 transition"
        >
          <span>Choose File</span>
          <input
            id="file-upload"
            name="image"
            type="file"
            accept="image/*"
            ref={partnerFileInputRef}
            onChange={handlePartnerFormChange}
            className="sr-only"
          />
        </label>
        <div className="ml-3" id="file-name">
          No File Chosen
        </div>
      </div>
    
  </div>
</div>


                <div className="border-2 border-[#9b111e] p-4 mt-4 rounded-xl ">
                  <h2 className="mb-3 text-[#9b111e] text-lg font-bold">Login Setup</h2>
                  <div className="grid grid-cols-2 gap-2 justify-between">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={partnerFormData.email}
                      onChange={handlePartnerFormChange}
                      className="placeholder:text-[#717171] w-full px-4 py-2 border border-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>

               <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      placeholder="***********"
                      value={partnerFormData.password}
                      onChange={handlePartnerFormChange}
                      className="placeholder:text-[#717171] w-full px-4 py-2 border border-[#717171] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-transparent transition"
                    />
                  </div>
                  </div>
                  </div>      
              {/* Full width submit button */}
              <div className="mt-8">
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancelPartnerForm}
                    className="px-6 py-2 border border-gray-300 rounded-3xl text-[#9b111e] bg-white hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-6 py-2 text-white font-semibold rounded-3xl hover:opacity-90 transition flex items-center justify-center gap-2 ${
                      isLoading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                    style={{ backgroundColor: '#9b111e' }}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="text-white" />
                        <span>Registering...</span>
                      </>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    
    {/* {showPassForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-4 rounded-3xl">
      <h1>Hello world</h1>
      <button onClick={() => setShowPassForm(false)}>Close</button>
    </div>
  </div> */}
			{/* )} */}
		</div>
	);
};
