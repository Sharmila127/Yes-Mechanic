/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import mainLogo from "../../../assets/Admin logo.png";
import MiniLogo from "../../../assets/Admin Logo (1).png";
import { RiMenu2Line, RiMenu3Line } from "react-icons/ri";
import { FONTS } from "../../../constants/uiConstants";
import Dashboardwhite from "../../../assets/Dashboard1.svg";
import Dashboardgrey from "../../../assets/Dashboard2.svg";
import schedulewhite from "../../../assets/Schedule Queue2.svg";
import schedulegrey from "../../../assets/Schedule Queue1.svg";
import requestwhite from "../../../assets/Request Queue1.svg";
import requestgrey from "../../../assets/Request Queue2.svg";
import orderwhite from "../../../assets/Orders2.svg";
import ordergrey from "../../../assets/Orders1.svg";
import partnerwhite from "../../../assets/Partner2.svg";
import partnergrey from "../../../assets/Partner1.svg";
import jobcardwhite from "../../../assets/Job Cards2.svg";
import jobcardgray from "../../../assets/Job Cards1.svg";
import citywhite from "../../../assets/City2.svg";
import citygray from "../../../assets/City1.svg";
import vehiclewhite from "../../../assets/Vehicle2.svg";
import vehiclegray from "../../../assets/Vehicle1.svg";
import soswhite from "../../../assets/SOS2.svg";
import sosgray from "../../../assets/SOS1.svg";
import querieswhite from "../../../assets/Queries2.svg";
import queriesgray from "../../../assets/Queries1.svg";
import customerwhite from "../../../assets/Customers2.svg";
import customergray from "../../../assets/Customers1.svg";
import settingswhite from "../../../assets/Settings2.svg";
import settingsgray from "../../../assets/Settings1.svg";
import announcementwhite from "../../../assets/Announcement2.svg";
import announcementgray from "../../../assets/Announcement1.svg";
import notificationwhite from "../../../assets/Notifications2.svg";
import notificationgray from "../../../assets/Notifications1.svg";


const COLOR = {
  primary: "#9b111e",
  bgColor: "#faf3eb",
  secondary: "#E6A895",
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex h-screen ">
      <div className="bg-white border-r shadow-md p-2 transition-all duration-300 fixed top-0 left-0 h-screen z-40 flex flex-col items-center ">
        <div
          className={`flex justify-center items-center h-20 transition-all duration-300 ${
            isOpen ? "w-40" : "w-12"
          }`}
        >
         {/* <AnimatePresence mode="wait">
  <motion.div 
    key={isOpen ? "mainLogo" : "miniLogo"}
    initial={{ opacity: 0, x: isOpen ? -20 : 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: isOpen ? 20 : -20 }}
    transition={{ 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] // This is a smoother easing function
    }}
    className={isOpen ? "" : "w-[48px]"}
  >
    <img
      src={isOpen ? mainLogo : MiniLogo}
      alt="YES Mechanic Logo"
      className="object-contain w-full"
    />
  </motion.div>
</AnimatePresence> */}
          <img
            src={isOpen ? mainLogo : MiniLogo}
            alt="YES Mechanic Logo"
            className="object-contain h-[48px] transition-all duration-300"
          />
        </div>

        <div className="w-full flex justify-end px-2 mt-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-black p-2 rounded-3xl transition duration-200 hover:bg-gray-100"
            title="Toggle Sidebar"
          >
            {isOpen ? (
              <RiMenu3Line size={20} style={{ color: COLOR.primary }} />
            ) : (
              <RiMenu2Line size={20} style={{ color: COLOR.primary }} />
            )}
          </button>
        </div>

        <nav className="flex flex-col gap-4 mt-4 w-full items-center overflow-y-auto overflow-x-hidden flex-1 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 overflow-auto scrollbar-hide">
          <SidebarLink
            to="/"
            icon={[
              <img
                src={Dashboardwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={Dashboardgrey}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Dashboard"
            tooltip="dashboard"
            isOpen={isOpen}
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/bookings"
            icon={[
              <img
                src={requestwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={requestgrey}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Service Request"
            isOpen={isOpen}
            onClick={handleLinkClick}
            tooltip="service-request"
          />

          <SidebarLink
            to="/request-queue"
            icon={[
              <img
                src={schedulewhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={schedulegrey}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Schedule Queue"
            isOpen={isOpen}
            onClick={handleLinkClick}
            tooltip="schedule-queue"
          />

          <SidebarLink
            to="/order"
            icon={[
              <img
                src={orderwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={ordergrey}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Orders"
            isOpen={isOpen}
            tooltip="order"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/service"
            icon={[
              <img
                src={partnerwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={partnergrey}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Partner"
            isOpen={isOpen}
            tooltip="partner"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/job-cards"
            icon={[
              <img
                src={jobcardwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={jobcardgray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Job Cards"
            isOpen={isOpen}
            tooltip="job-cards"
            onClick={handleLinkClick}
          />

          <SidebarLink
            to="/city"
            icon={[
              <img
                src={citywhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={citygray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="City"
            isOpen={isOpen}
            tooltip="city"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/vehicle"
            icon={[
              <img
                src={vehiclewhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={vehiclegray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Vehicle"
            isOpen={isOpen}
            tooltip="vehicle"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/sos"
            icon={[
              <img
                src={soswhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={sosgray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="SOS"
            isOpen={isOpen}
            tooltip="sos"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/queries"
            icon={[
              <img
                src={querieswhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={queriesgray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Queries"
            isOpen={isOpen}
            tooltip="queries"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/customer"
            icon={[
              <img
                src={customerwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={customergray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Customers"
            isOpen={isOpen}
            tooltip="customers"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/settings"
            icon={[
              <img
                src={settingswhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={settingsgray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Settings"
            isOpen={isOpen}
            tooltip="settings"
            onClick={handleLinkClick}
          />

          <SidebarLink
            to="/announcement"
            icon={[
              <img
                src={announcementwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={announcementgray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Announcement"
            isOpen={isOpen}
            tooltip="announcement"
            onClick={handleLinkClick}
          />
          <SidebarLink
            to="/notifications"
            icon={[
              <img
                src={notificationwhite}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
              <img
                src={notificationgray}
                alt="Dashboard Icon"
                className="w-5 h-5 text-[#9b111e] "
              />,
            ]}
            label="Notifications"
            isOpen={isOpen}
            tooltip="notifications"
            onClick={handleLinkClick}
          />
        </nav>
      </div>
      <div
        className={`transition-all duration-300 ${
          isOpen ? "ml-48" : "ml-16"
        } flex-1`}
      ></div>
    </div>
  );
};

const SidebarLink = ({
  to,
  icon,
  label,
  isOpen,
  onClick,
  tooltip,
}: {
  to: string;
  icon: any;
  label: string;
  isOpen: boolean;
  tooltip: string;
  onClick: () => void;
}) => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isActive = location.pathname === to;

  const backgroundColor = isActive
    ? COLOR.primary
    : isHovered
    ? COLOR.bgColor
    : "transparent";

  const textColor = isActive ? COLOR.bgColor : "gray";

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="relative w-full flex justify-center">
      <Link
        to={to}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{ backgroundColor }}
        className={`flex items-center transition-all py-1 
          ${
            isOpen
              ? "justify-start gap-5 w-[200px] py-2.5 px-4"
              : "justify-center w-10 h-10 py-2"
          } 
          rounded-full
        `}
      >
        <div className="text-xl" style={{ color: textColor }}>
          {isActive ? icon[0] : icon[1]}
        </div>
        {isOpen && (
          <span
            style={{
              ...FONTS.cardSubHeader,
              color: textColor,
              fontWeight: 500,
            }}
          >
            {label}
          </span>
        )}
      </Link>

      {/* Tooltip on cursor position */}
      {!isOpen && isHovered && (
        <div
          className="fixed bg-gray-200 text-black text-xs rounded px-2 py-1 z-50 whitespace-nowrap shadow-md pointer-events-none"
          style={{
            top: mousePosition.y + 30,
            left: mousePosition.x - 20,
          }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

