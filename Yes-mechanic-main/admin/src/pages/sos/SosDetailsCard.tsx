/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
  FaInfoCircle,
  FaStickyNote,
  FaMapMarkerAlt,
  FaUser,
  FaPhoneAlt,
} from 'react-icons/fa';
import {
  MapContainer,
  TileLayer,
  //Marker,
 // Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import sos from '../../assets/sos.jpg';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { getsos, updatesos } from '../../components/sos/services';
import { FONTS } from '../../constants/uiConstants';

interface PostedDetail {

  customerId: {
    contact_info: {
      phoneNumber: string;
    }
    email: string;
    firstName: string;
    lastName: string;
  },

  title: string;
  vehicleInfo: {
    model: string;
    registerNumber: string;
  }
  latitude: number;
  longitude: number;
  postedDate: string;
  deadline: string;
  postedBy: string;
  department: string;
  status: string;
  description: string;
  location: string;
  name: string;
  phoneNumber: string;
  contactEmail: string;
  imageUrl?: string;
  contactNumber: string;
  type: string;
}

const SosDetails: React.FC = () => {
  const { uuid } = useParams()

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "not started":
        return "bg-red-100 text-red-800";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const [postedDetails, setPostedDetails] = useState<PostedDetail>({

    customerId: {
      email: "",
      firstName: "",
      lastName: "",
      contact_info: {
        phoneNumber: ""
      }
    },
    title: "",
    vehicleInfo: {
      model: "",
      registerNumber: "",
    },
    latitude: 13.067439,
    longitude: 80.237617,
    postedDate: "",
    deadline: "",
    postedBy: "",
    department: "",
    status: "",
    description: "",
    location: "",
    name: "",
    phoneNumber: "",
    contactEmail: "",
    imageUrl: " ",
    contactNumber: "",
    type: "",
  });
 /// const [statusFilter, setStatusFilter] = useState<string>('All');

  const fetchSosRequests = async (id: any) => {
    try {

      const data: any = await getsos(id)
      console.log(data)
      setPostedDetails(data.data)
      console.log(data)
    } catch (error) {
      console.error("Error fetching SOS requests:", error);
    }
  };

  useEffect(() => {
    fetchSosRequests(uuid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (e: any, params: any) => {
    try {
      // setStatusFilter(e.target.value)
      const data = { status: e.target.value }
      const responce: any = await updatesos(data, params)
      setPostedDetails(responce.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="w-full mx-auto p-6 bg-gray-100 min-h-screen font-poppins">
      <div className="flex items-center p-4">
        <Link to="/sos" className="mr-4 text-[#9b111e] hover:text-red-800">
          <FaArrowLeft className="text-3xl" />
        </Link>
        <h1 className="text-[#9b111e] text-5xl font-bold" style={{...FONTS.cardheader}}>SOS Details</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden flex justify-center items-center">
          <img
            className="w-full h-80 object-cover rounded-xl"
            src={postedDetails.imageUrl || sos}
            onError={(e) => {
              e.currentTarget.src = sos;
            }}
            alt="User or default image"
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 h-80">
          <MapContainer
            center={[postedDetails.latitude, postedDetails.longitude]}
            zoom={12}
            scrollWheelZoom={true}
            className="w-full h-full rounded-lg"

          >
            <TileLayer
              attribution=""
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* {filteredDetails.map(detail => (
              <Marker key={detail.id} position={[detail.latitude, detail.longitude]}>
                <Popup>
                  <strong>{detail.title}</strong><br />
                  {detail.location}<br />
                  <em>{detail.status}</em>
                </Popup>
              </Marker>
            ))} */}
          </MapContainer>
        </div>

        <div className='flex flex-row w-full gap-5'>

          <div className="bg-white rounded-xl xl:pl-10 w-6/12 shadow-md p-5">
            <h2 className="text-[#9b111e] !font-bold text-2xl mb-4" style={{...FONTS.header}}>Personal Details</h2>
            <div className="flex items-center  mt-5">
              <FaUser className="text-[#9b111e] lg:text-md  xl:text-2xl mr-3" />
              <div className="xl:text-lg lg:text-md !text-gray-900 !font-semibold" style={{...FONTS.cardSubHeader}}>{postedDetails.name}</div>
            </div>
            <div className="flex items-center mt-10">
              <FaMapMarkerAlt className="text-[#9b111e] lg:text-md  xl:text-2xl mr-3" />
              <div className="text-lg lg:text-md !text-gray-900 !font-semibold" style={{...FONTS.cardSubHeader}}>{postedDetails.location}</div>
            </div>
            {/* <div className="flex items-center mt-10">
              <FaEnvelope className="text-[#9b111e] lg:text-md  xl:text-2xl mr-3" />
              <div className="text-lg lg:text-md !text-gray-900 !font-semibold" style={{...FONTS.cardSubHeader}}>{postedDetails.customerId?.email}</div>
            </div> */}
            <div className="flex items-center mt-10">
              <FaPhoneAlt className="text-[#9b111e] lg:text-md  xl:text-2xl mr-3" />
              <div className="text-lg lg:text-md !text-gray-900 !font-semibold" style={{...FONTS.cardSubHeader}}>{postedDetails.phoneNumber}</div>
            </div>
          </div>

          <div className="bg-white xl:pl-10 w-6/12 rounded-xl shadow-md p-5">
            <h2 className="text-[#9b111e] !font-bold text-2xl  mb-4" style={{...FONTS.cardheader}}>Other Details</h2>
            <div className="flex items-center mt-10">
              <FaPhoneAlt className="text-[#9b111e]  xl:text-2xl lg:text-md mr-3" />
              <div className="xl:text-lg lg:text-md !text-gray-900 !font-semibold" style={{...FONTS.cardSubHeader}}>{postedDetails.phoneNumber}</div>
            </div>
            <div className="flex items-center mt-10">
              <FaMapMarkerAlt className="text-[#9b111e]  xl:text-2xl lg:text-md  mr-3" />
              <div className="xl:text-lg lg:text-md !text-gray-900 !font-semibold" style={{...FONTS.cardSubHeader}}>{postedDetails.location}</div>
            </div>

            <div className="flex gap-4 mt-10">
              {
                postedDetails.type === "Own" && <button
                  className={`px-4 py-2 ml-5 rounded-3xl font-semibold border  bg-[#9b111e] text-white`}
                >
                  Own
                </button>
              }
              {
                postedDetails.type === "Other" && <button
                  className={`px-4 py-2 ml-5 rounded-3xl font-semibold border bg-[#9b111e] text-white`}
                >
                  Others
                </button>
              }
            </div>
          </div>



        </div>


        <div className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-[#9b111e] !font-bold text-2xl mb-4 xl:ml-5" style={{...FONTS.cardheader}}>SOS Info</h2>

          <div className='flex flex-row xl:gap-20 lg:ml-1 xl:ml-10 lg:gap-5 mt-10'>

            <div className="flex items-start mb-4">
              <FaInfoCircle className="text-[#9b111e] mt-1 text-xl sm:text-2xl" />

              <div className="ml-3 w-full">
                <div className="!font-semibold text-base sm:text-lg md:text-xl mb-2" style={{...FONTS.cardSubHeader}}>
                  Status:
                </div>

                <select
                  value={postedDetails.status}
                  onChange={(e) => updateStatus(e, uuid)}
                  className=" sm:w-52
    !text-black
    rounded-lg
    px-4 py-3
    text-base sm:text-lg
    font-semibold
    shadow-lg
    focus:outline-black
    focus:ring-4 focus:ring-black-100
    transition duration-300 ease-in-out
    cursor-pointer
  "
                  style={{ width: "150px" , ...FONTS.paragraph}}
                >
                  <option value="Not Started" className="text-black">Not Started</option>
                  <option value="In Progress" className="text-black">In Progress</option>
                  <option value="Completed" className="text-black">Completed</option>
                </select>


                <div className="flex flex-row gap-4 mt-4">
                  <div
                    style={{...FONTS.paragraph}}
                    className={`text-sm sm:text-base md:text-lg !font-semibold inline-block px-4 py-2 rounded ${getStatusStyles(
                      postedDetails.status || "Completed"
                    )}`}
                  >
                    {postedDetails.status || "Completed"}
                  </div>
                </div>
              </div>
            </div>



            <div className='flex flex-col xl:ml-25 lg:ml-18'>

              <div className="flex items-start mb-4">
                <FaStickyNote className="text-[#9b111e]  text-2xl mr-3" />
                <div>
                  <div className="!font-semibold text-lg" style={{...FONTS.cardSubHeader}}>Note</div>
                  <div className="!text-gray-600" style={{...FONTS.paragraph}}>{postedDetails.description}</div>
                </div>
              </div>

              <div className="flex items-start mt-10">
                <FaMapMarkerAlt className="text-[#9b111e]  text-2xl mr-3" />
                <div>
                  <div className="!font-semibold text-lg" style={{...FONTS.cardSubHeader}}>Location</div>
                  <div className="!text-gray-600 text-2xl" style={{...FONTS.paragraph}}>{postedDetails.location}</div>
                </div>
              </div>

            </div>

          </div>


        </div>

      </div>
    </div>
  );
};

export default SosDetails;