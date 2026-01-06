import React from 'react';
import { LayoutDashboard, ShoppingBag, BarChart2, MapPin, Settings, Package, PieChart } from 'lucide-react';
import { DashboardView } from '../types';

interface SidebarProps {
  currentView: DashboardView;
  onChangeView: (view: DashboardView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: DashboardView.SALES, label: 'Sales Overview', icon: LayoutDashboard },
    { id: DashboardView.PRODUCT, label: 'Product Dev', icon: Package },
    { id: DashboardView.MARKET, label: 'Market Analysis', icon: PieChart },
    { id: DashboardView.STORE, label: 'Retail Stores', icon: MapPin },
  ];

  return (
    <div className="w-64 h-screen bg-background border-r border-surfaceHighlight flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <BarChart2 className="text-white w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Retail<span className="text-slate-400 font-light">IQ</span></h1>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-surfaceHighlight text-white shadow-lg shadow-black/20' 
                  : 'text-slate-400 hover:bg-surfaceHighlight/50 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-slate-500 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(139,92,246,0.6)]" />}
            </button>
          );
        })}

        <div className="mt-8 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Operations</div>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-surfaceHighlight/50 hover:text-white transition-all">
          <ShoppingBag className="w-5 h-5 text-slate-500" />
          <span className="font-medium text-sm">Inventory</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-surfaceHighlight/50 hover:text-white transition-all">
           <Settings className="w-5 h-5 text-slate-500" />
           <span className="font-medium text-sm">Settings</span>
        </button>
      </div>

      <div className="p-4 border-t border-surfaceHighlight">
         <div className="bg-gradient-to-r from-surfaceHighlight to-surface p-4 rounded-xl border border-surfaceHighlight/50">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs text-slate-300 font-medium">System Operational</span>
            </div>
            <p className="text-[10px] text-slate-500">Sync: 1 min ago (Stripe)</p>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
