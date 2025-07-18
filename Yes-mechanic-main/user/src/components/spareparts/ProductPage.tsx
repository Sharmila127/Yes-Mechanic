import { useNavigate, useParams } from 'react-router-dom';
import { useSparePartsDataset } from '../spareparts/data/Product';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useState } from 'react';
import spareImg from '../../assets/CarPart1.jfif';
import { postSparePartsData } from '../../features/spareparts';
import { toast } from 'react-toastify';

const ProductPage = () => {
	const { productId } = useParams();
	const [quantity, setQuantity] = useState(1);
	const { parts } = useSparePartsDataset();
	const navigate = useNavigate();
	const fallBack = () => {
		navigate(-1);
	};

	const product = parts.filter((item: any) => item.id === productId);
	const [isAdded, setIsAdded] = useState(false);

	// const handleAddToCart = () => {
	// 	setIsAdded(true);
	// 	//   toast.success('Item added to cart!');
	// 	setTimeout(() => {
	// 		setIsAdded(false);
	// 	}, 2000);
	// };

	const handleAddToCart = async () => {
		try {
			const payload = {
				products: {
					productId: productId,
					price: product[0]?.price,
					quantity: quantity,
				},
				type: 'spare',
			};
			setIsAdded(true);
			const response = await postSparePartsData(payload);
			if (response) {
				setIsAdded(false);
				toast.success('Item added to cart!', { autoClose: 3000 });
			}
		} catch (error) {
			console.error('Error adding to cart:', error);
		}
	};
	return (
		<>
			{product.map((item: any, index: number) => (
				<div className='container mx-auto p-7' key={item.id || index}>
					<IoMdArrowRoundBack
						onClick={fallBack}
						className=' relative right-[10px] text-3xl text-[#0050A5]  cursor-pointer mb-4'
					/>
					<div className='flex xs:flex-col sm:flex-col md:flex-row gap-8'>
						<div className='md:w-3/5 sm:w-4/5 md:h-[380px] sm:h-[300px]'>
							<img
								src={spareImg}
								alt={item?.spareparts_name}
								className='w-full h-full rounded-lg object-cover shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
							/>
						</div>
						<div className='md:w-2/5 bg-[#d8e1ef] p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform '>
							<h1 className='text-2xl font-bold mb-4'>
								{item?.spareparts_name}
							</h1>
							<p className='text-xl text-[#0050A5] font-semibold mb-4'>
								₹{item?.price}{' '}
								<span className='text-gray-500'>
									<del>₹{item?.price + 500}</del>
								</span>
							</p>
							<h2 className='text-lg font-semibold mb-2'>Specifications:</h2>
							<ul className='mb-6'>
								<li key={index} className='mb-1 text-sm'>
									• {item?.spareparts_name}
								</li>
							</ul>

							<div className='flex items-center gap-2 mb-4'>
								<span className='text-sm font-medium'>Quantity:</span>
								<button
									onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
									className='px-2 py-1 bg-[#BED0EC] rounded hover:bg-[#BED0EC] hover:scale-105 transition-transform duration-200'
								>
									-
								</button>
								<span className='px-2'>{quantity}</span>
								<button
									onClick={() => setQuantity((prev) => prev + 1)}
									className='px-2 py-1 bg-[#BED0EC] rounded hover:bg-[#BED0EC] hover:scale-105 transition-transform duration-200'
								>
									+
								</button>
							</div>

							<div className='text-sm mt-3 mb-2'>
								Total Price:{' '}
								<span className='font-semibold text-[#0050A5]'>
									₹{(Number(item?.price) * quantity).toLocaleString()}
								</span>
							</div>

							{/* <Toaster position="top-center" /> */}
							<div className='flex justify-center items-center mt-12'>
								<button
									onClick={handleAddToCart}
									className={`px-3 py-2 bg-[#0050A5] text-white font-semibold py-1 rounded-full transition-all duration-300 transform shadow-lg hover:scale-105 hover:shadow-xl`}
								>
									{isAdded ? 'Added!' : 'Add To Cart'}
								</button>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default ProductPage;
