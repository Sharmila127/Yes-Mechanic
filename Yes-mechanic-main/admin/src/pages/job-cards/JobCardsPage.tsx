import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FONTS } from "../../constants/uiConstants";
import { useNavigate } from "react-router-dom";
import { HiMiniIdentification } from "react-icons/hi2";
import { FaFileInvoice } from "react-icons/fa6";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaCar } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { IoMdStats } from "react-icons/io";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { PiListNumbersFill } from "react-icons/pi";
import Client from "../../api";
type Invoice = {
  uuid: string;
  customerInfo:{
    name: string;
  }
  invoiceDate: string;
  vehicleInfo:{
    model: string;
    registrationNo:string;
  };
  plate: string;
  total: string;
  amount: string;
  balanceDue: string;
  profile: string;
  status: string;
  createdAt:string;
  serviceInfo:{
    totalAmount:string;
  }
};

export const JobCardsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [invoices, setinvoices] = useState<Invoice[]>([]);

  useEffect(() => { 

    async function fetchdata() {
      const responce:any = await new Client().admin.jobcard.getAll()
      console.log(responce.data.data)
      setinvoices(responce.data.data)
    }
    
    fetchdata()
    return () => {
      
    };
  }, []);

  const filteredInvoices = invoices.filter((invoice) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      invoice.customerInfo.name.toLowerCase().includes(query) ||
      invoice.vehicleInfo.model.toLowerCase().includes(query) ||
      invoice.uuid.toLowerCase().includes(query)
    );
  });

	return (
		<div className="min-h-screen p-1 md:block bg-white  rounded-lg shadow-lg p-8">
			<div className='rounded-lg'>
				<div className='border-b-2 border-[#9b111e] pb-2 mb-4'>
					<h1
						style={{ ...FONTS.header, fontWeight: 500 }}
						className='!font-bold text-[#9b111e] '
            
					>
						JOB CARDS
					</h1>
				</div>

 <div className="flex flex-row items-center justify-between mt-10 w-full gap-2">
  <div className="relative flex-1">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
      <CiSearch size={20} />
    </span>
    <input
      type="search"
      placeholder="Search by name, vehicle or ID"
      className="pl-10 pr-4 py-2 w-full border rounded-full shadow focus:ring-2 focus:ring-[#9b111e] focus:outline-none focus:border-transparent"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{ ...FONTS.description }}
    />
  </div>
<div>
  <button
    className="bg-[#a00000] !text-white  px-4 py-2 rounded-3xl   active:scale-110 transition whitespace-nowrap"
    style={{ ...FONTS.cardSubHeader }}
  >
    History
  </button>
  </div>
</div>


          
        <div className="overflow-x-auto ">
          <table className="min-w-full border-collapse rounded-lg overflow-hidden mt-8 "
          
          >
            <thead className="bg-[#e9e9e9]">
              <tr>
                <th className="px-4 py-3 text-left text-sm text-[#717171]  border-b" style= {{...FONTS.tableHeader}}>
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm text-[#717171]  border-b" style= {{...FONTS.tableHeader}} >
                
                  <div className="flex items-center gap-2"  >
                    <HiMiniIdentification size={20}/>
                    Id
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#717171] border-b" style={{...FONTS.tableHeader}}>
                 <div className="flex items-center gap-2">
                  <FaFileInvoice size={20}/>
                  Invoice date</div> 
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#717171] border-b" style={{...FONTS.tableHeader}}>
                  <div className="flex items-center gap-2">
                    <MdOutlineDriveFileRenameOutline size={20}/>
                    Name</div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#717171] border-b lg:table-cell hidden"
               style= {{...FONTS.tableHeader}}
                >
                  <div className="flex items-center gap-2">
                    <FaCar size={20}/>
                    Vehicle</div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#717171] border-b"
                style= {{...FONTS.tableHeader}}
                >
                  <div className="flex items-center gap-2">
                    <PiListNumbersFill size={20}/>
                    Plate</div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#717171] border-b lg:table-cell hidden"
                style= {{...FONTS.tableHeader}}>
                  <div className="flex items-center gap-2">
                    <RiMoneyRupeeCircleLine size={20} />
                    Total</div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#717171] border-b"style= {{...FONTS.tableHeader}}>
                  <div className="flex items-center gap-2">
                    <IoMdStats size={20}/>
                    Job status</div> 
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-[#717171] border-b"style= {{...FONTS.tableHeader}}>
                  <div className="flex items-center gap-2">
                    <GrView size={20}/>
                    View</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice, index) => (
                  
                  <tr
                    key={invoice.uuid}
                    className={`text-sm !text-gray-700 hover:bg-[#edeae9] transition font-semibold ${
                      index % 2 == 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    style={{...FONTS.paragraph}}
                  >
                     <td className="px-4 py-3 border-b">{index + 1}</td>
                    <td className="px-4 py-3 border-b">{invoice.uuid}</td>
                    <td className="px-4 py-3 border-b">
                      {invoice.createdAt.split('T')[0]}
                    </td>
                    <td className="px-4 py-3 border-b">{invoice.customerInfo.name}</td>
                    <td className="px-4 py-3 border-b hidden lg:table-cell">
                      {invoice.vehicleInfo.model}
                    </td>
                    <td className="px-4 py-3 border-b">{invoice.vehicleInfo.registrationNo}</td>
                    <td className="px-4 py-3 border-b hidden lg:table-cell">
                      {invoice.serviceInfo.totalAmount}
                    </td>
                    <td className="px-4 py-3 border-b">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          invoice.status.toLowerCase() === "completed"
                            ? "bg-green-100 text-green-700"
                            : invoice.status.toLowerCase() === "not started"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"
                        }`}
                     style={{...FONTS.subParagraph}} >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b font-semibold">
                     <button
  onClick={() => navigate(`/quotation/${invoice.uuid}`)}
  className="bg-[#a00000] !text-white px-3 py-1 active:scale-110 rounded-3xl hover:bg-[#800000] transition"
  style={{ ...FONTS.cardSubHeader }}
>
  View
</button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-6">
                    No matching found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
