/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import carImage from '../../assets/loginimg/car-img.png';
import { FONTS } from '../../constants/uiConstants';
import { useAuth } from './AuthContext';
import { postLogin } from './services';
import { toast } from 'react-toastify';

type LoginData = {
	email: string;
	password: string;
};

// const [ Login,setLogin]= useState<LoginData>();

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		defaultValues:{
			email:"admin@gmail.com",
			password:"Admin@123"
		}
	});
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	//const navigate = useNavigate();
	const { login } = useAuth();

	const onSubmit = async (data: LoginData) => {
		// if (data?.email && data?.password) {
		// 	login();
		// 	navigate('/');
		// }
		setIsLoading(true);
		try{
			const  User:any = await postLogin(data)
			login(User.data.data)
			console.log(User);
			toast.success('Login successful! Welcome back.', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
		catch (error: any){
            console.log('error',error)
			const errorMessage = error?.response?.data?.message || 
								error?.message || 
								'Login failed. Please check your credentials and try again.';
			toast.error(errorMessage, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
		finally {
			setIsLoading(false);
		}
	};

	const text = 'YM ADMIN';

	return (
		<>
			<style>{`
			@keyframes slideLeftToRightOnce {
			0% { transform: translateX(-30px); }
			100% { transform: translateX(40px); }
			}

			@keyframes fadeInUp {
			0% {
				opacity: 0;
				transform: translateY(20px);
			}
			100% {
				opacity: 1;
				transform: translateY(0);
			}
			}

			.letter {
			display: inline-block;
			opacity: 0;
			animation-name: fadeInUp;
			animation-fill-mode: forwards;
			animation-duration: 0.5s;
			animation-timing-function: ease-out;
			}

			.animated-image {
			animation: slideLeftToRightOnce 1.5s ease forwards;
			}
		`}</style>

			<div className='min-h-screen flex flex-col md:flex-row overflow-y-hidden'>
				{/* Animated Text */}
				<div className='hidden md:block absolute top-6 left-4 md:top-16 md:left-20 z-10'>
					<h1 className='text-4xl font-bold tracking-wide drop-shadow-lg select-none'>
						{text.split('').map((char, index) => (
							<span
								key={index}
								style={{
									animationDelay: `${index * 0.1}s`,
									...FONTS.header,
									fontSize: '56px',
									color: 'white',
									fontWeight: 500,
								}}
								className='letter'
							>
								{char === ' ' ? '\u00A0' : char}
							</span>
						))}
					</h1>
				</div>

				{/* Left Image */}
				<div className='hidden md:block w-full md:w-3/5 h-64 md:h-screen relative'>
					<div className='bg-[#9b111e] h-full' style={{ width: '90%' }}>
						<img
							src={carImage}
							alt='Login illustration'
							className='object-cover rounded-none md:rounded-l-xl animated-image'
							style={{
								position: 'absolute',
								top: '75px',
								left: '0',
								width: '100%',
								height: 'auto',
							}}
						/>
					</div>
				</div>

				{/* Right Login Form */}
				<div className='w-full md:w-2/5 flex items-center justify-center bg-white px-6 sm:px-8 md:px-12 py-12 md:py-0'>
					<div className='w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border border-gray-200'>
						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							<h2 className='text-2xl font-bold text-[#9b111e] text-center'>
								Master Admin Login
							</h2>

							{/* Email */}
							<div className='flex flex-col space-y-2'>
								<label className='text-sm font-medium text-[#9b111e]'>
									Email
								</label>
								<input
									type='email'
									{...register('email', { required: 'Email is required' })}
									placeholder='Enter your email'
									className='w-full px-4 py-2 border border-[#E6A895] rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b111e] placeholder-[#c18383]'
								/>
								{errors.email && (
									<span className='text-red-500 text-sm'>
										{errors.email.message}
									</span>
								)}
							</div>

							{/* Password */}
							<div className='flex flex-col space-y-2'>
								<label className='text-sm font-medium text-[#9b111e]'>
									Password
								</label>
								<div className='relative'>
									<input
										type={showPassword ? 'text' : 'password'}
										{...register('password', {
											required: 'Password is required',
										})}
										placeholder='Enter your password'
										className='w-full px-4 py-2 border border-[#E6A895] rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-[#9b111e] placeholder-[#c18383]'
									/>
									<span
										className='absolute top-2.5 right-3 text-gray-500 cursor-pointer'
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeSlashIcon className='w-5 h-5 text-[#9b111e]' />
										) : (
											<EyeIcon className='w-5 h-5 text-[#9b111e]' />
										)}
									</span>
									{errors.password && (
										<span className='text-red-500 text-sm'>
											{errors.password.message}
										</span>
									)}
								</div>
							</div>

							{/* Submit */}
							<button
								type='submit'
								disabled={isLoading}
								className={`w-full text-white font-semibold py-2 rounded-3xl transition duration-300 flex items-center justify-center ${
									isLoading 
										? 'opacity-75 cursor-not-allowed' 
										: 'hover:brightness-110'
								}`}
								style={{
									backgroundColor:'#9b111e'
									,
								}}
							>
								{isLoading ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Logging in...
									</>
								) : (
									'Login'
								)}
							</button>

							<div className='text-right mt-1'>
								<Link
									to='/forgot-password'
									className='text-[#9b111e] hover:underline text-sm'
								>
									Forgot Password?
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
