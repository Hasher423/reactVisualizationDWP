import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-slate-100 transition-all duration-300 flex flex-col shadow-xl`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <span className={`font-bold text-xl tracking-tight ${!isSidebarOpen && 'hidden'}`}>Brand</span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {['Dashboard', 'Analytics', 'Settings'].map((item, i) => (
            <a key={i} href="#" className="flex items-center p-3 hover:bg-slate-800 rounded-xl transition-colors group">
              <div className="w-6 h-6 bg-slate-700 rounded group-hover:bg-indigo-500 transition-colors"></div>
              <span className={`ml-3 font-medium whitespace-nowrap ${!isSidebarOpen && 'hidden'}`}>{item}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-8 justify-between z-10 sticky top-0">
          <h1 className="text-xl font-semibold text-slate-800">Overview</h1>
          <div className="flex items-center space-x-6">
            <button className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-9 h-9  from-indigo-500 to-purple-500 rounded-full shadow-md"></div>
              <span className="font-medium text-slate-700 text-sm hidden sm:block">Jane Doe</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 h-full flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to your Dashboard</h2>
             <p className="text-slate-500 max-w-md">This is a beautiful, responsive layout with a collapsible sidebar and modern styling using Tailwind CSS.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;