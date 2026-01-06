import React from 'react';
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { SalesMetric } from '../types';
import * as Icons from 'lucide-react';

interface MetricCardProps {
  metric: SalesMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  // Dynamic icon rendering
  const IconComponent = (Icons as any)[metric.icon] || Icons.Activity;
  const isPositive = metric.trend >= 0;

  // Transform simple array to object array for Recharts
  const chartData = metric.data.map((val, idx) => ({ value: val, index: idx }));

  return (
    <div className="bg-surface rounded-2xl p-5 border border-surfaceHighlight relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surfaceHighlight flex items-center justify-center border border-slate-800">
            <IconComponent className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Business Health</p>
            <h3 className="text-sm font-semibold text-slate-200">{metric.label}</h3>
          </div>
        </div>
        <button className="text-slate-600 hover:text-white transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-2 relative z-10">
        <p className="text-xs text-slate-500 mb-1">Current Period</p>
        <h2 className="text-3xl font-bold text-white tracking-tight">{metric.value}</h2>
      </div>

      <div className="flex items-center gap-2 mb-6 relative z-10">
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(metric.trend)}%
        </span>
        <span className="text-xs text-slate-500">vs last period</span>
      </div>

      {/* Sparkline Background */}
      <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 group-hover:opacity-30 transition-opacity z-0 pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? '#10B981' : '#EF4444'} 
              strokeWidth={2}
              fill={`url(#gradient-${metric.id})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricCard;
