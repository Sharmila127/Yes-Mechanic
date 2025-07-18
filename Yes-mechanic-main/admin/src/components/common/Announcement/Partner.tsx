/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { FONTS } from '../../../constants/uiConstants';
import { getAnnouncement, postAnnouncement } from '../../../pages/Announcement/services';


const Partner = () => {
  const [partners, setPartners] = useState<any>([]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleShare = () => {
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2500);
  };

  useEffect(() => {
    (async function() {
      const data:any = await getAnnouncement('')
      const datas = data.data.data
      const filters = datas.filter((item: any) => item.category == 'services')
      setPartners(filters)
    })()
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPartner = {
      title: heading,
      price,
      image: image ? URL.createObjectURL(image) : '',
    };

    const data = {
      title: heading,
      category: "services",
      description,
      offer: price,
      image: image ? URL.createObjectURL(image) : ''
    }

    await postAnnouncement(data)
    setPartners((prev:any) => [...prev, newPartner]);
    resetForm();
    setShowFormModal(false);
  };

  const resetForm = () => {
    setHeading('');
    setDescription('');
    setPrice('');
    setImage(null);
  };

  return (
    <div className="relative mt-4">
      {/* Add New Partner Button */}
      <button
    className="flex items-center gap-2 bg-[#9b111e] font-bold px-2 py-2 ml-12 rounded-lg text-white transition duration-200 active:scale-105 hover:bg-[#a00000]"
     onClick={() => setShowFormModal(true)} 
  >
    + Add Partner
  </button>
      
      <div className='grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 mt-6'>
      {partners.map((item:any, index:number) => (
        <div
          key={index}
          className="flex flex-col hover:shadow-xl transform hover:scale-[1.02] p-2 transition-all duration-300 bg-white shadow-md rounded-lg mb-4 mx-6"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-semibold !text-gray-900" style={{...FONTS.cardSubHeader}}>{item.title}</h3>
              <p className="text-[#9b111e] !font-bold mt-2" style={{...FONTS.cardSubHeader}}>{item.offer}</p>
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={handleShare}
                className="text-sm px-3 py-1 bg-[#9b111e] text-white rounded-3xl hover:bg-red-700 transition"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Share Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-md text-center w-[280px]">
            <CheckCircle className="text-green-600 w-10 h-10 mx-auto mb-2 animate-bounce" />
            <h3 className="text-lg font-semibold">Shared Successfully with partner</h3>
          </div>
        </div>
      )}
      </div>

      {/* Add Partner Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl font-bold hover:text-black rounded-3xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#9b111e]"> Add New Partner</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Partner Name"
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
                placeholder="Offer or Perk"
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
                    setShowFormModal(false);
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

export default Partner;
