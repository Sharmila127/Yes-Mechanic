/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from 'react';
import { getProfile } from '../../../features/Auth/service';
import { FONTS } from '../../../constants/uiConstants';

interface User {
	name: string;
	phone: string;
	email: string;
	avatar: string;
	role: string;
	location: string;
	joinDate: string;
	status: string;
}

interface ProfileModalProps {
	isOpen: boolean;
	onClose: () => void;
	onUserUpdate: (updatedUser: User) => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const [profile, setProfile] = useState<any | null>(null);

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const data: any = await getProfile('');
				setProfile(data.data.data);
			} catch (error) {
				console.error('Failed to fetch profile:', error);
			}
		};

		if (isOpen) {
			fetchProfile();

			const handleClickOutside = (e: MouseEvent) => {
				if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
					onClose();
				}
			};
			document.addEventListener('mousedown', handleClickOutside);
			return () =>
				document.removeEventListener('mousedown', handleClickOutside);
		}
	}, [isOpen, onClose]);

	if (!isOpen || !profile) return null;

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4'>
			<div
				ref={modalRef}
				className='bg-[#FAF3EB] rounded-2xl shadow-2xl w-full max-w-2xl md:max-w-xl sm:max-w-md overflow-hidden'
			>
				<div className='bg-gradient-to-r from-red-600 to-red-800 p-6 flex items-center justify-between !text-white'>
					<div className='flex items-center space-x-4'>
						<img
							src={profile?.image}
							alt='User'
							className='w-20 h-20 rounded-full border-4 border-white shadow-md !text-white'
							style={{ ...FONTS.paragraph }}
						/>
						<div>
							<h2
								className='text-2xl font-bold !text-white'
								style={{ ...FONTS.cardheader }}
							>
								{profile?.firstName.charAt(0).toUpperCase() +
									profile?.firstName.slice(1) +
									' ' +
									profile?.lastName.charAt(0).toUpperCase() +
									profile?.lastName.slice(1)}
							</h2>
							<p
								className='text-sm opacity-90 !text-white'
								style={{ ...FONTS.cardSubHeader }}
							>
								{profile?.role.charAt(0).toUpperCase() + profile?.role.slice(1)}
							</p>
						</div>
					</div>
					<button
						onClick={onClose}
						className='bg-[#FAF3EB] text-red-600 font-semibold p-2 rounded-3xl shadow hover:bg-[#f8e0b0] transition'
						aria-label='Close profile details'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
							strokeWidth={2}
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-gray-700'>
					<div className='space-y-3'>
						<div>
							<h4
								className='text-sm !text-red-500'
								style={{ ...FONTS.paragraph }}
							>
								Phone Number:
							</h4>
							<p
								className='text-lg !text-gray-500'
								style={{ ...FONTS.cardSubHeader }}
							>
								{profile.contact_info.phoneNumber}
							</p>
						</div>
						<div>
							<h4
								className='text-sm !text-red-500'
								style={{ ...FONTS.paragraph }}
							>
								Email:
							</h4>
							<p
								className='text-lg !text-gray-500'
								style={{ ...FONTS.cardSubHeader }}
							>
								{profile.email}
							</p>
						</div>
						<div>
							<h4
								className='text-sm !text-red-500'
								style={{ ...FONTS.paragraph }}
							>
								Location:
							</h4>
							<p
								className='text-lg !text-gray-500'
								style={{ ...FONTS.cardSubHeader }}
							>
								{profile?.contact_info?.city} , {profile?.contact_info?.state}
							</p>
						</div>
					</div>
					<div className='space-y-3'>
						<div>
							<h4
								className='text-sm !text-red-500'
								style={{ ...FONTS.paragraph }}
							>
								Role:
							</h4>
							<p
								className='text-lg !text-gray-500'
								style={{ ...FONTS.cardSubHeader }}
							>
								{profile?.role.charAt(0).toUpperCase() + profile?.role.slice(1)}
							</p>
						</div>
						<div>
							<h4
								className='text-sm !text-red-500'
								style={{ ...FONTS.paragraph }}
							>
								Status:
							</h4>
							<span
								className='inline-block px-3 py-1 text-sm rounded-md bg-green-100 !text-green-900'
								style={{ ...FONTS.cardSubHeader }}
							>
								{profile.is_active ? 'Active' : 'In Active'}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
