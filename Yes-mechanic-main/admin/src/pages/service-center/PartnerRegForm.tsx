// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Client from '../../api';

// interface ContactInfo {
//     phoneNumber: string;
//     state: string;
//     city: string;
//     address1: string;
//     address2: string;
// }

// interface PartnerFormData {
//     firstName: string;
//     lastName: string;
//     companyName?: string;
//     email: string;
//     password: string;
//     contact_info: ContactInfo;
//     role: 'partner';
//     image?: File | null;
// }

// const PartnerRegForm: React.FC = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState<PartnerFormData>({
//         firstName: '',
//         lastName: '',
//         companyName: '',
//         email: '',
//         password: '',
//         contact_info: {
//             phoneNumber: '',
//             state: '',
//             city: '',
//             address1: '',
//             address2: '',
//         },
//         role: 'partner',
//         image: null,
//     });

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, value, files } = e.target as HTMLInputElement;

//         if (name === 'image' && files) {
//             setFormData((prev) => ({ ...prev, image: files[0] }));
//         } else if (name.startsWith('contact_info.')) {
//             const key = name.split('.')[1] as keyof ContactInfo;
//             setFormData((prevData) => ({
//                 ...prevData,
//                 contact_info: {
//                     ...prevData.contact_info,
//                     [key]: value,
//                 },
//             }));
//         } else {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const data = new FormData();
//         Object.entries(formData).forEach(([key, value]) => {
//             if (key === 'contact_info') {
//                 Object.entries(value).forEach(([subKey, subValue]) => {
//                     data.append(`contact_info.${subKey}`, String(subValue));
//                 });
//             } else if (key === 'image' && value instanceof File) {
//                 data.append('image', value);
//             } else if (value !== undefined && value !== null) {
//                 data.append(key, value as string);
//             }
//         });

//         try {
//             const response: any = await new Client().admin.servicecenter.postPartner(data);
//             console.log(response.data);
//             navigate(-1);
//         } catch (error: any) {
//             alert('Registration failed!');
//         }
//     };

//     return (
//         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-6xl mx-auto my-8">
//             <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 text-[#800000]">
//                 Partner Registration
//             </h2>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Column 1 */}
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             First Name <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             name="firstName"
//                             required
//                             placeholder="First Name"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Last Name <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             name="lastName"
//                             required
//                             placeholder="Last Name"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Company Name
//                         </label>
//                         <input
//                             type="text"
//                             name="companyName"
//                             placeholder="Company Name"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Email <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             required
//                             placeholder="Email"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Password <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             name="password"
//                             required
//                             placeholder="Password"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>
//                 </div>

//                 {/* Column 2 */}
//                 <div className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Phone Number <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             name="contact_info.phoneNumber"
//                             required
//                             placeholder="Phone Number"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             State
//                         </label>
//                         <input
//                             type="text"
//                             name="contact_info.state"
//                             placeholder="State"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             City
//                         </label>
//                         <input
//                             type="text"
//                             name="contact_info.city"
//                             placeholder="City"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Address Line 1
//                         </label>
//                         <input
//                             type="text"
//                             name="contact_info.address1"
//                             placeholder="Address Line 1"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Address Line 2
//                         </label>
//                         <input
//                             type="text"
//                             name="contact_info.address2"
//                             placeholder="Address Line 2"
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Upload Profile Image
//                         </label>
//                         <input
//                             type="file"
//                             name="image"
//                             accept="image/*"
//                             onChange={handleChange}
//                             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white file:bg-gray-200 file:text-gray-700 file:border-none file:rounded file:px-4 file:py-2 hover:file:bg-gray-300 transition"
//                         />
//                     </div>
//                 </div>

//                 {/* Full width submit button */}
//                 <div className="md:col-span-2">
//                     <div className="flex justify-end space-x-4">
//                         <button
//                             type="button"
//                             onClick={() => navigate(-1)}
//                             className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-6 py-2 bg-[#800000] text-white font-semibold rounded-md hover:bg-[#800000] transition"
//                         >
//                             Register
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default PartnerRegForm;