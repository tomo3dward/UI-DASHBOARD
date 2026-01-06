import React from 'react';
import { Search, Bell, Settings as SettingsIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-20 bg-background/80 backdrop-blur-md border-b border-surfaceHighlight flex items-center justify-between px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-white font-semibold text-lg hidden md:block">Dashboard Overview</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Search SKUs, orders..." 
            className="bg-surface border border-surfaceHighlight rounded-full pl-10 pr-4 py-2 w-64 text-sm text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-slate-600"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-full bg-surface border border-surfaceHighlight flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
          </button>
          
          <button className="w-10 h-10 rounded-full bg-surface border border-surfaceHighlight flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-all">
            <SettingsIcon className="w-5 h-5" />
          </button>

          <div className="pl-4 border-l border-surfaceHighlight flex items-center gap-3 cursor-pointer">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">Alex Chen</p>
              <p className="text-xs text-slate-500">Store Manager</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-[1px]">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/100/100" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
