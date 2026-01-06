export enum DashboardView {
  SALES = 'SALES',
  PRODUCT = 'PRODUCT',
  MARKET = 'MARKET',
  STORE = 'STORE',
  SETTINGS = 'SETTINGS'
}

export interface SalesMetric {
  id: string;
  label: string;
  value: string;
  trend: number;
  data: number[]; // For sparkline
  icon: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  revenue: number; // Added revenue
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  sellThrough: number;
  margin: number;
  lifecycle: 'Star' | 'Cash Cow' | 'Question Mark' | 'Dog';
  recommendation: 'Keep' | 'Review' | 'Discontinue'; // Added recommendation
  consistency: number; // Sales consistency score (0-100)
}

export interface StorePerformance {
  id: string;
  name: string;
  location: string;
  revenue: number;
  target: number;
  visitors: number;
  conversion: number;
  status: 'Open' | 'Closed' | 'Maintenance';
}

export interface MarketRegion {
  region: string;
  revenue: number;
  growth: number;
  share: number;
}