// //DYNAMIC IMAGE CARD PLACED BELOW AVAILABLE SERVICE

// import React, { useEffect, useState } from 'react';
// import carImage from '../../assets/CarPart2.jfif'
// import Wash from '../../assets/CAR WASH/Car wash.jpg'
// import Cardismantle from '../../assets/CAR DISMANTLE/Car dismantle.jpg'
// import Carpainting from '../../assets/CAR PAINTING/Car painting.jpg'

// interface PromoCardProps {
// 	title: string;
// 	subtitle: string;
// 	points: string[];
// 	image: string;
// 	cta: string;
// }

// const promoCards: PromoCardProps[] = [
// 	{
// 		title: 'GoShine',
// 		subtitle: 'Combo',
// 		points: ['Shine More, Pay Less', '3 Washes + 1 Deep Spa!'],
// 		image: carImage,
// 		cta: 'BUY NOW',
// 	},
// 	{
// 		title: 'SuperClean',
// 		subtitle: 'Offer',
// 		points: ['Weekly Wash Pack', 'Includes Vacuuming'],
// 		image: Wash,
// 		cta: 'GET DEAL',
// 	},
// 	{
// 		title: 'Dismantle For Checking ',
// 		subtitle: 'Observe',
// 		points: ['Chech every parts', 'Replace the part'],
// 		image: Cardismantle,
// 		cta: 'BOOK NOW',
// 	},
// 	{
// 		title: 'Painting',
// 		subtitle: '',
// 		points: ['Based on priority', 'Based on Customer need'],
// 		image: Carpainting,
// 		cta: 'BOOK NOW',
// 	},
// ];

// const PromoCarousel: React.FC = () => {
// 	const [currentIndex, setCurrentIndex] = useState(0);

// 	useEffect(() => {
// 		const interval = setInterval(() => {
// 			setCurrentIndex((prev) => (prev + 1) % promoCards.length);
// 		}, 3000);

// 		return () => clearInterval(interval);
// 	}, []);

// 	return (
// 		<div className="w-full max-w-6xl mx-auto relative">
// 			{/* Cards */}
// 			<div className="overflow-hidden rounded-3xl">
// 				<div
// 					className="flex transition-transform duration-500 ease-in-out"
// 					style={{ transform: `translateX(-${currentIndex * 100}%)` }}
// 				>
// 					{promoCards.map((card, idx) => (
// 						<div
// 							key={idx}
// 							className="min-w-full p-6 bg-red-900 flex items-center justify-between"
// 						>
// 							{/* Image Container */}
// 							<div className="w-full flex justify-center items-center">
// 								<div className="w-[670px] h-[300px] p-6 rounded overflow-hidden flex justify-center items-center">
// 									<img
// 										src={card.image}
// 										alt={card.title}
// 										className="w-full h-full object-cover"
// 									/>
// 								</div>
// 							</div>

// 							{/* Text Content */}
// 							<div className="w-1/2 px-4 ">
// 								<h2 className="text-white text-3xl font-bold leading-tight mb-2">
// 									{card.title} <span className="inline-block">✨</span>
// 									<br />
// 									<span className='text-2xl'>{card.subtitle}</span>
// 								</h2>
// 								<ul className="text-white text-lg mb-4 space-y-1 list-disc list-inside">
// 									{card.points.map((point, i) => (
// 										<li key={i}>{point}</li>
// 									))}
// 								</ul>
// 								<button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
// 									{card.cta}
// 								</button>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>

// 			{/* Navigation Dots */}
// 			{/* <div className="flex justify-center mt-4 space-x-2">
// 				{promoCards.map((_, idx) => (
// 					<button
// 						key={idx}
// 						className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-red-500' : 'bg-gray-300'}`}
// 						onClick={() => setCurrentIndex(idx)}
// 					/>
// 				))}
// 			</div> */}

// 			{/* Arrows */}
// 			{/* <button
// 				className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full"
// 				onClick={prevCard}
// 			>
// 				‹
// 			</button> */}
// 			{/* <button
// 				className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full"
// 				onClick={nextCard}
// 			>
// 				›
// 			</button> */}
// 		</div>);
// };

// export default PromoCarousel;

import React, { useEffect, useState } from 'react';
import carImage from '../../assets/CarPart2.jfif';
import Wash from '../../assets/CAR WASH/Car wash.jpg';
import Cardismantle from '../../assets/CAR DISMANTLE/Car dismantle.jpg';
import Carpainting from '../../assets/CAR PAINTING/Car painting.jpg';

interface PromoCardProps {
	title: string;
	subtitle: string;
	points: string[];
	image: string;
	cta: string;
}

const promoCards: PromoCardProps[] = [
	{
		title: 'GoShine',
		subtitle: 'Combo',
		points: ['Shine More, Pay Less', '3 Washes + 1 Deep Spa!'],
		image: carImage,
		cta: 'BUY NOW',
	},
	{
		title: 'SuperClean',
		subtitle: 'Offer',
		points: ['Weekly Wash Pack', 'Includes Vacuuming'],
		image: Wash,
		cta: 'GET DEAL',
	},
	{
		title: 'Dismantle For Checking',
		subtitle: 'Observe',
		points: ['Check every part', 'Replace the part'],
		image: Cardismantle,
		cta: 'BOOK NOW',
	},
	{
		title: 'Painting',
		subtitle: '',
		points: ['Based on priority', 'Based on Customer need'],
		image: Carpainting,
		cta: 'BOOK NOW',
	},
];

// Duplicate cards for seamless looping
const loopCards = [...promoCards, ...promoCards];

const PromoCarousel: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isResetting, setIsResetting] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => prev + 1);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	// Seamless reset when at midpoint
	useEffect(() => {
		if (currentIndex === promoCards.length) {
			const timeout = setTimeout(() => {
				setIsResetting(true);
				setCurrentIndex(0);
			}, 500); // Wait for slide transition

			return () => clearTimeout(timeout);
		} else {
			setIsResetting(false);
		}
	}, [currentIndex]);

	return (
		<div className='w-full max-w-6xl mx-auto my-auto relative overflow-hidden rounded-2xl'>
			<div
				className={`flex ${
					!isResetting ? 'transition-transform duration-500 ease-in-out' : ''
				}`}
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{loopCards.map((card, idx) => (
					<div
						key={idx}
						className='min-w-full p-6 bg-[#0050A5] flex items-center justify-between'
					>
						{/* Image Section */}
						<div className='w-full flex justify-center items-center'>
							<div className='w-[670px] h-[300px] p-6 rounded overflow-hidden flex justify-center items-center'>
								<img
									src={card.image}
									alt={card.title}
									className='w-full h-full object-cover'
								/>
							</div>
						</div>

						{/* Text Section */}
						<div className='w-1/2 px-4'>
							<h2 className='text-white text-3xl font-bold leading-tight mb-2'>
								{card.title} <span className='inline-block'>✨</span>
								<br />
								<span className='text-2xl'>{card.subtitle}</span>
							</h2>
							<ul className='text-[#0050A5] text-lg mb-4 space-y-1 list-disc list-inside'>
								{card.points.map((point, i) => (
									<li key={i}>{point}</li>
								))}
							</ul>
							<button className='bg-white font-semibold py-2 px-4 rounded-lg transition-all text-[#0050A5]'>
								{card.cta}
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PromoCarousel;
