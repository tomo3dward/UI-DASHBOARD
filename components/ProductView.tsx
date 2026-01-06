import React from 'react';
import MetricCard from './MetricCard';
import { PRODUCT_METRICS, FULL_PRODUCT_LIST } from '../constants';
import { Package, Search, Filter, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label, ComposedChart, Bar, Line, Cell } from 'recharts';

const ProductView: React.FC = () => {
  // Prepare data for BCG Matrix (Margin vs Revenue)
  const bcgData = FULL_PRODUCT_LIST.map(item => ({
    x: item.margin,
    y: item.revenue,
    z: 1,
    name: item.name,
    status: item.lifecycle
  }));

  // Prepare data for Pareto (Sorted by Revenue)
  const sortedProducts = [...FULL_PRODUCT_LIST].sort((a, b) => b.revenue - a.revenue);
  const totalRevenue = sortedProducts.reduce((sum, item) => sum + item.revenue, 0);
  let cumulativeRevenue = 0;
  const paretoData = sortedProducts.map(item => {
    cumulativeRevenue += item.revenue;
    return {
      name: item.name.substring(0, 10) + '...',
      revenue: item.revenue,
      cumulativePercentage: (cumulativeRevenue / totalRevenue) * 100
    };
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Star': return '#10B981'; // Emerald
      case 'Cash Cow': return '#3B82F6'; // Blue
      case 'Question Mark': return '#F59E0B'; // Amber
      case 'Dog': return '#EF4444'; // Red
      default: return '#94A3B8';
    }
  };

  const actionCounts = {
    Keep: FULL_PRODUCT_LIST.filter(i => i.recommendation === 'Keep').length,
    Review: FULL_PRODUCT_LIST.filter(i => i.recommendation === 'Review').length,
    Discontinue: FULL_PRODUCT_LIST.filter(i => i.recommendation === 'Discontinue').length,
  };

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Product Intelligence</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCT_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
            <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Profitability Matrix (BCG)</h3>
                    <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Star</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Cash Cow</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div>Question</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div>Dog</div>
                    </div>
                </div>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1E2532" />
                            <XAxis type="number" dataKey="x" name="Margin" unit="%" stroke="#64748B" fontSize={12} domain={[0, 100]} />
                            <YAxis type="number" dataKey="y" name="Revenue" stroke="#64748B" fontSize={12} tickFormatter={(val) => `¥${val/1000000}M`} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div className="bg-surface border border-surfaceHighlight p-3 rounded-lg shadow-xl">
                                            <p className="text-white font-bold text-sm mb-1">{data.name}</p>
                                            <p className="text-slate-400 text-xs">Status: <span style={{color: getStatusColor(data.status)}}>{data.status}</span></p>
                                            <p className="text-indigo-400 text-xs">Revenue: ¥{data.y.toLocaleString()}</p>
                                            <p className="text-emerald-400 text-xs">Margin: {data.x}%</p>
                                        </div>
                                    );
                                }
                                return null;
                            }} />
                            <ReferenceLine x={50} stroke="#64748B" strokeDasharray="3 3" />
                            <ReferenceLine y={5000000} stroke="#64748B" strokeDasharray="3 3" />
                            <Scatter name="Products" data={bcgData} fill="#8884d8">
                                {bcgData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6 flex-1">
                <h3 className="text-lg font-bold text-white mb-4">Recommended Actions</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-surfaceHighlight/30 border border-emerald-500/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Keep / Grow</div>
                                <div className="text-xs text-slate-400">High performing assets</div>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">{actionCounts.Keep}</div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-surfaceHighlight/30 border border-amber-500/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Review Strategy</div>
                                <div className="text-xs text-slate-400">Potential risks identified</div>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">{actionCounts.Review}</div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-surfaceHighlight/30 border border-red-500/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Discontinue</div>
                                <div className="text-xs text-slate-400">Underperforming items</div>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">{actionCounts.Discontinue}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-3 bg-surface rounded-2xl border border-surfaceHighlight p-6">
            <h3 className="text-lg font-bold text-white mb-4">Pareto Analysis (80/20 Rule)</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={paretoData.slice(0, 20)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1E2532" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748B" fontSize={10} />
                        <YAxis yAxisId="left" stroke="#64748B" fontSize={12} tickFormatter={(val) => `¥${val/1000000}M`} />
                        <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={12} unit="%" />
                        <Tooltip contentStyle={{ backgroundColor: '#151A23', borderColor: '#1E2532' }} itemStyle={{ color: '#fff' }} />
                        <Bar yAxisId="left" dataKey="revenue" fill="#6366F1" radius={[4, 4, 0, 0]} />
                        <Line yAxisId="right" type="monotone" dataKey="cumulativePercentage" stroke="#F59E0B" strokeWidth={2} dot={false} />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>

      <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h3 className="text-lg font-bold text-white">Full Product Catalog</h3>
            <div className="flex gap-3">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input type="text" placeholder="Search products..." className="bg-surfaceHighlight border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-64" />
                </div>
                <button className="p-2 bg-surfaceHighlight rounded-lg border border-slate-700 text-slate-400 hover:text-white">
                    <Filter className="w-4 h-4" />
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="text-xs text-slate-500 uppercase border-b border-surfaceHighlight">
                        <th className="pb-3 pl-2">SKU / Name</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Lifecycle</th>
                        <th className="pb-3 text-right">Margin</th>
                        <th className="pb-3 text-right">Revenue</th>
                        <th className="pb-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {FULL_PRODUCT_LIST.map((item, idx) => (
                        <tr key={idx} className="border-b border-surfaceHighlight/50 hover:bg-surfaceHighlight/20 transition-colors">
                            <td className="py-4 pl-2">
                                <div className="font-medium text-white">{item.name}</div>
                                <div className="text-xs text-slate-500">{item.sku}</div>
                            </td>
                            <td className="py-4 text-slate-400">{item.category}</td>
                            <td className="py-4">
                                <span className={`px-2 py-1 rounded text-xs font-semibold border ${
                                    item.lifecycle === 'Star' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                                    item.lifecycle === 'Cash Cow' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                                    item.lifecycle === 'Question Mark' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                                    'bg-red-500/10 text-red-400 border-red-500/30'
                                }`}>
                                    {item.lifecycle}
                                </span>
                            </td>
                            <td className="py-4 text-right text-slate-300">{item.margin}%</td>
                            <td className="py-4 text-right text-slate-300 font-bold">¥{item.revenue.toLocaleString()}</td>
                            <td className="py-4 text-right">
                                <span className={`text-xs px-2 py-1 rounded font-medium ${
                                    item.recommendation === 'Keep' ? 'bg-emerald-500/20 text-emerald-400' :
                                    item.recommendation === 'Review' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>{item.recommendation}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </>
  );
};

export default ProductView;