/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { FONTS } from '../../../constants/uiConstants';
import { getAnnouncement, postAnnouncement } from '../../../pages/Announcement/services';

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState<any>([]);

  const [showModal, setShowModal] = useState(false);
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    (async function () {
      const data:any = await getAnnouncement('')
      const datas = data.data.data
      const filters = datas.filter((item: any) => item.category == 'general')
      setAnnouncements(filters)
    })()
  }, []);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement = {
      title: heading,
      price: price,
      image: image ? URL.createObjectURL(image) : ''
    };

    const data = {
      title:heading,
      category:"general",
      description,
      offer:price,
      image: image ? URL.createObjectURL(image) : ''
    }

    await postAnnouncement(data)

    setAnnouncements([...announcements, newAnnouncement]);
    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setHeading('');
    setDescription('');
    setPrice('');
    setImage(null);
  };

  return (
    
    <div className="relative">
      {/* Add Announcement Button */}
      <div className="flex justify-between items-center px-6 mt-4 mb-6">
 
  <button
    className="flex items-center gap-2 bg-[#9b111e] font-bold px-4 py-2 rounded-lg !text-white transition duration-200 active:scale-105 hover:bg-[#a00000]"
    style={{
      ...FONTS.paragraph
    }}
    onClick={() => setShowModal(true)}
  >
    + Add Announcement
  </button>
</div>


      {/* ✅ Card Grid: This was missing */}
      <div className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {announcements.map((item:any, index:number) => (
            <div
              key={index}
              className="flex flex-col hover:shadow-xl transform hover:scale-[1.02] p-2 transition-all duration-300 bg-white shadow-md rounded-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-60 h-40 object-cover rounded-t-lg"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-semibold !text-gray-900" style={{...FONTS.cardSubHeader}}>{item.title}</h3>
                <p className="text-[#9b111e] !font-bold mt-2" style={{...FONTS.cardSubHeader}}>{item.offer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-3xl w-full max-w-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl font-bold hover:text-black"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#9b111e]">
              Add New Announcement
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
                type="text"
                placeholder="cost difference"
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
                  className="px-4 py-2 border rounded-3xl border-gray-400 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#9b111e] text-white rounded-3xl hover:bg-[#7c0d18]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;
