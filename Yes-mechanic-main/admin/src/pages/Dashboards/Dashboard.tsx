/* eslint-disable @typescript-eslint/no-explicit-any */
import { FONTS } from "../../constants/uiConstants"; //FONT
import { COLORS } from "../../constants/uiConstants"; //COLOUR
//this is for ICONS
import { AiOutlineCheckCircle } from 'react-icons/ai';
// import { GoDotFill } from "react-icons/go";
import { IoIosArrowRoundUp } from 'react-icons/io';
import { IoIosArrowRoundDown } from 'react-icons/io';
// import { RiUser6Line } from "react-icons/ri";
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
// import { AiOutlineLeft } from "react-icons/ai";
// import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdEmergencyShare } from "react-icons/md";
import { BiSolidCarCrash } from "react-icons/bi";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { Link } from "react-router-dom";



//this is FILE
import CustomerAnalyticsChart from '../../components/common/dashboard/NotificationList/NotificationList';
import BarCharts from '../../components/common/dashboard/BarChart/BarChart';
import { TransactionCard } from '../../components/common/dashboard/TransactionsCard/TransactionsCard';
import { DashboardCard } from '../../components/common/dashboard/DashboardCard/DashboardCard';
import { QueryCard } from '../../components/common/dashboard/QueryCard/QueryCard';
import dummpypic from '../../assets/Dashboard/images.jpg';
// import StatCard from "../../components/common/dashboard/StatCard/StatCard";
import { SoSCard } from '../../components/common/dashboard/SoSCard/SoSCard';
import TotalRevenue from '../../components/common/dashboard/TotalRevenue/TotalRevenue';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Client from "../../api";
// import { getDashboardData } from '../../features/Dashboard/services';

const queries = [
	{
		title: 'Break not fixed',
		desc: "I gave my bike to the shop some days ago but they didn't repair it in time and didn't fix it.",
		profilePicUrl: dummpypic,
	},
	{
		title: 'Glass work bending',
		desc: "I gave my car to the shop some days ago but they didn't repair it in time and didn't fix it.",
		profilePicUrl:
			'https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
	},
	{
		title: 'Tyre puncture',
		desc: "I gave my bike to the shop some days ago but they didn't repair it in time and didn't fix it.",
		profilePicUrl:
			'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D',
	},
	{
		title: 'Late pickup service',
		desc: 'Scheduled pickup was delayed by 2 hours without any update or notice.',
		profilePicUrl:
			'https://t3.ftcdn.net/jpg/08/86/78/68/360_F_886786813_XhL8zD8rhZCW7F5HvJdOPvquFh3n23vd.jpg',
	},
	{
		title: 'Billing mismatch',
		desc: 'Was charged extra without prior intimation or explanation on final invoice.',
		profilePicUrl:
			'https://www.shutterstock.com/image-photo/happy-middle-aged-45-years-260nw-2516789519.jpg',
	},
];

// code Dashboard started

export const Dashboard = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<any[]>([]);
  const [active, setactive] = useState<any[]>([])

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const params = '';
        const response: any = await new Client().admin.profile.get(params);
        const data: any = await new Client().admin.dashboard.get(params)
        setactive(data.data.data)
        setAdminData(response.data);
        localStorage.setItem('adminuuid', response.data.data.uuid)
        localStorage.setItem('adminobjectid', response.data.data._id)
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  console.log(adminData)



  return (
    <div className="w-full px-3 py-6 -mt-6 ">
      <p
          className="text-[20px] !font-bold pl-2 pt-3 "
          style={{ ...FONTS.header }}

        >
          Dashboard
        </p>
      {/* Header */}
      <div className="rounded-xl shadow-md bg-white pb-4  my-5 ">
        {/* <p
          className="text-xl font-semibold pl-6 pt-3 "
          style={{ ...FONTS.header }}
        >
          Center at a Glance
        </p> */}
        {/* <p
          className="text-gray-500 text-sm pb-5 pl-7"
          style={{ ...FONTS.paragraph, color: COLORS.secondary }}
        >
          Get your Service Center latest update for the last 7 days
        </p> */}

        {/* Dashboard Cards */}
        <div className="mx-2 justify-center items-center px-5 my-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 px-15  ">

            <DashboardCard
              icon={<BiSolidCarCrash />}
              title="Emergency Service"
              value={10}
              per={5}
              perColor="#f87171"
              borderColor="rgba(248,113,113,0.8)"
              backgroundColor="#f87171"
              dataPoints={[2, 1, 4, 3, 5, 2, 1]}
            />

            <DashboardCard
              icon={<MdEmergencyShare />}
              title="Service Requests"
              value={2}
              per={5}
              perColor="#3b82f6"
              borderColor="rgba(59,130,246,0.8)"
              backgroundColor="#3b82f6"
              dataPoints={[1, 2, 1, 6, 4, 3, 6]}
            />

            <DashboardCard
              icon={<RiCalendarScheduleFill />}
              title="Schedule Request"
              value={20}
              per={10}
              
              perColor="#facc15"
              borderColor="rgba(234,179,8,0.8)"
              backgroundColor="#facc15"
              dataPoints={[1, 3, 2, 5, 4, 6, 5]}
              // onClick={() => navigate("/request-queue/schedule")}
            />

						<DashboardCard
							icon={<GrTransaction />}
							title='Total Transactions'
							value={22}
							per={15}
							perColor='#10b981'
							borderColor='rgba(16,185,129,0.8)'
							backgroundColor='#10b981'
							dataPoints={[1, 5, 2, 4, 3, 5, 6]}
						/>

						<DashboardCard
							icon={<MdOutlinePendingActions />}
							title='Pending'
							value={20}
							per={10}
							perColor='#D77FA1'
							borderColor='rgba(215,127,161,0.8)'
							backgroundColor='#D77FA1'
							dataPoints={[1, 3, 2, 5, 4, 6, 5]}
						/>
					</div>
				</div>
			</div>

			{/* Notifications, Bar Chart, SOS */}
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4 '>
				{/* Notifications */}
				<div className='bg-white shadow-md rounded-xl p-4 max-h-96 hover:scale-[1.02] '>
					<div className=''>
						<CustomerAnalyticsChart />
					</div>
				</div>

        {/* Bar Chart */}
        <div className=" grid grid-row-2 ">
          <div className="bg-white shadow-md rounded-xl p-4 max-h-44 mb-2 hover:scale-[1.02]">
            <BarCharts />
          </div>
          <div className="bg-white shadow-md rounded-xl p-4 max-h-45 hover:scale-[1.02] ">
            <TotalRevenue />
          </div>
        </div>

        {/* SOS Content */}
        <div className="bg-white shadow-md rounded-3xl p-4 max-h-96 hover:scale-[1.02] ">
          <div className="flex justify-between mb-2 ">
            <p
              className="text-lg "
              style={{ ...FONTS.cardheader }}
            >
              SoS Summary
            </p>
            <button className="!text-red-800 text-md item-end hover:!text-red-900"
            style={{...FONTS.paragraph}}
            >
              View All
            </button>{" "}
          </div>
          <div className="">
            <SoSCard datas={active} />
          </div>
        </div>
      </div>

      {/* Transactions & Query */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 ">
        {/* Transactions */}
        <div className="bg-white shadow-md rounded-3xl p-4 max-h-96 overflow-hidden hover:scale-[1.02]">
          <div className="flex justify-between mb-2 ">
            <p className=" mb-2  " style={{ ...FONTS.cardheader }}>
              Recent Transactions
            </p>
            <button className="text-red-700 text-md item-end hover:text-red-900">
              View All
            </button>
          </div>
          <div className="overflow-y-auto  max-h-80 scrollbar-hide">
            {[...Array(14)].map((_, index) => (
              <TransactionCard
                key={index}
                icon1={<AiOutlineCheckCircle />}
                icon2={
                  index % 2 === 0 ? (
                    <IoIosArrowRoundUp />
                  ) : (
                    <IoIosArrowRoundDown />
                  )
                }
                title={index % 2 === 0 ? "Master Card" : "Withdrawal"}
                value={1234}
                color={index % 2 === 0 ? "text-green-600" : "text-red-600"}
              />
            ))}
          </div>
        </div>


        {/* Query Section */}
        <div className="bg-white shadow-md rounded-3xl p-4 max-h-96 overflow-hidden hover:scale-[1.02]">
          <div className="flex justify-between mb-2">
            <p className="text-lg" style={{ ...FONTS.cardheader }}>
              Enquiry
            </p>
            <button
              onClick={() => navigate("/queries")}
              className="text-red-700 hover:text-red-900 text-md"
            >
              View All
            </button>
          </div>
          <div className="pr-2 space-y-2">
            {queries.slice(0, 3).map((q, idx) => (
              <QueryCard
                key={idx}
                icon={null}
                title={q.title}
                desc={q.desc}
                profilePicUrl={q.profilePicUrl}
              />
            ))}
            
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md rounded-xl p-4 w-full text-center mt-4 -mb-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-1">
            <AiOutlineCopyrightCircle style={{ color: COLORS.primary }} />
            <span style={{ color: COLORS.primary }}>YESMECHANIC</span>
          </div>
          <div>
            <Link to={'/privacy-policy'} className="text-gray-600 hover:text-gray-800 mx-2 text-sm italic">
              Privacy Policy
            </Link>
            <Link to={'/terms-conditions'} className="text-gray-600 hover:text-gray-800 mx-2 text-sm italic">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
