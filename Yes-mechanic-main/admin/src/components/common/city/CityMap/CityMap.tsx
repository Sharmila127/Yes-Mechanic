import React from "react";

const CityMap: React.FC = () => {
  return (
    <div className="p-4">
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          City Management Page
        </h2>

        <div className="rounded-lg overflow-hidden border border-gray-300">
          <iframe
            title="City Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15558.968218678115!2d80.2459148!3d13.0826802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266dd1f7c1a3d%3A0x82bc0baebedf4a34!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1650000000000"
            width="100%"
            height="450"
            className="border-0 w-full"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default CityMap;