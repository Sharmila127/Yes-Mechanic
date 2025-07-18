import React, { useState } from 'react';
import Offer from '../../components/common/Announcement/Offer';
// import AnnouncementList from '../../components/common/Announcement/AnnouncementList';
// import Partner from '../../components/common/Announcement/Partner';
import { FONTS } from '../../constants/uiConstants';

type PartnerData = {
  title: string;
  description: string;
  price: string;
  image: string;
};

const Announcement = () => {
  const [activeTab, setActiveTab] = useState<'offer' | 'announcement' | 'partner'>('offer');
  const [showModal, setShowModal] = useState(false);

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const resetForm = () => {
    setHeading('');
    setDescription('');
    setPrice('');
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newData: PartnerData = {
      title: heading,
      description,
      price,
      image: image ? URL.createObjectURL(image) : '',
    };

    if (activeTab === 'offer') {
      console.log('Offer added:', newData);
    } else if (activeTab === 'announcement') {
      console.log('Announcement added:', newData);
    } else if (activeTab === 'partner') {
      console.log('Partner added:', newData);
    }

    resetForm();
    setShowModal(false);
  };

  const renderComponent = () => {
    switch (activeTab) {
      case 'offer':
        return <Offer />;
      // case 'announcement':
      //   return <AnnouncementList />;
      // case 'partner':
      //   return <Partner />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4EC] p-6">
      <div className="flex space-x-4 mb-6" style={{...FONTS.cardSubHeader}}>
        {['offer'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'offer' | 'announcement' | 'partner')}
            className={`px-4 py-2 rounded-3xl font-semibold transition ${
              activeTab === tab
                ? 'bg-[#9b111e] text-white'
                : 'bg-white text-[#9b111e] border border-[#9b111e]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <h1 className="text-2xl !font-bold text-[#9b111e] mb-2" style={{...FONTS.cardheader}}>
        {activeTab === 'offer'
          ? 'Special Offers'
          : activeTab === 'announcement'
          ? 'Latest Announcements'
          : 'Our Partners'}
      </h1>
      <p className="!text-gray-600 mb-6" style={{...FONTS.paragraph}}>
        {activeTab === 'offer'
          ? 'Experience the Art of Automotive Renewal'
          : activeTab === 'announcement'
          ? 'Stay up to date with our latest news'
          : 'Meet our trusted collaborators'}
      </p>

      <div className="grid gap-4">{renderComponent()}</div>

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
              Add New {activeTab === 'offer' ? 'Offer' : activeTab === 'announcement' ? 'Announcement' : 'Partner'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Heading"
                className="w-full p-2 border border-[#717171] placeholder:text-[#717171] rounded"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border border-[#717171] placeholder:text-[#717171] rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Offer Price"
                className="w-full p-2 border border-[#717171] placeholder:text-[#717171] rounded"
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

export default Announcement;
