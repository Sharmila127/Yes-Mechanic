import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CarSelect {
	brand: string;
	model: string;
	year: number;
	fuel: string;
}

interface SelectCarPageProps {
	onClose?: () => void;
	setSelectedPackage?: (packageDetails: CarSelect) => void;
	packageId?: string;
}

const SelectCarPage: React.FC<SelectCarPageProps> = ({
	onClose,
	setSelectedPackage,
}) => {
	const [selectedCar, setSelectedCar] = useState<CarSelect>({
		brand: '',
		model: '',
		year: 0,
		fuel: '',
	});

	// Car data structure
	const carData = {
		Honda: {
			models: [
				'Civic',
				'Accord',
				'CR-V',
				'Pilot',
				'Fit',
				'HR-V',
				'Passport',
				'Ridgeline',
			],
			years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
			fuels: ['Petrol', 'Hybrid', 'Diesel'],
		},
		Toyota: {
			models: [
				'Camry',
				'Corolla',
				'RAV4',
				'Highlander',
				'Prius',
				'Tacoma',
				'Tundra',
				'Sienna',
			],
			years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
			fuels: ['Petrol', 'Hybrid', 'Diesel'],
		},
		Ford: {
			models: [
				'F-150',
				'Mustang',
				'Explorer',
				'Escape',
				'Focus',
				'Fusion',
				'Edge',
				'Bronco',
			],
			years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
			fuels: ['Petrol', 'Diesel', 'Electric'],
		},
		BMW: {
			models: [
				'3 Series',
				'5 Series',
				'7 Series',
				'X3',
				'X5',
				'X7',
				'Z4',
				'i4',
			],
			years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
			fuels: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
		},
		Mercedes: {
			models: [
				'C-Class',
				'E-Class',
				'S-Class',
				'GLC',
				'GLE',
				'GLS',
				'A-Class',
				'CLA',
			],
			years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
			fuels: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
		},
		Audi: {
			models: ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron'],
			years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
			fuels: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
		},
	};

	const brands = Object.keys(carData);

	const handleBrandChange = (brand: string) => {
		setSelectedCar({
			brand,
			model: '',
			year: 0,
			fuel: '',
		});
	};

	const handleModelChange = (model: string) => {
		setSelectedCar((prev) => ({
			...prev,
			model,
			year: 0,
			fuel: '',
		}));
	};

	const handleYearChange = (year: number) => {
		setSelectedCar((prev) => ({
			...prev,
			year,
			fuel: '',
		}));
	};

	const handleFuelChange = (fuel: string) => {
		setSelectedCar((prev) => ({
			...prev,
			fuel,
		}));
	};

	const handleSubmit = () => {
		if (
			selectedCar.brand &&
			selectedCar.model &&
			selectedCar.year &&
			selectedCar.fuel
		) {
			if (setSelectedPackage) {
				setSelectedPackage(selectedCar);
			}
			if (onClose) onClose();
		} else {
			alert('Please fill in all fields');
		}
	};

	const getAvailableModels = () => {
		return selectedCar.brand
			? carData[selectedCar.brand as keyof typeof carData]?.models || []
			: [];
	};

	const getAvailableYears = () => {
		return selectedCar.brand
			? carData[selectedCar.brand as keyof typeof carData]?.years || []
			: [];
	};

	const getAvailableFuels = () => {
		return selectedCar.brand
			? carData[selectedCar.brand as keyof typeof carData]?.fuels || []
			: [];
	};

	return (
		<div className='relative bg-white rounded-xl shadow-xl w-[360px] mx-4 max-h-[90vh] overflow-hidden scrollbar-hide'>
			<div className='bg-white shadow-md p-3'>
				<button
					onClick={onClose}
					className='bg-[#0050A5] px-2 text-white rounded-md  relative left-[315px] hover:bg-[#0050A5]-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 font-medium'
				>
					X
				</button>
				<h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
					Select Your Car
				</h2>

				<div className='space-y-1'>
					{/* Brand Selection */}
					<div>
						<label
							htmlFor='brand'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Brand *
						</label>
						<div className='relative'>
							<select
								id='brand'
								value={selectedCar.brand}
								onChange={(e) => handleBrandChange(e.target.value)}
								className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5] focus:border-[#0050A5] appearance-none bg-white'
							>
								<option value=''>Select Brand</option>
								{brands.map((brand) => (
									<option key={brand} value={brand}>
										{brand}
									</option>
								))}
							</select>
							<ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
						</div>
					</div>

					{/* Model Selection */}
					<div>
						<label
							htmlFor='model'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Model *
						</label>
						<div className='relative'>
							<select
								id='model'
								value={selectedCar.model}
								onChange={(e) => handleModelChange(e.target.value)}
								disabled={!selectedCar.brand}
								className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5]-500 focus:border-[#0050A5] appearance-none ${
									!selectedCar.brand
										? 'bg-gray-100 cursor-not-allowed'
										: 'bg-white'
								}`}
							>
								<option value=''>Select Model</option>
								{getAvailableModels().map((model) => (
									<option key={model} value={model}>
										{model}
									</option>
								))}
							</select>
							<ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
						</div>
					</div>

					{/* Year Selection */}
					<div>
						<label
							htmlFor='year'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Year *
						</label>
						<div className='relative'>
							<select
								id='year'
								value={selectedCar.year}
								onChange={(e) => handleYearChange(Number(e.target.value))}
								disabled={!selectedCar.model}
								className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5]-500 focus:border-[#0050A5] appearance-none ${
									!selectedCar.model
										? 'bg-gray-100 cursor-not-allowed'
										: 'bg-white'
								}`}
							>
								<option value={0}>Select Year</option>
								{getAvailableYears().map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))}
							</select>
							<ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
						</div>
					</div>

					{/* Fuel Type Selection */}
					<div>
						<label
							htmlFor='fuel'
							className='block text-sm font-medium text-gray-700 mb-2'
						>
							Fuel Type *
						</label>
						<div className='relative'>
							<select
								id='fuel'
								value={selectedCar.fuel}
								onChange={(e) => handleFuelChange(e.target.value)}
								disabled={!selectedCar.year}
								className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0050A5]-500 focus:border-[#0050A5] appearance-none ${
									!selectedCar.year
										? 'bg-gray-100 cursor-not-allowed'
										: 'bg-white'
								}`}
							>
								<option value=''>Select Fuel Type</option>
								{getAvailableFuels().map((fuel) => (
									<option key={fuel} value={fuel}>
										{fuel}
									</option>
								))}
							</select>
							<ChevronDown className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
						</div>
					</div>

					{/* Selected Car Preview */}
					{selectedCar.brand && (
						<div className='bg-gray-50 p-4 rounded-md'>
							<h3 className='text-sm font-medium text-gray-700 mb-2'>
								Selected Car:
							</h3>
							<p className='text-lg font-semibold text-gray-900'>
								{selectedCar.year > 0 ? selectedCar.year : '----'}{' '}
								{selectedCar.brand} {selectedCar.model || '----'}
								{selectedCar.fuel && ` (${selectedCar.fuel})`}
							</p>
						</div>
					)}

					{/* Submit Button */}
					<button
						onClick={handleSubmit}
						className='ml-[110px] bg-[#0050A5] text-white py-2 px-8 rounded-md hover:bg-[white] hover:text-[#0050A5] focus:outline-none focus:ring-2 focus:ring-[#0050A5]-500 focus:ring-offset-2 transition-colors duration-200 font-medium'
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default SelectCarPage;
