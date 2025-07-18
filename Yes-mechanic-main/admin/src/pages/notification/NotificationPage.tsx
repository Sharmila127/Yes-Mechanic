// import React from 'react'

//import AutomatedNotifications from '../../components/common/Notification/AutomatedNotifications.tsx'
//import NotificationsLogs from '../../components/common/Notification/NotificationsLogs.tsx'
import CustomNotifications from '../../components/common/Notification/CustomNotifications.tsx' 
// import SosDashboard from '../sos/SosDashboard.tsx'
// import SosDetails from '../sos/SosDetailsCard.tsx'


import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FONTS } from '../../constants/uiConstants.ts';

export const NotificationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4">
      <div className='flex flex-row item-center gap-5'>
        <button
        onClick={() => navigate('/')}
        className="flex items-center text-[#9b111e] mb-4 hover:underline rounded-3xl"
      >
        <FaArrowLeft className="mt-2 text-xl" />
      </button>
      
      <h1 className="font-bold lg:text-2xl sm:text-sm text-[#9b111e]" 
      style={{...FONTS.header}}
      >Notification</h1>
      </div>
      
      <CustomNotifications />
    </div>
  );
};

