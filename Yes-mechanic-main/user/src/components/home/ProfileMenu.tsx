import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import profileImage from '../../assets/profile_picture.jpg';

type ProfileMenuProps = {
	handleLogout: () => void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ handleLogout }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			setIsOpen(false);
		};
	}, []);

	useEffect(() => {
		setIsOpen(false);
	}, [navigate]);

	return (
		<div className='relative inline-block text-left' ref={menuRef}>
			<button
				onClick={() => setIsOpen((prev) => !prev)}
				className='focus:outline-none'
			>
				<img
					src={profileImage}
					alt='Profile'
					className='w-12	h-12 rounded-full'
				/>
			</button>

			{/* Dropdown */}
			{isOpen && (
				<div className='origin-top-right absolute mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 bg-[#BED0EC]'>
					<div className=''>
						<Link
							to='/profile'
							className='flex items-center px-4 py-2 text-sm font-semibold text-[#0050A5] hover:bg-[#0050A5] hover:text-white'
						>
							<FiUser className='mr-2' /> Profile
						</Link>
						<Link
							to='/settings'
							className='flex items-center px-4 py-2 text-sm font-semibold text-[#0050A5] hover:bg-[#0050A5] hover:text-white'
						>
							<FiSettings className='mr-2' /> Settings
						</Link>
						<button
							onClick={handleLogout}
							className='flex items-center w-full px-4 py-2 text-sm font-semibold text-[#0050A5] hover:bg-[#0050A5] hover:text-white'
						>
							<FiLogOut className='mr-2' /> Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfileMenu;
