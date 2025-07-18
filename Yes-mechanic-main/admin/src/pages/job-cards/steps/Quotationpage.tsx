import React, { useEffect, useState } from "react";
// import Logo from "../../../assets/LOGO.jpg";
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Client from "../../../api";
type QuotationItem = {
  description: string;
  qty: number;
  unitPrice: number;
};

type quotation ={
  _id:string;
  customerInfo:{
    name:string;
    adsress:string;
    contactNo:string;
    email:string;
  },
  serviceInfo:{
    amount:string;
  }
}

const QuotationPage: React.FC = () => {

  const navigate = useNavigate();

  const [quotation, setquotation] = useState<quotation>();

  const {id} = useParams()
  
  // const serviceData = quotation?.serviceInfo?.products;

// serviceData.map((item) => item 
//   console.log(serviceData,"quotation")
  useEffect(() => {
    async function fetchdata(ids:any) {
      const response:any = await new Client().admin.jobcard.get(ids)
      console.log(response.data,"get data")

      setquotation(response.data.data)
    }
    fetchdata(id)
    return () => {
      
    };
  }, []);

  const handleClick = () => {
    navigate(-1);
  };

  const quotationItems: QuotationItem[] = [
    { description: "Service Fee", qty: 1, unitPrice: 200.0 },
    { description: "Labor: 5 hours @ ₹75/hr", qty: 5, unitPrice: 75.0 },
    { description: "Parts, including sales tax", qty: 7, unitPrice: 12.95 },
    { description: "New client discount", qty: 1, unitPrice: -50.0 },
  ];

  const subtotal = quotationItems.reduce(
    (acc, item) => acc + item.qty * item.unitPrice,
    0
  );

  const handleAccept=async()=>{
    const data = {status:"completed"}
    await new Client().admin.jobcard.put(data,quotation?._id ?? '')
    toast.success("Quotation accepted!")
  }

    return (
        <><div onClick={handleClick} className="relative top-12 right-6 w-full flex justify-end ">
      <HiOutlineXMark className="opacity-25 w-8 h-8 hover:opacity-100 hover:bg-gradient-to-br hover:from-[#700808] hover:via-[#a61c1c] hover:to-[#d23c3c] hover:text-white p-1 rounded" />
    </div><div className="sm:p-8 bg-white text-black w-full mx-auto border rounded shadow">
        <div className="flex flex-col md:flex-row justify-between mb-2 gap-4">
          <div>
            <div className="flex justify-start items-center h-20">
              <img
                src={quotation?.partnerId?.image}
                alt={quotation?.partnerId?.companyName}
                className="object-contain w-32 h-30" />
            </div>
            <p>{quotation?.partnerId?.contact_info?.address1}</p>
            <p>{quotation?.partnerId?.contact_info?.city}</p>
            <p>{quotation?.partnerId?.contact_info?.phoneNumber}</p>
            <p>{quotation?.partnerId?.customerInfo?.email}</p>
          </div>
          <div className="text-right mt-9 mx-6">
            <p className="text-sm mb-1">
              <span className="font-semibold">DATE:</span> {quotation?.createdAt}
            </p>
            {/* <p className="text-sm mb-1">
              <span className="font-semibold">CUSTOMER ID:</span> 21007
            </p> */}
            <p className="text-sm">
              <span className="font-semibold">REG NO.:</span> {quotation?.partnerId?.regNo}
            </p>
          </div>
        </div>

        <div className="mb-6 border border-gray-400 p-4">
          <h3 className="font-bold mb-2">CUSTOMER INFO</h3>
          <p>{quotation?.customerInfo?.name}</p>
          <p>{quotation?.customerInfo?.address}</p>
          <p>{quotation?.partnerId?.contact_info?.city}</p>
          <p>{quotation?.partnerId?.customerInfo?.phoneNumber},{quotation?.customerInfo?.email} </p>
        </div>

        <div className="mb-6">
          <h3 className="font-bold mb-2">DESCRIPTION OF WORK</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-3 py-2 text-left">ITEMIZED COSTS</th>
                  <th className="border px-3 py-2 text-center">QTY</th>
                  <th className="border px-3 py-2 text-right">UNIT PRICE</th>
                  <th className="border px-3 py-2 text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {quotation?.serviceInfo?.products.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-2">{item?.description}</td>
                    <td className="border px-3 py-2 text-center">{item?.quantity}</td>
                    <td className="border px-3 py-2 text-right">
                      ₹{ item.rate}
                    </td>
                    <td className="border px-3 py-2 text-right">
                      ₹{(item?.quantity * item?. rate).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {quotation?.serviceInfo?.services.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-3 py-2">{item?.description}</td>
                    <td className="border px-3 py-2 text-center">{item?.quantity}</td>
                    <td className="border px-3 py-2 text-right">
                      ₹{ item.rate}
                    </td>
                    <td className="border px-3 py-2 text-right">
                      {/* ₹{(item?.quantity * item?. rate).toFixed(2)} */}{item.serviceAmount}

                    </td>
                  </tr>
                ))}
                {/* GST Row */}
                <tr>
                  <td className="border px-3 py-2">GST (9%)</td>
                  <td className="border px-3 py-2 text-center">-</td>
                  <td className="border px-3 py-2 text-right">-</td>
                  <td className="border px-3 py-2 text-right">
                    ₹{(subtotal * 0.09).toFixed(2)}
                  </td>
                </tr>
                {/* CGST Row */}
                <tr>
                  <td className="border px-3 py-2">CGST (9%)</td>
                  <td className="border px-3 py-2 text-center">-</td>
                  <td className="border px-3 py-2 text-right">-</td>
                  <td className="border px-3 py-2 text-right">
                    ₹{(subtotal * 0.09).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <div className="w-full md:w-1/2 overflow-x-auto">
            <table className="w-full text-sm border border-gray-300">
              <tbody>
                <tr>
                  <td className="border px-3 py-2 font-semibold">SUBTOTAL</td>
                  <td className="border px-3 py-2 text-right">
                    ₹{subtotal.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td className="border px-3 py-2 font-semibold">OTHER</td>
                  <td className="border px-3 py-2 text-right">-</td>
                </tr>
                <tr className="bg-gray-100 font-bold">
                  <td className="border px-3 py-2">TOTAL QUOTE</td>
                  <td className="border px-3 py-2 text-right">
                    {/* ₹{(subtotal * 1.18).toFixed(2)} */}
                    {quotation?.serviceInfo?.totalAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-md italic mb-4">
          This quotation is only for admin use.
        </p>

        <div className="mt-2 p-4 flex justify-center">
          <div className="flex gap-8 justify-end w-full md:w-2/3">
            <button
              onClick={handleAccept}
              className="flex items-center justify-center font-bold  px-14 py-2 rounded text-white transition duration-200 active:scale-105 hover:bg-[#a00000]"
              style={{
                background: "linear-gradient(44.99deg,#700808 11%,#d23c3c 102.34%)",
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div></>
  );
};


export default QuotationPage;
