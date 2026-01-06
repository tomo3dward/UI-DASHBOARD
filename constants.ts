import { InventoryItem, SalesMetric, StorePerformance, MarketRegion } from './types';
import { ShoppingBag, DollarSign, Users, Activity, Package, TrendingUp, Globe, MapPin, Search } from 'lucide-react';

// --- SALES DATA ---

export const CORE_METRICS: SalesMetric[] = [
  {
    id: 'gross-rev',
    label: 'Gross Revenue',
    value: '¥287.4M',
    trend: 13.62,
    data: [40, 55, 45, 60, 75, 65, 85, 90, 80, 95],
    icon: 'DollarSign'
  },
  {
    id: 'net-rev',
    label: 'Net Revenue',
    value: '¥198.4M',
    trend: 12.72,
    data: [30, 45, 35, 50, 40, 60, 70, 65, 75, 80],
    icon: 'Activity'
  },
  {
    id: 'avg-margin',
    label: 'Avg Margin',
    value: '64.1%',
    trend: 2.4,
    data: [60, 62, 61, 63, 64, 63, 65, 64, 64, 64.1],
    icon: 'TrendingUp'
  }
];

export const SALES_DATA_7D = [
  { name: 'Mon', revenue: 420000, profit: 240000 },
  { name: 'Tue', revenue: 350000, profit: 180000 },
  { name: 'Wed', revenue: 280000, profit: 150000 },
  { name: 'Thu', revenue: 390000, profit: 210000 },
  { name: 'Fri', revenue: 580000, profit: 340000 },
  { name: 'Sat', revenue: 890000, profit: 520000 },
  { name: 'Sun', revenue: 950000, profit: 580000 },
];

export const SALES_DATA_30D = Array.from({ length: 15 }, (_, i) => ({
  name: `Day ${i * 2 + 1}`,
  revenue: Math.floor(Math.random() * 500000) + 300000,
  profit: Math.floor(Math.random() * 300000) + 150000,
}));

export const SALES_DATA_90D = Array.from({ length: 12 }, (_, i) => ({
  name: `Week ${i + 1}`,
  revenue: Math.floor(Math.random() * 2500000) + 1500000,
  profit: Math.floor(Math.random() * 1000000) + 800000,
}));


// --- PRODUCT DATA (Representative Dummy Subset) ---

export const PRODUCT_METRICS: SalesMetric[] = [
  {
    id: 'discontinue',
    label: 'Discontinue Candidates',
    value: '12',
    trend: 5, 
    data: [10, 10, 11, 11, 12, 12, 12, 11, 12, 12],
    icon: 'Package'
  },
  {
    id: 'pareto',
    label: 'Top 20% Contribution',
    value: '78.4%',
    trend: 1.1,
    data: [75, 76, 76, 77, 77, 78, 78, 79, 78, 78.4],
    icon: 'TrendingUp'
  },
  {
    id: 'dormant',
    label: 'Dormant (>3mo)',
    value: '4 Items',
    trend: -2,
    data: [6, 5, 5, 4, 4, 5, 4, 4, 4, 4],
    icon: 'Activity'
  }
];

export const FULL_PRODUCT_LIST: InventoryItem[] = [
  { id: '204002793', name: 'Edo Tokyo UV TEE Black L', sku: '204002793', category: 'Cut-Sew B', price: 5000, stock: -2, revenue: 16122327, status: 'In Stock', sellThrough: 92.9, margin: 67.2, lifecycle: 'Cash Cow', recommendation: 'Keep', consistency: 93 },
  { id: '204002674', name: 'Cherry Blossom UV T White L', sku: '204002674', category: 'Cut-Sew B', price: 5026, stock: -7, revenue: 13962866, status: 'Low Stock', sellThrough: 92.9, margin: 70.0, lifecycle: 'Star', recommendation: 'Keep', consistency: 93 },
  { id: '220000060', name: 'Collaboration Jacket Type A', sku: '220000060', category: 'ETC/Collab', price: 24134, stock: -323, revenue: 10040064, status: 'In Stock', sellThrough: 64.3, margin: 100.0, lifecycle: 'Star', recommendation: 'Keep', consistency: 64 },
  { id: '204003032', name: 'KIMO NO TEE SAKURA White M', sku: '204003032', category: 'Cut-Sew B', price: 15019, stock: -7, revenue: 8696534, status: 'In Stock', sellThrough: 92.9, margin: 70.5, lifecycle: 'Star', recommendation: 'Keep', consistency: 93 },
  { id: '204003033', name: 'KIMO NO TEE HIKESHI Black M', sku: '204003033', category: 'Cut-Sew B', price: 14979, stock: -21, revenue: 7115042, status: 'In Stock', sellThrough: 92.9, margin: 81.7, lifecycle: 'Star', recommendation: 'Keep', consistency: 93 },
  { id: '204002958', name: 'Ukiyo-e REMIX Fuji T White L', sku: '204002958', category: 'Cut-Sew B', price: 4991, stock: -12, revenue: 6244099, status: 'Low Stock', sellThrough: 92.9, margin: 63.4, lifecycle: 'Cash Cow', recommendation: 'Keep', consistency: 93 },
  { id: '208000750', name: 'TradPatt KNIT HANTEN Navy M', sku: '208000750', category: 'Jacket', price: 33171, stock: -1, revenue: 5572845, status: 'Low Stock', sellThrough: 78.6, margin: 51.2, lifecycle: 'Cash Cow', recommendation: 'Keep', consistency: 79 },
  { id: '204002400', name: 'Godzilla Hikeshi TEE Navy XL', sku: '204002400', category: 'Cut-Sew B', price: 6009, stock: 1, revenue: 4789853, status: 'In Stock', sellThrough: 92.9, margin: 57.4, lifecycle: 'Cash Cow', recommendation: 'Keep', consistency: 93 },
  { id: '203002015', name: 'Cherry Blossom ZIP HOODIE L', sku: '203002015', category: 'Cut-Sew A', price: 15067, stock: -1, revenue: 2139592, status: 'Out of Stock', sellThrough: 64.3, margin: 69.0, lifecycle: 'Question Mark', recommendation: 'Review', consistency: 64 },
  { id: '208000908', name: 'KATSUMATA HANTEN White L', sku: '208000908', category: 'Jacket', price: 43800, stock: -1, revenue: 1971000, status: 'Out of Stock', sellThrough: 35.7, margin: 55.9, lifecycle: 'Question Mark', recommendation: 'Review', consistency: 36 },
  { id: '232001019', name: 'Kids Ultraman TEE Navy 8', sku: '232001019', category: 'Kids', price: 4000, stock: 0, revenue: 8000, status: 'Out of Stock', sellThrough: 14.3, margin: 99.9, lifecycle: 'Dog', recommendation: 'Discontinue', consistency: 14 },
  { id: '226001282', name: 'LAVENDER ME Aroma', sku: '226001282', category: 'Accessory', price: 4230, stock: 3, revenue: 59220, status: 'In Stock', sellThrough: 42.9, margin: 25.0, lifecycle: 'Dog', recommendation: 'Discontinue', consistency: 43 },
  { id: '226001283', name: 'Old Stock Socks Red', sku: '226001283', category: 'Accessory', price: 1500, stock: 15, revenue: 4500, status: 'In Stock', sellThrough: 10.5, margin: 30.0, lifecycle: 'Dog', recommendation: 'Discontinue', consistency: 12 },
  { id: '208000999', name: 'Legacy Denim Jacket', sku: '208000999', category: 'Jacket', price: 28000, stock: 4, revenue: 112000, status: 'Low Stock', sellThrough: 22.0, margin: 45.0, lifecycle: 'Dog', recommendation: 'Discontinue', consistency: 20 },
];

export const TOP_PRODUCTS = FULL_PRODUCT_LIST.slice(0, 8);

export const CATEGORY_PERFORMANCE_DATA = [
  { name: 'Cut-Sew B', revenue: 76500000, profit: 48000000 },
  { name: 'Jacket', revenue: 23600000, profit: 12000000 },
  { name: 'Cut-Sew A', revenue: 15800000, profit: 9000000 },
  { name: 'Kids', revenue: 8200000, profit: 4000000 },
  { name: 'ETC', revenue: 10100000, profit: 9500000 },
  { name: 'Accessory', revenue: 4100000, profit: 1500000 },
];

// --- MARKET DATA ---

export const MARKET_METRICS: SalesMetric[] = [
  { id: 'mkt-share', label: 'Market Share', value: '12.4%', trend: 0.8, data: [10, 10.5, 11, 11.2, 11.5, 11.8, 12, 12.2, 12.3, 12.4], icon: 'Globe' },
  { id: 'cac', label: 'Cust Acquisition', value: '$14.20', trend: -2.5, data: [18, 17, 16, 15.5, 15, 14.8, 14.5, 14.2, 14.0, 14.2], icon: 'Users' },
  { id: 'ltv', label: 'Lifetime Value', value: '$345.00', trend: 5.4, data: [300, 310, 315, 320, 325, 330, 335, 340, 342, 345], icon: 'DollarSign' }
];

export const REGIONAL_DATA: MarketRegion[] = [
  { region: 'North America', revenue: 650000, growth: 12, share: 45 },
  { region: 'Europe', revenue: 420000, growth: 8, share: 30 },
  { region: 'Asia Pacific', revenue: 210000, growth: 24, share: 15 },
  { region: 'Latin America', revenue: 80000, growth: 15, share: 10 },
];

// --- STORE DATA ---

export const STORE_METRICS: SalesMetric[] = [
  { id: 'active-stores', label: 'Active Locations', value: '8', trend: 0, data: [8,8,8,8,8,8,8,8,8,8], icon: 'MapPin' },
  { id: 'footfall', label: 'Total Footfall', value: '12.4k', trend: 8.5, data: [10, 11, 10.5, 11.2, 11.8, 12, 12.2, 11.9, 12.1, 12.4], icon: 'Users' },
  { id: 'store-conv', label: 'In-Store Conv.', value: '22.1%', trend: 1.2, data: [20, 20.5, 21, 21.2, 21.5, 21.8, 22, 22.1, 21.9, 22.1], icon: 'Activity' }
];

export const STORE_LIST: StorePerformance[] = [
  { id: 'S01', name: 'Downtown Flagship', location: 'New York, NY', revenue: 45000, target: 40000, visitors: 3200, conversion: 24.5, status: 'Open' },
  { id: 'S02', name: 'Westside Mall', location: 'Los Angeles, CA', revenue: 32000, target: 35000, visitors: 2800, conversion: 18.2, status: 'Open' },
  { id: 'S03', name: 'Newbury Street', location: 'Boston, MA', revenue: 28000, target: 25000, visitors: 1500, conversion: 28.4, status: 'Open' },
  { id: 'S04', name: 'Design District', location: 'Miami, FL', revenue: 38000, target: 30000, visitors: 2100, conversion: 21.0, status: 'Open' },
  { id: 'S05', name: 'Michigan Ave', location: 'Chicago, IL', revenue: 15000, target: 28000, visitors: 900, conversion: 15.5, status: 'Maintenance' },
];

export const ACTIVE_ALERTS = [
  { id: 1, type: 'critical', message: 'Low stock: Leather Biker Jacket (5 units left)' },
  { id: 2, type: 'warning', message: 'Return rate spike: Summer Collection > 12%' },
  { id: 3, type: 'info', message: 'New shipment arriving: Warehouse B' },
];