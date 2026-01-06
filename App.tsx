import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SalesView from './components/SalesView';
import ProductView from './components/ProductView';
import MarketView from './components/MarketView';
import StoreView from './components/StoreView';
import { DashboardView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<DashboardView>(DashboardView.SALES);

  const renderContent = () => {
    switch (currentView) {
      case DashboardView.SALES:
        return <SalesView />;
      case DashboardView.PRODUCT:
        return <ProductView />;
      case DashboardView.MARKET:
        return <MarketView />;
      case DashboardView.STORE:
        return <StoreView />;
      default:
        return <SalesView />;
    }
  };

  return (
    <div className="bg-background min-h-screen flex text-slate-300 font-sans selection:bg-accent selection:text-white">
      {/* Sidebar */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col relative z-0">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
