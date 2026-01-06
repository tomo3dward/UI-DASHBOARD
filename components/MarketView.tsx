import React from 'react';
import MetricCard from './MetricCard';
import MainChart from './MainChart';
import { MARKET_METRICS, REGIONAL_DATA } from '../constants';
import { Globe, Users, Target } from 'lucide-react';

const MarketView: React.FC = () => {
  // Transform regional data for chart
  const regionalChartData = REGIONAL_DATA.map(r => ({
    name: r.region,
    revenue: r.revenue,
    profit: r.revenue * (r.share / 100) // Mock profit logic
  }));

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Market Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MARKET_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
            <MainChart 
                data={regionalChartData}
                title="Regional Revenue Distribution"
                value="$1.36M"
                subtitle="<span class='text-slate-400'>Total Global Revenue</span>"
                type="bar"
                dataKey1="revenue"
                color1="#8B5CF6"
                timeRanges={[]}
            />
        </div>
        <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-bold text-white">Competitor Watch</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-surfaceHighlight/50">
                        <span className="text-sm text-slate-300">Brand A</span>
                        <span className="text-xs font-bold text-red-400">+12% Share</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-surfaceHighlight/50">
                        <span className="text-sm text-slate-300">Brand B</span>
                        <span className="text-xs font-bold text-slate-500">-2% Share</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-surfaceHighlight/50">
                        <span className="text-sm text-slate-300">Brand C</span>
                        <span className="text-xs font-bold text-red-400">+5% Share</span>
                    </div>
                </div>
            </div>

            <div className="bg-surface rounded-2xl border border-surfaceHighlight p-6">
                 <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-lg font-bold text-white">Demographics</h3>
                </div>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Gen Z</span>
                            <span>45%</span>
                        </div>
                        <div className="h-2 bg-surfaceHighlight rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[45%]"></div>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>Millennials</span>
                            <span>35%</span>
                        </div>
                        <div className="h-2 bg-surfaceHighlight rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[35%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default MarketView;
