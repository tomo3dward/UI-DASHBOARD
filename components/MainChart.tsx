import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Download, Filter } from 'lucide-react';

interface MainChartProps {
  data: any[];
  title: string;
  value: string;
  subtitle: string;
  type?: 'area' | 'bar';
  timeRanges?: string[];
  activeTimeRange?: string;
  onTimeRangeChange?: (range: string) => void;
  dataKey1?: string;
  dataKey2?: string;
  color1?: string;
  color2?: string;
}

const MainChart: React.FC<MainChartProps> = ({
  data,
  title,
  value,
  subtitle,
  type = 'area',
  timeRanges = ['24H', '7D', '30D', '90D', '1Y'],
  activeTimeRange = '7D',
  onTimeRangeChange,
  dataKey1 = 'revenue',
  dataKey2 = 'profit',
  color1 = '#6366F1',
  color2 = '#8B5CF6',
}) => {
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-surfaceHighlight p-3 rounded-lg shadow-xl">
          <p className="text-slate-300 text-xs mb-2">{label}</p>
          <p className="text-indigo-400 text-sm font-bold flex items-center gap-2" style={{ color: color1 }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color1 }}></span>
            {dataKey1}: ${payload[0]?.value?.toLocaleString()}
          </p>
          {payload[1] && (
            <p className="text-purple-400 text-sm font-bold flex items-center gap-2" style={{ color: color2 }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color2 }}></span>
              {dataKey2}: ${payload[1]?.value?.toLocaleString()}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-surfaceHighlight rounded-2xl p-6 relative overflow-hidden h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Live</span>
          </div>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-white">{value}</h2>
            <div className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: subtitle }} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onTimeRangeChange && (
            <div className="bg-surfaceHighlight rounded-lg p-1 flex items-center">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => onTimeRangeChange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeTimeRange === range 
                      ? 'bg-slate-700 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
          <button className="p-2 rounded-lg bg-surfaceHighlight text-slate-400 hover:text-white transition-colors border border-transparent hover:border-slate-700">
             <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-surfaceHighlight text-slate-400 hover:text-white transition-colors border border-transparent hover:border-slate-700">
             <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart
              data={data}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color1} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color1} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color2} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={color2} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2532" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey={dataKey1} 
                stroke={color1} 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#color1)" 
              />
              <Area 
                type="monotone" 
                dataKey={dataKey2} 
                stroke={color2} 
                strokeWidth={3} 
                strokeDasharray="5 5"
                fillOpacity={1} 
                fill="url(#color2)" 
              />
            </AreaChart>
          ) : (
            <BarChart
              data={data}
              margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E2532" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={dataKey1} fill={color1} radius={[4, 4, 0, 0]} />
              <Bar dataKey={dataKey2} fill={color2} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MainChart;
