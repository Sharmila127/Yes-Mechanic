import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbBuildingEstate, TbMapPinCode } from 'react-icons/tb';
import { MdOutlineMiscellaneousServices } from 'react-icons/md';
import { FONTS } from '../../constants/uiConstants';
import { toast } from 'react-toastify';

type City = {
	name: string;
	TotalCenters: string;
	serviceCenters?: string[];
};

interface CityListPageProps {
	searchTerm?: string;
}

const CityListPage: React.FC<CityListPageProps> = ({ searchTerm = '' }) => {
	const navigate = useNavigate();

	const [cities, setCities] = useState<City[]>([
		{
			name: 'Chennai',
			TotalCenters: '13',
			serviceCenters: [
				'Anna Nagar',
				'T. Nagar',
				'Velachery',
				'Adyar',
				'Tambaram',
				'Vadapalani',
				'Chennai Central',
				'Perungudi',
				'Ashok Nagar',
				'Mylapore',
				'Nungambakkam',
				'Thiruvanmiyur',
				'Kotturpuram',
			],
		},
		{
			name: 'Madurai',
			TotalCenters: '03',
			serviceCenters: ['KK Nagar', 'Goripalayam'],
		},
		{ name: 'Coimbatore', TotalCenters: '02', serviceCenters: ['RS Puram'] },
		{ name: 'Nammakkal', TotalCenters: '07', serviceCenters: [] },
		{ name: 'Trichy', TotalCenters: '04' },
		{ name: 'Nagercoil', TotalCenters: '02' },
		{ name: 'kadalur', TotalCenters: '01' },
		{ name: 'Thiruvanamalai', TotalCenters: '04' },
		{ name: 'Kancheepuram', TotalCenters: '01' },
	]);

	const filteredCities = cities.filter((city) =>
		city.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const exactMatchCity = cities.find(
		(city) => city.name.toLowerCase() === searchTerm.toLowerCase()
	);

	const handleDelete = (name: string) => {
		// const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`);
		if (name) {
			setCities((prev) => prev.filter((city) => city.name !== name));
			toast.success('Deleted Successfully');
		}
	};

	const handleDeleteServiceCenter = (cityName: string, centerName: string) => {
		if (centerName) {
			setCities((prevCities) =>
				prevCities.map((city) =>
					city.name === cityName
						? {
								...city,
								serviceCenters: city.serviceCenters?.filter(
									(c) => c !== centerName
								),
						  }
						: city
				)
			);
			toast.success('Deleted Successfully');
		}
	};

	return (
		<div className='px-2 mt-2 space-y-6'>
			{/* Main Cities Table */}
			{(!exactMatchCity || searchTerm.trim() === '') && (
				<div>
					<table className='table-auto w-full border-white bg-white rounded-lg shadow-md mx-auto shadow-lg'>
						<thead className='bg-[#e9e9e9]' style={{ ...FONTS.tableHeader }}>
							<tr>
								<th className='px-4 py-2 text-left'>
									<div className='flex items-center font-bold text-[#717171] gap-2'>
										<TbBuildingEstate className='text-lg' />
										District
									</div>
								</th>
								<th className='px-2 py-2 text-left'>
									<div className='flex items-center font-bold text-[#717171] gap-2'>
										<TbMapPinCode className='text-lg' />
										Total Centers
									</div>
								</th>
								<th className='px-4 py-2 text-left'>
									<div className='flex items-center font-bold text-[#717171] gap-2'>
										<MdOutlineMiscellaneousServices className='text-lg' />
										Service Centers
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredCities?.length > 0 ? (
								filteredCities?.map((city, index) => (
									<tr
										key={index}
										className='border-b hover:bg-[#f8ddd5]'
										style={{ ...FONTS.cardSubHeader }}
									>
										<td className='px-10 py-2'>{city.name}</td>
										<td className='px-16 py-2'>{city.TotalCenters}</td>
										<td className='px-12 py-2'>
											<button
												onClick={() => navigate('/service')}
												className='bg-[#9b111e] !text-white px-3 py-1 rounded-3xl hover:bg-[#a00000] transition active:scale-110 mx-2'
												style={{ ...FONTS.subParagraph }}
											>
												View
											</button>
											<button
												onClick={() => handleDelete(city.name)}
												className='bg-[#9b111e] !text-white px-3 py-1 rounded-3xl hover:bg-[#a00000] transition active:scale-110'
												style={{ ...FONTS.subParagraph }}
											>
												Delete
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={3} className='text-center py-4'>
										No cities matching with your search
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			)}

			{/* Additional Centers Table */}
			{exactMatchCity && (
				<div className='mt-4'>
					<h2 className='font-bold text-xl mb-2 text-[#9b111e]'>
						Service Centers in {exactMatchCity.name}
					</h2>
					{exactMatchCity.serviceCenters &&
					exactMatchCity.serviceCenters.length > 0 ? (
						<table className='table-auto w-full border border-gray-300 rounded shadow'>
							<thead className='bg-[#f8ddd5]'>
								<tr>
									<th className='text-center px-4 py-2'>Center Name</th>
									<th className='text-center px-4 py-2'>Action</th>
								</tr>
							</thead>
							<tbody>
								{exactMatchCity?.serviceCenters?.map((center, idx) => (
									<tr
										key={idx}
										className='border-t hover:bg-gray-100 text-center'
									>
										<td className='px-4 py-2'>{center}</td>
										<td className='px-4 py-2'>
											<button
												onClick={() => navigate('/service')}
												className='bg-[#a00000] text-white px-3 py-1 rounded-3xl hover:bg-[#800000] transition active:scale-110 mx-2'
											>
												View
											</button>
											<button
												onClick={() =>
													handleDeleteServiceCenter(exactMatchCity.name, center)
												}
												className='bg-[#a00000] text-white px-3 py-1 rounded-3xl hover:bg-[#800000] transition active:scale-110'
												// style={{ ...FONTS.subParagraph }}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className='text-gray-600'>
							No service centers found for this city.
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CityListPage;
