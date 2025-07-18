import React from "react";
import dummpypic from "../../../../assets/Dashboard/images.jpg";
import { FONTS } from "../../../../constants/uiConstants";

type Props = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  profilePicUrl: string;
  time?: string;
  onClick?: () => void;
  backgroundColor?: string; 
};

// const getIndiaDateTime = () => {
//   return new Intl.DateTimeFormat("en-IN", {
//     timeZone: "Asia/Kolkata",
//     year: "numeric",
//     month: "short",
//     day: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   }).format(new Date());
// };
// const postDate = "2025-06-03T05:56:39.184Z";
// const formatted = new Date(postDate).toLocaleString("en-IN", {
//   day: "2-digit",
//   month: "2-digit",
//   year: "numeric",
//   hour: "2-digit",
//   minute: "2-digit",
//   hour12: true,
// });

export const QueryCard: React.FC<Props> = ({
  title,
  icon,
  desc,
  profilePicUrl,
  time,
  onClick,
  backgroundColor,
}) => {
  return (
   <div className="hover:scale-[1.02] transition-transform duration-200 ease-in-out cursor-pointer">
    <div className="w-full cursor-pointer" onClick={onClick}>
      <div className={`flex items-center rounded-xl shadow-md p-4 justify-between mt-2 ${
        backgroundColor || 'bg-transparent'
      }`}>
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
          <img
            src={profilePicUrl || dummpypic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-start">
          <p className=" !text-gray-700" style={{...FONTS.cardheader}}>{title}</p>
          <p className=" line-clamp-1" style={{...FONTS.paragraph}}>{desc}</p>
          <p className="text-xs !text-gray-500 mt-1" style={{...FONTS.subParagraph}}>
            {time}
          </p>
        </div>
        <div className="w-10 h-10 flex items-center justify-center text-xl text-green-600">
          {icon}
        </div>
        
      </div>
      
    </div>
    
    </div>
  );
};