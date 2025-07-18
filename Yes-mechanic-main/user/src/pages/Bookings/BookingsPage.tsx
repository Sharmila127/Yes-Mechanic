/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
	// Search,
	Package,
	Wrench,
	CheckCircle,
	Calendar,
	// Truck,
	Clock,
	Search,
} from 'lucide-react';
// import bgImage from '../../assets/checkout-bg_1_.png';
import { getBookingAll } from '../../features/Bookings/service';

import serviceImg from '../../assets/serviceimages/generalservice.png';
import spareImg from '../../assets/CAR GEAR/car gear.jpg';
import { FONTS } from '../../constants/constant';
import { useAuth } from '../auth/AuthContext';

interface OrderDetails {
	id: string;
	uuid: string;
	name: string;
	imageUrl?: string;
	description?: string;
	date: string;
	price: number;
	status: 'pending' | 'completed' | 'delivered';
	type: 'spare' | 'service';
	products?: Array<{
		productId: {
			_id: string;
			productName: string;
			price: string;
			slug: string;
			brand: string;
		} | null;
		quantity: number;
		price: string;
		_id: string;
	}>;
	services?: Array<{
		service_name: string;
		description: string;
		price: number;
		uuid: string;
		_id: string;
	}>;
}

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
				// eslint-disable-next-line react-hooks/exhaustive-deps
				observer.unobserve(elementRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { elementRef, isVisible };
};

interface OrderCardProps {
	order: OrderDetails;
}
const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
	const [showDetails, setShowDetails] = useState(false);
	const orderDate = new Date(order.date);
	const isCompleted =
		order.status === 'completed' || order.status === 'delivered';
	const isOld = orderDate < new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);

	// Determine if it's a service or product order
	const isService = order.type === 'service';
	// const items = isService ? order.services : order.products;
	// const firstItem = items?.[0];

	// Get name and description based on order type
	const getName = () => {
		if (isService) {
			return order.services?.[0]?.service_name || 'Service Order';
		}
		return order.products?.[0]?.productId?.productName || 'Product Order';
	};

	const getDescription = () => {
		if (isService) {
			return order.services?.[0]?.description || 'Service appointment';
		}
		return `Order containing ${order.products?.length || 0} items`;
	};

	const getPrice = () => {
		if (isService) {
			return (
				order.services?.reduce(
					(sum, service) => sum + (service?.price ?? 0),
					0
				) ?? 0
			);
		} else {
			return (
				order.products?.reduce(
					(sum, product) =>
						sum + parseInt(product?.price ?? '0') * (product?.quantity ?? 0),
					0
				) ?? 0
			);
		}
	};

	return (
		<div className='opacity-90 rounded-2xl shadow-lg border max-w-6xl mx-auto border-[#0050A5] overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:border-[#0050A5]'>
			<div className='flex flex-col'>
				{/* Top Section */}
				<div className='flex flex-row'>
					{/* Image Section */}
					<div className='md:w-48 h-40 relative overflow-hidden rounded-lg shadow-md'>
						<div className='w-full h-full bg-gray-100 flex items-center justify-center'>
							<img
								src={isService ? serviceImg : spareImg}
								alt='order'
								className='w-full h-full object-cover'
							/>
						</div>

						{/* Type Badge */}
						<div className='absolute top-3 left-3 z-10'>
							<span
								className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
									isService
										? 'bg-purple-100 text-purple-800'
										: 'bg-blue-100 text-blue-800'
								}`}
							>
								{isService ? (
									<>
										<Wrench className='w-3 h-3 mr-1' />
										Service
									</>
								) : (
									<>
										<Package className='w-3 h-3 mr-1' />
										Product
									</>
								)}
							</span>
						</div>
					</div>

					{/* Content Section */}
					<div className='flex-1 p-6'>
						<div className='flex flex-col h-full justify-between'>
							<div className='flex justify-between'>
								{/* Name and Description */}
								<div>
									<h3 className='text-xl font-bold text-[#0050A5] mb-1'>
										{getName()}
									</h3>
									<p className='text-[#0050A5] text-sm leading-relaxed'>
										{getDescription()}
									</p>
									<div className='flex items-center text-sm text-[#0050A5] mt-2'>
										<Calendar className='w-4 h-4 text-[#0050A5] mr-2' />
										<span>
											{orderDate.toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</span>
									</div>
								</div>

								{/* Price + Old Order */}
								<div className='text-right'>
									<div className='text-2xl font-bold text-gray-900'>
										₹{getPrice().toLocaleString()}
									</div>
									{isOld && (
										<span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block'>
											Old Order
										</span>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Actions Section */}
				<div className='flex flex-col p-4 pt-2 gap-2'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-4'>
							{isCompleted ? (
								<div className='flex items-center text-green-600 text-sm font-medium'>
									<CheckCircle className='w-4 h-4 mr-1' />
									Completed
								</div>
							) : (
								<div className='flex items-center text-orange-600 text-sm font-medium'>
									<Clock className='w-4 h-4 mr-1' />
									{order.status || 'Pending'}
								</div>
							)}
						</div>

						<button
							onClick={() => setShowDetails(!showDetails)}
							className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-200 transition-colors'
						>
							{showDetails ? 'Hide Details' : 'View Details'}
						</button>
					</div>

					{/* Details Card */}
					{showDetails && (
						<div className='bg-[#BED0EC] rounded-xl shadow p-6 border border-[#0050A5] mt-4'>
							<div className='flex  md:flex-row justify-between gap-6'>
								{/* Price Summary */}
								<div className='md:w-1/2 space-y-2 ml-10'>
									<h4 className='text-lg font-bold text-[#0050A5] mb-2'>
										Price Summary
									</h4>
									<p className='text-sm text-[#0050A5]'>
										<span>Product</span>
										<span className='pl-5'>:</span> {getName()}
									</p>
									<p className='text-sm text-[#0050A5]'>
										<span>Base Price</span>
										<span className='pl-1'>:</span> ₹{' '}
										{getPrice().toLocaleString()}
									</p>
									<p className='text-sm text-[#0050A5]'>
										<span>Tax (5%)</span>
										<span className='pl-3'>:</span> ₹{' '}
										{(getPrice() * 0.05).toFixed(2)}
									</p>
									<div className='border-t border-[#0050A5] pt-2 mb-2'>
										<p className='text-sm text-[#0050A5] font-bold'>
											<strong>
												Total<span className='pl-8'>:</span>
											</strong>{' '}
											₹ {(getPrice() * 1.05).toFixed(2)}
										</p>
									</div>
								</div>

								{/* Order Info */}
								<div className='md:w-1/2 space-y-2 mr-30 border border-[#0050A5] rounded-lg p-4'>
									<h4 className='text-lg font-bold text-[#0050A5] mb-2'>
										Order Info
									</h4>
									<p className='text-sm text-[#0050A5]'>
										<span>
											Status<span className='pl-11'>:</span>
										</span>{' '}
										{order.status || 'Pending'}
									</p>
									<p className='text-sm text-[#0050A5]'>
										<span>
											Order Type<span className='pl-3'>:</span>
										</span>{' '}
										{isService ? 'Service' : 'Product'}
									</p>
									<p className='text-sm text-[#0050A5]'>
										<span>
											Placed On<span className='pl-5'>:</span>
										</span>{' '}
										{orderDate.toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const OrdersPage: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterType, setFilterType] = useState<'all' | 'spare' | 'service'>(
		'all'
	);
	const [sortBy] = useState<'date' | 'price' | 'name'>('date');
	const [orders, setOrders] = useState<OrderDetails[]>([]);
	const orderTitle = useScrollAnimation<HTMLHeadingElement>();
	// const [isLoading, setIsLoading] = useState(false);
	const { isAuthenticated } = useAuth();

		useEffect(() => {
			if (isAuthenticated) {
			const fetchOrders = async () => {
				try {
					const response: any = await getBookingAll({});
					if (response?.data) {
						const transformedOrders = [
							...(response.data.productConfirm?.map((productOrder: any) => ({
								id: productOrder._id,
								uuid: productOrder.uuid,
								name:
									productOrder.products?.[0]?.productId?.productName ||
									'Product Order',
								date: productOrder.confirm_Date,
								price: productOrder.amount,
								status: productOrder.status,
								type: 'spare',
								products: productOrder.products,
							})) || []),

							...(response.data.serviceConfirm?.map((serviceOrder: any) => ({
								id: serviceOrder._id,
								uuid: serviceOrder.uuid,
								name:
									serviceOrder.services?.[0]?.service_name || 'Service Order',
								description: serviceOrder.services?.[0]?.description,
								date: serviceOrder.confirm_Date,
								price: serviceOrder.amount,
								status: serviceOrder.status,
								type: 'service',
								services: serviceOrder.services,
							})) || []),
						];

						setOrders(transformedOrders);
						// setIsLoading(false);
					}
				} catch (err) {
					console.error('Error fetching orders:', err);
				} finally {
					// setIsLoading(false);
				}
			};

			fetchOrders();
		}
		}, [isAuthenticated]);

	const filteredOrders = useMemo(() => {
		return orders
			.filter((order) => {
				const matchesSearch =
					order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(order.description &&
						order.description.toLowerCase().includes(searchTerm.toLowerCase()));
				const matchesType = filterType === 'all' || order.type === filterType;
				return matchesSearch && matchesType;
			})
			.sort((a, b) => {
				switch (sortBy) {
					case 'date':
						return new Date(b.date).getTime() - new Date(a.date).getTime();
					case 'price':
						return b.price - a.price;
					case 'name':
						return a.name.localeCompare(b.name);
					default:
						return 0;
				}
			});
	}, [orders, searchTerm, filterType, sortBy]);

	const totalOrders = filteredOrders.length;
	const completedOrders = filteredOrders.filter(
		(order) => order.status === 'completed' || order.status === 'delivered'
	).length;

	// if (isLoading) {
	// 	return (
	// 		<div className='min-h-screen bg-gray-50 flex items-center justify-center flex-col gap-2'>
	// 			<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500'></div>
	// 			<p className='text-red-500 text-lg font-semibold'>Loading...</p>
	// 		</div>
	// 	);
	// }

	return (
		<div
			className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				{/* Header */}
				<div className='mb-8'>
					<h1
						className='text-center'
						ref={orderTitle.elementRef}
						style={{ ...FONTS.heading }}
					>
						<span className='inline-block pb-1 relative text-[#0050A5] mb-2'>
							My Orders
							{/* <span
								className={`absolute top-14 left-1/2 h-[1px] bg-[#9b111e] transform -translate-x-1/2 origin-center transition-all duration-700 ${orderTitle.isVisible
									? 'scale-x-100 w-full'
									: 'scale-x-0 w-full'
									}`}
							></span> */}
						</span>
					</h1>
					<p className='text-[#0050A5] text-lg max-w-6xl mx-auto'>
						Track and manage all your orders in one place
					</p>

					{/* Stats */}
					<div className='flex space-x-6 mt-4 max-w-6xl mx-auto text-[#0050A5]'>
						<div className='bg-white rounded-lg px-4 py-2 shadow-sm border'>
							<span className='text-2xl font-bold text-gray-900'>
								{totalOrders}
							</span>
							<span className=' ml-2'>Total Orders</span>
						</div>
						<div className='bg-white rounded-lg px-4 py-2 shadow-sm border'>
							<span className='text-2xl font-bold text-green-600'>
								{completedOrders}
							</span>
							<span className=' ml-2'>Completed</span>
						</div>
						<div className='bg-white rounded-lg px-4 py-2 shadow-sm border'>
							<span className='text-2xl font-bold text-orange-600'>
								{totalOrders - completedOrders}
							</span>
							<span className=' ml-2'>In Progress</span>
						</div>
					</div>
				</div>

				{/* Filters and Search */}
				<div className='bg-[#BED0EC] rounded-2xl shadow-sm mx-7 border border-gray-100 p-6 mb-8 '>
					{/* First Row: Search */}
					<div className='mb-6'>
						<div className='relative w-full'>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
							<input
								type='text'
								value={searchTerm}
								placeholder='Search orders...'
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0050A5] focus:border-transparent transition-all'
							/>
						</div>
					</div>

					{/* Second Row: Filters + Sort + Reset */}
					<div className='flex flex-col  gap-4'>
						{/* Filter Buttons */}
						<div className='flex flex-wrap gap-2 bg-[white] rounded-xl p-1'>
							<button
								onClick={() => setFilterType('all')}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
									filterType === 'all'
										? 'bg-[#0050A5] text-white shadow-sm'
										: 'text-gray-600 hover:text-gray-900'
								}`}
							>
								All Orders
							</button>
							<button
								onClick={() => setFilterType('spare')}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
									filterType === 'spare'
										? 'bg-[#0050A5] text-white shadow-sm'
										: 'text-gray-600 hover:text-gray-900'
								}`}
							>
								<Package className='w-4 h-4 mr-1' />
								Spare Parts
							</button>
							<button
								onClick={() => setFilterType('service')}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center ${
									filterType === 'service'
										? 'bg-[#0050A5] text-white shadow-sm'
										: 'text-gray-600 hover:text-gray-900'
								}`}
							>
								<Wrench className='w-4 h-4 mr-1' />
								Services
							</button>
						</div>

						{/* Sort Dropdown */}
						{/* <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | 'name')}
      className='px-4 py-2 w-full md:w-auto rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm'
    >
      <option value='date'>Sort by Date</option>
      <option value='price'>Sort by Price</option>
      <option value='name'>Sort by Name</option>
    </select> */}

						{/* Reset Button */}
						{/* <button
      onClick={() => {
        setSearchTerm('');
        setFilterType('all');
        setSortBy('date');
      }}
      className='px-4 py-2 mx-auto bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium text-sm'
    >
      Reset Filters
    </button> */}
					</div>
				</div>

				{/* Orders List */}
				<div className='space-y-6'>
					{filteredOrders.length > 0 ? (
						filteredOrders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))
					) : (
						<div className='text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100'>
							<Package className='h-16 w-16 text-[#BED0EC] mx-auto mb-4' />
							<h3 className='text-xl font-semibold text-gray-900 mb-2'>
								No orders found
							</h3>
							<p className='text-gray-600 max-w-md mx-auto'>
								Try adjusting your search terms or filters to find what you're
								looking for.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;