import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    BarChart3,
    ChevronLeft,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
    
    const [studentsOpen, setStudentsOpen] = useState(false);
    const [analyticsOpen, setAnalyticsOpen] = useState(false);

    // 2. Simple, reusable class strings for styling
    const mainLinkStyle = "flex items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-all";
    const subLinkStyle = "flex items-center pl-12 pr-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50/50 transition-all";

    return (
        <aside
            className={`flex h-screen flex-col justify-between border-r border-zinc-200 bg-white transition-all duration-300 ease-in-out overflow-hidden  ${
                isCollapsed ? 'w-0 p-0 border-r-0' : 'w-64 p-4'
            }`}
        >
            {/* Top Section */}
            <div className="space-y-6">
                {/* Logo */}
                <div className="flex items-center gap-3 px-2 h-8">
                    <div className="h-6 w-6 rounded-xl bg-zinc-900 " />
                    <span className="font-bold text-zinc-900 text-base">Platform</span>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                    
                    {/* LINK 1: DASHBOARD (Standard Single Link) */}
                    <NavLink to="/" className={mainLinkStyle}>
                        <LayoutDashboard className="h-5 w-5 " />
                        <span>Dashboard</span>
                    </NavLink>

                    {/* LINK 2: STUDENTS DROPDOWN */}
                    <div>
                        {/* Parent Button */}
                        <button 
                            onClick={() => setStudentsOpen(!studentsOpen)} 
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 w-full"
                        >
                            <div className="flex items-center gap-4">
                                <Users className="h-5 w-5 " />
                                <span>Students</span>
                            </div>
                            {studentsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>

                        {/* Sub-Items Panel (Only shows if studentsOpen is true) */}
                        {studentsOpen && (
                            <div className="space-y-1 mt-1">
                                <NavLink onClick={() => setIsCollapsed(true)} to="/students" className={subLinkStyle}>All Students</NavLink>
                                {/* <NavLink to="/students/admission" className={subLinkStyle}>Admission</NavLink>
                                <NavLink to="/students/attendance" className={subLinkStyle}>Attendance</NavLink> */}
                            </div>
                        )}
                    </div>

                    {/* LINK 3: ANALYTICS DROPDOWN */}
                    <div>
                        {/* Parent Button */}
                        <button 
                            onClick={() => setAnalyticsOpen(!analyticsOpen)} 
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-50 w-full"
                        >
                            <div className="flex items-center gap-4">
                                <BarChart3 className="h-5 w-5 " />
                                <span>Analytics</span>
                            </div>
                            {analyticsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>

                        {/* Sub-Items Panel (Only shows if analyticsOpen is true) */}
                        {analyticsOpen && (
                            <div className="space-y-1 mt-1">
                                <NavLink onClick={() => setIsCollapsed(true)} to="/analytics" className={subLinkStyle}>Overview</NavLink>
                            </div>
                        )}
                    </div>

                </nav>
            </div>

            {/* Bottom Section:  Collapse Button */}
            <div className="border-t border-zinc-100 pt-2">
                <button
                    onClick={() => setIsCollapsed(true)}
                    className="flex w-full items-center gap-4 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 transition-all"
                >
                    <ChevronLeft className="h-5 w-5 " />
                    <span>Collapse menu</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;