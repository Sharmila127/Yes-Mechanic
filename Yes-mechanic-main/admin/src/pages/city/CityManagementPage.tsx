import React, { useState } from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import CityAddPage from './CityAddPage';
import CityListPage from './CityListPage';
import { FONTS } from '../../constants/uiConstants';

export const CityManagementPage: React.FC = () => {
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className=' min-h-screen px-5'>
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 mb-4 border-b-2 border-orange-700 pb-4'>
				<h1
					className='!font-bold text-3xl pt-2 pl-0'
					// style={{ color: "#9b111e" }}
					style={{ ...FONTS.header, fontWeight: 500 }}
				>
					City Management
				</h1>

				<div className='flex items-center gap-x-2 ml-auto'>
					<button
						className='flex items-center gap-2 font-bold px-4 py-2 rounded-3xl text-white transition duration-200 active:scale-105 bg-[#a00000] hover:bg-[#700808]'
						onClick={() => setIsAddModalOpen(true)}
					>
						<IoIosAddCircleOutline className='mt-0' />
						Add
					</button>
				</div>
			</div>

			<div className='relative max-w-md mb-4 mt-4'>
				<span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500'>
					<CiSearch className='text-red-900' size={20} />
				</span>
				<input
					type='search'
					placeholder='Search by city name'
					className='pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9b111e]'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<div className='flex flex-col md:flex-row gap-4 mt-6 rounded-lg overflow-hidden border border-gray-100 mt-8 bg-white'>
				<div className='w-full md:w-1/2 h-[500px] border-8 border-white rounded-lg shadow-lg'>
					<iframe
						title='City Map'
						src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.968218678115!2d80.2459148!3d13.0826802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266dd1f7c1a3d%3A0x82bc0baebedf4a34!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1650000000000'
						width='100%'
						height='100%'
						className='border-0'
						loading='lazy'
						allowFullScreen
						referrerPolicy='no-referrer-when-downgrade'
					></iframe>
				</div>

				<div className='p-2 w-full md:w-1/2'>
					<CityListPage searchTerm={searchTerm} />
				</div>
			</div>

			{isAddModalOpen && (
				<CityAddPage onClose={() => setIsAddModalOpen(false)} />
			)}
		</div>
	);
};
