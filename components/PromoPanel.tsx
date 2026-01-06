import React from 'react';
import { Zap, ArrowRight, Lock } from 'lucide-react';

const PromoPanel: React.FC = () => {
  return (
    <div className="h-full bg-gradient-to-b from-[#131126] to-[#0B0E14] rounded-2xl border border-surfaceHighlight/50 p-6 flex flex-col relative overflow-hidden">
      {/* Background Glow effects */}
      <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-indigo-600/20 blur-[50px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-white fill-white" />
                <span className="font-bold text-lg text-white">Stakent<sup className="text-[10px] text-slate-400 ml-1">®</sup></span>
            </div>
            <span className="bg-surfaceHighlight text-xs font-semibold px-2 py-1 rounded text-slate-300 border border-slate-700">v1.0</span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
          Product Disposition <br/> Framework
        </h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Analyze your inventory performance using the Boston Matrix. Identify Stars, Cash Cows, and candidates for Markdown.
        </p>

        <div className="space-y-3 mt-auto">
          <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 group">
            Run Analysis
            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
          
          <button className="w-full py-3.5 rounded-xl bg-surface border border-surfaceHighlight text-slate-300 font-medium text-sm hover:bg-surfaceHighlight hover:text-white transition-all flex items-center justify-center gap-2">
            View Reports
            <Lock className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoPanel;
