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
            className={`flex h-screen flex-col justify-between border-r-2 border-zinc-950 bg-zinc-950 text-zinc-100 font-mono tracking-tight transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-0 p-0 border-r-0' : 'w-64 p-4'
                }`}
        >
            <div className="space-y-6">
                {/* Logo Block */}
                <div className="flex items-center gap-3 px-2 h-10 border-b border-zinc-800 pb-2">
                    <div className="h-5 w-5 bg-emerald-400 border border-white" />
                    <span className="font-black text-white text-sm uppercase tracking-wider">Platform</span>
                </div>

                <nav className="space-y-2">

                    <NavLink
                        to="/"
                        className="flex items-center gap-4 px-3 py-1.5 border border-transparent text-xs uppercase tracking-wider font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all"
                        activeClassName="!text-zinc-950 !bg-white border-zinc-950 font-black"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        <span>Dashboard</span>
                    </NavLink>

                    <div className="border border-zinc-900 bg-zinc-900/40">
                        {/* Parent Button */}
                        <button
                            onClick={() => setStudentsOpen(!studentsOpen)}
                            className={`flex items-center justify-between px-3 py-1.5 text-xs uppercase tracking-wider font-bold w-full transition-all ${studentsOpen ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <Users className="h-4 w-4" />
                                <span>Students</span>
                            </div>
                            {studentsOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </button>

                        {studentsOpen && (
                            <div className="bg-zinc-950 p-1 space-y-1 border-t border-zinc-900">
                                <NavLink
                                    to="/students"
                                    className="block px-8 py-[2px] text-xs font-semibold text-zinc-400 hover:text-zinc-950 hover:bg-emerald-300 transition-all"
                                    activeClassName="!bg-emerald-300 !text-zinc-950 font-bold"
                                >
                                    [ All Students ]
                                </NavLink>
                            </div>
                        )}
                    </div>

                    <div className="border border-zinc-900 bg-zinc-900/40">
                        {/* Parent Button */}
                        <button
                            onClick={() => setAnalyticsOpen(!analyticsOpen)}
                            className={`flex items-center justify-between px-3 py-1.5 text-xs uppercase tracking-wider font-bold w-full transition-all ${analyticsOpen ? 'text-emerald-400 bg-zinc-900' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <BarChart3 className="h-4 w-4" />
                                <span>Analytics</span>
                            </div>
                            {analyticsOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </button>

                        {/* Sub-Items Panel */}
                        {analyticsOpen && (
                            <div className="bg-zinc-950 p-1 space-y-1 border-t border-zinc-900">
                                <NavLink
                                    to="/analytics"
                                    className="block px-8 py-[2px] text-xs font-semibold text-zinc-400 hover:text-zinc-950 hover:bg-emerald-300 transition-all"
                                    activeClassName="!bg-emerald-300 !text-zinc-950 font-bold"
                                >
                                    [ Overview ]
                                </NavLink>
                            </div>
                        )}
                    </div>

                </nav>
            </div>

            <div className="border-t-2 border-zinc-900 pt-2">
                <button
                    onClick={() => setIsCollapsed(true)}
                    className="flex w-full items-center gap-4 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:bg-zinc-900 hover:text-white transition-all"
                >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Collapse</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;