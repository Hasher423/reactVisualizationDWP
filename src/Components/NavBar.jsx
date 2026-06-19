import React from 'react';
import { Search, X } from 'lucide-react';

// Deconstruct the props passed from the parent layout scaffolding
const NavBar = ({ searchMonth, setSearchMonth }) => {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b-2 border-zinc-950 bg-[#09090B] px-6 font-mono tracking-tight">
      <div className="flex flex-1 max-w-md items-center bg-white border-2 border-zinc-950 overflow-hidden transition-all focus-within:translate-x-[-2px] focus-within:translate-y-[-2px] focus-within:shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
        <div className="flex items-center justify-center pl-3 pr-2 py-1.5 bg-zinc-100 border-r-2 border-zinc-950">
          <Search className="h-4 w-4 text-zinc-900" />
        </div>

        <input
          type="text"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
          placeholder="FILTER BY MONTH [E.G. JANUARY]..."
          className="w-full bg-white px-3 py-1.5 text-xs lg:text-sm font-semibold text-zinc-900 placeholder-zinc-400 outline-none uppercase"
        />

        {searchMonth && (
          <button
            onClick={() => setSearchMonth('')}
            className="h-full px-3 bg-[] text-zinc-900 hover:bg-zinc-100 font-bold border-l border-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </header>
  );
};

export default NavBar;