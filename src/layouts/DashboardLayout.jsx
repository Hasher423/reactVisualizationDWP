import React, { useState } from 'react';
import Sidebar from '../Components/SideBar.jsx'; 
import NavBar from '../Components/NavBar';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
    const [searchMonth, setSearchMonth] = useState('');

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-zinc-50">
            
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            <div className="relative flex flex-col flex-1 min-w-0 h-full overflow-hidden">
                
                {isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(false)}
                        className="absolute left-0 top-0 z-50 flex h-16 w-16 items-center justify-center border border-zinc-200 bg-white shadow-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-all duration-200"
                    >
                        <Menu className="h-4 w-4" />
                    </button>
                )}

                <div className={isCollapsed ? 'pl-12 transition-all duration-200' : 'transition-all duration-200'}>
                    
                    <NavBar searchMonth={searchMonth} setSearchMonth={setSearchMonth} />
                </div>
                
                <main className="flex-1 overflow-y-auto p-6">

                    <Outlet context={{ searchMonth, isCollapsed }} />
                </main>
                
            </div>
        </div>
    );
};

export default DashboardLayout;