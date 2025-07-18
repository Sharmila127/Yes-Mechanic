import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { MdUpgrade } from 'react-icons/md';
import { FONTS } from '../../constants/uiConstants';
import { getProfile, updateProfile } from './services';
import * as Yup from 'yup';

import {
	fetchAllCountries,
	fetchCountries,
	fetchState,
} from '../../features/ServiceCenter/externalapi';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  image: Yup.mixed().nullable(),
  contact_info: Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    address1: Yup.string().required("Address is required"),
    country: Yup.string(),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
  }),
  facebook: Yup.string().url("Invalid Facebook URL").nullable(),
  twitter: Yup.string().url("Invalid Twitter URL").nullable(),
  youtube: Yup.string().url("Invalid YouTube URL").nullable(),
  billing: Yup.object().shape({
    gst: Yup.string()
      .nullable()
      .matches(/^(\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1})?$/, "Invalid GST number"),
  }),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  contact_info: {
    phoneNumber: string;
    address1: string;
    country: string;
    state: string;
    city: string;
  };
  gender: string;
  image: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;

  billing?: {
    gst?: string;
  };
};

const ProfileEditSettings: React.FC = () => {
  const [profile, setProfile] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    contact_info: {
      phoneNumber: "",
      address1: "",
      country: "",
      state: "",
      city: "",
    },
    gender: "",
    image: "",
    facebook: "",
    twitter: "",
    youtube: "",
    billing: {
    gst: "",
  },
  });

	const fetchData = async () => {
		const response = await getProfile();
		setProfile(response.data);
	};

	useEffect(() => {
		fetchData();
		getStates();
		getCountry();
	}, []);

	const [state, setState] = useState<any[]>([]);
	const [city, setCity] = useState<any[]>([]);
	const [country, setCountry] = useState<any[]>([]);

	const getStates = async () => {
		const response = await fetchState();
		if (response) {
			setState(response.data);
		} else {
			setState([]);
		}
	};
	const getCountry = async () => {
		const response = await fetchAllCountries();
		if (response) {
			setCountry(response.data);
		} else {
			setState([]);
		}
	};

	const getCity = async () => {
		const states: any = state.filter(
			(item) => item.name === formik.values.contact_info.state
		);
		const response = await fetchCountries(states[0].iso2);
		if (response && response.data) {
			setCity(response.data);
		} else {
			setCity([]);
		}
	};

	const formik = useFormik<FormValues>({
		enableReinitialize: true,
		initialValues: profile,
		validationSchema,
		onSubmit: async (values) => {
			const formData = new FormData();

			formData.append('firstName', values.firstName);
			formData.append('lastName', values.lastName);
			formData.append('email', values.email);
			formData.append('gender', values.gender);

			// Nested object - serialize to JSON
			formData.append('contact_info', JSON.stringify(values.contact_info));
			console.log('contactinfoss', JSON.stringify(values.contact_info));

			if (values.image) {
				formData.append('image', values.image);
			}

			if (values.facebook) formData.append('facebook', values.facebook);
			if (values.twitter) formData.append('twitter', values.twitter);
			if (values.youtube) formData.append('youtube', values.youtube);

			try {
				console.log('formdata', formData);
				const response = await updateProfile(formData);
				toast.success('Profile Updated Successfully');

				if (!response) throw new Error('Failed to submit');
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (err: any) {
				console.error(err.message);
			}
		},
	});

	useEffect(() => {
		if (formik.values.contact_info.state && state.length > 0) {
			getCity();
		}
	}, [formik.values.contact_info.state, state]);

	const inputClass =
		'bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 w-full';

	return (
		<div className='p-5' style={{ fontFamily: FONTS.header.fontFamily }}>
			<h1 className='font-bold text-2xl'>Profile</h1>
			<h6>Update your photo and personal details here</h6>

      <form onSubmit={formik.handleSubmit} className="mt-6">
        <div className="grid grid-cols-3 gap-8">
          {/* Input fields */}
          <div>
            <label className="block mb-2 text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={inputClass}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="text-red-500 text-sm">
                {formik.errors.firstName}
              </div>
            )}
          </div>

					<div>
						<label className='block mb-2 text-sm font-medium'>Last Name</label>
						<input
							type='text'
							name='lastName'
							value={formik.values.lastName}
							onChange={formik.handleChange}
							className={inputClass}
						/>
						{formik.touched.lastName && formik.errors.lastName && (
							<div className='text-red-500 text-sm'>
								{formik.errors.lastName}
							</div>
						)}
					</div>

					<div>
						<label className='block mb-2 text-sm font-medium'>Email</label>
						<input
							type='email'
							name='email'
							value={formik.values.email}
							onChange={formik.handleChange}
							className={inputClass}
						/>
						{formik.touched.email && formik.errors.email && (
							<div className='text-red-500 text-sm'>{formik.errors.email}</div>
						)}
					</div>

					<div>
						<label className='block mb-2 text-sm font-medium'>
							Phone Number
						</label>
						<input
							type='text'
							name='contact_info.phoneNumber'
							value={formik.values.contact_info.phoneNumber}
							onChange={formik.handleChange}
							className={inputClass}
						/>
						{formik.touched.contact_info?.phoneNumber &&
							formik.errors.contact_info?.phoneNumber && (
								<div className='text-red-500 text-sm'>
									{formik.errors.contact_info.phoneNumber}
								</div>
							)}
					</div>

					<div>
						<label className='block mb-2 text-sm font-medium'>Address</label>
						<input
							type='text'
							name='contact_info.address1'
							value={formik.values.contact_info.address1}
							onChange={formik.handleChange}
							className={inputClass}
						/>
						{formik.touched.contact_info?.address1 &&
							formik.errors.contact_info?.address1 && (
								<div className='text-red-500 text-sm'>
									{formik.errors.contact_info.address1}
								</div>
							)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							Country
						</label>
						<select
							name='contact_info.country'
							value={formik.values.contact_info.country}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={inputClass}
						>
							<option value=''>Select Country</option>
							{country.map((c) => (
								<option key={c.iso2} value={c.name}>
									{c.name}
								</option>
							))}
						</select>
						{formik.touched.contact_info?.country &&
							formik.errors.contact_info?.country && (
								<p className='text-sm text-red-500'>
									{formik.errors.contact_info.country}
								</p>
							)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							State
						</label>
						<select
							name='contact_info.state'
							value={formik.values.contact_info.state}
							onChange={formik.handleChange}
							className={inputClass}
						>
							<option value='contact_info.state'>Select a state</option>
							{state.map((city) => (
								<option key={city.id} value={city.name}>
									{city.name}
								</option>
							))}
						</select>
						{formik.touched.contact_info?.state &&
							formik.errors.contact_info?.state && (
								<p className='text-sm text-red-500'>
									{formik.errors.contact_info.state}
								</p>
							)}
					</div>

					<div>
						<label className='block text-sm font-medium text-gray-700 mb-1'>
							City
						</label>
						<select
							name='contact_info.city'
							value={formik.values.contact_info.city}
							onChange={formik.handleChange}
							className={inputClass}
						>
							<option value='contact_info.city'>Select a city</option>
							{city.map((city) => (
								<option key={city.id} value={city.name}>
									{city.name}
								</option>
							))}
						</select>
						{formik.touched.contact_info?.city &&
							formik.errors.contact_info?.city && (
								<p className='text-sm text-red-500'>
									{formik.errors.contact_info.city}
								</p>
							)}
					</div>

					<div>
						<label className='block mb-2 text-sm font-medium'>Gender</label>
						<select
							name='gender'
							value={formik.values.gender}
							onChange={formik.handleChange}
							className={inputClass}
						>
							<option value=''>Select Gender</option>
							<option value='Male'>Male</option>
							<option value='Female'>Female</option>
						</select>
						{formik.touched.gender && formik.errors.gender && (
							<p className='text-sm text-red-500'>{formik.errors.gender}</p>
						)}
					</div>
				</div>

				{/* Image upload */}
				<div className='mt-10'>
					<h1 className='font-bold text-2xl'>Your Photo</h1>
					<div className='flex items-center justify-center w-full mt-8'>
						<label
							htmlFor='dropzone-file'
							className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
						>
							<div className='flex flex-col items-center justify-center pt-5 pb-6'>
								<svg
									className='w-8 h-8 mb-4 text-gray-500'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 20 16'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
									/>
								</svg>
								<p className='mb-2 text-sm text-gray-500'>
									<span className='font-semibold'>Click to upload</span> or drag
									and drop
								</p>
								<p className='text-xs text-gray-500'>SVG, PNG, JPG or GIF</p>
							</div>
							<input
								id='dropzone-file'
								type='text'
								accept='image/*'
								className='hidden'
								onChange={(e) => {
									if (e.currentTarget.files && e.currentTarget.files[0]) {
										formik.setFieldValue('image', e.currentTarget.files[0]);
									}
								}}
							/>
						</label>
					</div>

					{formik.values.image && (
						<div className='mt-4'>
							<p className='text-sm text-gray-700'>
								Selected File: {formik.values.image}
							</p>
						</div>
					)}
				</div>

				{/* Socials */}
				{/* <div className="mt-10">
                    <h1 className="font-bold text-2xl">Social Profiles</h1>
                    <div className="grid grid-cols-2 gap-8 mt-3">
                        {(["facebook", "twitter", "youtube"] as const).map((field) => (
                            <div key={field}>
                                <label className="block mb-2 text-sm font-medium capitalize">{field}</label>
                                <input
                                    type="text"
                                    name={field}
                                    placeholder={`https://${field}.com/your-profile`}
                                    value={formik.values[field] || ""}
                                    onChange={formik.handleChange}
                                    className={inputClass}
                                />
                            </div>
                        ))}
                    </div>
                </div> */}

        {/* Submit */}

        <div className="mt-10">
  <h3 className="font-bold text-2xl">Billing Software</h3>
  
  <div className="mt-6">
    <label className="block text-sm font-medium text-black">GST</label>
    <input
      type="text"
      name="billing.gst"
       className={`w-64 ${inputClass}`}
    />
   
  </div>
</div>

        <div className="flex justify-end gap-5 mt-10">
          <button
            type="button"
            className="w-20 h-10 rounded-3xl text-white"
            style={{ backgroundColor: "#9b111e" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-3xl text-white"
            style={{ backgroundColor: "#9b111e" }}
          >
            <MdUpgrade className="text-2xl" />
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditSettings;
