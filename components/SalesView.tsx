import React, { useState, useMemo } from 'react';
import MetricCard from './MetricCard';
import MainChart from './MainChart';
import PromoPanel from './PromoPanel';
import RecentActivity from './RecentActivity';
import { CORE_METRICS, SALES_DATA_7D, SALES_DATA_30D, SALES_DATA_90D, TOP_PRODUCTS, FULL_PRODUCT_LIST, CATEGORY_PERFORMANCE_DATA } from '../constants';
import { Clock } from 'lucide-react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const SalesView: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7D');

  const chartData = useMemo(() => {
    switch (timeRange) {
      case '30D': return SALES_DATA_30D;
      case '90D': return SALES_DATA_90D;
      default: return SALES_DATA_7D;
    }
  }, [timeRange]);

  const displayRevenue = useMemo(() => {
    switch (timeRange) {
        case '30D': return '¥38,429,000';
        case '90D': return '¥120,450,000';
        default: return '¥4,239,600';
    }
  }, [timeRange]);

  // Data for Scatter Plot (Price vs Sales Consistency)
  const scatterData = FULL_PRODUCT_LIST.map(item => ({
    x: item.price,
    y: item.consistency, // Using consistency as proxy for quantity sold stability
    z: item.revenue / 100000, // Bubble size based on revenue
    name: item.name,
    category: item.category
  }));

  const COLORS = ['#6366F1', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-bold text-white">Sales Performance</h2>
             <span className="bg-surfaceHighlight text-xs font-medium px-2 py-1 rounded-md border border-slate-700 text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated 5m ago
             </span>
          </div>
          <div className="flex gap-2">
             <button className="px-3 py-1.5 rounded-lg bg-surface border border-surfaceHighlight text-xs hover:text-white transition-colors">Compare</button>
             <button className="px-3 py-1.5 rounded-lg bg-surface border border-surfaceHighlight text-xs hover:text-white transition-colors">Export</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 h-full">
          <MainChart 
            data={chartData}
            title="Revenue vs Profit"
            value={displayRevenue}
            subtitle={`<span class="text-emerald-400">+12.5%</span> <span class="text-slate-500 font-normal">vs previous ${timeRange}</span>`}
            activeTimeRange={timeRange}
            onTimeRangeChange={setTimeRange}
            timeRanges={['7D', '30D', '90D']}
          />
        </div>
        
        <div className="lg:col-span-1 h-full flex flex-col gap-6">
           <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-4">Category Distribution</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_PERFORMANCE_DATA}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="revenue"
                    >
                      {CATEGORY_PERFORMANCE_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#151A23', borderColor: '#1E2532', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => `¥${value.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                  {CATEGORY_PERFORMANCE_DATA.slice(0,4).map((cat, i) => (
                      <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                          <span className="text-xs text-slate-400">{cat.name}</span>
                      </div>
                  ))}
              </div>
           </div>
           <PromoPanel />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-surface rounded-2xl border border-surfaceHighlight p-6">
              <h3 className="text-lg font-bold text-white mb-4">Price vs Sales Consistency Analysis</h3>
              <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1E2532" />
                          <XAxis type="number" dataKey="x" name="Price" unit="¥" stroke="#64748B" fontSize={12} tickFormatter={(val) => `${val/1000}k`} />
                          <YAxis type="number" dataKey="y" name="Consistency" unit="%" stroke="#64748B" fontSize={12} />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                  const data = payload[0].payload;
                                  return (
                                      <div className="bg-surface border border-surfaceHighlight p-3 rounded-lg shadow-xl">
                                          <p className="text-white font-bold text-sm mb-1">{data.name}</p>
                                          <p className="text-slate-400 text-xs">Category: {data.category}</p>
                                          <p className="text-indigo-400 text-xs">Price: ¥{data.x.toLocaleString()}</p>
                                          <p className="text-emerald-400 text-xs">Consistency: {data.y}%</p>
                                      </div>
                                  );
                              }
                              return null;
                          }} />
                          <Scatter name="Products" data={scatterData} fill="#8884d8">
                              {scatterData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                          </Scatter>
                      </ScatterChart>
                  </ResponsiveContainer>
              </div>
          </div>
          <div className="lg:col-span-1">
             <RecentActivity />
          </div>
      </div>

      <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6">
          <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Top Selling Products</h3>
              <button className="text-xs text-indigo-400 hover:text-indigo-300">View Full Inventory</button>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="text-xs text-slate-500 uppercase border-b border-surfaceHighlight">
                          <th className="pb-3 pl-2">Product Name</th>
                          <th className="pb-3">Category</th>
                          <th className="pb-3">Price</th>
                          <th className="pb-3">Stock</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3 text-right pr-2">Sell-Through</th>
                      </tr>
                  </thead>
                  <tbody className="text-sm">
                      {TOP_PRODUCTS.map((item, idx) => (
                          <tr key={idx} className="border-b border-surfaceHighlight/50 hover:bg-surfaceHighlight/20 transition-colors group">
                              <td className="py-4 pl-2 font-medium text-white flex items-center gap-3">
                                  <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                                      {item.name.substring(0,2).toUpperCase()}
                                  </div>
                                  {item.name}
                              </td>
                              <td className="py-4 text-slate-400">{item.category}</td>
                              <td className="py-4 text-slate-300">¥{item.price.toLocaleString()}</td>
                              <td className="py-4 text-slate-300">{item.stock}</td>
                              <td className="py-4">
                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                      item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-400' :
                                      item.status === 'Low Stock' ? 'bg-orange-500/10 text-orange-400' :
                                      'bg-red-500/10 text-red-400'
                                  }`}>
                                      {item.status}
                                  </span>
                              </td>
                              <td className="py-4 text-right pr-2 text-white font-bold">{item.sellThrough}%</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>
    </>
  );
};

export default SalesView;