import { ToastContainer } from 'react-toastify';
//import reactLogo from './assets/YESMECHANIC.jpg'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.tsx';
import { AuthProvider } from './pages/auth/AuthContext.tsx';
import 'react-toastify/dist/ReactToastify.css';
// import { AdminSocketProvider } from './context/adminSocket.tsx';
//import dotenv from 'dotenv'
// dotenv.config()

function App() {
	// console.log(process.env.REACT_APP_PUBLIC_API_URL)
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					 {/* <AdminSocketProvider> */}
					<AppRoutes />
					<ToastContainer
						position='top-right'
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme='colored'
					/>
                 {/* </AdminSocketProvider> */}
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
