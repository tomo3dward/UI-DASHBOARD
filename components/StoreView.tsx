import React from 'react';
import MetricCard from './MetricCard';
import { STORE_METRICS, STORE_LIST } from '../constants';
import { MapPin, Users, TrendingUp } from 'lucide-react';

const StoreView: React.FC = () => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Retail Operations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORE_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6">
        <h3 className="text-lg font-bold text-white mb-6">Store Performance Leaderboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORE_LIST.map((store) => (
                <div key={store.id} className="bg-surfaceHighlight/30 border border-surfaceHighlight rounded-xl p-5 hover:border-slate-600 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white group-hover:text-indigo-400 transition-colors">{store.name}</h4>
                                <p className="text-xs text-slate-500">{store.location}</p>
                            </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                            store.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'
                        }`}>
                            {store.status}
                        </span>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-400">Revenue</span>
                            <span className="text-sm font-bold text-white">${store.revenue.toLocaleString()}</span>
                        </div>
                         <div className="w-full bg-surfaceHighlight h-1.5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${store.revenue >= store.target ? 'bg-emerald-500' : 'bg-yellow-500'}`} 
                                style={{ width: `${Math.min((store.revenue / store.target) * 100, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500">
                            <span>Target: ${store.target.toLocaleString()}</span>
                            <span>{Math.round((store.revenue/store.target)*100)}%</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-surfaceHighlight/50 grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Footfall</span>
                            <p className="text-sm font-bold text-white flex items-center gap-1">
                                <Users className="w-3 h-3 text-slate-400" />
                                {store.visitors.toLocaleString()}
                            </p>
                        </div>
                        <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Conversion</span>
                            <p className="text-sm font-bold text-white flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-slate-400" />
                                {store.conversion}%
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default StoreView;
