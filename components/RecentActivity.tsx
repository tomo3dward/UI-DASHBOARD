import React from 'react';
import { ShoppingBag, Box, AlertTriangle, ChevronRight } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    { 
      type: 'sale',
      title: 'New Order #4829', 
      desc: 'Amount $340.00', 
      icon: ShoppingBag, 
      color: 'bg-indigo-500/10 text-indigo-400',
      time: '2 min ago'
    },
    { 
      type: 'stock',
      title: 'Restock Alert', 
      desc: 'Merino Wool (Low)', 
      icon: AlertTriangle, 
      color: 'bg-red-500/10 text-red-400',
      time: '15 min ago'
    },
    { 
      type: 'inventory',
      title: 'Stock Update', 
      desc: 'Warehouse B (+400)', 
      icon: Box, 
      color: 'bg-emerald-500/10 text-emerald-400',
      time: '1h ago'
    },
    { 
      type: 'sale',
      title: 'New Order #4828', 
      desc: 'Amount $120.50', 
      icon: ShoppingBag, 
      color: 'bg-indigo-500/10 text-indigo-400',
      time: '2h ago'
    },
  ];

  return (
    <div className="space-y-4">
        <div className="flex items-center justify-between px-2 mb-2">
            <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Live Feed</h4>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
        
        {activities.map((item, idx) => (
            <div key={idx} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-surfaceHighlight/50 transition-colors cursor-pointer border border-transparent hover:border-surfaceHighlight/50">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-white truncate group-hover:text-accent transition-colors">{item.title}</h5>
                    <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                </div>
                <div className="text-right">
                     <span className="text-[10px] text-slate-600 block mb-1">{item.time}</span>
                </div>
            </div>
        ))}

        <div className="pt-4 border-t border-surfaceHighlight">
            <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-bold text-white">Super Charge</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">Unlock AI predictive models for inventory forecasting.</p>
                <button className="text-xs font-semibold text-white bg-surfaceHighlight hover:bg-accent hover:text-white px-3 py-2 rounded-lg w-full transition-colors">
                    Upgrade Plan
                </button>
            </div>
        </div>
    </div>
  );
};

// Missing import fix
import { Zap } from 'lucide-react';

export default RecentActivity;
