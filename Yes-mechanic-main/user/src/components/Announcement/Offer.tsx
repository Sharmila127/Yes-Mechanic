import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FONTS } from '../../constants/constant';
import HttpClient from '../../api/httpClient';
import { API_END_POINTS } from '../../api/httpEndpoints';

type ServiceOffer = {
	_id: string;
	title: string;
	description: string;
	uuid: string;
	userId: any;
	partnerId?: any[];
	discount?: number;
	originalPrice?: number;
	offerPrice?: number;
	image?: string;
	badge?: string;
};



// Scroll - line animation

const useScrollAnimation = <T extends HTMLElement = HTMLElement>(
	options = {}
) => {
	const [isVisible, setIsVisible] = useState(false);
	const elementRef = useRef<T>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
				...options,
			}
		);

		if (elementRef.current) {
			observer.observe(elementRef.current);
		}

		return () => {
			if (elementRef.current) {
				observer.unobserve(elementRef.current);
			}
		};
	}, []);

	return { elementRef, isVisible };
};

interface OfferProps {
	announcements: ServiceOffer[];
}

const Offer: React.FC<OfferProps> = ({ announcements }) => {
	const [localAnnouncements, setLocalAnnouncements] = useState<ServiceOffer[]>([]);
	const offerTitle = useScrollAnimation<HTMLHeadingElement>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await HttpClient.get(API_END_POINTS.offer.Get) as any;
				const allData = response.data?.data || [];
				
				// Filter to show only admin announcements (exclude partner data)
				const adminOnly = allData.filter((offer: ServiceOffer) => {
					// Check if partnerId is empty array, null, undefined, or doesn't exist
					return !offer.partnerId || 
						   (Array.isArray(offer.partnerId) && offer.partnerId.length === 0) ||
						   offer.partnerId === null ||
						   offer.partnerId === undefined;
				});
				
				setLocalAnnouncements(adminOnly);
			} catch (error) {
				// Handle error silently
			}
		};
		fetchData();
	}, []);

	const dataToShow = localAnnouncements.length > 0 ? localAnnouncements : announcements;

	return (
		<div className='p-6 bg-gradient-to-br font-bold from-blue-50 to-blue-100 min-h-screen'>
			<h1
				ref={offerTitle.elementRef}
				className='text-center'
				style={{ ...FONTS.heading }}
			>
				<span className='inline-block pb-1  relative text-center text-[#0050A5] mb-10'>
					Yes Mechanic Special Offers
					{/* <span
						className={`absolute top-[52px] left-1/2 h-[1px] bg-[#9b111e] transform -translate-x-1/2 origin-center transition-all duration-700 ${
							offerTitle.isVisible ? 'scale-x-100 w-full' : 'scale-x-0 w-full'
						}`}
					></span> */}
				</span>
			</h1>

			<h1 className=''></h1>

			<div className='grid grid-cols-3 gap-8 max-w-7xl mx-auto'>
				{dataToShow.map((offer) => (
					<div
						key={offer._id}
						className='bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-l-4 border-[#0050A5]'
					>
						<div className='flex items-center justify-between mb-4'>
							<div className='bg-[#0050A5]  text-white px-3 py-1 rounded-full text-sm font-semibold'>
								Special Offer
							</div>
							<div className='text-2xl'>🎉</div>
						</div>
						<h3 className='text-2xl font-bold text-gray-800 mb-4 leading-tight'>
							{offer.title}
						</h3>
						<p className='text-gray-600 mb-4 leading-relaxed text-base'>
							{offer.description}
						</p>
						{(offer.originalPrice || offer.offerPrice) && (
							<div className='mb-4'>
								{offer.originalPrice && (
									<span className='text-gray-500 line-through text-lg mr-2'>
										₹{offer.originalPrice}
									</span>
								)}
								{offer.offerPrice && (
									<span className='text-green-600 font-bold text-xl'>
										₹{offer.offerPrice}
									</span>
								)}
								{offer.discount && (
									<span className='bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-semibold ml-2'>
										{offer.discount}% OFF
									</span>
								)}
							</div>
						)}
						<button className='w-full bg-[#0050A5] text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-[#0050A5] transition-all duration-300 shadow-lg hover:shadow-xl'>
							View Details →
						</button>
					</div>
				))}
				{/* {dataToShow.length === 0 && (
					<div className='col-span-3 text-center py-12'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[#0050A5] mx-auto mb-4'></div>
						<p className='text-gray-600 text-lg'>Loading amazing offers...</p>
					</div>
				)} */}
			</div>
		</div>
	);
};

export default Offer;
