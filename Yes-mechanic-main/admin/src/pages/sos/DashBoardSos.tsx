/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MdToggleOn, MdToggleOff, MdClose } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { carIcons } from "../../components/sos/sosicons";
import {
  deletesos,
  getallSos,
  getServiceList,
  statusupdatesos,
  updatelistedsos,
} from "../../components/sos/services";
import { MdDelete } from "react-icons/md";
import { FONTS } from "../../constants/uiConstants";

type SOSRequest = {
  _id: string;
  vehicleNumber: string;
  location: string;
  name: string;
  phoneNumber: string;
  status: string;
  view: string;
};

type Service = {
  _id: string;
  title: string;
  active: boolean;
  icon?: React.ReactNode;
};

const DashboardSos = () => {
  const navigate = useNavigate();

  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [services, setServices] = useState<Service[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newServiceName, setNewServiceName] = useState("");
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(
    null
  );
  const [activeRequest, setactiverequest] = useState<SOSRequest[]>([]);

  const fetchSosRequests = async () => {
    try {
      const data: any = await getallSos();
      setactiverequest(data.data.data);
    } catch (error) {
      console.error("Error fetching SOS requests:", error);
    }
  };

  const fetchSoslist = async () => {
    try {
      const datas: any = await getServiceList();
      setServices(datas.data.data);
    } catch (error) {
      console.error("Error fetching SOS requests:", error);
    }
  };

  useEffect(() => {
    fetchSosRequests();
    fetchSoslist();
  }, []);

  const filteredRequests = activeRequest.filter((req) => {
    const status = req.status.toLowerCase();
    if (filterStatus === "All") return true;
    if (filterStatus === "In Progress") return status.includes("progress");
    if (filterStatus === "Completed") return status === "completed";
    if (filterStatus === "Not Started") return status === "not started";
    return true;
  });
  const handleViewClick = (uuid: string) => {
    navigate(`/sosdetails/${uuid}`);
  };

  const handleAddService = async (e: any) => {
    e.preventDefault();
    if (!newServiceName || selectedIconIndex === null) return;

    const selectedIcon = carIcons[selectedIconIndex];
    const existingService = services.find(
      (s) => s.title.toLowerCase() === newServiceName.toLowerCase()
    );

    try {
      if (existingService) {
        // Update the existing service's status to active

        setServices((prev) =>
          prev.map((s) =>
            s._id === existingService._id ? { ...s, active: true } : s
          )
        );

        // await updatelistedsos({ active: true },existingService._id)
        await statusupdatesos({ active: true }, existingService._id);

        console.log("Service updated:", existingService.title);
      } else {
        const newService = {
          title: newServiceName,
          icon: selectedIcon.name,
          active: true,
        };

        const response = await updatelistedsos(newService, "");
        const newId = response.data;

        setServices((prev) => [...prev, newId]);
        console.log("Service added:", newService.title);
      }

      setNewServiceName("");
      setSelectedIconIndex(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding or updating service:", error);
    }
  };

  const handleToggleService = async (service: any) => {
    const updatedActive = !service.active;
    try {
      await statusupdatesos({ active: updatedActive }, service._id);

      setServices((prevServices) =>
        prevServices.map((s) =>
          s._id === service._id ? { ...s, active: updatedActive } : s
        )
      );
    } catch (error) {
      console.error("Failed to update service status:", error);
    }
  };

  const handleDeleteService = async (index: number, id: string) => {
    try {
      await deletesos(id);
      const updated = [...services];
      updated.splice(index, 1);
      setServices(updated);
    } catch (error) {
      console.log("sos delete", error);
    }
  };

  return (
    <div>
      <div className="border-b-2 pl-4 border-orange-700 pb-6 mb-4">
        <h1
          className="!text-3xl top-0 text-[#9b111e] !font-bold"
          style={{ ...FONTS.header }}
        >
          Active SOS Requests
        </h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 p-3 lg:p-4 text-gray-800 h-screen">
        {/* SOS Requests */}
        <div className="rounded-lg p-3 lg:w-2/3 bg-white border border-gray-200 flex flex-col shadow-sm h-[calc(100vh-2rem)] lg:h-[calc(90vh-2rem)]">
          {/* <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <MdClose
            onClick={() => navigate("/")}
            className="text-2xl text-red-600 cursor-pointer hover:text-red-800 transition-colors"
            title="Close and return to Dashboard"
          />
        </div> */}

          <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
            {["All", "Not Started", "In Progress", "Completed"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-1.5 rounded-3xl text-sm font-medium  
        ${
          filterStatus === status
            ? "bg-[#9b111e] !text-white"
            : "bg-white text-[#9b111e] border border-[#9b111e]"
        }`}
                  style={{ ...FONTS.cardheader }}
                >
                  {status}
                </button>
              )
            )}
          </div>

          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-100">
            <table className="min-w-full text-left text-sm border-collapse border border-gray-200">
              <thead
                className="sticky top-0 bg-gray-50 z-10 !text-gray-700"
                style={{ ...FONTS.tableHeader }}
              >
                <tr>
                  <th className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Vehicle Number
                  </th>
                  <th className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Phone Number
                  </th>
                  <th className="border border-gray-300 px-3 py-2 font-semibold text-gray-700">
                    Work Status
                  </th>
                  <th className="border border-gray-300 px-3 py-2 font-semibold text-gray-700 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {activeRequest.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center text-gray-500 py-8 font-medium"
                    >
                      No requests found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border border-gray-300 px-3 py-2 text-gray-800">
                        {req.vehicleNumber}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-800">
                        {req.location}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-800">
                        {req.name}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-gray-800">
                        {req.phoneNumber}
                      </td>
                      <td
                        className={`border border-gray-300 px-3 py-2 font-medium ${
                          {
                            Completed: "text-orange-600",
                            "In Progress": "text-green-600",
                            "Not Started": "text-gray-700",
                          }[req.status] || "text-gray-700"
                        }`}
                      >
                        {req.status}
                      </td>
                      <td className="border border-gray-300 px-3 py-2 text-center">
                        <button
                          onClick={() => handleViewClick(req._id)}
                          className="bg-[#9b111e] hover:from-red-700 hover:to-red-900 transition-all text-white px-3 py-1 rounded-3xl text-sm font-medium"
                          title={`View details for ${req._id}`}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SOS Services */}
        <div className="rounded-lg p-3 lg:w-1/3 bg-white border border-gray-200 flex flex-col shadow-sm h-[calc(100vh-2rem)] lg:h-[calc(90vh-2rem)]">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2
              className="text-xl lg:text-2xl font-semibold !text-gray-900"
              style={{ ...FONTS.cardheader }}
            >
              SOS Services
            </h2>
            <FiPlus
              onClick={() => setShowForm(true)}
              className="text-2xl text-red-600 cursor-pointer hover:text-red-800 transition-colors"
              title="Add Service"
            />
          </div>

          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-100">
            <ul className="flex flex-col gap-3">
              {services.length > 0 &&
                services.map((service, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between border border-gray-200 rounded-md p-2.5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2.5 flex-1 min-w-0">
                      <div className="w-5 h-5 flex justify-center items-center text-lg flex-shrink-0">
                        {
                          carIcons.find((item) => item.name === service.icon)
                            ?.icon
                        }
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm text-gray-900 truncate">
                          {service.title}
                        </div>
                        <div
                          className={`text-xs font-medium ${
                            service.active ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {service.active ? "Active" : "Inactive"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        aria-label={`Toggle ${service.title} ${
                          service.active ? "off" : "on"
                        }`}
                        onClick={() => handleToggleService(service)}
                        className="focus:outline-none p-1 rounded-3xl"
                        title={service.active ? "Enabled" : "Disabled"}
                      >
                        {service.active ? (
                          <MdToggleOn className="text-[#800000] text-3xl" />
                        ) : (
                          <MdToggleOff className="text-gray-400 text-3xl" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteService(index, service._id)}
                        className="focus:outline-none p-1"
                        title="Delete Service"
                      >
                        <MdDelete
                          size={20}
                          className="text-[#9b111e] hover:text-red-800 transition-colors rounded-3xl"
                        />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Slide-in Form */}
        <div
          className={`fixed top-0 right-0 h-full max-w-sm w-11/12 sm:w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
            showForm ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3
              className="text-lg font-semibold text-gray-900"
              style={{ ...FONTS.cardheader }}
            >
              Add New Service
            </h3>
            <MdClose
              className="text-xl cursor-pointer text-red-600 hover:text-red-800 transition-colors"
              onClick={() => setShowForm(false)}
              title="Close form"
            />
          </div>
          <form
            onSubmit={handleAddService}
            className="p-4 flex flex-col gap-4"
            autoComplete="off"
          >
            <input
              type="text"
              placeholder="Service Name"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              className="bg-white text-gray-900 placeholder:text-[#717171] rounded border border-[#717171] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all w-full"
              required
              aria-label="Service Name"
            />

            <div className="grid grid-cols-6 gap-2 bg-gray-50 p-2.5 rounded overflow-auto">
              {carIcons.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedIconIndex(idx)}
                  className={`p-1.5 border rounded-3xl text-lg flex justify-center items-center transition-colors ${
                    selectedIconIndex === idx
                      ? "bg-red-100 border-red-500"
                      : "border-gray-300 hover:bg-red-50"
                  }`}
                  aria-pressed={selectedIconIndex === idx}
                  title={`Select icon for ${item.name}`}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="bg-[#9b111e] hover:from-red-700 hover:to-red-900 text-white py-2.5 rounded-3xl transition-all font-medium text-sm"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardSos;
