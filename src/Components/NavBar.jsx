import React from 'react';
import { Search, X } from 'lucide-react';

// Deconstruct the props passed from the parent layout scaffolding
const NavBar = ({ searchMonth, setSearchMonth }) => {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-zinc-200 bg-white px-6">
      
      {/* Left Section: Search Bar */}
      <div className="flex flex-1 max-w-md items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 focus-within:border-zinc-400 focus-within:bg-white transition-all duration-200">
        <Search className="h-4 w-4 text-zinc-400" />
        <input
          type="text"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
          placeholder="Search by enrollment month (e.g. January)..."
          className="w-full bg-transparent text-sm text-zinc-900 placeholder-zinc-400 outline-none"
        />
        
        {searchMonth && (
          <button 
            onClick={() => setSearchMonth('')}
            className="text-zinc-400 hover:text-zinc-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

    </header>
  );
};

export default NavBar;