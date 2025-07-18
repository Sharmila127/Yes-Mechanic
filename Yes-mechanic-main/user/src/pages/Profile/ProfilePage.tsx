/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
	getUserProfile,
	updateUserProfile,
} from '../../features/Profile/service';

// interface UserInfo {
// 	name: string;
// 	email: string;
// 	number: string;
// 	address: string;
// }

interface Car {
	model: string;
	issue: string;
}

interface ServiceHistory {
	date: string;
	service: string;
	status: string;
}

const ProfilePage: React.FC = () => {
	const [isCarTab, setIsCarTab] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [showHistory, setShowHistory] = useState<number | null>(null);
	const [profileData, setProfileData] = useState<any>({});
	const [errors, setErrors] = useState<any>({});
	// const [isLoading, setIsLoading] = useState(true);

	const fetchUserProfile = async () => {
		try {
			const response: any = await getUserProfile({});
			if (response) {
				setProfileData(response?.data?.data);
				// setIsLoading(false);
			}
		} catch (error) {
			console.error('Error fetching user profile:', error);
		} finally {
			// setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const [cars, setCars] = useState<Car[]>([
		{ model: 'Hyundai i20', issue: 'Brake noise when slowing down' },
	]);

	// Mock service history data
	const [serviceHistory] = useState<Record<number, ServiceHistory[]>>({
		0: [
			{
				date: '2024-12-15',
				service: 'Brake Pad Replacement',
				status: 'Completed',
			},
			{ date: '2024-11-20', service: 'Oil Change', status: 'Completed' },
			{ date: '2024-10-10', service: 'Engine Diagnostic', status: 'Completed' },
		],
	});

	const validateField = (name: string, value: string) => {
		switch (name) {
			case 'firstName':
			case 'lastName':
				return !value.trim() ? 'This field is required' : '';
			case 'email':
				if (!value.trim()) return 'Email is required';
				if (!/^[^\s@]+@gmail\.com$/.test(value)) return 'Email must be a Gmail address';
				return '';
			case 'number':
				if (!value.trim()) return 'Phone number is required';
				if (!/^[6-9]\d{9}$/.test(value.replace(/\D/g, ''))) return 'Invalid Indian phone number format';
				return '';
			case 'address':
				return !value.trim() ? 'Address is required' : '';
			default:
				return '';
		}
	};

	const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let finalValue = value;
		
		if (name === 'number') {
			finalValue = value.replace(/[^0-9]/g, '');
		}
		
		setProfileData((prev: any) => ({ ...prev, [name]: finalValue }));
		const error = validateField(name, finalValue);
		setErrors((prev: any) => ({ ...prev, [name]: error }));
	};

	const handleCarChange = (
		index: number,
		field: 'model' | 'issue',
		value: string
	) => {
		const updatedCars = [...cars];
		updatedCars[index][field] = value;
		setCars(updatedCars);
	};

	const addCar = () => {
		setCars([...cars, { model: '', issue: '' }]);
	};

	const deleteCar = (index: number) => {
		const newCars = [...cars];
		newCars.splice(index, 1);
		setCars(newCars);
		setShowHistory(null);
	};

	const validateForm = () => {
		const newErrors: any = {};
		const fields = ['firstName', 'lastName', 'email', 'number', 'address'];
		
		fields.forEach(field => {
			const error = validateField(field, profileData[field] || '');
			if (error) newErrors[field] = error;
		});
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleEditProfile = async () => {
		if (!validateForm()) {
			return;
		}
		
		setEditMode(false);
		try {
			// Send only allowed fields
			const transformedData = {
				firstName: profileData.firstName,
				lastName: profileData.lastName,
				email: profileData.email,
				contact_info: `${profileData.number || profileData.contact_info?.phoneNumber || ''}, ${profileData.address || profileData.contact_info?.address1 || ''}`
			};
			
			const response = await updateUserProfile(transformedData);
			if (response) {
				console.log('Profile updated successfully:', response);
				// Update local state with new data
				setProfileData((prev: any) => ({
					...prev,
					...transformedData,
					number: profileData.number,
					address: profileData.address
				}));
			}
		} catch (error) {
			console.error('Error updating profile:', error);
		}
	};

	// if (isLoading) {
	// 	return (
	// 		<div className='min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-2'>
	// 			<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
	// 			<p className='text-red-500 text-lg font-semibold'>Loading...</p>
	// 		</div>
	// 	);
	// }

	return (
		<div className='h-screen w-screen flex items-center justify-center p-8 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden'>
			<div className='relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden'>
				{/* Car Details Panel */}
				<div
					className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${isCarTab ? 'opacity-100 z-20' : 'opacity-0 z-10'
						}`}
				>
					<div className='flex h-full w-full'>
						{/* Red Section - Left */}
						<div
							className='w-1/2  relative overflow-hidden'
							style={{ backgroundColor: '#0050A5' }}
						>
							<div className='absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent' />
							<div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
								<h2 className='text-xl font-bold mb-4'>User Profile</h2>
								<p className='text-red-100 text-center mb-8 leading-relaxed'>
									Switch to manage your personal information and account details
								</p>
								<button
									onClick={() => setIsCarTab(false)}
									className='px-3 py-1 border-2 border-white bg-white rounded-full text-[#0050A5] font-medium  transition-all duration-300 hover:scale-105'
								>
									USER PROFILE
								</button>
							</div>
							<div className='absolute -right-14 top-0 w-24 h-full bg-gray-50 rounded-l-[3rem]' />
						</div>

						{/* Car Details Section - Right */}
						<div className='w-1/2 flex flex-col  p-8 bg-gray-50 relative'>
							<h2 className='text-3xl font-bold text-[#0050A5] mb-6 text-center'>
								Car Details
							</h2>

							<div className='flex-1 overflow-y-auto overflow-x-hidden pr-2'>
								<div className='w-full max-w-sm mx-auto space-y-4'>
									{cars.map((car, index) => (
										<div key={index} className='space-y-3'>
											<div className='border p-4 rounded-xl bg-white shadow relative'>
												<button
													onClick={() => deleteCar(index)}
													className='absolute top-2 right-2 text-red-500 text-sm hover:text-red-700 w-6 h-6 flex items-center justify-center'
													title='Delete this car'
												>
													🗑
												</button>

												<div>
													<label className='text-sm font-semibold block mb-1 text-gray-700'>
														Car Model
													</label>
													<input
														type='text'
														placeholder='Car Model'
														value={car.model}
														onChange={(e) =>
															handleCarChange(index, 'model', e.target.value)
														}
														className='w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300'
														style={
															{
																'--tw-ring-color': '#0050A5',
															} as React.CSSProperties
														}
													/>
												</div>

												{/* <div>
													<label className='text-sm font-semibold block mb-1 text-gray-700'>
														Issue Description
													</label>
													<input
														type='text'
														placeholder='Describe the issue'
														value={car.issue}
														onChange={(e) =>
															handleCarChange(index, 'issue', e.target.value)
														}
														className='w-full px-3 py-2 text-sm bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300'
														style={
															{
																'--tw-ring-color': '#0050A5',
															} as React.CSSProperties
														}
													/>
												</div> */}
												{/* <div className='flex justify-end mt-3'>
													<button className='w-auto py-1 px-2 bg-[#0050A5] text-white text-sm font-medium rounded-lg transition-transform duration-300 hover:scale-105'>
														CAR HISTORY
													</button>
												</div> */}
											</div>

											{/* Service History Panel */}
											{showHistory === index && (
												<div className='bg-white border rounded-xl p-4 shadow-lg'>
													<h4 className='text-lg font-semibold text-gray-800 mb-3'>
														Service History
													</h4>
													{serviceHistory[index] &&
														serviceHistory[index].length > 0 ? (
														<div className='space-y-2'>
															{serviceHistory[index].map(
																(history, historyIndex) => (
																	<div
																		key={historyIndex}
																		className='flex justify-between items-center p-2 bg-gray-50 rounded-lg'
																	>
																		<div>
																			<p className='font-medium text-sm text-gray-800'>
																				{history.service}
																			</p>
																			<p className='text-xs text-gray-600'>
																				{history.date}
																			</p>
																		</div>
																		<span className='px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full'>
																			{history.status}
																		</span>
																	</div>
																)
															)}
														</div>
													) : (
														<p className='text-gray-500 text-sm'>
															No service history available
														</p>
													)}
												</div>
											)}
										</div>
									))}
									<div className='flex flex-col items-center justify-center'>
										{' '}
										<button
											onClick={addCar}
											className='w-[180px] py-1.5 text-white font-medium rounded-lg  transition-all duration-300 hover:scale-95 shadow-lg sticky bottom-0'
											style={{ backgroundColor: '#0050A5' }}
										>
											ADD ANOTHER CAR
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* User Profile Panel */}
				<div
					className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${isCarTab ? 'opacity-0 z-10' : 'opacity-100 z-20'
						}`}
				>
					<div className='flex h-full w-full'>
						{/* User Profile Section - Left */}
						<div className='w-1/2 flex flex-col items-center justify-center p-4 bg-gray-50 relative'>
							<h2 className='text-3xl font-bold text-[#0050A5] mb-6'>
								User Information
							</h2>

							<div className='w-full max-w-sm space-y-4'>
								{editMode ? (
									<>
										<div>
											<input
												name='firstName'
												value={profileData?.firstName || ''}
												onChange={handleUserChange}
												placeholder='First Name'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.firstName ? 'ring-2 ring-red-500' : ''}`}
												style={
													{ '--tw-ring-color': errors.firstName ? '#ef4444' : '#0050A5' } as React.CSSProperties
												}
											/>
											{errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>}
										</div>
										<div>
											<input
												name='lastName'
												value={profileData?.lastName || ''}
												onChange={handleUserChange}
												placeholder='Last Name'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.lastName ? 'ring-2 ring-red-500' : ''}`}
												style={
													{ '--tw-ring-color': errors.lastName ? '#ef4444' : '#0050A5' } as React.CSSProperties
												}
											/>
											{errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>}
										</div>
										<div>
											<input
												name='email'
												value={profileData?.email || ''}
												onChange={handleUserChange}
												placeholder='Email'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
												style={
													{ '--tw-ring-color': errors.email ? '#ef4444' : '#0050A5' } as React.CSSProperties
												}
											/>
											{errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
										</div>
										<div>
											<input
												name='number'
												value={profileData?.number || ''}
												onChange={handleUserChange}
												placeholder='Phone Number'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.number ? 'ring-2 ring-red-500' : ''}`}
												style={
													{ '--tw-ring-color': errors.number ? '#ef4444' : '#0050A5' } as React.CSSProperties
												}
											/>
											{errors.number && <p className='text-red-500 text-sm mt-1'>{errors.number}</p>}
										</div>
										<div>
											<input
												name='address'
												value={profileData?.address || ''}
												onChange={handleUserChange}
												placeholder='Address'
												className={`w-full px-4 py-3 bg-gray-200 border-0 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.address ? 'ring-2 ring-red-500' : ''}`}
												style={
													{ '--tw-ring-color': errors.address ? '#ef4444' : '#0050A5' } as React.CSSProperties
												}
											/>
											{errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address}</p>}
										</div>
										<button
											onClick={() => handleEditProfile()}
											className='w-full py-3 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300  shadow-lg'
											style={{ backgroundColor: '#0050A5' }}
										>
											SAVE
										</button>
									</>
								) : (
									<div className='space-y-4 bg-white p-6 rounded-xl shadow-lg'>
										<div className='space-y-3'>
											<p className='text-lg'>
												<strong className='text-gray-700'>First Name:</strong>{' '}
												<span className='text-gray-600'>
													{profileData?.firstName || 'N/A'}
												</span>
											</p>
											<p className='text-lg'>
												<strong className='text-gray-700'>Last Name:</strong>{' '}
												<span className='text-gray-600'>
													{profileData?.lastName || 'N/A'}
												</span>
											</p>
											<p className='text-lg'>
												<strong className='text-gray-700'>Email:</strong>{' '}
												<span className='text-gray-600'>
													{profileData?.email || 'N/A'}
												</span>
											</p>
											<p className='text-lg'>
												<strong className='text-gray-700'>Phone:</strong>{' '}
												<span className='text-gray-600'>
													{profileData?.number || 
													(typeof profileData?.contact_info === 'string' 
														? profileData.contact_info.split(', ')[0] 
														: profileData?.contact_info?.phoneNumber) || 'N/A'}
												</span>
											</p>
											<p className='text-lg'>
												<strong className='text-gray-700'>Address:</strong>{' '}
												<span className='text-gray-600'>
													{profileData?.address || 
													(typeof profileData?.contact_info === 'string' 
														? profileData.contact_info.split(', ')[1] 
														: profileData?.contact_info?.address1) || 'N/A'}
												</span>
											</p>
										</div>
										<div className='flex flex-col items-center justify-center'>
											<button
												onClick={() => setEditMode(true)}
												className='w-[180px]  py-1.5 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-300  shadow-lg mt-4'
												style={{ backgroundColor: '#0050A5' }}
											>
												EDIT
											</button>
										</div>
									</div>
								)}
							</div>
						</div>

						{/* Red Section - Right */}
						<div
							className='w-1/2  relative overflow-hidden'
							style={{ backgroundColor: '#0050A5' }}
						>
							<div className='absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent' />
							<div className='relative z-10 flex flex-col items-center justify-center h-full text-white p-8'>
								<h2 className='text-2xl font-bold mb-4'>Car Details</h2>
								<p className='text-red-100 text-center mb-8 leading-relaxed'>
									Switch to manage your vehicle information and service requests
								</p>
								<button
									onClick={() => setIsCarTab(true)}
									className='px-3 py-1 border-2 border-white bg-white text-[#0050A5] rounded-full  font-medium  transition-all duration-300 hover:scale-105'
								>
									CAR DETAILS
								</button>
							</div>
							<div className='absolute -left-14 top-0 w-24 h-full bg-gray-50 rounded-r-[3rem]' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
