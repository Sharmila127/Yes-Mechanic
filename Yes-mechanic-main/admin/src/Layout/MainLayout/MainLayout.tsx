import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/common/Navbar/Navbar.tsx';
import { Sidebar } from '../../components/common/Sidebar/Sidebar.tsx';
import { COLORS } from '../../constants/uiConstants.ts';


export const MainLayout = () => {
    return (
            <div className="flex h-screen bg-gray-100 scrollbar-hide">
                {/* Sidebar takes up 1/9 of the width */}
                <div className="w-1/9">
                    <Sidebar />
                </div>

                {/* Main content takes up the remaining 8/9 of the width */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-auto scrollbar-hide">
                        <div className="p-4 rounded shadow" style={{backgroundColor: COLORS.bgColor}}>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        );
    };
