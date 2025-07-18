import React from 'react'
// import { IoIosRefresh } from "react-icons/io";
// import { TfiMore } from "react-icons/tfi";
const CardHeader:React.FC = () => {
  return (
<div>
   <div className="bg-white shadow-md p-5  rounded-lg">
     <div className="flex justify-between">
        <div className="font-bold text-2xl">JOB CARDS</div>
     </div>
        <div className="flex gap-5 mt-3">
            <button className="text-white font-bold bg-blue-400 rounded-3xl p-2">Grid view</button>
            <button className="bg-grey-100 p-2 border-2 rounded-3xl p-2">Work Flow</button>
        </div>
    </div>
</div>
   )
}

export default CardHeader
