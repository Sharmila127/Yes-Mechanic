/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import { useState, useEffect } from 'react';
import { FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';
import { BsBuildings } from 'react-icons/bs';
import { SlCalender } from 'react-icons/sl';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import {
	MdEmail,
	MdOutlineMailOutline,
	MdOutlineKeyboardBackspace,
} from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';
import { FcDataEncryption } from 'react-icons/fc';
import { RiLockPasswordLine } from 'react-icons/ri';
import { LuPhoneCall } from 'react-icons/lu';
import { CheckCircle, AlertCircle } from 'lucide-react';
// import { Settings } from 'lucide-react';
import Client from '../../api';
import { FONTS } from '../../constants/uiConstants';
// import {  useNavigate } from "react-router-dom";

type ServiceCenterProfileProps = {
	onSpareParts: () => void;
	onServices: () => void;
	setpartnerId: (id: string) => void;
	partner: any;
	handleBack: () => void;
};

const ServiceCenterProfileView: React.FC<ServiceCenterProfileProps> = ({
	onServices,
	partner,
	onSpareParts,
	setpartnerId,
	handleBack,
}) => {
	const [isActive, setIsActive] = useState(true);
	const [showConfirm, setShowConfirm] = useState(false);
	const [pendingStatus, setPendingStatus] = useState<boolean | null>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [showEditForm, setShowEditForm] = useState(false);
	const [showSuccessPopup, setShowSuccessPopup] = useState(false);
	const [showNoChangesPopup, setShowNoChangesPopup] = useState(false);
	const [showDeleteSuccessPopup, setShowDeleteSuccessPopup] = useState(false);

	const originalValues = {
		editCompanyName: partner.companyName || '',
		editFirstName: partner.firstName || '',
		editLastName: partner.lastName || '',
		editAadharNumber: partner.aadhar || 'Nan',
		editRegNo: partner.regNo || 'Nan',
		editPanCard: partner.pan || 'Nan',
		editGstNo: partner.gstNo || 'Nan',
		editPhone: partner?.contact_info?.phoneNumber || '',
		editEmail: partner?.email || 'Nan',
		editLoginEmail: partner?.email || '',
		editPassword: partner?.password,
		editImage: partner?.image,
		editState: partner?.contact_info?.state,
		editCity: partner?.contact_info?.city,
		editAddress1: partner?.contact_info?.address1,
		editAddress2: partner?.contact_info?.address2,
	};

	// Current edit values
	const [editAadharNumber, setEditAadharNumber] = useState(
		originalValues.editAadharNumber
	);
	const [editPanCard, setEditPanCard] = useState(originalValues.editPanCard);
	const [editGstNo, setEditGstNo] = useState(originalValues.editGstNo);
	const [editRegNo, setEditRegNo] = useState(originalValues.editRegNo);
	const [editCompanyName, setEditCompanyName] = useState(
		originalValues.editCompanyName
	);
	const [editFirstName] = useState(originalValues.editFirstName);
	const [editLastName, setLastName] = useState(originalValues.editLastName);
	// const [editImage, setImage] = useState(originalValues.editImage)
	const [editPhone, setEditPhone] = useState(originalValues.editPhone);
	const [editEmail, setEditEmail] = useState(originalValues.editEmail);
	const [editState, setEditState] = useState(originalValues.editState);
	const [editCity, setEditCity] = useState(originalValues.editCity);
	const [editAddress1, setEditAddress1] = useState(originalValues.editAddress1);
	const [editAddress2, setEditAddress2] = useState(originalValues.editAddress2);
	// const [editLastAudit, setEditLastAudit] = useState(originalValues.editLastAudit)
	// const [editCertification, setEditCertification] = useState(originalValues.editCertification)
	// const [editUsername, setEditUsername] = useState(originalValues.editUsername)
	const [editLoginEmail, setEditLoginEmail] = useState(
		originalValues.editLoginEmail
	);
	// const [editPassword, setEditPassword] = useState(originalValues.editPassword)

	// Function to check if any values have changed
	const hasChanges = () => {
		const currentValues = {
			editCompanyName,
			editPhone,
			editEmail,
			editLoginEmail,
			// editPassword,
			editState,
			editFirstName,
			editLastName,
			// editImage,
			editCity,
			editAadharNumber,
			editAddress1,
			editAddress2,
		};

		return Object.keys(originalValues).some(
			(key) =>
				originalValues[key as keyof typeof originalValues] !==
				currentValues[key as keyof typeof currentValues]
		);
	};
	// const navigate = useNavigate();
	// const handleRoute = ()=>{
	//    navigate(-1)
	// }

	const handleToggle = () => {
		setPendingStatus(!isActive);
		setShowConfirm(true);
	};

	const confirmChange = () => {
		if (pendingStatus !== null) {
			setIsActive(pendingStatus);
			setShowConfirm(false);
		}
	};

	const cancelChange = () => {
		setPendingStatus(null);
		setShowConfirm(false);
	};

	const confirmDelete = async () => {
		setShowDeleteConfirm(false);
		try {
			await new Client().admin.servicecenter.delete(partner._id);
			setShowDeleteSuccessPopup(true);
			setTimeout(() => {
				handleBack();
			}, 3000);
		} catch (error) {
			console.error('Error deleting service center:', error);
		}
	};

	const cancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	const handleEditSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Check if there are any changes
		if (!hasChanges()) {
			setShowEditForm(false);
			setShowNoChangesPopup(true);
			return;
		}

		try {
			// const data = {
			//   editCompanyName,
			//   editPhone,
			//   editEmail,
			//   editLoginEmail,
			//   // editPassword,
			//   editState,
			//   editFirstName,
			//   editLastName,
			//   // editImage,
			//   editCity,
			//   editAadharNumber,
			//   editAddress1,
			//   editAddress2
			// }

			const datas = {
				contact_info: {
					state: editState,
					city: editCity,
					address1: editAddress1,
					address2: editAddress2,
					phoneNumber: editPhone,
				},
				firstName: editFirstName,
				companyName: editCompanyName,
				lastName: editLastName,
				// password: "$2b$13$43r7K3/WNNQ55LZexr823OR1wcPq7qiku1ubZGqLWHxpp71RNzVT.",
				email: editEmail,
				aadhar: editAadharNumber,
				regNo: editRegNo,
				pan: editPanCard,
				gstNo: editGstNo,
				image: '',
			};

			await new Client().admin.servicecenter.update(datas, partner._id);

			// Update original values after successful save
			// setOriginalValues(data)

			setShowEditForm(false);
			setShowSuccessPopup(true);
		} catch (error) {
			console.log('profile update', error);
		}
	};

	useEffect(() => {
		if (showSuccessPopup) {
			const timer = setTimeout(() => setShowSuccessPopup(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [showSuccessPopup]);

	useEffect(() => {
		if (showNoChangesPopup) {
			const timer = setTimeout(() => setShowNoChangesPopup(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [showNoChangesPopup]);

	useEffect(() => {
		if (showDeleteSuccessPopup) {
			const timer = setTimeout(() => setShowDeleteSuccessPopup(false), 3000);
			return () => clearTimeout(timer);
		}
	}, [showDeleteSuccessPopup]);

	function onChangeCat(id: string) {
		setpartnerId(id);
		onServices();
	}

	function viewspare(id: string) {
		setpartnerId(id);
		onSpareParts();
	}

	return (
		<div className='min-h-screen p-6'>
			{/* Header Section */}
			<div className='flex items-center justify-between mb-6'>
				<button
					onClick={handleBack}
					className='flex items-center gap-2 text-[#9b111e] hover:text-[#800000] transition-colors rounded-3xl'
				>
					<MdOutlineKeyboardBackspace className='text-2xl' />
					<span className='font-medium'>
						<h2
							className='text-3xl font-bold text-[#9b111e]'
							style={{ ...FONTS.header }}
						>
							Profile
						</h2>
					</span>
				</button>
				<div className='w-10'></div>
			</div>

			{/* Profile Card */}
			<div className='bg-white rounded-xl shadow-md overflow-hidden mb-8'>
				{/* Profile Header */}
				<div className='flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-[#9b111e] to-[#d23c3c]'>
					<div className='flex items-center gap-4 mb-4 md:mb-0'>
						<div className='bg-white p-2 rounded-full'>
							<img
								src={partner?.image}
								alt={'logo'}
								className='w-16 h-16 rounded-full object-contain'
							/>
						</div>
						{/* <h3 className="!font-bold !text-white" style={{ ...FONTS.cardheader }}>{partner?.firstName + " " + partner?.lastName}</h3> */}
						<h3
							className='!font-bold !text-white'
							style={{ ...FONTS.cardheader }}
						>
							{partner?.companyName}
						</h3>
					</div>
					<div className='flex gap-4'>
						<button
							style={{ ...FONTS.paragraph }}
							onClick={() => viewspare(partner._id)}
							className='flex items-center gap-2 bg-white !text-[#9b111e] px-5 py-2 rounded-3xl font-medium hover:bg-gray-100 transition-colors shadow-sm'
						>
							<span>View Spare Parts</span>
							<FaArrowRight size={16} />
						</button>
						<button
							style={{ ...FONTS.paragraph }}
							onClick={() => onChangeCat(partner._id)}
							className='flex items-center gap-2 bg-white !text-[#9b111e] px-5 py-2 rounded-3xl font-medium hover:bg-gray-100 transition-colors shadow-sm'
						>
							<span>View Services</span>
							<FaArrowRight size={16} />
						</button>
					</div>
				</div>

				<div className='p-6'>
					{/* Status Bar */}
					<div className='flex flex-col md:flex-row items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg'>
						<div className='flex items-center gap-3 mb-3 md:mb-0'>
							<div
								className={`w-3 h-3 rounded-full ${
									isActive ? 'bg-green-500' : 'bg-red-500'
								}`}
							></div>
							<span className='text-sm font-medium text-gray-700'>
								{isActive ? 'Active' : 'Inactive'} Service Center
							</span>
						</div>
						<label className='inline-flex items-center cursor-pointer'>
							<input
								type='checkbox'
								className='sr-only peer'
								checked={isActive}
								onChange={handleToggle}
							/>
							<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
						</label>
					</div>

					{/* Divider */}
					<div className='border-t border-gray-200 my-6'></div>

					{/* Contact Information Section */}
					<div className='mb-8'>
						<h2
							className='text-xl !font-bold text-[#9b111e] mb-4 pb-2 border-b border-gray-200'
							style={{ ...FONTS.cardSubHeader }}
						>
							Contact Information
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<div className='space-y-5'>
								<InfoItem
									icon={<BsBuildings className='text-[#9b111e]' />}
									label='Username'
									value={`${partner?.firstName || ''} ${
										partner?.lastName || ''
									}`.trim()}
								/>
								<InfoItem
									icon={<BsBuildings className='text-[#9b111e]' />}
									label='Company Name'
									value={editCompanyName}
								/>
								<InfoItem
									icon={<SlCalender className='text-[#9b111e]' />}
									label='AadharCard No'
									value={originalValues.editAadharNumber}
								/>
							</div>
							<div className='space-y-5'>
								<InfoItem
									icon={<LuPhoneCall className='text-[#9b111e]' />}
									label='Phone'
									value={editPhone}
								/>
								<InfoItem
									icon={<MdEmail className='text-[#9b111e]' />}
									label='Email'
									value={editEmail}
								/>
								<InfoItem
									icon={<CgWebsite className='text-[#9b111e]' />}
									label='Pan No'
									value={originalValues.editPanCard}
								/>
							</div>
							<div className='space-y-5'>
								<InfoItem
									icon={<AiFillSafetyCertificate className='text-[#9b111e]' />}
									label='GST No'
									value={originalValues.editGstNo}
								/>
								<InfoItem
									icon={<FcDataEncryption className='text-[#9b111e]' />}
									label='Reg No'
									value={originalValues.editRegNo}
								/>
							</div>
						</div>
					</div>

					{/* Divider */}
					<div className='border-t border-gray-200 my-6'></div>

					{/* Login Information Section */}
					<div className='mb-8'>
						<h2
							className='text-xl !font-bold text-[#9b111e] mb-4 pb-2 border-b border-gray-200'
							style={{ ...FONTS.cardSubHeader }}
						>
							Login Information
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<InfoItem
								icon={<MdOutlineMailOutline className='text-[#9b111e]' />}
								label='Email'
								value={editLoginEmail}
							/>
							<InfoItem
								icon={<RiLockPasswordLine className='text-[#9b111e]' />}
								label='Password'
								value='••••••••'
							/>
						</div>
					</div>

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row justify-end gap-4 mt-8 pt-6 border-t border-gray-200'>
						<button
							style={{ ...FONTS.paragraph }}
							onClick={() => setShowEditForm(true)}
							className='flex items-center justify-center gap-2 bg-[#9b111e] !text-white px-6 py-2 rounded-3xl font-medium hover:bg-[#800000] transition-colors'
						>
							<FaEdit /> Edit Profile
						</button>
						<button
							style={{ ...FONTS.paragraph }}
							onClick={() => setShowDeleteConfirm(true)}
							className='flex items-center justify-center gap-2 bg-white text-red-600 border border-red-600 px-6 py-2 rounded-3xl font-medium hover:bg-red-50 transition-colors'
						>
							<FaTrash /> Delete Center
						</button>
					</div>
				</div>
			</div>

			{/* Confirmation Modals */}
			{showConfirm && (
				<ConfirmationModal
					title={
						pendingStatus
							? 'Activate Service Center?'
							: 'Deactivate Service Center?'
					}
					message={
						pendingStatus
							? 'This will make the service center visible and available for bookings.'
							: 'This will hide the service center from customers and prevent new bookings.'
					}
					onConfirm={confirmChange}
					onCancel={cancelChange}
				/>
			)}

			{showDeleteConfirm && (
				<ConfirmationModal
					title='Delete Service Center?'
					message='This action cannot be undone. All associated data will be permanently removed.'
					confirmText='Delete'
					confirmColor='bg-red-600 hover:bg-red-700'
					onConfirm={confirmDelete}
					onCancel={cancelDelete}
				/>
			)}

			{/* Enhanced Edit Form Modal */}
			{showEditForm && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
					<form
						onSubmit={handleEditSubmit}
						className='bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto'
					>
						<div className='sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center'>
							<h2 className='text-2xl font-bold text-[#9b111e]'>
								Edit Profile Information
							</h2>
							<button
								type='button'
								onClick={() => setShowEditForm(false)}
								className='text-gray-500 hover:text-gray-700 transition-colors rounded-3xl'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>

						<div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-8'>
							{/* Contact Information Section */}
							<div className='space-y-6'>
								<div className='bg-[#f9f9f9] p-4 rounded-lg'>
									<h3 className='text-lg font-semibold text-[#9b111e] mb-4 flex items-center gap-2'>
										<BsBuildings className='text-[#9b111e]' />
										Contact Information
									</h3>
									<div className='space-y-4'>
										<EnhancedEditField
											label='Company Name'
											value={editCompanyName}
											onChange={setEditCompanyName}
										/>
										<EnhancedEditField
											label='Branches'
											value={editLastName}
											onChange={setLastName}
										/>
										<EnhancedEditField
											label='Phone'
											value={editPhone}
											onChange={setEditPhone}
										/>
										<EnhancedEditField
											label='Email'
											value={editEmail}
											onChange={setEditEmail}
										/>
										<EnhancedEditField
											label='Aadhar No'
											value={editAadharNumber}
											onChange={setEditAadharNumber}
										/>
										<EnhancedEditField
											label='Pan No'
											value={editPanCard}
											onChange={setEditPanCard}
										/>
										<EnhancedEditField
											label='GST No'
											value={editGstNo}
											onChange={setEditGstNo}
										/>
										<EnhancedEditField
											label='Reg No'
											value={editRegNo}
											onChange={setEditRegNo}
										/>
									</div>
								</div>
							</div>

							{/* Second Column */}
							<div className='space-y-6'>
								<div className='bg-[#f9f9f9] p-4 rounded-lg'>
									<h3 className='text-lg font-semibold text-[#9b111e] mb-4 flex items-center gap-2'>
										<CgWebsite className='text-[#9b111e]' />
										Website & Address
									</h3>
									<div className='space-y-4'>
										{/* <EnhancedEditField
                      icon={<CgWebsite className="text-[#9b111e]" />}
                      label="Website"
                      value={editWebsite}
                      onChange={setEditWebsite}
                    /> */}
										<EnhancedEditField
											label='State'
											value={editState}
											onChange={setEditState}
											// textarea
										/>
										<EnhancedEditField
											label='City'
											value={editCity}
											onChange={setEditCity}
											// textarea
										/>
										<EnhancedEditField
											label='Address2'
											value={editAddress1}
											onChange={setEditAddress1}
											// textarea
										/>
										<EnhancedEditField
											label='Address2'
											value={editAddress2}
											onChange={setEditAddress2}
											// textarea
										/>
									</div>
								</div>

								<div className='bg-[#f9f9f9] p-4 rounded-lg'>
									<h3 className='text-lg font-semibold text-[#9b111e] mb-4 flex items-center gap-2'>
										<RiLockPasswordLine className='text-[#9b111e]' />
										Login Information
									</h3>
									<div className='space-y-4'>
										{/* <EnhancedEditField
                      icon={<FaUserCircle className="text-[#9b111e]" />}
                      label="Username"
                      value={editUsername}
                      onChange={setEditUsername}
                    /> */}
										<EnhancedEditField
											label='Login Email'
											value={editLoginEmail}
											onChange={setEditLoginEmail}
										/>
										{/* <EnhancedEditField
                      icon={<RiLockPasswordLine className="text-[#9b111e]" />}
                      label="Password"
                      value={editPassword}
                      onChange={setEditPassword}
                      type="password"
                    /> */}
									</div>
								</div>
							</div>
						</div>

						<div className='sticky bottom-0 bg-white p-4 border-t border-gray-200 flex justify-end gap-3'>
							<button
								type='button'
								onClick={() => setShowEditForm(false)}
								className='px-6 py-2 border border-gray-300 rounded-3xl text-gray-700 hover:bg-gray-50 transition-colors'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-6 py-2 bg-[#9b111e] text-white rounded-3xl hover:bg-[#800000] transition-colors flex items-center gap-2'
							>
								<FaEdit /> Save Changes
							</button>
						</div>
					</form>
				</div>
			)}

			{/* Success Popup - Green Background */}
			{showSuccessPopup && (
				<SuccessPopup
					message='Profile updated successfully!'
					icon={<CheckCircle className='h-6 w-6' />}
					type='success'
				/>
			)}

			{/* No Changes Popup - Orange/Yellow Background */}
			{showNoChangesPopup && (
				<SuccessPopup
					message='No changes detected!'
					icon={<AlertCircle className='h-6 w-6' />}
					type='warning'
				/>
			)}

			{/* Delete Success Popup */}
			{showDeleteSuccessPopup && (
				<SuccessPopup
					message='Service center deleted successfully!'
					icon={<CheckCircle className='h-6 w-6' />}
					type='success'
				/>
			)}
		</div>
	);
};

const InfoItem = ({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) => (
	<div className='flex items-start gap-3'>
		<div className='mt-1 text-lg'>{icon}</div>
		<div>
			<p className='text-sm font-medium text-gray-500'>{label}</p>
			<p className='text-lg font-normal text-gray-800'>{value}</p>
		</div>
	</div>
);

const EnhancedEditField = ({
	icon,
	label,
	value,
	onChange,
	type = 'text',
	textarea = false,
}: {
	icon?: React.ReactNode;
	label: string;
	value: string;
	onChange: (value: string) => void;
	type?: string;
	textarea?: boolean;
}) => (
	<div className='space-y-2'>
		<label className='block text-sm font-medium text-gray-700 mb-1 items-center gap-2'>
			{icon}
			<span>{label}</span>
		</label>
		{textarea ? (
			<textarea
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b111e] focus:border-[#9b111e] outline-none transition min-h-[100px]'
				rows={3}
			/>
		) : (
			<input
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9b111e] focus:border-[#9b111e] outline-none transition'
			/>
		)}
	</div>
);

const ConfirmationModal = ({
	title,
	message,
	confirmText = 'Confirm',
	confirmColor = 'bg-[#9b111e] hover:bg-[#800000]',
	onConfirm,
	onCancel,
}: {
	title: string;
	message?: string;
	confirmText?: string;
	confirmColor?: string;
	onConfirm: () => void;
	onCancel: () => void;
}) => (
	<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
		<div className='bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden'>
			<div className='p-6'>
				<h3 className='text-xl font-bold text-gray-900 mb-2'>{title}</h3>
				{message && <p className='text-gray-600 mb-6'>{message}</p>}
				<div className='flex justify-end gap-3'>
					<button
						onClick={onCancel}
						className='px-4 py-2 border border-gray-300 rounded-3xl text-gray-700 hover:bg-gray-50 transition-colors'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className={`px-4 py-2 text-white rounded-3xl transition-colors ${confirmColor}`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	</div>
);

const SuccessPopup = ({
	message,
	icon,
	type = 'success',
}: {
	message: string;
	icon?: React.ReactNode;
	type?: 'success' | 'warning' | 'error';
}) => {
	const getBackgroundColor = () => {
		switch (type) {
			case 'success':
				return 'bg-green-500';
			case 'warning':
				return 'bg-orange-500';
			case 'error':
				return 'bg-red-500';
			default:
				return 'bg-green-500';
		}
	};

	return (
		<div
			className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 ${getBackgroundColor()} text-white px-6 py-4 rounded-lg shadow-lg animate-fade-in-out min-w-[300px]`}
		>
			<div className='flex-shrink-0'>{icon}</div>
			<span className='font-medium'>{message}</span>
		</div>
	);
};

export default ServiceCenterProfileView;
