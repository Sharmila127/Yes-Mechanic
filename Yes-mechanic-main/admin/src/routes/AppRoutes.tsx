import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import { Dashboard } from "../pages/Dashboards/Dashboard";
import { NotificationPage } from "../pages/notification/NotificationPage";
import { ServiceManagementPage } from "../pages/service-center/ServiceManagementPage";
import { JobCardsPage } from "../pages/job-cards/JobCardsPage";
import { CityManagementPage } from "../pages/city/CityManagementPage";
import AutomatedNotificationsPage from "../pages/notification/AutomatedNotificationsPage";
import VehicleManagementPage from "../pages/vehicle/VehicleManagementPage";
import GeneralSettings from "../pages/Settings/GeneralSettings";
import { MainLayout } from "../Layout/MainLayout/MainLayout";
import { useAuth } from "../pages/auth/AuthContext";
import  Announcement  from "../pages/Announcement/Announcement";
import SosDetailsCard from "../pages/sos/SosDetailsCard";
import DashboardSos from "../pages/sos/DashBoardSos";
import QuotationPage from "../pages/job-cards/steps/Quotationpage";
import Queries from "../pages/Queries/Queries";
// import PartnerRegForm from "../pages/service-center/PartnerRegForm";
import Bookings from "../pages/Bookings/Bookings";
import ScheduleRequestPage from "../pages/Request-Queue/ScheduleRequestPage";
// import ScheduledRequestsPage from "../pages/Request-Queue/ScheduledRequestsPage";
import CustomerManagement from "../pages/Customer Management/CustomerManagement";
import Order from "../pages/Orders/order";
// import ServiceCenterProfileView from "../pages/service-center/ServiceCenterprofileview";
import TermsConditionsSettings from "../pages/Settings/TermsConditionsSettings";
import PrivacyPolicySettings from "../pages/Settings/PrivacyPolicySettings";
import ScheduledRequestsPage from "../pages/Request-Queue/ScheduledRequestsPage";
import OrderHistory from "../pages/Orders/orderHistory";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

	const AuthRoutes = () => (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/signup' element={<SignupPage />} />
			<Route path='*' element={<Navigate to='/login' />} />
		</Routes>
	);

  const AdminRoutes = () => (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="notifications" element={<NotificationPage />} />
        <Route
          path="automated-notifications"
          element={<AutomatedNotificationsPage />}
        />
        <Route path="service" element={<ServiceManagementPage />} />
        <Route path="job-cards" element={<JobCardsPage />} />
        <Route path="city" element={<CityManagementPage />} />
        <Route path="vehicle" element={<VehicleManagementPage />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="settings" element={<GeneralSettings />} />
        <Route path="sos" element={<DashboardSos />} />
        <Route path="sosdetails/:uuid" element={<SosDetailsCard />} />
        <Route path="quotation/:id" element={<QuotationPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/queries" element={<Queries />} />
        {/* <Route path="/partnerreg" element={<PartnerRegForm/>}/> */}
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/request-queue" element={<ScheduleRequestPage/>}/>
        <Route path="/request-queue/scheduled" element={<ScheduledRequestsPage/>}/>
        <Route path="/customer" element={<CustomerManagement/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/order/orders-history" element={<OrderHistory/>}/>
        {/* <Route path="service/profile" element={<ServiceCenterProfileView/>}/> */}
        <Route path="terms-conditions" element={<TermsConditionsSettings />} />
        <Route path="privacy-policy" element={<PrivacyPolicySettings />} />
      </Route>
    </Routes>
  );

	return isAuthenticated ? <AdminRoutes /> : <AuthRoutes />;
};

export default AppRoutes;
