/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FONTS } from '../../../constants/uiConstants';
import {
  getAnnouncement,
  postAnnouncement,
  updateAnnouncement,
} from '../../../pages/Announcement/services';
import { toast } from 'react-toastify';

const Offer = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchOffers = async () => {
    const data: any = await getAnnouncement('');
    const datas = data.data.data;
    const filters = datas.filter((item: any) => item.category === 'offeres');
    setOffers(filters);
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: heading,
      category: 'offeres',
      description,
      offer: price,
      image: image ? URL.createObjectURL(image) : '',
    };

    try {
      if (editingId) {
        await updateAnnouncement(payload, editingId);
        toast.success('Offer updated successfully');
      } else {
        await postAnnouncement(payload);
        toast.success('Offer added successfully');
      }
      await fetchOffers();
      resetForm();
      setShowModal(false);
    } catch (error) {
      toast.error('Operation failed. Please try again.');
    }
  };

  const resetForm = () => {
    setHeading('');
    setDescription('');
    setPrice('');
    setImage(null);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setHeading(item.title);
    setDescription(item.description);
    setPrice(item.offer);
    setEditingId(item.uuid);
    setShowModal(true);
  };



  return (
    <div className="relative px-6 mt-4">
      <button
        className="flex items-center bg-[#9b111e] gap-2 font-bold px-4 py-2 rounded-lg !text-white transition duration-200 active:scale-105 hover:bg-[#a00000]"
        style={{ ...FONTS.paragraph }}
        onClick={() => setShowModal(true)}
      >
        + Add Offer
      </button>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {offers.map((item: any) => (
          <div
            key={item._id}
            className="flex flex-col hover:shadow-xl transform hover:scale-[1.02] p-2 transition-all duration-300 bg-white shadow-md rounded-lg"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <h3 className="text-base !text-gray-900 font-semibold" style={{ ...FONTS.paragraph }}>
                {item.title}
              </h3>
              <p className="text-[#9b111e] !font-bold mt-2" style={{ ...FONTS.cardSubHeader }}>
                Start from {item.offer}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-3xl w-full max-w-lg relative">
            <button
              onClick={() => {
                resetForm();
                setShowModal(false);
              }}
              className="absolute top-2 right-2 text-gray-500 text-2xl font-bold hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#9b111e]">
              {editingId ? 'Edit Offer' : 'Add New Offer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Heading"
                className="w-full p-2 border border-gray-300 rounded"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Offer Price"
                className="w-full p-2 border border-gray-300 rounded"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="file"
                className="w-full"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-3xl hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9b111e] text-white rounded-3xl hover:bg-[#7c0d18]"
                >
                  {editingId ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;
